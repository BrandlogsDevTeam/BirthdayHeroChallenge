import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
}

const CATEGORIES = {
  recent: "🕒",
  smileys: "😀",
  people: "👥",
  animals: "🐻",
  food: "🍔",
  activities: "⚽",
  travel: "✈️",
  objects: "💡",
  symbols: "💕",
  flags: "🏁",
};

const EMOJIS = {
  recent: [] as string[],
  smileys: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
  ],
  people: [
    "👶",
    "👧",
    "🧒",
    "👦",
    "👩",
    "🧑",
    "👨",
    "👩‍🦱",
    "👨‍🦱",
    "👩‍🦰",
    "👨‍🦰",
    "👱‍♀️",
  ],
  animals: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
  ],
  food: [
    "🍏",
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🍈",
    "🍒",
    "🍑",
  ],
  activities: [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🥎",
    "🎾",
    "🏐",
    "🏉",
    "🎱",
    "🏓",
    "🏸",
    "🏒",
  ],
  travel: [
    "✈️",
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚎",
    "🏎️",
    "🚓",
    "🚑",
    "🚒",
    "🚐",
    "🛻",
  ],
  objects: [
    "⌚",
    "📱",
    "💻",
    "⌨️",
    "🖥️",
    "🖨️",
    "🖱️",
    "🖲️",
    "🕹️",
    "🗜️",
    "💽",
    "💾",
  ],
  symbols: [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
  ],
  flags: [
    "🏁",
    "🚩",
    "🎌",
    "🏴",
    "🏳️",
    "🏳️‍🌈",
    "🏳️‍⚧️",
    "🏴‍☠️",
    "🇦🇫",
    "🇦🇽",
    "🇦🇱",
    "🇩🇿",
  ],
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  className = "",
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof EMOJIS>("smileys");
  const [searchTerm, setSearchTerm] = useState("");
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentEmojis");
    if (stored) {
      setRecentEmojis(JSON.parse(stored));
      EMOJIS.recent = JSON.parse(stored);
    }
  }, []);

  const addToRecent = (emoji: string) => {
    const updated = [emoji, ...recentEmojis.filter((e) => e !== emoji)].slice(
      0,
      20
    );
    setRecentEmojis(updated);
    EMOJIS.recent = updated;
    localStorage.setItem("recentEmojis", JSON.stringify(updated));
  };

  const handleEmojiClick = (emoji: string) => {
    addToRecent(emoji);
    onEmojiSelect(emoji);
  };

  const filteredEmojis = searchTerm
    ? Object.values(EMOJIS)
        .flat()
        .filter(
          (emoji) =>
            emoji.includes(searchTerm) ||
            getEmojiName(emoji).includes(searchTerm.toLowerCase())
        )
    : EMOJIS[selectedCategory];

  function getEmojiName(emoji: string): string {
    // This is a simple implementation - you might want to add a more comprehensive mapping
    return emoji;
  }

  return (
    <div className={`w-72 bg-white rounded-lg shadow-lg p-2 ${className}`}>
      <div className="relative mb-2">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search emoji..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {!searchTerm && (
        <div className="flex overflow-x-auto mb-2 pb-2">
          {Object.entries(CATEGORIES).map(([category, emoji]) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category as keyof typeof EMOJIS)
              }
              className={`flex-shrink-0 p-2 mx-1 rounded ${
                selectedCategory === category
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-8 gap-1 h-48 overflow-y-auto">
        {filteredEmojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => handleEmojiClick(emoji)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
