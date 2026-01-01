export type NotificationType = "new" | "ending" | "update" | "saved" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  popupId?: string;
  image?: string;
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "new",
    title: "New Pop-up Near You! 🎉",
    message: "Sanrio Cafe just opened in Seongsu. Don't miss out!",
    time: "5 min ago",
    isRead: false,
    popupId: "1",
    image:
      "https://images.unsplash.com/photo-1706282540364-962e8b1543da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwYXJ0JTIwcG9zdGVyfGVufDF8fHx8MTc2NzE2MDAxOHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    type: "ending",
    title: "Ending Soon! ⏰",
    message: "BTS Pop-up Store ends in 3 days. Secure your visit!",
    time: "2 hours ago",
    isRead: false,
    popupId: "2",
    image:
      "https://images.unsplash.com/photo-1723283126758-28f2a308bc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwZ2VvbWV0cmljJTIwcGF0dGVybnxlbnwxfHx8fDE3NjcxNjY4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "3",
    type: "saved",
    title: "Saved Pop-up Update 💝",
    message: "Nike Sneaker Lab has extended their hours this weekend!",
    time: "5 hours ago",
    isRead: false,
    popupId: "3",
    image:
      "https://images.unsplash.com/photo-1679294176201-f9b302961f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwdXJiYW4lMjBuaWdodHxlbnwxfHx8fDE3NjcwNDIyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "4",
    type: "update",
    title: "Trending This Week 🔥",
    message: "Harry Potter Exhibition is trending in Gangnam. Check it out!",
    time: "1 day ago",
    isRead: true,
    popupId: "4",
    image:
      "https://images.unsplash.com/photo-1714972692832-618fae83ef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBncmFkaWVudCUyMG1vZGVybnxlbnwxfHx8fDE3NjcxNjY4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "5",
    type: "system",
    title: "New Feature Available! ✨",
    message: "Try our new AR preview feature in the Map view.",
    time: "2 days ago",
    isRead: true,
  },
  {
    id: "6",
    type: "new",
    title: "New Category Pop-ups 🎨",
    message: "5 new Art & Design pop-ups added to your area.",
    time: "3 days ago",
    isRead: true,
  },
  {
    id: "7",
    type: "saved",
    title: "Reminder: Upcoming Visit 📍",
    message: "Pokemon Center opens tomorrow. Don't forget to visit!",
    time: "3 days ago",
    isRead: true,
    popupId: "5",
    image:
      "https://images.unsplash.com/photo-1686405585580-2a1f5aac9837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMGNvbG9yZnVsJTIwcGFpbnR8ZW58MXx8fHwxNzY3MTY2ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];
