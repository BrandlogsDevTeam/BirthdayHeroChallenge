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

export default function MultipleDaySelection() {
  const [startDay, setStartDay] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endDay, setEndDay] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const router = useRouter();

  const handlePreview = () => {
    if (startDay && startMonth && startYear && endDay && endMonth && endYear) {
      router.push(
        `/create-log-story/duration/date-preview?startDate=${encodeURIComponent(
          `${startDay} ${startMonth} ${startYear}`
        )}&endDate=${encodeURIComponent(`${endDay} ${endMonth} ${endYear}`)}`
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-custom-green">
        Select log story start and end dates
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Start Date
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <Input
              type="number"
              min="1"
              max="31"
              placeholder="DD"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
            />
            <Select value={startMonth} onValueChange={setStartMonth}>
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
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">End Date</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input
              type="number"
              min="1"
              max="31"
              placeholder="DD"
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
            />
            <Select value={endMonth} onValueChange={setEndMonth}>
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
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handlePreview}
          >
            Preview Dates
          </Button>
        </div>
      </div>
    </div>
  );
}
