"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import debounce from "lodash/debounce";
import {
  fetchSearchHistory,
  saveSearchHistory,
} from "@/lib/supabase/server-extended/userProfile";
import { createClient } from "@/lib/supabase/server";

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
    await saveSearchHistory(searchQuery, setHistory);
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
    await saveToHistory(query);
    window.location.href = result.url;
  };

  const handleHistoryClick = (historyItem: SearchHistoryItem) => {
    setQuery(historyItem.query);
    debouncedSearch(historyItem.query);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowDropDown(true)}
        placeholder="Search"
        className="pl-8 w-full"
      />

      {showDropDown && (query.trim() || history.length > 0) && (
        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            <>
              {results.length > 0 && (
                <div className="p-2">
                  <div className="text-sm font-semibold text-gray-500 px-2 py-1">
                    Results
                  </div>
                  {results.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    >
                      <span className="text-xs text-gray-500 uppercase mr-2">
                        {result.type}
                      </span>
                      <span>{result.title}</span>
                    </button>
                  ))}
                </div>
              )}

              {history.length > 0 && !query.trim() && (
                <div className="p-2">
                  <div className="text-sm font-semibold text-gray-500 px-2 py-1">
                    Recent Searches
                  </div>
                  {history.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(item)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {item.query}
                    </button>
                  ))}
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="p-4 text-center text-gray-400">
                  No results found
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
