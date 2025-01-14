import { useMemo } from "react";

const useFormattedDate = (date: Date | string) => {
  return useMemo(() => {
    const d = typeof date === "string" ? new Date(date) : date;

    if (isNaN(d.getTime())) {
      return "Invalid Date";
    }

    const ordinalSuffix = (day: number) => {
      const j = day % 10,
        k = day % 100;
      if (j === 1 && k !== 11) return "st";
      if (j === 2 && k !== 12) return "nd";
      if (j === 3 && k !== 13) return "rd";
      return "th";
    };

    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();

    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  }, [date]);
};

export default useFormattedDate;
