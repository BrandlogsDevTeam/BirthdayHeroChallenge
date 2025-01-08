import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CardPreview } from "../components/card-preview";

export function CakeBonusesCard() {
  const sections = [
    { title: "Allocated", data: `$36000` },
    { title: "Earned", data: `$0` },
    { title: "Paid", data: `$0` },
  ];

  return (
    <div>
      <CardPreview title="Your Cake Bonuses" sections={sections} />
    </div>
  );
}

export default CakeBonusesCard;
