// pages/date-group.tsx
import React from "react";
import ComingSoon from "../components/ComingSoon";
import { walletBalanceContent } from "../data/comingSoonContent";

const TransferBalance: React.FC = () => {
  return <ComingSoon {...walletBalanceContent} />;
};

export default TransferBalance;
