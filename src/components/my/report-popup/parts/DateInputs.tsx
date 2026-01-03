import { DateRangePicker } from "@/components/my/report-popup/parts/DateRangePicker";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onStartChange: (date: Date | null) => void;
  onEndChange: (date: Date | null) => void;
};

export function DateInputs({ startDate, endDate, onStartChange, onEndChange }: Props) {
  return (
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
        기간 *
      </label>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartChange}
        onEndDateChange={onEndChange}
      />
    </div>
  );
}
