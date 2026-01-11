import { Calendar } from "lucide-react";
import {
  calendarIconStyle,
  triggerButtonStyle,
} from "@/components/my/report-popup/styles/date-range-picker";

type TriggerProps = {
  isOpen: boolean;
  label: string;
  hasStart: boolean;
  onToggle: () => void;
};

const TriggerButton = ({ isOpen, label, hasStart, onToggle }: TriggerProps) => {
  return (
    <button onClick={onToggle} style={triggerButtonStyle(isOpen, hasStart)}>
      <Calendar
        size={20}
        color={isOpen ? "#000" : "var(--color-text-tertiary)"}
        style={calendarIconStyle}
      />
      {label}
    </button>
  );
};

export default TriggerButton;
