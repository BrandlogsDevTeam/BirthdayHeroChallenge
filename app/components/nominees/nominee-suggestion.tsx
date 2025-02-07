import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";

interface UserCardProps {
  name: string;
  username: string;
  message: string;
  avatarUrl?: string;
}

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-16 text-yellow-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1.5l3.09 6.26 6.91 1-5 4.87L18.18 21 12 17.27 5.82 21l1.09-7.37-5-4.87 6.91-1L12 1.5z"></path>
  </svg>
);

export default function UserCard({
  name,
  username,
  message,
  avatarUrl,
}: UserCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="bg-gray-100 rounded-md flex items-center justify-center mb-4 p-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center mb-3">
            <span className="text-gray-800 text-lg"></span>
            <div className="w-24 h-24 rounded-full ring-1 ring-custom-blue overflow-hidden">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center rounded-full ring-1 ring-custom-blue overflow-hidden">
                  <StarIcon />
                </div>
              )}
            </div>
            <span className="text-gray-800">{name}</span>
            <span className="text-gray-500 text-sm">@{username}</span>
          </div>
          <div className="flex flex-col text-lg font-semibold">
            <span className="text-gray-800">Birthday Hero Challenge</span>
            <span className="text-gray-800">Guest Award Nominee</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-4">{message}</p>
      <div className="flex gap-2">
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
        >
          <Check className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}
