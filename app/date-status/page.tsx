// pages/date-status.tsx
import React from "react";
import ComingSoon from "../components/ComingSoon";
import { dateStatusContent } from "../data/comingSoonContent";

const DateStatusPage: React.FC = () => {
  return <ComingSoon {...dateStatusContent} />;
};

export default DateStatusPage;
