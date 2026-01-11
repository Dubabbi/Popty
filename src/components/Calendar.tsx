import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PopupCard } from "@/components/popup-card/PopupCard";
import type { PopupCardItem } from "@/components/popup-card/PopupCard";
import type { ViewType } from "@/routes/routes";
import { REGION_ZONE_LABEL_KO } from "@/data/popupList";

import {
  usePopupCalendarMarkersQuery,
  usePopupsOnDateQuery,
  type PopupOnDateRow,
} from "@/apis/calendar/calendar";

interface CalendarProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

type RegionZoneCode = keyof typeof REGION_ZONE_LABEL_KO | "OTHERS";
function isRegionZoneCode(v: unknown): v is RegionZoneCode {
  if (v === "OTHERS") return true;
  return typeof v === "string" && v in REGION_ZONE_LABEL_KO;
}

// ✅ 타임존 이슈 방지용: Date -> YYYY-MM-DD (local 기준)
function formatDateYMD(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function formatMonthFirstDay(d: Date): string {
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-01`;
}

function toPopupCardItemFromRow(row: PopupOnDateRow): PopupCardItem {
  const regionRaw = row.region_zone_code;
  const regionZoneCode: RegionZoneCode = isRegionZoneCode(regionRaw) ? regionRaw : "OTHERS";

  return {
    id: row.id,
    title: row.title ?? "Untitled",
    thumbnailUrl: row.thumbnail_url,
    startDate: row.start_date,
    endDate: row.end_date,
    tags: [],
    regionZoneCode,

    bookmarksCount: row.bookmarks_count ?? 0,
    bookmarked: row.bookmarked ?? false,

    dday: undefined,
  };
}

export function Calendar({ onNavigate, breakpoint }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date(2025, 11, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const regionZoneCode: string | null = null;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const monthFirstDay = useMemo(() => formatMonthFirstDay(currentMonth), [currentMonth]);

  const markersQuery = usePopupCalendarMarkersQuery({
    monthFirstDay,
    regionZoneCode,
  });

  const daysWithPopups = useMemo(() => {
    const set = new Set<string>();
    for (const m of markersQuery.data ?? []) set.add(m.day);
    return set;
  }, [markersQuery.data]);

  const hasPopups = (date: Date | null) => {
    if (!date) return false;
    return daysWithPopups.has(formatDateYMD(date));
  };

  const selectedDateYMD = selectedDate ? formatDateYMD(selectedDate) : null;

  const popupsOnDateQuery = usePopupsOnDateQuery({
    date: selectedDateYMD,
    regionZoneCode,
  });

  const selectedDatePopups = popupsOnDateQuery.data ?? [];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const calendarMaxWidth = breakpoint === "desktop" ? 720 : breakpoint === "tablet" ? 600 : "100%";

  return (
    <>
      {/* Calendar Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "white",
          borderBottom: "1px solid var(--color-gray-200)",
          padding: "var(--space-4)",
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-4)",
          }}
        >
          <button
            onClick={previousMonth}
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-gray-300)",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <h3 style={{ margin: 0, minWidth: "180px", textAlign: "center" }}>{monthName}</h3>

          <button
            onClick={nextMonth}
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-gray-300)",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div style={{ paddingBottom: "var(--space-8)" }}>
        <div style={{ padding: "var(--space-4)" }}>
          <div style={{ maxWidth: calendarMaxWidth, margin: "0 auto" }}>
            {/* Day Headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "var(--space-1)",
                marginBottom: "var(--space-3)",
              }}
            >
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                <div
                  key={day}
                  style={{
                    textAlign: "center",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    color: index === 0 || index === 6 ? "#FF6B6B" : "#000000",
                    padding: "var(--space-2)",
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "var(--space-2)",
                marginBottom: "var(--space-6)",
              }}
            >
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && setSelectedDate(day)}
                  disabled={!day}
                  style={{
                    aspectRatio: "1",
                    borderRadius: "var(--radius-sm)",
                    border: "none",
                    background: !day ? "transparent" : isSelected(day) ? "#E8F4FF" : "transparent",
                    color: !day
                      ? "transparent"
                      : isSelected(day)
                        ? "#4A90E2"
                        : isToday(day)
                          ? "#000000"
                          : "#9B9B9B",
                    cursor: day ? "pointer" : "default",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: isSelected(day) ? 600 : 400,
                    fontSize: "0.9375rem",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (day && !isSelected(day)) e.currentTarget.style.background = "#F5F5F5";
                  }}
                  onMouseLeave={(e) => {
                    if (day && !isSelected(day)) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {day && (
                    <>
                      <span>{day.getDate()}</span>

                      {hasPopups(day) && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: 4,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            gap: 2,
                          }}
                        >
                          <div
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: isSelected(day) ? "#4A90E2" : "var(--color-primary)",
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </button>
              ))}
            </div>

            {/* Selected Date Pop-ups */}
            {selectedDate && popupsOnDateQuery.isLoading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "var(--space-8)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                <p>Loading...</p>
              </div>
            )}

            {selectedDate && !popupsOnDateQuery.isLoading && selectedDatePopups.length > 0 && (
              <div>
                <h4 style={{ marginBottom: "var(--space-3)" }}>
                  Pop-ups on{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                  {selectedDatePopups.map((row) => {
                    const item = toPopupCardItemFromRow(row);
                    return (
                      <PopupCard
                        key={item.id}
                        popup={item}
                        onClick={() => onNavigate("detail", item.id)}
                        layout="list"
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {selectedDate && !popupsOnDateQuery.isLoading && selectedDatePopups.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "var(--space-8)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                <p>No pop-ups on this date</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
