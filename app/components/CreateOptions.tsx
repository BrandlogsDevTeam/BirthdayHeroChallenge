// components/CreateLogStartDate.tsx
import React from "react";
import Card from "./card";

const CreateDateFeatures: React.FC = () => {
  const cards = [
    {
      title: "Create Date Story",
      description:
        "Create a brand new date story to share your thoughts, story or experiences.",
      href: "/stories/new",
    },
    {
      title: "Repost Birthday Story",
      description:
        "Repost your birthday story to add on to your birthday story and experience.",
      href: "/stories/new",
    },
    {
      title: "Create Date Status",
      description: "Share past stories or events with your family or friends.",
      href: "/date-status",
    },
    {
      title: "Create Date Group",
      description:
        "Get into a date group with friends and connects that you share common stories or experiences.",
      href: "/date-group",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-custom-green">
        Create Date Features
      </h2>
      <div className="max-w-md w-full space-y-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            href={card.href}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateDateFeatures;
