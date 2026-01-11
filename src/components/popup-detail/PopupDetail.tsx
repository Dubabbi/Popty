import { useState } from "react";
import { useParams } from "react-router-dom";
import { Bell, ExternalLink, MapPin } from "lucide-react";

import { calculateDday, formatDateRange } from "@/data/popups";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import type { ViewType } from "@/routes/routes";

import { useBookmarkToggle } from "@/apis/bookmark/useBookmarkToggle";
import { usePopupDetailQuery } from "@/apis/popup/popupDetail";
import { EmptyState } from "./components/EmptyState";
import { PopupHeader } from "./components/PopupHeader";
import { PopupGallery } from "./components/PopupGallery";
import { PopupSummaryCard } from "./components/PopupSummaryCard";
import { PopupTags } from "./components/PopupTags";
import { PopupGoodToKnow } from "./components/PopupGoodToKnow";
import { PopupLinks } from "./components/PopupLinks";
import { ReminderSheet } from "./components/ReminderSheet";
import { ShareSheet } from "./components/ShareSheet";
import { isFreePriceText } from "./utils/popupDetailUtils";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

interface PopupDetailProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export function PopupDetail({ onNavigate, breakpoint }: PopupDetailProps) {
  const { popupId } = useParams<{ popupId: string }>();

  const bookmarkToggle = useBookmarkToggle();

  const [reminderSet, setReminderSet] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const detail = usePopupDetailQuery(popupId ?? "");

  if (detail.isError) {
    return (
      <EmptyState title="Failed to load" actionLabel="Retry" onAction={() => detail.refetch()} />
    );
  }

  const popup = detail.data;

  if (!popup) {
    return null;
  }

  const dday = calculateDday(popup.endDate);
  const isFree = isFreePriceText(popup.priceText);
  const saved = popup.bookmarked;
  const locationText = popup.address ?? `${popup.regionNameKo} (주소 정보 없음)`;

  const handleToggleSave = () => {
    if (bookmarkToggle.isPending) return;
    bookmarkToggle.mutate({ popupId: popup.id, next: !saved });
  };

  const handlePickReminder = () => {
    setReminderSet(true);
    setShowReminderModal(false);
    // TODO: 실제 알림 로직(서버 저장/푸시 등)
  };

  const shareMetaLine = `${formatDateRange(popup.startDate, popup.endDate)} · ${popup.regionNameKo}`;

  const handleCopyShareLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShowShareModal(false);
      // TODO: 토스트 연결
    } catch {
      // clipboard 실패 시 fallback(선택)
      setShowShareModal(false);
    }
  };

  return (
    <div style={{ paddingBottom: "var(--space-8)" }}>
      <PopupHeader
        onBack={() => onNavigate("home")}
        onOpenShare={() => setShowShareModal(true)}
        onToggleSave={handleToggleSave}
        saved={saved}
        saving={bookmarkToggle.isPending}
      />

      <PopupGallery title={popup.title} images={popup.images} breakpoint={breakpoint} />

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
            {dday > 0 && dday <= 3 ? <Badge variant="dday">D-{dday} Ending Soon!</Badge> : null}
            {popup.trending ? <Badge variant="trending">🔥 Trending</Badge> : null}
            {popup.isNew ? <Badge variant="new">NEW</Badge> : null}
            {isFree ? <Badge variant="free">Free Entry</Badge> : null}
          </div>
          <h2 style={{ margin: 0, marginBottom: "var(--space-2)" }}>{popup.title}</h2>
        </div>

        <PopupSummaryCard
          durationText={formatDateRange(popup.startDate, popup.endDate)}
          hoursText={null}
          locationText={locationText}
          priceText={popup.priceText}
        />

        {/* Description */}
        <div style={{ marginBottom: "var(--space-6)" }}>
          <h4 style={{ marginBottom: "var(--space-2)" }}>About</h4>

          <div
            style={{
              lineHeight: 1.6,
              color: "var(--color-text-secondary)",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
              components={{
                code: ({ className, children, ...props }) => {
                  const isBlock = Boolean(className);

                  if (!isBlock) {
                    return (
                      <code
                        {...props}
                        style={{
                          background: "var(--color-bg-tertiary)",
                          padding: "0.1rem 0.3rem",
                          borderRadius: "0.4rem",
                        }}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <pre
                      style={{
                        background: "var(--color-bg-tertiary)",
                        padding: "var(--space-3)",
                        borderRadius: "var(--radius-md)",
                        overflowX: "auto",
                      }}
                    >
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },
              }}
            >
              {popup.descriptionMd ?? "설명 정보 없음"}
            </ReactMarkdown>
          </div>
        </div>

        <PopupTags tags={popup.tags} />

        <PopupGoodToKnow transitInfo={popup.transitInfo} parkingInfo={popup.parkingInfo} />

        <PopupLinks
          websiteUrl={popup.websiteUrl}
          instagramUrl={popup.instagramUrl}
          naverMapUrl={popup.naverMapUrl}
        />

        {/* Actions */}
        <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
          <Button
            variant="secondary"
            onClick={() => setShowReminderModal(true)}
            icon={<Bell size={18} />}
          >
            {reminderSet ? "Reminder Set" : "Set Reminder"}
          </Button>

          <Button
            variant="primary"
            fullWidth
            icon={<MapPin size={18} />}
            onClick={() => {
              if (popup.naverMapUrl) window.open(popup.naverMapUrl, "_blank", "noreferrer");
            }}
          >
            Get Directions
          </Button>
        </div>

        {/* 예약 링크가 따로 없으니, 필요하면 websiteUrl로 대체 */}
        {popup.websiteUrl &&
        popup.reservationOnlineText &&
        popup.reservationOnlineText !== "없음" ? (
          <Button
            variant="primary"
            fullWidth
            icon={<ExternalLink size={18} />}
            onClick={() => window.open(popup.websiteUrl!, "_blank", "noreferrer")}
          >
            Make Reservation
          </Button>
        ) : null}
      </div>

      <ReminderSheet
        open={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        onPick={() => handlePickReminder()}
      />

      <ShareSheet
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={popup.title}
        metaLine={shareMetaLine}
        tags={popup.tags ?? []}
        onCopyLink={handleCopyShareLink}
      />
    </div>
  );
}
