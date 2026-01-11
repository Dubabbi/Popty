import { useMemo, useState } from "react";
import {
  formatDateRange,
  getDaysInMonth,
} from "@/components/my/report-popup/utils/date-range-picker";
import {
  animationsCss,
  backdropStyle,
  wrapperStyle,
} from "@/components/my/report-popup/styles/date-range-picker";

import TriggerButton from "@/components/my/report-popup/parts/TriggerButton";
import CalendarDropdown from "@/components/my/report-popup/parts/CalendarDropdown";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onOpen?: () => void;
}

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onOpen,
}: DateRangePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);

  const handlePickDay = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      onStartDateChange(date);
      onEndDateChange(null);
      return;
    }

    if (date < startDate) {
      onStartDateChange(date);
      onEndDateChange(null);
      return;
    }

    onEndDateChange(date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => onOpen?.());
        });
      }
      return next;
    });
  };

  return (
    <div style={wrapperStyle}>
      <TriggerButton
        isOpen={isOpen}
        label={formatDateRange(startDate, endDate)}
        hasStart={!!startDate}
        onToggle={handleToggle}
      />

      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} style={backdropStyle} />

          <CalendarDropdown
            currentMonth={currentMonth}
            days={days}
            startDate={startDate}
            endDate={endDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onPickDay={handlePickDay}
            onReset={() => {
              onStartDateChange(null);
              onEndDateChange(null);
            }}
            onConfirm={() => setIsOpen(false)}
          />

          <style>{animationsCss}</style>
        </>
      )}
    </div>
  );
};

export default DateRangePicker;
