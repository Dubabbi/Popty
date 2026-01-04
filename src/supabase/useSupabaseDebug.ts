import { useEffect } from "react";
import { supabase } from "@/supabase/client";

type Options = {
  enabled?: boolean; // 기본 true
  regionCode?: string; // 기본 "SEONGSU"
  listRange?: { from: number; to: number }; // 기본 0~4
  month?: string; // 기본 "2026-01"
};

/**
 * Supabase 연결/권한/뷰/RPC 동작 확인용 디버그 훅
 * - 콘솔로 결과 출력
 * - enabled=false로 쉽게 끄기 가능
 */
export function useSupabaseDebug(options: Options = {}) {
  const {
    enabled = true,
    regionCode = "SEONGSU",
    listRange = { from: 0, to: 4 },
    month = "2026-01",
  } = options;

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    (async () => {
      console.log("✅ Supabase Debug start");

      // 0) 세션 확인
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (cancelled) return;
      console.log("session:", sessionData?.session, sessionError);

      // 1) 팝업 리스트(공개)
      const list = await supabase
        .from("v_popups_list")
        .select("*")
        .order("end_date", { ascending: true })
        .range(listRange.from, listRange.to);

      if (cancelled) return;
      console.log("v_popups_list:", list.data, list.error);

      // 2) 지역별 리스트
      const byRegion = await supabase
        .from("v_popups_list")
        .select("*")
        .eq("region_code", regionCode)
        .order("end_date", { ascending: true })
        .range(listRange.from, listRange.to);

      if (cancelled) return;
      console.log(`v_popups_list (${regionCode}):`, byRegion.data, byRegion.error);

      // 3) 상세(리스트에서 첫 번째 id로)
      const firstId = (list.data?.[0]?.id as string | undefined) ?? undefined;
      if (firstId) {
        const detail = await supabase.from("v_popup_detail").select("*").eq("id", firstId).single();

        if (cancelled) return;
        console.log("v_popup_detail:", detail.data, detail.error);
      } else {
        console.warn("⚠️ popups list is empty. 샘플 popups 먼저 넣어야 함.");
      }

      // --- 아래는 로그인 되어있을 때만 정상 ---
      const session = sessionData?.session;
      if (!session) {
        console.warn("⚠️ 로그인 안 됨 → 북마크/최근검색어/RPC는 스킵");
        console.log("✅ Supabase Debug end");
        return;
      }

      // 4) 최근 검색어 기록 (RPC)
      const kw = `테스트-${Date.now()}`;
      const logKw = await supabase.rpc("log_recent_keyword", { p_keyword: kw });
      if (cancelled) return;
      console.log("rpc log_recent_keyword:", kw, logKw.error);

      // 5) 최근 검색어 조회
      const recent = await supabase
        .from("user_recent_keywords")
        .select("*")
        .order("searched_at", { ascending: false })
        .limit(5);

      if (cancelled) return;
      console.log("user_recent_keywords:", recent.data, recent.error);

      // 6) 북마크 토글 테스트 (첫 팝업)
      if (firstId) {
        const ins = await supabase.from("bookmarks").insert({ popup_id: firstId });
        if (cancelled) return;
        console.log("bookmark insert:", ins.error ?? "OK");

        const my = await supabase
          .from("v_my_bookmarks")
          .select("*")
          .order("bookmarked_at", { ascending: false })
          .limit(5);

        if (cancelled) return;
        console.log("v_my_bookmarks:", my.data, my.error);

        const del = await supabase.from("bookmarks").delete().eq("popup_id", firstId);
        if (cancelled) return;
        console.log("bookmark delete:", del.error ?? "OK");
      }

      // 7) 캘린더 점 표시
      const marked = await supabase.rpc("get_calendar_marked_dates", {
        p_month: month,
        p_scope: "ALL",
      });

      if (cancelled) return;
      console.log("rpc get_calendar_marked_dates:", marked.data, marked.error);

      console.log("✅ Supabase Debug end");
    })().catch((e) => {
      if (!cancelled) console.error("❌ Supabase Debug crashed:", e);
    });

    return () => {
      cancelled = true;
    };
  }, [enabled, regionCode, listRange.from, listRange.to, month]);
}
