"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DatePreview() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const startDate = searchParams.get("startDate") || searchParams.get("date");
  const endDate = searchParams.get("endDate");

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleConfirm = () => {
    setIsOpen(false);
    router.push("/create-log-story/time-selection");
  };

  const handleEdit = () => {
    setIsOpen(false);
    router.back();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Event Date(s)</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-600 mb-2">Your event is scheduled for:</p>
          <p className="text-lg font-semibold">{startDate}</p>
          {endDate && (
            <>
              <p className="text-gray-600 mt-2 mb-1">to</p>
              <p className="text-lg font-semibold">{endDate}</p>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleEdit}>
            Edit
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
