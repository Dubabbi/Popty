export interface Popup {
  id: string;
  popupName: string;
  brandName: string;
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
    popupName: "Sanrio Characters Café",
    brandName: "Sanrio Korea",
    category: "Character",
    startDate: "2024-12-28",
    endDate: "2025-01-15",
    address: "서울 성동구 성수이로 113",
    area: "Seongsu",
    openHours: "11:00 - 21:00",
    reservationRequired: true,
    entryFee: "paid",
    entryFeeAmount: "₩15,000",
    tags: ["Reservation Required", "Photo Zone", "Limited Menu", "Character", "Kid-friendly"],
    thumbnail: "character-cafe",
    images: ["character-cafe", "character-cafe", "character-cafe"],
    description:
      "Meet your favorite Sanrio characters! Enjoy themed drinks, desserts, and exclusive merchandise in an Instagram-worthy space.",
    officialLink: "https://sanrio-popup.kr",
    officialSNS: "@sanrio_kr",
    reservationLink: "https://naver.me/sanrio-reserve",
    crowdLevel: "high",
    queueInfo: "평일 30분, 주말 1시간 대기 예상",
    parkingInfo: "건물 내 유료 주차 가능 (2시간 무료)",
    latitude: 37.5447,
    longitude: 127.0557,
    trending: true,
    views: 8420,
  },
  {
    id: "2",
    popupName: "Vintage Denim Archive",
    brandName: "Levi's",
    category: "Fashion",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    address: "서울 마포구 홍익로 100",
    area: "Hongdae",
    openHours: "12:00 - 20:00",
    reservationRequired: false,
    entryFee: "free",
    tags: ["Free Entry", "Shopping Available", "Photo Zone", "Limited Edition"],
    thumbnail: "vintage-denim",
    images: ["vintage-denim", "vintage-denim", "vintage-denim"],
    description:
      "Explore 150 years of denim history. Shop limited-edition vintage pieces and customize your own jacket.",
    officialLink: "https://levis-archive.com",
    officialSNS: "@levis_korea",
    crowdLevel: "medium",
    parkingInfo: "주변 공영주차장 이용",
    latitude: 37.5563,
    longitude: 126.9239,
    trending: true,
    isNew: true,
    views: 5230,
  },
  {
    id: "3",
    popupName: "Glow Up Beauty Lab",
    brandName: "Innisfree",
    category: "Beauty",
    startDate: "2024-12-20",
    endDate: "2025-01-10",
    address: "서울 강남구 테헤란로 152",
    area: "Gangnam",
    openHours: "10:00 - 22:00",
    reservationRequired: false,
    entryFee: "free",
    tags: ["Free Entry", "Free Samples", "Skin Analysis", "Beauty Consultation"],
    thumbnail: "beauty-lab",
    images: ["beauty-lab", "beauty-lab", "beauty-lab"],
    description:
      "Get a free AI skin analysis and receive personalized product recommendations. Try before you buy!",
    officialLink: "https://innisfree-popup.kr",
    officialSNS: "@innisfree_official",
    crowdLevel: "medium",
    queueInfo: "주말 오후 20분 대기",
    parkingInfo: "건물 지하 주차장 이용 가능",
    latitude: 37.5048,
    longitude: 127.0495,
    views: 3890,
  },
  {
    id: "4",
    popupName: "Croissant Heaven",
    brandName: "Maison Breizh",
    category: "Food",
    startDate: "2024-12-15",
    endDate: "2025-01-05",
    address: "서울 성동구 연무장5가길 7",
    area: "Seongsu",
    openHours: "08:00 - 18:00 (재료 소진 시 조기 마감)",
    reservationRequired: false,
    entryFee: "free",
    tags: ["Free Entry", "Limited Daily", "Takeout Only", "Sold Out Early"],
    thumbnail: "croissant-popup",
    images: ["croissant-popup", "croissant-popup", "croissant-popup"],
    description:
      "Authentic French croissants made by award-winning pastry chefs. Arrive early—they sell out by noon!",
    officialLink: "https://maison-breizh.kr",
    officialSNS: "@breizh_seoul",
    crowdLevel: "high",
    queueInfo: "오전 9시 방문 권장, 오후 2시 이후 품절 가능",
    parkingInfo: "주차 불가, 대중교통 이용 권장",
    latitude: 37.5445,
    longitude: 127.0563,
    trending: true,
    views: 12450,
  },
  {
    id: "5",
    popupName: "Digital Art Immersive",
    brandName: "TeamLab",
    category: "Exhibition",
    startDate: "2024-11-01",
    endDate: "2025-02-28",
    address: "서울 영등포구 여의대로 108",
    area: "Yeouido",
    openHours: "10:00 - 20:00 (입장 마감 19:00)",
    reservationRequired: true,
    entryFee: "paid",
    entryFeeAmount: "₩22,000",
    tags: ["Reservation Required", "Photo Zone", "Interactive", "Family-friendly"],
    thumbnail: "digital-art",
    images: ["digital-art", "digital-art", "digital-art"],
    description:
      "Step into a world of interactive digital art. Beautiful light installations respond to your movements.",
    officialLink: "https://teamlab-seoul.com",
    officialSNS: "@teamlab_seoul",
    reservationLink: "https://naver.me/teamlab",
    crowdLevel: "medium",
    parkingInfo: "IFC몰 주차장 이용 (4시간 무료)",
    latitude: 37.5259,
    longitude: 126.9263,
    views: 6780,
  },
  {
    id: "6",
    popupName: "Sneaker Culture 2025",
    brandName: "Nike",
    category: "Fashion",
    startDate: "2024-12-30",
    endDate: "2025-01-14",
    address: "서울 강남구 압구정로 420",
    area: "Gangnam",
    openHours: "11:00 - 21:00",
    reservationRequired: false,
    entryFee: "free",
    tags: ["Free Entry", "Limited Release", "Raffle", "Photo Zone"],
    thumbnail: "sneaker-culture",
    images: ["sneaker-culture", "sneaker-culture", "sneaker-culture"],
    description:
      "Explore rare sneakers from the past 50 years. Enter the raffle for exclusive limited releases!",
    officialLink: "https://nike-popup.kr",
    officialSNS: "@nike_seoul",
    crowdLevel: "high",
    queueInfo: "주말 40분 대기 예상",
    parkingInfo: "갤러리아 백화점 주차장 이용",
    latitude: 37.5273,
    longitude: 127.0286,
    trending: true,
    isNew: true,
    views: 9340,
  },
  {
    id: "7",
    popupName: "K-Beauty Garden",
    brandName: "Amorepacific",
    category: "Beauty",
    startDate: "2024-12-01",
    endDate: "2025-01-20",
    address: "서울 마포구 와우산로 29길 18",
    area: "Hongdae",
    openHours: "11:00 - 21:00",
    reservationRequired: false,
    entryFee: "free",
    tags: ["Free Entry", "Free Samples", "Workshop", "Photo Zone", "Instagrammable"],
    thumbnail: "beauty-garden",
    images: ["beauty-garden", "beauty-garden", "beauty-garden"],
    description:
      "A botanical wonderland showcasing K-beauty innovations. Join daily workshops and take home samples!",
    officialLink: "https://amorepacific-popup.kr",
    officialSNS: "@amorepacific",
    crowdLevel: "low",
    parkingInfo: "인근 유료 주차장 이용",
    latitude: 37.556,
    longitude: 126.924,
    views: 2340,
  },
  {
    id: "8",
    popupName: "Minimalist Home Exhibition",
    brandName: "Muji",
    category: "Goods",
    startDate: "2024-12-10",
    endDate: "2025-01-25",
    address: "서울 성동구 아차산로 9길 7",
    area: "Seongsu",
    openHours: "10:00 - 20:00",
    reservationRequired: false,
    entryFee: "free",
    tags: ["Free Entry", "Shopping Available", "Workshop", "Interior Inspiration"],
    thumbnail: "minimalist-home",
    images: ["minimalist-home", "minimalist-home", "minimalist-home"],
    description:
      "Experience the art of simple living. Shop curated home goods and attend organizing workshops.",
    officialLink: "https://muji-popup.kr",
    officialSNS: "@muji_korea",
    crowdLevel: "low",
    parkingInfo: "건물 지하 주차 가능",
    latitude: 37.5443,
    longitude: 127.055,
    views: 1890,
  },
  {
    id: "9",
    popupName: "Matcha Madness Café",
    brandName: "Osulloc",
    category: "Food",
    startDate: "2025-01-03",
    endDate: "2025-01-31",
    address: "서울 강남구 신사동 543-7",
    area: "Gangnam",
    openHours: "10:00 - 22:00",
    reservationRequired: false,
    entryFee: "free",
    tags: ["Free Entry", "Limited Menu", "Photo Zone", "Desserts"],
    thumbnail: "matcha-cafe",
    images: ["matcha-cafe", "matcha-cafe", "matcha-cafe"],
    description:
      "All things matcha! Try exclusive matcha desserts and drinks you can only get here.",
    officialLink: "https://osulloc-popup.kr",
    officialSNS: "@osulloc_official",
    crowdLevel: "medium",
    queueInfo: "주말 저녁 30분 대기",
    parkingInfo: "주변 유료 주차장 이용",
    latitude: 37.52,
    longitude: 127.023,
    isNew: true,
    views: 4230,
  },
  {
    id: "10",
    popupName: "Retro Arcade Bar",
    brandName: "GameOn Seoul",
    category: "Exhibition",
    startDate: "2024-12-01",
    endDate: "2025-02-15",
    address: "서울 영등포구 국제금융로 10",
    area: "Yeouido",
    openHours: "14:00 - 24:00 (금/토 02:00까지)",
    reservationRequired: false,
    entryFee: "paid",
    entryFeeAmount: "₩15,000 (1 drink included)",
    tags: ["21+ Only", "Retro Gaming", "Bar", "Group Friendly"],
    thumbnail: "retro-arcade",
    images: ["retro-arcade", "retro-arcade", "retro-arcade"],
    description:
      "Play classic arcade games from the 80s and 90s while enjoying craft cocktails. Nostalgia overload!",
    officialLink: "https://gameon-seoul.com",
    officialSNS: "@gameon_seoul",
    crowdLevel: "high",
    queueInfo: "금/토 저녁 1시간 대기 가능",
    parkingInfo: "IFC몰 주차 가능",
    latitude: 37.5255,
    longitude: 126.926,
    views: 5670,
  },
  {
    id: "11",
    popupName: "Plant & Pottery Workshop",
    brandName: "Green Fingers",
    category: "Goods",
    startDate: "2024-12-15",
    endDate: "2025-01-30",
    address: "서울 마포구 잔다리로 72",
    area: "Hongdae",
    openHours: "13:00 - 19:00 (월요일 휴무)",
    reservationRequired: true,
    entryFee: "paid",
    entryFeeAmount: "₩35,000",
    tags: ["Reservation Required", "Workshop", "Hands-on", "Take Home"],
    thumbnail: "plant-workshop",
    images: ["plant-workshop", "plant-workshop", "plant-workshop"],
    description:
      "Create your own ceramic pot and plant a succulent to take home. Perfect for beginners!",
    officialLink: "https://greenfingers.kr",
    officialSNS: "@greenfingers_seoul",
    reservationLink: "https://naver.me/greenfingers",
    crowdLevel: "low",
    parkingInfo: "주차 불가",
    latitude: 37.5565,
    longitude: 126.923,
    views: 1560,
  },
  {
    id: "12",
    popupName: "Pokémon Center Pop-Up",
    brandName: "Pokémon Company",
    category: "Character",
    startDate: "2024-12-20",
    endDate: "2025-01-12",
    address: "서울 강남구 테헤란로 521",
    area: "Gangnam",
    openHours: "10:00 - 21:00",
    reservationRequired: false,
    entryFee: "free",
    tags: ["Free Entry", "Limited Goods", "Photo Zone", "Character", "Kid-friendly"],
    thumbnail: "pokemon-popup",
    images: ["pokemon-popup", "pokemon-popup", "pokemon-popup"],
    description:
      "Catch limited-edition Pokémon merchandise! Meet Pikachu and take photos in themed zones.",
    officialLink: "https://pokemon-popup.kr",
    officialSNS: "@pokemon_kr",
    crowdLevel: "high",
    queueInfo: "주말 1시간 이상 대기 예상, 평일 방문 권장",
    parkingInfo: "코엑스 주차장 이용",
    latitude: 37.5115,
    longitude: 127.0595,
    trending: true,
    views: 15670,
  },
  {
    id: "13",
    popupName: "Minimal Jewelry Studio",
    brandName: "Atelier Miel",
    category: "Fashion",
    startDate: "2024-12-28",
    endDate: "2025-01-18",
    address: "서울 성동구 연무장길 74",
    area: "Seongsu",
    openHours: "11:00 - 19:00",
    reservationRequired: true,
    entryFee: "paid",
    entryFeeAmount: "₩45,000~",
    tags: ["Reservation Required", "Workshop", "Handmade", "Custom Design"],
    thumbnail: "jewelry-studio",
    images: ["jewelry-studio", "jewelry-studio", "jewelry-studio"],
    description:
      "Design and craft your own minimalist jewelry. Perfect for gifts or a treat for yourself!",
    officialLink: "https://atelier-miel.kr",
    officialSNS: "@atelier_miel",
    reservationLink: "https://naver.me/atelier-miel",
    crowdLevel: "low",
    parkingInfo: "건물 주차 가능",
    latitude: 37.5448,
    longitude: 127.0555,
    isNew: true,
    views: 2130,
  },
  {
    id: "14",
    popupName: "Chocolate Factory",
    brandName: "Royce Seoul",
    category: "Food",
    startDate: "2024-12-01",
    endDate: "2025-01-31",
    address: "서울 영등포구 여의나루로 50",
    area: "Yeouido",
    openHours: "10:00 - 21:00",
    reservationRequired: false,
    entryFee: "free",
    tags: ["Free Entry", "Tasting Available", "Shopping", "Gift Sets"],
    thumbnail: "chocolate-factory",
    images: ["chocolate-factory", "chocolate-factory", "chocolate-factory"],
    description:
      "Watch chocolate being made and taste fresh samples. Shop beautifully packaged gift sets.",
    officialLink: "https://royce-popup.kr",
    officialSNS: "@royce_korea",
    crowdLevel: "medium",
    parkingInfo: "더현대 서울 주차장 이용",
    latitude: 37.526,
    longitude: 126.929,
    views: 4890,
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
