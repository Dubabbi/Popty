import { useState } from "react";
import { X } from "lucide-react";
import { FilterChip } from "./FilterChip";
import { Button } from "./Button";

interface FilterModalProps {
  onClose: () => void;
  onApply: (filters: {
    areas: string[];
    categories: string[];
    tags: string[];
    time: string;
  }) => void;
  initialFilters?: {
    areas?: string[];
    categories?: string[];
    tags?: string[];
    time?: string;
  };
}

export function FilterModal({ onClose, onApply, initialFilters = {} }: FilterModalProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(initialFilters.areas || []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters.categories || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(initialFilters.tags || []);
  const [selectedTime, setSelectedTime] = useState<string>(initialFilters.time || "");

  const areas = ["Seongsu", "Hongdae", "Gangnam", "Yeouido", "Others"];
  const categories = ["Goods", "Exhibition", "Beauty", "Food", "Fashion", "Character"];
  const tags = [
    "Reservation Required",
    "Free Entry",
    "Kid-friendly",
    "Photo Zone",
    "Limited Edition",
  ];
  const timeOptions = ["Today", "This Week", "This Month", "Custom Range"];

  const toggleSelection = (item: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleReset = () => {
    setSelectedAreas([]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedTime("");
  };

  const handleApply = () => {
    onApply({
      areas: selectedAreas,
      categories: selectedCategories,
      tags: selectedTags,
      time: selectedTime,
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 200,
          animation: "fadeIn 0.2s",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          borderTopLeftRadius: "var(--radius-xl)",
          borderTopRightRadius: "var(--radius-xl)",
          maxHeight: "80vh",
          overflowY: "auto",
          zIndex: 201,
          animation: "slideUp 0.3s",
        }}
      >
        {/* Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "white",
            borderBottom: "1px solid var(--color-gray-200)",
            padding: "var(--space-4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <h3 style={{ margin: 0 }}>Filters</h3>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "var(--radius-full)",
              background: "var(--color-gray-100)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Content */}
        <div style={{ padding: "var(--space-4)" }}>
          {/* Area */}
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h4 style={{ marginBottom: "var(--space-3)" }}>Area</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {areas.map((area) => (
                <FilterChip
                  key={area}
                  label={area}
                  selected={selectedAreas.includes(area)}
                  onClick={() => toggleSelection(area, selectedAreas, setSelectedAreas)}
                />
              ))}
            </div>
          </div>

          {/* Time */}
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h4 style={{ marginBottom: "var(--space-3)" }}>Time</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {timeOptions.map((time) => (
                <FilterChip
                  key={time}
                  label={time}
                  selected={selectedTime === time}
                  onClick={() => setSelectedTime(selectedTime === time ? "" : time)}
                />
              ))}
            </div>
          </div>

          {/* Category */}
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h4 style={{ marginBottom: "var(--space-3)" }}>Category</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {categories.map((category) => (
                <FilterChip
                  key={category}
                  label={category}
                  selected={selectedCategories.includes(category)}
                  onClick={() =>
                    toggleSelection(category, selectedCategories, setSelectedCategories)
                  }
                />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h4 style={{ marginBottom: "var(--space-3)" }}>Tags</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {tags.map((tag) => (
                <FilterChip
                  key={tag}
                  label={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleSelection(tag, selectedTags, setSelectedTags)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            background: "white",
            borderTop: "1px solid var(--color-gray-200)",
            padding: "var(--space-4)",
            display: "flex",
            gap: "var(--space-3)",
          }}
        >
          <Button variant="secondary" size="medium" onClick={handleReset} fullWidth>
            Reset
          </Button>
          <Button variant="primary" size="medium" onClick={handleApply} fullWidth>
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
}
