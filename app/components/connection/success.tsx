import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useConnectionFlow } from "@/app/actions/connectionContext";

export function ConnectionSuccess() {
  const { closeFlow } = useConnectionFlow();

  return (
    <div className="space-y-6 text-center">
      <DialogHeader>
        <DialogTitle>Connection Request Sent!</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-center">
          Your connection request has been successfully submitted!
        </p>
      </div>
      <div className="flex justify-end">
        <Button
          className="bg-green-600 text-white hover:bg-green-700 hover:text-white transition-colors"
          onClick={closeFlow}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
