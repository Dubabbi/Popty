import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (cancelled) return;

      if (error || !data.session) {
        console.error("auth callback session error:", error);
        navigate("/login", { replace: true });
        return;
      }

      const userId = data.session.user.id;
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("onboarded")
        .eq("id", userId)
        .single();

      if (cancelled) return;

      if (profileError) {
        console.error("profile fetch error:", profileError);
        navigate("/", { replace: true });
        return;
      }

      if (profile?.onboarded) navigate("/", { replace: true });
      else navigate("/onboarding/tags", { replace: true });
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="authcb">
      <div className="authcb__spinnerWrap" aria-label="loading" role="status">
        <div className="authcb__spinner" />
        <div className="authcb__glow" />
      </div>

      <style>{`
        .authcb {
          min-height: 100vh;
          display: grid;
          place-items: center;
          background:
            radial-gradient(900px 500px at 20% 15%, rgba(255, 123, 107, 0.16), transparent 55%),
            radial-gradient(700px 450px at 85% 70%, rgba(217, 249, 95, 0.18), transparent 55%),
            #ffffff;
          overflow: hidden;
        }

        .authcb__spinnerWrap {
          position: relative;
          width: 84px;
          height: 84px;
          display: grid;
          place-items: center;
          animation: authcb-pop 520ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .authcb__spinner {
          width: 54px;
          height: 54px;
          border-radius: 999px;
          border: 4px solid rgba(0, 0, 0, 0.08);
          border-top-color: rgba(0, 0, 0, 0.55);
          animation: authcb-spin 900ms linear infinite;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
        }

        .authcb__glow {
          position: absolute;
          inset: -22px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 123, 107, 0.22), transparent 60%);
          filter: blur(10px);
          animation: authcb-pulse 1.6s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes authcb-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes authcb-pulse {
          0%, 100% { transform: scale(0.98); opacity: 0.7; }
          50% { transform: scale(1.06); opacity: 1; }
        }

        @keyframes authcb-pop {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* 접근성: 모션 줄이기 */
        @media (prefers-reduced-motion: reduce) {
          .authcb__spinnerWrap { animation: none; }
          .authcb__spinner { animation: none; }
          .authcb__glow { animation: none; }
        }
      `}</style>
    </div>
  );
}
