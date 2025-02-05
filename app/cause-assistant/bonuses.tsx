import { CardPreview } from "../components/card-preview";

export function CakeBonusesCard() {
  const sections = [
    {
      title: "Endorsed Shops",
      data: `$36,000`,
      description: "Total endorsed shops",
    },
    {
      title: "Accepted Shops",
      data: `$0`,
      description: "Total accepted shops",
    },
  ]

  return (
    <div>
      <CardPreview title="Your Cake Bonuses" sections={sections} />
    </div>
  );
}

export default CakeBonusesCard;
