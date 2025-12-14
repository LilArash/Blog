import type { PostReactions } from "../types";
export const REACTIONS: { key: keyof PostReactions; icon: string }[] = [
    { key: "like", icon: "👍" },
    { key: "dislike", icon: "👎" },
    { key: "heart", icon: "❤" },
    { key: "laughter", icon: "🤣" },
    { key: "cup", icon: "☕" },
  ];