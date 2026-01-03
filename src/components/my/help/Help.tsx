import { useState } from "react";
import { IntroCard } from "@/components/my/help/parts/IntroCard";
import { Tabs } from "@/components/my/help/parts/Tabs";
import { FAQCategoryFilter } from "@/components/my/help/parts/FAQCategoryFilter";
import { FAQItem } from "@/components/my/help/parts/FAQItem";
import { ContactMethodRow } from "@/components/my/help/parts/ContactMethodRow";
import { OfficeHours } from "@/components/my/help/parts/OfficeHours";
import { CONTACT_METHODS } from "@/components/my/data/contacts";
import { FAQS } from "@/components/my/data/faqs";

export function Help() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq");

  const categories = ["전체", ...Array.from(new Set(FAQS.map((f) => f.category)))];
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredFAQs =
    selectedCategory === "전체" ? FAQS : FAQS.filter((faq) => faq.category === selectedCategory);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
        paddingBottom: "var(--space-8)",
      }}
    >
      {/* Intro */}
      <IntroCard />

      {/* Tabs */}
      <Tabs active={activeTab} onChange={setActiveTab} />

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div style={{ padding: "0 var(--space-4)" }}>
          <FAQCategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            {filteredFAQs.map((faq, idx) => (
              <FAQItem
                key={`${faq.question}-${idx}`}
                faq={faq}
                expanded={expandedFAQ === idx}
                onToggle={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === "contact" && (
        <div style={{ padding: "0 var(--space-4)" }}>
          <p
            style={{
              marginBottom: "var(--space-4)",
              fontSize: "0.938rem",
              color: "var(--color-text-secondary)",
              paddingLeft: "var(--space-2)",
            }}
          >
            편한 방법으로 문의해주세요!
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {CONTACT_METHODS.map((method) => (
              <ContactMethodRow key={method.label} method={method} />
            ))}
          </div>

          <OfficeHours />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
