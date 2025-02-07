// pages/date-status.tsx
import React from "react";
import ComingSoon from "../components/ComingSoon";
import { giftFeatureContent } from "../data/comingSoonContent";

const GiftPage: React.FC = () => {
  return <ComingSoon {...giftFeatureContent} />;
};

export default GiftPage;
