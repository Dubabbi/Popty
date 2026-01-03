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

export function ReportPopup({ onNavigate }: ReportPopupProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!title || !location || !startDate || !endDate || !category) {
      alert("필수 정보를 모두 입력해주세요!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
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
      {/* Intro Card */}
      <IntroCard />

      {/* Form */}
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
            onStartChange={(e) => setStartDate(e.target.value)}
            onEndChange={(e) => setEndDate(e.target.value)}
          />

          <CategorySelector
            categories={REPORT_CATEGORIES}
            selected={category}
            onSelect={(id) => setCategory(id)}
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
    </div>
  );
}
