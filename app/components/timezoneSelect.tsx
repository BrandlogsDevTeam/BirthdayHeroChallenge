import React from "react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Timezone {
  value: string;
  label: string;
  offset: string;
}

const TIMEZONE_OPTIONS: Timezone[] = [
  { value: "UTC", label: "UTC", offset: "Coordinated Universal Time" },
  { value: "GMT", label: "GMT", offset: "Greenwich Mean Time" },
  { value: "EST", label: "EST", offset: "Eastern Standard Time (UTC-5)" },
  { value: "EDT", label: "EDT", offset: "Eastern Daylight Time (UTC-4)" },
  { value: "CST", label: "CST", offset: "Central Standard Time (UTC-6)" },
  { value: "CDT", label: "CDT", offset: "Central Daylight Time (UTC-5)" },
  { value: "PST", label: "PST", offset: "Pacific Standard Time (UTC-8)" },
  { value: "PDT", label: "PDT", offset: "Pacific Daylight Time (UTC-7)" },
  { value: "IST", label: "IST", offset: "Indian Standard Time (UTC+5:30)" },
  { value: "EAT", label: "EAT", offset: "East Africa Time (UTC+3)" },
  { value: "CAT", label: "CAT", offset: "Central Africa Time (UTC+2)" },
  { value: "WAT", label: "WAT", offset: "West Africa Time (UTC+1)" },
  { value: "CET", label: "CET", offset: "Central European Time (UTC+1)" },
  { value: "EET", label: "EET", offset: "Eastern European Time (UTC+2)" },
  { value: "JST", label: "JST", offset: "Japan Standard Time (UTC+9)" },
  {
    value: "AEST",
    label: "AEST",
    offset: "Australian Eastern Standard Time (UTC+10)",
  },
];

interface TimezoneSelectProps {
  onTimezoneChange?: (timezone: string) => void;
  className?: string;
}

export default function TimezoneSelect({
  onTimezoneChange,
  className = "",
}: TimezoneSelectProps) {
  const [selectedTimezone, setSelectedTimezone] = useState<string>("UTC");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Getting user's current timezone on component mount
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const matchingTimezone = TIMEZONE_OPTIONS.find(
        (tz) => tz.value === userTimezone || tz.offset.includes(userTimezone)
      );
      if (matchingTimezone) {
        setSelectedTimezone(matchingTimezone.value);
      }
    } catch (error) {
      console.error("Error detecting timezone:", error);
    }
  }, []);

  const handleTimezoneChange = (value: string) => {
    setSelectedTimezone(value);
    if (onTimezoneChange) {
      onTimezoneChange(value);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Timezone Updated",
        description: "Your timezone preferences have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update timezone. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`w-full max-w-2xl ${className}`}>
      <CardHeader></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="timezone-select"
            className="text-base font-medium text-gray-700 dark:text-gray-300"
          >
            Select your timezone
          </label>
          <Select value={selectedTimezone} onValueChange={handleTimezoneChange}>
            <SelectTrigger id="timezone-select" className="w-full">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {TIMEZONE_OPTIONS.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label} - {timezone.offset}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your timezone will be used for all time-based features.
        </p>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
        >
          {isLoading ? "Updating..." : "Confirm"}
        </Button>
      </CardContent>
    </Card>
  );
}
