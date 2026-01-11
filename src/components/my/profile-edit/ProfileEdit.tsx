import { useState } from "react";
import { Mail, MapPin, User } from "lucide-react";
import { AvatarSection } from "@/components/my/profile-edit/parts/AvatarSection";
import { InputWithIcon } from "@/components/my/profile-edit/parts/InputWithIcon";
import { TextAreaField } from "@/components/my/profile-edit/parts/TextAreaField";
import { SaveButton } from "@/components/my/profile-edit/parts/SaveButton";
import { useMeQuery } from "@/apis/auth/useMeQuery";
import { useMyProfileQuery } from "@/apis/auth/useMyProfileQuery";
import { useUpsertMyProfileMutation } from "@/apis/auth/useUpsertMyProfileMutation";

export function ProfileEdit() {
  const { data: me, refetch: refetchMe } = useMeQuery();
  const { data: profile } = useMyProfileQuery();
  const { mutateAsync: saveProfile, isPending: isSaving } = useUpsertMyProfileMutation();

  const [nameDraft, setNameDraft] = useState<string | null>(null);
  const [locationDraft, setLocationDraft] = useState<string | null>(null);
  const [bioDraft, setBioDraft] = useState<string | null>(null);
  const [avatarDraft, setAvatarDraft] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const name = nameDraft ?? profile?.nickname ?? me?.name ?? "팝업 탐험가";
  const location = locationDraft ?? profile?.location ?? "";
  const bio = bioDraft ?? profile?.bio ?? "";
  const email = me?.email ?? "";
  const avatarUrl = avatarDraft ?? me?.avatarUrl ?? null;

  const toNullable = (v: string) => {
    const t = v.trim();
    return t.length ? t : null;
  };

  const handleSave = async () => {
    if (isSaving) return;

    try {
      await saveProfile({
        nickname: toNullable(name),
        location: toNullable(location),
        bio: toNullable(bio),
      });

      setShowSuccess(true);
      window.setTimeout(() => setShowSuccess(false), 2000);
    } catch (e) {
      console.error(e);
      alert("저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        paddingBottom: "var(--space-8)",
      }}
    >
      <AvatarSection
        avatarUrl={avatarUrl}
        onAvatarUrlChange={(url) => {
          setAvatarDraft(url);
          void refetchMe();
        }}
      />

      <div style={{ padding: "0 var(--space-4)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <InputWithIcon
            label="이름"
            type="text"
            value={name}
            onChange={(e) => setNameDraft(e.target.value)}
            gradient="linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)"
            icon={User}
            focusBorderColor="#FFB6D9"
            focusShadowRgba="rgba(255, 182, 217, 0.1)"
          />

          <InputWithIcon
            label="이메일"
            type="email"
            value={email}
            onChange={() => {}}
            gradient="linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)"
            icon={Mail}
            focusBorderColor="#A3B9FF"
            focusShadowRgba="rgba(163, 185, 255, 0.1)"
          />

          <InputWithIcon
            label="위치"
            type="text"
            value={location}
            onChange={(e) => setLocationDraft(e.target.value)}
            gradient="linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)"
            icon={MapPin}
            iconColor="#000"
            focusBorderColor="#D9F95F"
            focusShadowRgba="rgba(217, 249, 95, 0.1)"
          />

          <TextAreaField
            label="소개"
            value={bio}
            onChange={(e) => setBioDraft(e.target.value)}
            rows={4}
            focusBorderColor="#D9F95F"
            focusShadowRgba="rgba(217, 249, 95, 0.1)"
          />
        </div>

        <SaveButton isSaving={isSaving} showSuccess={showSuccess} onClick={handleSave} />
      </div>

      <style>{`
        input::-webkit-input-placeholder,
        textarea::-webkit-input-placeholder {
          color: var(--color-text-tertiary);
        }
      `}</style>
    </div>
  );
}
