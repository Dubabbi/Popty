export type RegionZoneCode =
  | "JAMSIL"
  | "SEONGSU"
  | "YEOUIDO"
  | "HONGDAE"
  | "GANGNAM"
  | "YONGSAN"
  | "OTHERS"
  | (string & {});

export type CategoryCode =
  | "ANIME"
  | "BEAUTY"
  | "CHARACTER"
  | "DESSERT"
  | "ETC"
  | "FASHION"
  | "FOOD"
  | "GAME"
  | "IDOL"
  | "LIVING"
  | "MOVIE"
  | "TECH"
  | "WEBTOON"
  | (string & {});

export type PopupListItem = {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  startDate: string;
  endDate: string;
  address: string | null;
  regionZoneCode: RegionZoneCode | null;
  tags: string[];
  bookmarksCount: number;
  createdAt: string;
  dday?: number;
  updatedAt: string;
  bookmarked: boolean;
  lat: number | null;
  lng: number | null;
  regionNameKo?: string;
};

export function parseISODate(d: string): Date {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, day ?? 1);
}

export function formatDateRange(start: string, end: string): string {
  const s = parseISODate(start);
  const e = parseISODate(end);

  const fmt = (x: Date) =>
    `${x.getFullYear()}.${String(x.getMonth() + 1).padStart(2, "0")}.${String(x.getDate()).padStart(2, "0")}`;

  return `${fmt(s)} ~ ${fmt(e)}`;
}

export function calculateDday(endDate: string): number {
  const end = parseISODate(endDate);
  const today = new Date();
  const a = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const b = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  const diff = b - a;
  return Math.ceil(diff / (24 * 60 * 60 * 1000));
}

export function isOpenToday(startDate: string): boolean {
  const start = parseISODate(startDate);
  const today = new Date();
  const a = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const b = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  return a === b;
}

export const REGION_ZONE_LABEL_KO: Record<string, string> = {
  JAMSIL: "잠실",
  SEONGSU: "성수",
  YEOUIDO: "여의도",
  HONGDAE: "홍대",
  GANGNAM: "강남",
  YONGSAN: "용산",
  OTHERS: "기타",
};

export const CATEGORY_LABEL_KO: Record<string, string> = {
  ANIME: "애니",
  BEAUTY: "뷰티",
  CHARACTER: "캐릭터",
  DESSERT: "디저트",
  ETC: "기타",
  FASHION: "의류",
  FOOD: "음식",
  GAME: "게임",
  IDOL: "아이돌",
  LIVING: "리빙",
  MOVIE: "영화",
  TECH: "테크",
  WEBTOON: "웹툰",
};
