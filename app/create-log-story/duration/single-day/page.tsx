"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SingleDaySelection() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const router = useRouter();

  const handlePreview = () => {
    if (day && month && year) {
      router.push(
        `/create-log-story/duration/date-preview?date=${encodeURIComponent(
          `${day} ${month} ${year}`
        )}`
      );
    }
  };
  return (
    <div className="max-w-2xl space-y-8">
      <h2 className="text-2xl font-bold text-custom-green">
        Select your log story date
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Input
            type="number"
            min="1"
            max="31"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            min="2024"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handlePreview}
          >
            Preview Date
          </Button>
        </div>
      </div>
    </div>
  );
}
