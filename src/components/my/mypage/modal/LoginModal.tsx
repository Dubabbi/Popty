import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Award, MapPin } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const features = [
  { icon: MapPin, text: "방문한 팝업 기록하기", tint: "#FF5DA2", bg: "rgba(255, 93, 162, 0.14)" },
  { icon: Heart, text: "좋아하는 팝업 저장하기", tint: "#4C7DFF", bg: "rgba(76, 125, 255, 0.14)" },
  { icon: Award, text: "팝업 제보하고 뱃지 받기", tint: "#B8E04F", bg: "rgba(184, 224, 79, 0.16)" },
] as const;

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.55)",
              backdropFilter: "blur(10px)",
              zIndex: 9998,
            }}
          />

          {/* Modal wrapper */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "grid",
              placeItems: "center",
              padding: 16,
            }}
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 520,
                borderRadius: 20,
                overflow: "hidden",
                background: "white",
                boxShadow: "0 32px 100px rgba(0,0,0,0.30), 0 2px 0 rgba(255,255,255,0.6) inset",
                border: "1px solid rgba(0,0,0,0.06)",
                position: "relative",
              }}
            >
              <button
                onClick={onClose}
                aria-label="닫기"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.88)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
                  transition: "transform 0.15s ease, background 0.15s ease",
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.88)";
                }}
              >
                <X size={18} color="#4A4A4A" />
              </button>

              <div
                style={{
                  position: "relative",
                  padding: "28px 22px 18px",
                  paddingTop: 34,
                  background:
                    "radial-gradient(120% 160% at 30% 0%, rgba(217,249,95,0.55) 0%, rgba(217,249,95,0.18) 32%, rgba(255,255,255,0) 72%), linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 100%)",
                  textAlign: "center",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.35,
                    backgroundImage:
                      "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06) 0 1px, transparent 1px 100%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.04) 0 1px, transparent 1px 100%)",
                    backgroundSize: "18px 18px",
                    pointerEvents: "none",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
                  }}
                />

                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1,
                  }}
                  style={{
                    width: 150,
                    height: 150,
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <img
                    src="/image.png"
                    alt="캐릭터"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      background: "transparent",
                      filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.18))",
                    }}
                  />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  style={{
                    margin: "0 0 2px",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "#121212",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  로그인이 필요해요
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 }}
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    color: "#5E5E5E",
                    lineHeight: 1.55,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  로그인하고 기능을 바로 사용해보세요.
                </motion.p>
              </div>

              {/* Body */}
              <div style={{ padding: "0 22px 22px" }}>
                {/* Feature list */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  {features.map((f, index) => {
                    const Icon = f.icon;
                    return (
                      <motion.div
                        key={f.text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.28 + index * 0.07 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: 14,
                          borderRadius: 14,
                          background: "rgba(250,250,250,1)",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            background: f.bg,
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                            border: "1px solid rgba(0,0,0,0.04)",
                          }}
                        >
                          <Icon size={20} color={f.tint} strokeWidth={2.4} />
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: "0.96rem",
                              fontWeight: 700,
                              color: "#2B2B2B",
                              letterSpacing: "-0.01em",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {f.text}
                          </div>
                          <div style={{ marginTop: 4, fontSize: 12.5, color: "#7A7A7A" }}>
                            로그인하면 자동으로 저장돼요
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    style={{
                      width: "100%",
                      padding: "14px 12px",
                      borderRadius: 14,
                      border: "1px solid rgba(0,0,0,0.10)",
                      background: "white",
                      fontSize: "0.98rem",
                      fontWeight: 800,
                      color: "#666",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    나중에
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onLogin}
                    style={{
                      width: "100%",
                      padding: "14px 12px",
                      borderRadius: 14,
                      border: "1px solid rgba(0,0,0,0.08)",
                      background:
                        "linear-gradient(135deg, rgba(217,249,95,1) 0%, rgba(184,224,79,1) 100%)",
                      fontSize: "0.98rem",
                      fontWeight: 900,
                      color: "#101010",
                      cursor: "pointer",
                      boxShadow: "0 10px 26px rgba(184,224,79,0.32)",
                      outline: "none",
                    }}
                  >
                    로그인
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
