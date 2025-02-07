// pages/date-group.tsx
import React from "react";
import ComingSoon from "../components/ComingSoon";
import { dateGroupContent } from "../data/comingSoonContent";

const DateGroupPage: React.FC = () => {
  return <ComingSoon {...dateGroupContent} />;
};

export default DateGroupPage;
