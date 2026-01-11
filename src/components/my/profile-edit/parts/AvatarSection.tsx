import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { supabase } from "@/supabase/client";

const AVATAR_BUCKET = "avatars";

type AvatarSectionProps = {
  avatarUrl?: string | null;
  onAvatarUrlChange?: (url: string) => void;
};

export function AvatarSection({ avatarUrl, onAvatarUrlChange }: AvatarSectionProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const openPicker = () => fileRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있어요.");
      return;
    }

    setUploading(true);
    try {
      const { data: userRes, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw userErr;
      const user = userRes.user;
      if (!user) throw new Error("로그인이 필요해요.");

      const nextPreview = URL.createObjectURL(file);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return nextPreview;
      });

      const ext = (file.name.split(".").pop() || "png").toLowerCase();
      const path = `${user.id}/avatar.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(path, file, { upsert: true, cacheControl: "3600" });

      if (uploadErr) throw uploadErr;

      const { data: urlData } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
      const publicUrl = urlData.publicUrl;

      const { error: metaErr } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });
      if (metaErr) throw metaErr;

      onAvatarUrlChange?.(publicUrl);
    } catch (err) {
      console.error(err);
      alert("프로필 사진 업로드에 실패했어요.");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const shownUrl = previewUrl ?? avatarUrl ?? null;

  return (
    <div
      style={{
        padding: "var(--space-6) var(--space-4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", marginBottom: "var(--space-2)" }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(217, 249, 95, 0.3)",
            border: "4px solid white",
            overflow: "hidden",
          }}
        >
          {shownUrl ? (
            <img
              src={shownUrl}
              alt="프로필 사진"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Mascot pose="welcome" size="large" />
          )}
        </div>

        <button
          type="button"
          onClick={openPicker}
          disabled={uploading}
          aria-label="프로필 사진 업로드"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
            border: "3px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: uploading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            opacity: uploading ? 0.7 : 1,
          }}
        >
          <Camera size={16} color="white" strokeWidth={2.5} />
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
        {uploading ? "업로드 중..." : "프로필 사진 변경"}
      </p>
    </div>
  );
}
