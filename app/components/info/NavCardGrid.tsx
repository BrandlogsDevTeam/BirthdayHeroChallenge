import { NavCard } from "../NavCard";
import { Book, Users, FileQuestion, Award, Lightbulb } from "lucide-react";

const navCards = [
  {
    icon: Lightbulb,
    title: "How it works",
    subtitle: "Enjoy birthday gifting with no money out of your pocket",
    link: "#howitworks",
  },
  {
    icon: Award,
    title: "Benefits",
    subtitle: "Your benefits from the age of hunger liberation!",
    link: "#benefits",
  },
  {
    icon: Book,
    title: "Blogs",
    subtitle: "Checkout our blogs!",
    link: "#blogs",
  },
  {
    icon: Users,
    title: "About us",
    subtitle:
      "Learn more about the birthday hero community and what we stand for",
    link: "#aboutus",
  },
  {
    icon: FileQuestion,
    title: "FAQs",
    subtitle:
      "Find answers to common questions about Our Community and how we help.",
    link: "#faqs",
  },
];

export function NavCardGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {navCards.map((card, index) => (
          <NavCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
