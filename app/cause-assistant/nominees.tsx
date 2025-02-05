"use client";

import { useEffect, useState } from "react";
import { getNomination } from "@/lib/supabase/server-extended/nomination";
import NomineeCard from "../components/nominee-card";
import { CardPreview } from "../components/card-preview";
import { NomineeCardSkeleton } from "../components/skeleton";

export default function NomineeList() {
  const [nominees, setNominees] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNominees() {
      const { data, error } = await getNomination();

      if (error) {
        setError(error);
      } else if (data) {
        setNominees(data);
      }
      setLoading(false);
    }

    fetchNominees();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <NomineeCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 font-medium">Error: {error}</div>
      </div>
    );
  }

  if (!nominees.length) return <div>No nominations found.</div>;

  return (
    <div className="space-y-4">
      <div>
        <CardPreview
          title="Endorsed Cake Shops"
          sections={[
            {
              title: "Nominated Users",
              data: `${nominees.length}`,
              description: "Total nominated users",
            },
            {
              title: "Accepted Nominations",
              data: "0",
              description: "Total accepted nominations",
            },
          ]}
        />
      </div>
      {nominees.map((nominee) => (
        <NomineeCard key={nominee.id} nominee={nominee} />
      ))}
    </div>
  );
}
