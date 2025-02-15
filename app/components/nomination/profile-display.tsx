import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Nominee } from "./types/nominee";
import { createNomination } from "@/lib/supabase/server-extended/nomination";
import { Loader } from "lucide-react";
import {
  addChat,
  addNominationChat,
} from "@/lib/supabase/server-extended/log-stories";
import { useToast } from "@/hooks/use-toast";

interface ProfileDisplayProps {
  nominee: Partial<Nominee>;
  onNext: () => void;
  onSuccess?: (p: any) => void;
  onBack: () => void;
}

export function ProfileDisplay({
  nominee,
  onNext,
  onSuccess,
  onBack,
}: ProfileDisplayProps) {
  const [loading, setLoading] = useState(false);
  const [nominationMessage, setNominationMessage] = useState("");
  const { toast } = useToast();

  const handleComplete = async () => {
    setLoading(true);
    try {
      if (!nominee.instagramHandle || !nominee.name || !nominee.photoUrl) {
        toast("Error", "destructive", {
          description: "Invalid nominee data.",
        });
        throw new Error("Invalid nominee data");
      }

      const { message, error } = await createNomination({
        username: nominee.instagramHandle,
        name: nominee.name,
        avatar_url: nominee.photoUrl,
        inviting_brand: nominee.inviting_brand || "",
        metadata: {
          endorsementMessage: nominationMessage,
        },
      });

      if (error) throw error;

      if (message) {
        toast("Nomination created successfully", "default", {
          description: message,
        });
      }

      onNext();
    } catch (error) {
      console.error(error);
      toast("Error creating nomination", "destructive", {
        description: typeof error === "string" ? error : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <Avatar className="w-24 h-24">
          <AvatarImage src={nominee.photoUrl} />
          <AvatarFallback>{nominee.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-gray-800">{nominee.name}</span>
        <span className="text-gray-500 text-sm">{nominee.instagramHandle}</span>
      </div>
      <div className="space-y-2">
        <textarea
          value={nominationMessage}
          onChange={(e) => setNominationMessage(e.target.value.slice(0, 240))}
          maxLength={240}
          className="w-full p-2 border rounded-md text-sm text-gray-800 resize-none"
          placeholder="Enter your nomination message..."
        />
        <div className="text-right text-sm text-gray-500">
          {nominationMessage.length}/240
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleComplete}
          disabled={loading}
          className="bg-green-500 hover:bg-green-700"
        >
          {loading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <>Complete</>
          )}
        </Button>
      </div>
    </div>
  );
}
