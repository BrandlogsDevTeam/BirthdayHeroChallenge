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
import { TIMEZONE_OPTIONS } from "@/lib/constants";

interface TimezoneSelectProps {
  onTimezoneChange: (timezone: string) => Promise<any>;
  current?: string;
  className?: string;
}

export default function TimezoneSelect({
  onTimezoneChange,
  current,
  className = "",
}: TimezoneSelectProps) {
  const [selectedTimezone, setSelectedTimezone] = useState<string | undefined>(
    current
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Getting user's current timezone on component mount
    if (current) return;
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
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onTimezoneChange(selectedTimezone!);
      toast("Timezone updated", "default", {
        description: "Your timezone preference has been updated successfully",
      });
    } catch (error) {
      toast("Error", "destructive", {
        description: "Failed to update timezone. Try again later.",
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
