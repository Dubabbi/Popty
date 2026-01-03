import { useState } from "react";
import { Mail, MapPin, User } from "lucide-react";
import { AvatarSection } from "@/components/my/profile-edit/parts/AvatarSection";
import { InputWithIcon } from "@/components/my/profile-edit/parts/InputWithIcon";
import { TextAreaField } from "@/components/my/profile-edit/parts/TextAreaField";
import { SaveButton } from "@/components/my/profile-edit/parts/SaveButton";

export function ProfileEdit() {
  const [name, setName] = useState("팝업 탐험가");
  const [email, setEmail] = useState("popup.lover@email.com");
  const [location, setLocation] = useState("서울, 대한민국");
  const [bio, setBio] = useState("팝업을 사랑하는 탐험가입니다 🎨");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        paddingBottom: "var(--space-8)",
      }}
    >
      <AvatarSection />
      {/* Form Fields */}
      <div style={{ padding: "0 var(--space-4)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {/* Name */}
          <InputWithIcon
            label="이름"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            gradient="linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)"
            icon={User}
            focusBorderColor="#FFB6D9"
            focusShadowRgba="rgba(255, 182, 217, 0.1)"
          />

          {/* Email */}
          <InputWithIcon
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            gradient="linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)"
            icon={Mail}
            focusBorderColor="#A3B9FF"
            focusShadowRgba="rgba(163, 185, 255, 0.1)"
          />

          {/* Location (아이콘은 검정색) */}
          <InputWithIcon
            label="위치"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            gradient="linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)"
            icon={MapPin}
            iconColor="#000"
            focusBorderColor="#D9F95F"
            focusShadowRgba="rgba(217, 249, 95, 0.1)"
          />
          <TextAreaField
            label="소개"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            focusBorderColor="#D9F95F"
            focusShadowRgba="rgba(217, 249, 95, 0.1)"
          />
        </div>
        <SaveButton isSaving={isSaving} showSuccess={showSuccess} onClick={handleSave} />
      </div>

      {/* placeholder 스타일 */}
      <style>{`
        input::-webkit-input-placeholder,
        textarea::-webkit-input-placeholder {
          color: var(--color-text-tertiary);
        }
      `}</style>
    </div>
  );
}
