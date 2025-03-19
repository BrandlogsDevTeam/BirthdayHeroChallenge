"use client";

import React, { useEffect, useState } from "react";
import { CardPreview } from "../components/card-preview";
import { CakeShopCard } from "../components/cake-shop";
import { Button } from "@/components/ui/button";
import { EndorsementFlow } from "../components/endorsement-flow";
import { getSelfEndorsedBrands } from "@/lib/supabase/server-extended/brandProfile";
import { AccountDBO } from "@/lib/types";
import { NomineeCardSkeleton } from "../components/skeleton";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface CakeShopsProps {
  setActiveTab: (tab: string) => void;
}

const CakeShops: React.FC<CakeShopsProps> = ({ setActiveTab }) => {
  const [endorsedShops, setEndorsedShops] = useState<AccountDBO[]>([]);
  const [isEndorsementFlowOpen, setIsEndorsementFlowOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [filteredShops, setFilteredShops] = useState<AccountDBO[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getSelfEndorsedBrands();
      if (error) {
        setError(error);
      }
      if (!data) return;
      setEndorsedShops(data);
      setFilteredShops(data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    filterShops();
  }, [searchTerm, statusFilter, locationFilter, endorsedShops]);

  const filterShops = () => {
    let filtered = [...endorsedShops];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(shop => 
        shop.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(shop => 
        statusFilter === "accepted" 
          ? shop.account_status === "accepted" 
          : shop.account_status !== "accepted"
      );
    }
    
    // Filter by location
    if (locationFilter !== "all") {
      filtered = filtered.filter(shop => 
        shop.state?.toLowerCase() === locationFilter.toLowerCase() ||
        shop.county?.toLowerCase() === locationFilter.toLowerCase()
      );
    }
    
    setFilteredShops(filtered);
  };

  const handleNewEndorsement = (newBrand: AccountDBO) => {
    setEndorsedShops((prevShops) => [...prevShops, newBrand]);
  };

  // Get unique states for location filter
  const uniqueLocations = Array.from(
    new Set(
      endorsedShops
        .map(shop => shop.state)
        .filter(state => state)
    )
  );

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

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => setIsEndorsementFlowOpen(true)}
        >
          Endorse Cake Shop
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="accepted">Accepted</option>
            <option value="endorsed">Endorsed</option>
          </select>
          
          <select
            className="h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="all">All Locations</option>
            {uniqueLocations.map((location, index) => (
              <option key={index} value={location as string}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      <EndorsementFlow
        isOpen={isEndorsementFlowOpen}
        onClose={() => setIsEndorsementFlowOpen(false)}
        onNewEndorsement={handleNewEndorsement}
      />
      
      <CardPreview
        title="Endorsed Cake Shops"
        sections={[
          {
            title: "Endorsed Shops",
            data: `${endorsedShops.length}`,
            description: "Total endorsed shops",
          },
          {
            title: "Accepted Shops",
            data: `${
              endorsedShops.filter((shop) => shop.account_status === "accepted")
                .length
            }`,
            description: "Total accepted shops",
          },
          {
            title: "Filtered Results",
            data: `${filteredShops.length}`,
            description: "Shops matching filters",
          },
        ]}
      />

      {filteredShops.length > 0 ? (
        filteredShops.map((shop) => (
          <CakeShopCard
            key={shop.id}
            id={shop.id}
            name={shop.name || ""}
            username={shop.username}
            state={shop.state || ""}
            county={shop.county || ""}
            status={
              shop.account_status === "accepted" ? "Accepted" : "Endorsed"
            }
            testimonial={shop.bio || ""}
            profilePhoto={shop.avatar_url || ""}
            onSuccess={() => setActiveTab("nominees")}
          />
        ))
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No cake shops match your filter criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setLocationFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CakeShops;