import { useState } from "react";
import type { ReportPopupProps } from "@/components/my/types/reportPopup";
import { REPORT_CATEGORIES } from "@/components/my/data/reportCategories";
import { IntroCard } from "@/components/my/report-popup/parts/IntroCard";
import { SuccessView } from "@/components/my/report-popup/parts/SuccessView";
import { TextInput } from "@/components/my/report-popup/parts/TextInput";
import { LocationInput } from "@/components/my/report-popup/parts/LocationInput";
import { DateInputs } from "@/components/my/report-popup/parts/DateInputs";
import { CategorySelector } from "@/components/my/report-popup/parts/CategorySelector";
import { DescriptionTextArea } from "@/components/my/report-popup/parts/DescriptionTextArea";
import { SubmitButton } from "@/components/my/report-popup/parts/SubmitButton";
import { Toast, type ToastType } from "@/components/Toast";
import { useCreatePopupReportMutation } from "@/apis/auth/popup-reports";

const MAX_CATEGORIES = 5;

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "message" in err) {
    const m = (err as { message?: unknown }).message;
    if (typeof m === "string") return m;
  }
  return "알 수 없는 오류가 발생했어요.";
}

export function ReportPopup({ onNavigate }: ReportPopupProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<ToastType>("info");

  const createReport = useCreatePopupReportMutation();
  const isSubmitting = createReport.isPending;

  const openToast = (msg: string, type: ToastType) => {
    setToastMsg(msg);
    setToastType(type);
    setToastOpen(true);
  };

  const handleSubmit = async () => {
    const missing: string[] = [];
    if (!title.trim()) missing.push("팝업 이름");
    if (!location.trim()) missing.push("위치");
    if (!startDate) missing.push("시작일");
    if (!endDate) missing.push("종료일");
    if (categories.length === 0) missing.push("카테고리");

    if (missing.length) {
      openToast(`${missing.join(", ")} 입력이 필요해요`, "error");
      return;
    }

    if (startDate && endDate && endDate < startDate) {
      openToast("종료일은 시작일 이후여야 해요", "error");
      return;
    }

    try {
      await createReport.mutateAsync({
        title: title.trim(),
        locationText: location.trim(),
        startDate: startDate!,
        endDate: endDate!,
        categoryCodes: categories,
        description: description.trim().length ? description.trim() : null,
      });

      setIsSubmitted(true);
    } catch (e: unknown) {
      const msg = getErrorMessage(e);

      if (msg.toLowerCase().includes("row-level security")) {
        openToast("로그인이 필요해요", "error");
        return;
      }

      openToast(msg || "제보에 실패했어요. 잠시 후 다시 시도해 주세요.", "error");
    }
  };

  if (isSubmitted) return <SuccessView onNavigate={onNavigate} />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        paddingBottom: "var(--space-8)",
      }}
    >
      <IntroCard />

      <div style={{ padding: "0 var(--space-4)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <TextInput
            label="팝업 이름 *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 디즈니 100주년 팝업스토어"
          />

          <LocationInput
            label="위치 *"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="예: 성수동 서울숲길 44"
          />

          <DateInputs
            startDate={startDate}
            endDate={endDate}
            onStartChange={setStartDate}
            onEndChange={setEndDate}
          />

          <CategorySelector
            categories={REPORT_CATEGORIES}
            selected={categories}
            onChange={setCategories}
            maxSelected={MAX_CATEGORIES}
            minSelected={1}
            onInvalid={(reason) => {
              if (reason === "max") {
                openToast(`카테고리는 최대 ${MAX_CATEGORIES}개까지 선택할 수 있어요`, "warning");
              } else {
                openToast("카테고리는 최소 1개 이상 선택되어야 해요", "warning");
              }
            }}
          />

          <DescriptionTextArea
            label="상세 설명 (선택)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="팝업에 대한 추가 정보를 자유롭게 작성해주세요"
          />
        </div>

        <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
      </div>

      {toastOpen && (
        <Toast
          message={toastMsg}
          type={toastType}
          duration={2200}
          onClose={() => setToastOpen(false)}
        />
      )}
    </div>
  );
}
