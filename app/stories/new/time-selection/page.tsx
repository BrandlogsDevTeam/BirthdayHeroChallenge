"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function TimeSelection() {
  const [selectedOption, setSelectedOption] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const router = useRouter();

  const handleOptionSelect = (option: "allDay" | "specificTime") => {
    setSelectedOption(option);
    if (option === "allDay") {
      setIsPreviewOpen(true);
    }
  };

  const handlePreview = () => {
    if (selectedOption === "specificTime" && startTime && endTime) {
      setIsPreviewOpen(true);
    }
  };

  const handleConfirm = () => {
    setIsPreviewOpen(false);
    router.push("/create-log-story/add-image");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-green-600">Select Event Time</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className={`cursor-pointer shadow-none hover:shadow-md transition-all duration-200 ${
            selectedOption === "allDay" ? "border-green-600" : ""
          }`}
          onClick={() => handleOptionSelect("allDay")}
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">All Day Event</h3>
              <p className="text-sm text-gray-600">
                Runs from 12:00 AM to 11:59 PM
              </p>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer shadow-none hover:shadow-md transition-all duration-200 ${
            selectedOption === "specificTime" ? "border-green-600" : ""
          }`}
          onClick={() => handleOptionSelect("specificTime")}
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Specific Time</h3>
              <p className="text-sm text-gray-600">
                Set custom start and end times
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      {selectedOption === "specificTime" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handlePreview}
            >
              Preview Time
            </Button>
          </div>
        </div>
      )}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Event Time</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-2">Your event is scheduled for:</p>
            {selectedOption === "allDay" ? (
              <p className="text-lg font-semibold text-gray-600">
                All Day (12:00 AM to 11:59 PM)
              </p>
            ) : (
              <p className="text-lg font-semibold text-gray-600">{`${startTime} to ${endTime}`}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Edit
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
