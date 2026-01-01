import { useMemo, useState } from "react";
import { Bell, Calendar as CalendarIcon } from "lucide-react";
import { PopupCard } from "@/components/PopupCard";
import { Badge } from "@/components/Badge";
import { Mascot } from "@/components/Mascot";
import { popupsData, savedPopupIds } from "@/data/popups";
import type { ViewType } from "@/routes/routes";

interface SavedProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
}

interface Reminder {
  popupId: string;
  type: "1-day-before" | "morning-of" | "2-days-before-closing";
  enabled: boolean;
}

const INITIAL_REMINDERS: Reminder[] = [
  { popupId: "1", type: "1-day-before", enabled: true },
  { popupId: "4", type: "morning-of", enabled: true },
  { popupId: "12", type: "2-days-before-closing", enabled: true },
];

function getDiffDays(endDate: string) {
  const end = new Date(endDate);
  const now = new Date();
  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function reminderLabel(type: Reminder["type"]) {
  if (type === "1-day-before") return "1 day before";
  if (type === "morning-of") return "Morning of opening";
  return "2 days before closing";
}

export function Saved({ onNavigate }: SavedProps) {
  const [savedIds, setSavedIds] = useState<string[]>(savedPopupIds);

  const reminders = useMemo(() => INITIAL_REMINDERS, []);

  const savedPopups = useMemo(
    () => popupsData.filter((p) => savedIds.includes(p.id)),
    [savedIds],
  );

  // Group by timeline
  const thisWeek = useMemo(
    () =>
      savedPopups.filter((p) => {
        const diffDays = getDiffDays(p.endDate);
        return diffDays >= 0 && diffDays <= 7;
      }),
    [savedPopups],
  );

  const nextWeek = useMemo(
    () =>
      savedPopups.filter((p) => {
        const diffDays = getDiffDays(p.endDate);
        return diffDays > 7 && diffDays <= 14;
      }),
    [savedPopups],
  );

  const later = useMemo(
    () =>
      savedPopups.filter((p) => {
        const diffDays = getDiffDays(p.endDate);
        return diffDays > 14;
      }),
    [savedPopups],
  );

  const getReminderForPopup = (popupId: string) => {
    return reminders.find((r) => r.popupId === popupId);
  };

  const handleUnsave = (popupId: string) => {
    setSavedIds((prev) => prev.filter((id) => id !== popupId));
  };

  if (savedPopups.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-16) var(--space-4)",
          textAlign: "center",
        }}
      >
        <Mascot pose="empty" size="large" />
        <h3
          style={{
            marginTop: "var(--space-6)",
            marginBottom: "var(--space-2)",
          }}
        >
          No saved pop-ups yet
        </h3>
        <p
          style={{
            color: "var(--color-text-tertiary)",
            marginBottom: "var(--space-6)",
            maxWidth: 320,
          }}
        >
          Start exploring and save your favorites! I'll remind you so you never
          miss them. 💫
        </p>
        <button
          onClick={() => onNavigate("browse")}
          style={{
            padding: "var(--space-3) var(--space-6)",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-accent)",
            color: "white",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "var(--shadow-md)",
          }}
          type="button"
        >
          Explore Pop-ups
        </button>
      </div>
    );
  }

  const enabledReminderCount = reminders.filter((r) => r.enabled).length;

  return (
    <div style={{ paddingBottom: "var(--space-8)" }}>
      {/* Header */}
      <div
        style={{
          padding: "var(--space-4)",
          background: "var(--color-primary-bg)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            marginBottom: "var(--space-2)",
          }}
        >
          <Mascot pose="reminder" size="medium" />
          <div>
            <h3 style={{ margin: 0 }}>Your Saved Pop-ups</h3>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
              }}
            >
              {savedPopups.length} saved · {enabledReminderCount} reminders set
            </p>
          </div>
        </div>
      </div>

      {/* This Week */}
      {thisWeek.length > 0 && (
        <section style={{ padding: "var(--space-6) var(--space-4)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              marginBottom: "var(--space-4)",
            }}
          >
            <CalendarIcon size={20} color="var(--color-error)" />
            <h4 style={{ margin: 0 }}>This Week</h4>
            <Badge variant="ending">{thisWeek.length}</Badge>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {thisWeek.map((popup) => {
              const reminder = getReminderForPopup(popup.id);
              return (
                <div key={popup.id}>
                  <PopupCard
                    popup={popup}
                    onClick={() => onNavigate("detail", popup.id)}
                    layout="list"
                    isSaved
                    onSaveToggle={() => handleUnsave(popup.id)}
                  />
                  {reminder?.enabled && (
                    <div
                      style={{
                        marginTop: "var(--space-2)",
                        padding: "var(--space-2) var(--space-3)",
                        background: "var(--color-peach)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        fontSize: "0.875rem",
                      }}
                    >
                      <Bell size={14} />
                      <span>Reminder: {reminderLabel(reminder.type)}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Next Week */}
      {nextWeek.length > 0 && (
        <section style={{ padding: "0 var(--space-4) var(--space-6)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              marginBottom: "var(--space-4)",
            }}
          >
            <CalendarIcon size={20} color="var(--color-accent)" />
            <h4 style={{ margin: 0 }}>Next Week</h4>
            <Badge variant="reminder">{nextWeek.length}</Badge>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {nextWeek.map((popup) => {
              const reminder = getReminderForPopup(popup.id);
              return (
                <div key={popup.id}>
                  <PopupCard
                    popup={popup}
                    onClick={() => onNavigate("detail", popup.id)}
                    layout="list"
                    isSaved
                    onSaveToggle={() => handleUnsave(popup.id)}
                  />
                  {reminder?.enabled && (
                    <div
                      style={{
                        marginTop: "var(--space-2)",
                        padding: "var(--space-2) var(--space-3)",
                        background: "var(--color-peach)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        fontSize: "0.875rem",
                      }}
                    >
                      <Bell size={14} />
                      <span>Reminder: {reminderLabel(reminder.type)}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {later.length > 0 && (
        <section style={{ padding: "0 var(--space-4) var(--space-6)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              marginBottom: "var(--space-4)",
            }}
          >
            <CalendarIcon size={20} color="var(--color-text-tertiary)" />
            <h4 style={{ margin: 0 }}>Later</h4>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {later.map((popup) => (
              <PopupCard
                key={popup.id}
                popup={popup}
                onClick={() => onNavigate("detail", popup.id)}
                layout="list"
                isSaved
                onSaveToggle={() => handleUnsave(popup.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
