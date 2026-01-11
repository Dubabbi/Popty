import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DAYS_OF_WEEK,
  isInRange,
  isSameDay,
  isToday,
  monthLabel,
} from "@/components/my/report-popup/utils/date-range-picker";
import {
  actionsStyle,
  confirmButtonStyle,
  daysGridStyle,
  dropdownStyle,
  monthNavButtonStyle,
  monthNavStyle,
  resetButtonStyle,
  weekHeaderStyle,
} from "@/components/my/report-popup/styles/date-range-picker";

type DropdownProps = {
  currentMonth: Date;
  days: (Date | null)[];
  startDate: Date | null;
  endDate: Date | null;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPickDay: (date: Date) => void;
  onReset: () => void;
  onConfirm: () => void;
};

const CalendarDropdown = ({
  currentMonth,
  days,
  startDate,
  endDate,
  onPrevMonth,
  onNextMonth,
  onPickDay,
  onReset,
  onConfirm,
}: DropdownProps) => {
  return (
    <div style={dropdownStyle}>
      {/* Month Navigation */}
      <div style={monthNavStyle}>
        <button onClick={onPrevMonth} style={monthNavButtonStyle}>
          <ChevronLeft size={18} color="#000" />
        </button>

        <div style={{ fontWeight: 700, fontSize: "1.063rem" }}>{monthLabel(currentMonth)}</div>

        <button onClick={onNextMonth} style={monthNavButtonStyle}>
          <ChevronRight size={18} color="#000" />
        </button>
      </div>

      {/* Days of Week */}
      <div style={weekHeaderStyle}>
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontSize: "0.813rem",
              fontWeight: 600,
              color:
                index === 0 ? "#FF6B85" : index === 6 ? "#A3B9FF" : "var(--color-text-tertiary)",
              padding: "var(--space-2) 0",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div style={daysGridStyle}>
        {days.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} />;

          const isStart = isSameDay(day, startDate);
          const isEnd = isSameDay(day, endDate);
          const inRange = isInRange(day, startDate, endDate);
          const today = isToday(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => onPickDay(day)}
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

      {/* Actions */}
      <div style={actionsStyle}>
        <button onClick={onReset} style={resetButtonStyle}>
          초기화
        </button>
        <button onClick={onConfirm} style={confirmButtonStyle}>
          확인
        </button>
      </div>
    </div>
  );
};

export default CalendarDropdown;
