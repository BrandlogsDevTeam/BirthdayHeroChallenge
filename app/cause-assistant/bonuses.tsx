import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CardPreview } from "../components/card-preview";

export function CakeBonusesCard() {
  const sections = [
    { title: "Allocated", amount: 36000 },
    { title: "Earned", amount: 0 },
    { title: "Paid", amount: 0 },
  ];

  return (
    <div>
      <CardPreview title="Your Cake Bonuses" sections={sections} />
    </div>
  );
}

export default CakeBonusesCard;
