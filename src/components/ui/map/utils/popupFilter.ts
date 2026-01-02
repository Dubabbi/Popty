import { popupsData } from "@/data/popups";

type Popup = (typeof popupsData)[number];

export function filterPopups(
  popups: Popup[],
  selectedCategory: string | null,
  searchQuery: string,
) {
  let list = popups;

  if (selectedCategory && selectedCategory !== "All") {
    list = list.filter((p) => p.category === selectedCategory);
  }

  const q = searchQuery.trim().toLowerCase();
  if (q) {
    list = list.filter((p) => {
      const hay = `${p.popupName} ${p.area} ${p.category}`.toLowerCase();
      return hay.includes(q);
    });
  }

  return list;
}
