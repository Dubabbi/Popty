import { useState } from "react";
import { Camera, Mail, User, MapPin, Save } from "lucide-react";
import { Mascot } from "@/components/Mascot";

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
      {/* Avatar Section */}
      <div
        style={{
          padding: "var(--space-6) var(--space-4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            marginBottom: "var(--space-2)",
          }}
        >
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
            }}
          >
            <Mascot pose="welcome" size="large" />
          </div>
          <button
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
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Camera size={16} color="white" strokeWidth={2.5} />
          </button>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
          }}
        >
          프로필 사진 변경
        </p>
      </div>

      {/* Form Fields */}
      <div style={{ padding: "0 var(--space-4)" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          {/* Name */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--space-2)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                paddingLeft: "var(--space-2)",
              }}
            >
              이름
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 16,
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, #FFB6D9 0%, #FF8BA0 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={18} color="white" strokeWidth={2.5} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "var(--space-4)",
                  paddingLeft: 68,
                  border: "2px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "var(--radius-xl)",
                  fontSize: "1rem",
                  background: "white",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FFB6D9";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255, 182, 217, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--space-2)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                paddingLeft: "var(--space-2)",
              }}
            >
              이메일
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 16,
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Mail size={18} color="white" strokeWidth={2.5} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "var(--space-4)",
                  paddingLeft: 68,
                  border: "2px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "var(--radius-xl)",
                  fontSize: "1rem",
                  background: "white",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#A3B9FF";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(163, 185, 255, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--space-2)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                paddingLeft: "var(--space-2)",
              }}
            >
              위치
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 16,
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin size={18} color="#000" strokeWidth={2.5} />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: "100%",
                  padding: "var(--space-4)",
                  paddingLeft: 68,
                  border: "2px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "var(--radius-xl)",
                  fontSize: "1rem",
                  background: "white",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#D9F95F";
                  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(217, 249, 95, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "var(--space-2)",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                paddingLeft: "var(--space-2)",
              }}
            >
              소개
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "var(--space-4)",
                border: "2px solid rgba(0, 0, 0, 0.08)",
                borderRadius: "var(--radius-xl)",
                fontSize: "1rem",
                background: "white",
                transition: "all 0.3s ease",
                resize: "none",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#D9F95F";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(217, 249, 95, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            width: "100%",
            marginTop: "var(--space-6)",
            padding: "var(--space-4)",
            background: showSuccess
              ? "linear-gradient(135deg, #B8F0D9 0%, #A3E0C9 100%)"
              : "linear-gradient(135deg, #D9F95F 0%, #B8E04F 100%)",
            border: "none",
            borderRadius: "var(--radius-xl)",
            fontSize: "1rem",
            fontWeight: 700,
            color: showSuccess ? "#1A5F44" : "#000",
            cursor: isSaving ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-2)",
            boxShadow: "0 4px 16px rgba(217, 249, 95, 0.4)",
            transition: "all 0.3s ease",
            opacity: isSaving ? 0.7 : 1,
          }}
        >
          {showSuccess ? (
            <>
              <span>✓</span>
              저장 완료!
            </>
          ) : (
            <>
              <Save size={20} strokeWidth={2.5} />
              {isSaving ? "저장 중..." : "변경사항 저장"}
            </>
          )}
        </button>
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
