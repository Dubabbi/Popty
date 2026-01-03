import { Mail, MessageCircle, Phone } from "lucide-react";
import type { ContactMethod } from "../types/help";

export const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: "이메일",
    value: "support@popup.app",
    color: "#A3B9FF",
    gradient: "linear-gradient(135deg, #C4E5FF 0%, #A3B9FF 100%)",
  },
  {
    icon: MessageCircle,
    label: "카카오톡",
    value: "@popup_official",
    color: "#FFD4B8",
    gradient: "linear-gradient(135deg, #FFE4D4 0%, #FFD4B8 100%)",
  },
  {
    icon: Phone,
    label: "전화",
    value: "1234-5678",
    color: "#B8F0D9",
    gradient: "linear-gradient(135deg, #C8FFE9 0%, #B8F0D9 100%)",
  },
];
