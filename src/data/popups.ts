export interface Popup {
  id: string;
  popupName: string;
  category: "Goods" | "Exhibition" | "Beauty" | "Food" | "Fashion" | "Character";
  startDate: string;
  endDate: string;
  address: string;
  area: "Seongsu" | "Hongdae" | "Gangnam" | "Yeouido" | "Others";
  openHours: string;
  reservationRequired: boolean;
  entryFee: "free" | "paid";
  entryFeeAmount?: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  description: string;
  mapUrl?: string;
  officialLink?: string;
  officialSNS?: string;
  reservationLink?: string;
  crowdLevel?: "low" | "medium" | "high";
  queueInfo?: string;
  parkingInfo?: string;
  latitude?: number;
  longitude?: number;
  trending?: boolean;
  isNew?: boolean;
  views?: number;
}

export const popupsData: Popup[] = [
  {
    id: "1",
    popupName: "빤쮸토끼(오판츄우사기) 성수 팝업스토어",
    category: "Character",
    startDate: "2025-12-12",
    endDate: "2026-01-18",
    address: "서울 성동구 성수동2가 289-10 (LINE FRIENDS SQUARE 성수)",
    area: "Seongsu",
    openHours: "운영시간은 현장/공식 안내 확인",
    reservationRequired: false,
    entryFee: "free",
    tags: ["캐릭터", "굿즈", "포토존", "성수"],
    thumbnail: "img1",
    images: ["img1"],
    description:
      "빤쮸토끼(오판츄우사기) 굿즈/전시 중심의 성수 팝업. 상세 운영 방식(입장/대기)은 공식 공지 확인 권장.",
    trending: true,
    isNew: true,
  },

  {
    id: "2",
    popupName: "젤리캣(JELLYCAT) 팝업스토어",
    category: "Goods",
    startDate: "2025-11-05",
    endDate: "2025-12-28",
    address: "서울 성동구 연무장길 18 1층 (성수 SW19)",
    area: "Seongsu",
    openHours: "운영시간은 현장/공식 안내 확인",
    reservationRequired: false,
    entryFee: "free",
    tags: ["인형", "굿즈", "포토존", "성수"],
    thumbnail: "img2",
    images: ["img2"],
    description:
      "젤리캣 성수 팝업. 굿즈 구매/전시형 이벤트로 운영되는 경우가 많아 대기/재고는 현장 상황에 따라 변동.",
    trending: true,
  },

  {
    id: "3",
    popupName: "산리오 스위트 홀리데이 팝업",
    category: "Character",
    startDate: "2025-12-05",
    endDate: "2025-12-28",
    address: "에스팩토리 D동 인근 (성수)",
    area: "Seongsu",
    openHours: "운영시간은 현장/공식 안내 확인",
    reservationRequired: false,
    entryFee: "free",
    tags: ["산리오", "캐릭터", "포토존", "성수"],
    thumbnail: "img3",
    images: ["img3"],
    description:
      "성수 에스팩토리 인근에서 운영된 산리오 테마 팝업. 상세 위치/입장 방식은 공식 공지 확인 권장.",
    trending: true,
  },

  {
    id: "4",
    popupName: "올리브영 어워즈&페스타 2025 팝업",
    category: "Beauty",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
    address: "올리브영N 성수 / 팩토리얼 성수",
    area: "Seongsu",
    openHours: "운영시간은 현장/공식 안내 확인",
    reservationRequired: false,
    entryFee: "free",
    tags: ["뷰티", "체험", "성수", "이벤트"],
    thumbnail: "img4",
    images: ["img4"],
    description:
      "올리브영 어워즈&페스타 시즌 성수 팝업. 체험/전시/프로모션 구성은 기간별로 변동될 수 있음.",
    trending: true,
  },

  {
    id: "5",
    popupName: "루이까또즈(Louis Quatorze) 성수 팝업",
    category: "Fashion",
    startDate: "2025-12-16",
    endDate: "2025-12-28",
    address: "서울 성동구 아차산로17길 48 (성수 플라츠2)",
    area: "Seongsu",
    openHours: "운영시간은 현장/공식 안내 확인",
    reservationRequired: false,
    entryFee: "free",
    tags: ["패션", "가방", "성수", "팝업"],
    thumbnail: "img5",
    images: ["img5"],
    description: "성수 플라츠2에서 진행된 루이까또즈 팝업. 상품/프로모션/재고는 현장 운영 기준.",
    isNew: true,
  },

  {
    id: "6",
    popupName: "TOPS CONNECT SHOP (무신사 스퀘어 성수)",
    category: "Fashion",
    startDate: "2025-12-12",
    endDate: "2025-12-31",
    address: "서울 성동구 연무장길 81 (무신사 스퀘어 성수)",
    area: "Seongsu",
    openHours: "운영시간은 현장/공식 안내 확인",
    reservationRequired: false,
    entryFee: "free",
    tags: ["패션", "무신사", "성수", "팝업"],
    thumbnail: "img6",
    images: ["img6"],
    description:
      "무신사 스퀘어 성수에서 운영된 TOPS 팝업. 드롭/프로모션 여부는 공식 채널 확인 권장.",
  },

  {
    id: "7",
    popupName: "타바스코 그랜드 오프닝 레스토랑 위크",
    category: "Food",
    startDate: "2025-12-12",
    endDate: "2025-12-21",
    address: "서울 성동구 연무장길 18 2층 (LITTLE ISLAND)",
    area: "Seongsu",
    openHours: "운영시간은 매장/행사 안내 확인",
    reservationRequired: false,
    entryFee: "free",
    tags: ["푸드", "기간한정", "성수", "콜라보"],
    thumbnail: "img7",
    images: ["img7"],
    description:
      "리틀아일랜드에서 진행된 타바스코 캠페인형 기간 행사. 메뉴 이용은 유료일 수 있어 현장 안내 확인 권장.",
  },

  {
    id: "8",
    popupName: "곰돌찡·토끼찡 ‘유미어스(YUMEARS)’ 팝업스토어",
    category: "Character",
    startDate: "2025-11-20",
    endDate: "2025-12-03",
    address: "더현대 서울 지하2층 (서울 영등포구 여의대로 108)",
    area: "Yeouido",
    openHours: "백화점 운영시간 기준 (현장 안내 확인)",
    reservationRequired: false,
    entryFee: "free",
    tags: ["캐릭터", "굿즈", "더현대서울", "여의도"],
    thumbnail: "img8",
    images: ["img8"],
    description:
      "곰돌찡·토끼찡 캐릭터 굿즈 중심 팝업. 대기/입장 방식은 현장 운영에 따라 달라질 수 있음.",
    trending: true,
  },

  {
    id: "9",
    popupName: "‘힙한 불교’ 신년 맞이 팝업 (해탈컴퍼니×아미울)",
    category: "Goods",
    startDate: "2025-12-31",
    endDate: "2026-01-07",
    address: "아이파크몰 용산점 리빙파크 3층 ‘더 팝업’ (서울 용산구)",
    area: "Others",
    openHours: "몰 운영시간 기준 (현장 안내 확인)",
    reservationRequired: false,
    entryFee: "free",
    tags: ["굿즈", "신년", "용산", "아이파크몰"],
    thumbnail: "img9",
    images: ["img9"],
    description: "아이파크몰 용산에서 열린 신년 시즌 팝업. 굿즈/프로모션 구성은 현장 운영 기준.",
    isNew: true,
    trending: true,
  },
];

export const savedPopupIds: string[] = ["1", "4", "12"];

export const getPopupById = (id: string): Popup | undefined => {
  return popupsData.find((popup) => popup.id === id);
};

export const getTrendingPopups = (): Popup[] => {
  return popupsData.filter((popup) => popup.trending).slice(0, 5);
};

export const getEndingSoonPopups = (): Popup[] => {
  const now = new Date();
  return popupsData
    .filter((popup) => {
      const endDate = new Date(popup.endDate);
      const daysUntilEnd = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilEnd > 0 && daysUntilEnd <= 7;
    })
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(0, 4);
};

export const getNewPopups = (): Popup[] => {
  return popupsData.filter((popup) => popup.isNew).slice(0, 4);
};

export const calculateDday = (endDate: string): number => {
  const now = new Date();
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

export const isOpenToday = (startDate: string): boolean => {
  const now = new Date();
  const start = new Date(startDate);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  return today.getTime() === startDay.getTime();
};

export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}.${day}`;
  };

  return `${formatDate(start)} - ${formatDate(end)}`;
};
