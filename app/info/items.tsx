import { Gift, CreditCard, Palette, Calendar } from "lucide-react";

interface CardProps {
  icon: React.ReactNode;
  stat: string;
  title: string;
  desc: string;
  link?: string;
  background?: string;
  statColor?: string;
}

export const benefits: CardProps[] = [
  {
    icon: <Gift className="w-8 h-8" />,
    background: "text-blue-600",
    stat: "$250",
    title: "gift bonus",
    desc: "To enjoy birthday gifting with no money out of your pocket",
    link: "/media-center/$250-gift-bonus-reward",
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    background: "text-orange-600",
    stat: "30%",
    title: "care discount voucher reward",
    desc: "To enjoy best prices when shopping to save you money",
    link: "media-center/enjoy-30-care-discount-voucher-reward",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    background: "text-red-600",
    stat: "100%",
    title: "personalized experience when buying",
    desc: "To save you time and give you peace of mind to concentrate on what matters",
    link: "/#benefits",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    background: "text-green-600",
    stat: "+365",
    title: "calendar days of making money while serving shoppers",
    desc: "As your source of livelihood",
    link: "/#benefits",
  },
];
