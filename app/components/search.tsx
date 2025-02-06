"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import debounce from "lodash/debounce";
import {
  fetchSearchHistory,
  saveSearchHistory,
} from "@/lib/supabase/server-extended/userProfile";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Clock, X, User, Store, BookOpen } from "lucide-react";

const RESULT_ICONS: Record<
  SearchResult["type"],
  React.ComponentType<{ className?: string }>
> = {
  user: User,
  brand: Store,
  story: BookOpen,
};

export interface SearchResult {
  id: string;
  title: string;
  type: "story" | "user" | "brand";
  url: string;
}

export interface SearchHistoryItem {
  query: string;
  timestamp: string;
}

export interface UserSettings {
  id: string;
  search_history?: SearchHistoryItem[];
  log_notification?: number;
  timezone?: string;
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      const { sortedHistory, error } = await fetchSearchHistory();
      if (error) {
        console.error(error);
      } else {
        setHistory(sortedHistory);
      }
    };

    fetchHistory();
  }, []);

  const saveToHistory = async (searchQuery: string) => {
    await saveSearchHistory(searchQuery);
  };

  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropDown(true);
    debouncedSearch(value);
  };

  const handleResultClick = async (result: SearchResult) => {
    try {
      const response = await saveSearchHistory(query);
      if (response?.updatedHistory) {
        setHistory(response.updatedHistory.slice(0, 5));
      }
      router.push(result.url);
    } catch (error) {
      console.error("Error saving search history:", error);
      router.push(result.url);
    }
  };

  const handleHistoryClick = (historyItem: SearchHistoryItem) => {
    setQuery(historyItem.query);
    debouncedSearch(historyItem.query);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropDown(true)}
          placeholder="Search"
          className="pl-10 pr-10 w-full"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={clearSearch}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>

      {showDropDown && (query.trim() || history.length > 0) && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-left flex items-center">
              <span className="animate-spin mr-2">🔄</span>
              <span className="text-muted-foreground">Searching...</span>
            </div>
          ) : (
            <>
              {results.length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
                    Search Results
                  </div>
                  {results.map((result) => {
                    const ResultIcon = RESULT_ICONS[result.type] || Search;
                    return (
                      <Button
                        key={`${result.type}-${result.id}`}
                        variant="ghost"
                        onClick={() => handleResultClick(result)}
                        className="w-full justify-start text-left px-2 py-2 hover:bg-accent"
                      >
                        <ResultIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{result.title}</span>
                      </Button>
                    );
                  })}
                </div>
              )}

              {history.length > 0 && !query.trim() && (
                <div className="p-2">
                  <div className="text-xs font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
                    Recent Searches
                  </div>
                  {history.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => handleHistoryClick(item)}
                      className="w-full justify-start text-left px-2 py-2 hover:bg-accent"
                    >
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      {item.query}
                    </Button>
                  ))}
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="p-4 text-left text-muted-foreground flex items-center">
                  <Search className="h-8 w-8 mr-4 text-muted-foreground" />
                  <div>
                    <p>No results found</p>
                    <p className="text-xs mt-1">Try a different search term</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
