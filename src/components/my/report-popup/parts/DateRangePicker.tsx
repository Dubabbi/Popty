import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onOpen?: () => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onOpen,
}: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day));
    return days;
  };

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isRangeStart = (date: Date) => isSameDay(date, startDate);
  const isRangeEnd = (date: Date) => isSameDay(date, endDate);

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      onStartDateChange(date);
      onEndDateChange(null);
    } else if (date < startDate) {
      onStartDateChange(date);
      onEndDateChange(null);
    } else {
      onEndDateChange(date);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const formatDateRange = () => {
    if (!startDate) return "날짜를 선택해주세요";
    const startStr = `${startDate.getMonth() + 1}/${startDate.getDate()}`;
    if (!endDate) return `${startStr} ~ ?`;
    const endStr = `${endDate.getMonth() + 1}/${endDate.getDate()}`;
    return `${startStr} ~ ${endStr}`;
  };

  const isToday = (date: Date) => isSameDay(date, new Date());

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => {
          setIsOpen((prev) => {
            const next = !prev;

            if (next) {
              // ✅ 열릴 때만: DOM 반영 후 스크롤 콜백
              requestAnimationFrame(() => {
                requestAnimationFrame(() => onOpen?.());
              });
            }

            return next;
          });
        }}
        style={{
          width: "100%",
          padding: "var(--space-4)",
          paddingLeft: 48,
          border: `2px solid ${isOpen ? "#D9F95F" : "rgba(0, 0, 0, 0.08)"}`,
          borderRadius: "var(--radius-xl)",
          fontSize: "1rem",
          background: "white",
          cursor: "pointer",
          transition: "all 0.3s ease",
          textAlign: "left",
          position: "relative",
          color: startDate ? "#000" : "var(--color-text-tertiary)",
          fontWeight: startDate ? 600 : 400,
          boxShadow: isOpen ? "0 0 0 4px rgba(217, 249, 95, 0.1)" : "none",
        }}
      >
        <Calendar
          size={20}
          color={isOpen ? "#000" : "var(--color-text-tertiary)"}
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        {formatDateRange()}
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              background: "white",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 12px 48px rgba(0, 0, 0, 0.16)",
              padding: "var(--space-4)",
              zIndex: 999,
              animation: "calendarSlideIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
              border: "2px solid #D9F95F",
            }}
          >
            {/* Month Navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "var(--space-4)",
                padding: "0 var(--space-2)",
              }}
            >
              <button
                onClick={goToPreviousMonth}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  background: "rgba(217, 249, 95, 0.15)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronLeft size={18} color="#000" />
              </button>

              <div style={{ fontWeight: 700, fontSize: "1.063rem" }}>
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </div>

              <button
                onClick={goToNextMonth}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  background: "rgba(217, 249, 95, 0.15)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronRight size={18} color="#000" />
              </button>
            </div>

            {/* Days of Week */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "var(--space-1)",
                marginBottom: "var(--space-2)",
              }}
            >
              {daysOfWeek.map((day, index) => (
                <div
                  key={day}
                  style={{
                    textAlign: "center",
                    fontSize: "0.813rem",
                    fontWeight: 600,
                    color:
                      index === 0
                        ? "#FF6B85"
                        : index === 6
                          ? "#A3B9FF"
                          : "var(--color-text-tertiary)",
                    padding: "var(--space-2) 0",
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
                gap: "var(--space-1)",
              }}
            >
              {days.map((day, index) => {
                if (!day) return <div key={`empty-${index}`} />;

                const isStart = isRangeStart(day);
                const isEnd = isRangeEnd(day);
                const inRange = isInRange(day);
                const today = isToday(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => handleDateClick(day)}
                    style={{
                      aspectRatio: "1",
                      border: "none",
                      borderRadius:
                        isStart || isEnd ? "var(--radius-md)" : inRange ? "0" : "var(--radius-md)",
                      background:
                        isStart || isEnd
                          ? "#D9F95F"
                          : inRange
                            ? "rgba(217, 249, 95, 0.2)"
                            : "transparent",
                      cursor: "pointer",
                      fontSize: "0.938rem",
                      fontWeight: isStart || isEnd ? 700 : today ? 600 : 400,
                      color: isStart || isEnd ? "#000" : today ? "#D9F95F" : "#000",
                      position: "relative",
                      boxShadow: isStart || isEnd ? "0 2px 8px rgba(217, 249, 95, 0.4)" : "none",
                    }}
                  >
                    {day.getDate()}
                    {today && !isStart && !isEnd && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 4,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: "#D9F95F",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-2)" }}>
              <button
                onClick={() => {
                  onStartDateChange(null);
                  onEndDateChange(null);
                }}
                style={{
                  flex: 1,
                  padding: "var(--space-3)",
                  border: "2px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "var(--radius-lg)",
                  background: "white",
                  fontSize: "0.938rem",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                }}
              >
                초기화
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  flex: 1,
                  padding: "var(--space-3)",
                  border: "none",
                  borderRadius: "var(--radius-lg)",
                  background: "#D9F95F",
                  fontSize: "0.938rem",
                  fontWeight: 700,
                  color: "#000",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(217, 249, 95, 0.3)",
                }}
              >
                확인
              </button>
            </div>
          </div>

          <style>{`
            @keyframes calendarSlideIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
