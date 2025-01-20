"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useConnectionFlow } from "@/app/actions/connectionContext";
import { ConnectionRequest } from "./request";
import { ConnectionPreview } from "./preview";
import { ConnectionSuccess } from "./success";

export function ConnectionFlow() {
  const { isOpen, step, selectedType, closeFlow } = useConnectionFlow();

  return (
    <Dialog open={isOpen} onOpenChange={closeFlow}>
      <DialogContent>
        {step === "request" && <ConnectionRequest />}
        {step === "preview" && <ConnectionPreview />}
        {step === "success" && <ConnectionSuccess />}
      </DialogContent>
    </Dialog>
  );
}
