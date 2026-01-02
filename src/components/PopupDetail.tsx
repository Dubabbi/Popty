import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Bell,
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  ExternalLink,
  Instagram,
  Users,
  Car,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { getPopupById, calculateDday, formatDateRange } from "../data/popups";
import { imageMapping } from "@/data/imageMapping";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Mascot } from "@/components/Mascot";
import type { ViewType } from "@/routes/routes";

interface PopupDetailProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export function PopupDetail({ onNavigate, breakpoint }: PopupDetailProps) {
  const { popupId } = useParams<{ popupId: string }>();

  const [saved, setSaved] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // popupId 없으면 안전 처리
  if (!popupId) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-16) var(--space-4)",
        }}
      >
        <Mascot pose="empty" size="large" />
        <h3 style={{ marginTop: "var(--space-6)" }}>Invalid popup id</h3>
        <Button variant="primary" onClick={() => onNavigate("home")}>
          Go Home
        </Button>
      </div>
    );
  }

  const popup = getPopupById(popupId);

  if (!popup) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-16) var(--space-4)",
        }}
      >
        <Mascot pose="empty" size="large" />
        <h3 style={{ marginTop: "var(--space-6)" }}>Pop-up not found</h3>
        <Button variant="primary" onClick={() => onNavigate("home")}>
          Go Home
        </Button>
      </div>
    );
  }

  const dday = calculateDday(popup.endDate);

  const handleSave = () => {
    setSaved((prev) => !prev);
    if (!saved) {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  const handleReminder = () => {
    setReminderSet(true);
    setShowReminderModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div style={{ paddingBottom: "var(--space-8)" }}>
      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--color-gray-200)",
          padding: "var(--space-4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => onNavigate("home")}
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-full)",
            background: "var(--color-gray-100)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={20} />
        </button>

        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <button
            onClick={() => setShowShareModal(true)}
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--radius-full)",
              background: "var(--color-gray-100)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Share2 size={20} />
          </button>

          <button
            onClick={handleSave}
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--radius-full)",
              background: saved
                ? "var(--color-primary-bg)"
                : "var(--color-gray-100)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Bookmark
              size={20}
              fill={saved ? "var(--color-primary)" : "none"}
              color={
                saved ? "var(--color-primary)" : "var(--color-text-secondary)"
              }
            />
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}
      >
        {popup.images.map((img, index) => (
          <img
            key={index}
            src={imageMapping[img]}
            alt={`${popup.popupName} ${index + 1}`}
            style={{
              width: "100%",
              height: breakpoint === "mobile" ? 300 : 400,
              objectFit: "cover",
              scrollSnapAlign: "start",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "var(--space-4)" }}>
        {/* Title & Badges */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-2)",
              marginBottom: "var(--space-3)",
            }}
          >
            {dday > 0 && dday <= 3 && (
              <Badge variant="dday">D-{dday} Ending Soon!</Badge>
            )}
            {popup.trending && <Badge variant="trending">🔥 Trending</Badge>}
            {popup.isNew && <Badge variant="new">NEW</Badge>}
            {popup.entryFee === "free" && (
              <Badge variant="free">Free Entry</Badge>
            )}
          </div>
          <h2 style={{ margin: 0, marginBottom: "var(--space-2)" }}>
            {popup.popupName}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "1.125rem",
              color: "var(--color-text-secondary)",
            }}
          >
            {popup.brandName}
          </p>
        </div>

        {/* Key Info Summary Card */}
        <div
          style={{
            background: "var(--color-bg-tertiary)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-4)",
            marginBottom: "var(--space-6)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <CalendarIcon
                size={20}
                color="var(--color-text-tertiary)"
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-tertiary)",
                    marginBottom: "var(--space-1)",
                  }}
                >
                  Duration
                </div>
                <div style={{ fontWeight: 600 }}>
                  {formatDateRange(popup.startDate, popup.endDate)}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <Clock
                size={20}
                color="var(--color-text-tertiary)"
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-tertiary)",
                    marginBottom: "var(--space-1)",
                  }}
                >
                  Hours
                </div>
                <div style={{ fontWeight: 600 }}>{popup.openHours}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <MapPin
                size={20}
                color="var(--color-text-tertiary)"
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-tertiary)",
                    marginBottom: "var(--space-1)",
                  }}
                >
                  Location
                </div>
                <div style={{ fontWeight: 600 }}>{popup.address}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <DollarSign
                size={20}
                color="var(--color-text-tertiary)"
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-tertiary)",
                    marginBottom: "var(--space-1)",
                  }}
                >
                  Entry Fee
                </div>
                <div style={{ fontWeight: 600 }}>
                  {popup.entryFee === "free"
                    ? "Free"
                    : popup.entryFeeAmount || "Paid"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: "var(--space-6)" }}>
          <h4 style={{ marginBottom: "var(--space-2)" }}>About</h4>
          <p style={{ lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
            {popup.description}
          </p>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: "var(--space-6)" }}>
          <h4 style={{ marginBottom: "var(--space-3)" }}>Tags</h4>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}
          >
            {popup.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: "var(--space-2) var(--space-3)",
                  background: "white",
                  border: "1px solid var(--color-gray-300)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Practical Info */}
        {(popup.crowdLevel || popup.queueInfo || popup.parkingInfo) && (
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h4 style={{ marginBottom: "var(--space-3)" }}>Good to Know</h4>
            <div
              style={{
                background: "var(--color-sky)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-4)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {popup.crowdLevel && (
                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                  <Users
                    size={18}
                    color="var(--color-text-secondary)"
                    style={{ flexShrink: 0 }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        marginBottom: "var(--space-1)",
                      }}
                    >
                      Crowd Level:{" "}
                      {popup.crowdLevel === "high"
                        ? "🔴 High"
                        : popup.crowdLevel === "medium"
                          ? "🟡 Medium"
                          : "🟢 Low"}
                    </div>
                  </div>
                </div>
              )}

              {popup.queueInfo && (
                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                  <AlertCircle
                    size={18}
                    color="var(--color-text-secondary)"
                    style={{ flexShrink: 0 }}
                  />
                  <div style={{ fontSize: "0.875rem" }}>{popup.queueInfo}</div>
                </div>
              )}

              {popup.parkingInfo && (
                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                  <Car
                    size={18}
                    color="var(--color-text-secondary)"
                    style={{ flexShrink: 0 }}
                  />
                  <div style={{ fontSize: "0.875rem" }}>
                    {popup.parkingInfo}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Links */}
        {(popup.officialLink || popup.officialSNS || popup.reservationLink) && (
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h4 style={{ marginBottom: "var(--space-3)" }}>Links</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
              }}
            >
              {popup.officialLink && (
                <a
                  href={popup.officialLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    padding: "var(--space-3)",
                    background: "white",
                    border: "1px solid var(--color-gray-300)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--color-accent)",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  <ExternalLink size={18} />
                  Official Website
                </a>
              )}

              {popup.officialSNS && (
                <a
                  href={`https://instagram.com/${popup.officialSNS}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    padding: "var(--space-3)",
                    background: "white",
                    border: "1px solid var(--color-gray-300)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--color-accent)",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  <Instagram size={18} />
                  {popup.officialSNS}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "var(--space-3)",
            marginBottom: "var(--space-4)",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setShowReminderModal(true)}
            icon={<Bell size={18} />}
          >
            {reminderSet ? "Reminder Set" : "Set Reminder"}
          </Button>
          <Button variant="primary" fullWidth icon={<MapPin size={18} />}>
            Get Directions
          </Button>
        </div>

        {popup.reservationLink && (
          <Button variant="primary" fullWidth icon={<ExternalLink size={18} />}>
            Make Reservation
          </Button>
        )}
      </div>

      {/* Reminder Modal */}
      {showReminderModal && (
        <>
          <div
            onClick={() => setShowReminderModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 200,
            }}
          />
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "white",
              borderTopLeftRadius: "var(--radius-xl)",
              borderTopRightRadius: "var(--radius-xl)",
              padding: "var(--space-6) var(--space-4)",
              zIndex: 201,
              animation: "slideUp 0.3s",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                marginBottom: "var(--space-4)",
              }}
            >
              <Mascot pose="reminder" size="medium" />
              <h3 style={{ margin: 0 }}>Set a Reminder</h3>
            </div>
            <p
              style={{
                marginBottom: "var(--space-4)",
                color: "var(--color-text-secondary)",
              }}
            >
              Save it and I'll remind you!
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
              }}
            >
              {/* ✅ type 인자 제거 */}
              <Button variant="secondary" onClick={handleReminder}>
                1 day before opening
              </Button>
              <Button variant="secondary" onClick={handleReminder}>
                Morning of opening
              </Button>
              <Button variant="secondary" onClick={handleReminder}>
                2 days before closing
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <>
          <div
            onClick={() => setShowShareModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 200,
            }}
          />
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "white",
              borderTopLeftRadius: "var(--radius-xl)",
              borderTopRightRadius: "var(--radius-xl)",
              padding: "var(--space-6) var(--space-4)",
              zIndex: 201,
              animation: "slideUp 0.3s",
            }}
          >
            <h3 style={{ marginBottom: "var(--space-4)" }}>Share Pop-up</h3>

            <div
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary-bg) 0%, var(--color-lavender) 100%)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-4)",
                marginBottom: "var(--space-4)",
              }}
            >
              <h4 style={{ margin: 0, marginBottom: "var(--space-2)" }}>
                {popup.popupName}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  marginBottom: "var(--space-2)",
                }}
              >
                {formatDateRange(popup.startDate, popup.endDate)} · {popup.area}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-1)",
                }}
              >
                {popup.tags.slice(0, 3).map((tag, i) => (
                  <Badge key={i} variant="reservation" size="small">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button variant="primary" fullWidth>
              Copy Link & Share
            </Button>
          </div>
        </>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--color-gray-900)",
            color: "white",
            padding: "var(--space-3) var(--space-6)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-xl)",
            zIndex: 300,
            animation: "slideUp 0.3s",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          <Mascot pose="success" size="small" />
          <span style={{ fontWeight: 500 }}>
            {saved && !reminderSet ? "Saved!" : "Reminder is set! 🔔"}
          </span>
        </div>
      )}
    </div>
  );
}
