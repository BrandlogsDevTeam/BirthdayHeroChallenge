import React from "react";

interface AssistantProfileProps {
  name: string;
  username: string;
  assistantId: string;
}

const AssistantProfile: React.FC<AssistantProfileProps> = ({
  name = "Sarah Johnson",
  username = "sarahj",
  assistantId = "AST-2024-001",
}) => {
  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm flex items-center gap-4">
      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">@{username}</p>
        <p className="text-sm text-gray-500">Assistant ID: {assistantId}</p>
      </div>
    </div>
  );
};

export default AssistantProfile;
