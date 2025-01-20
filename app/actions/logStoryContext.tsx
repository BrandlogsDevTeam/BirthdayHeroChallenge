"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type LogStoryData = {
  title: string;
  isMultiDay: boolean;
  start_date: string;
  end_date?: string;
  isAllDay: boolean;
  start_time?: string;
  end_time?: string;
  image_urls: string[];
  description: string;
};

type LogStoryContextType = {
  logStoryData: LogStoryData;
  updateLogStoryData: (data: Partial<LogStoryData>) => void;
};

const LogStoryContext = createContext<LogStoryContextType | undefined>(
  undefined
);

export const useLogStory = () => {
  const context = useContext(LogStoryContext);
  if (!context) {
    throw new Error("useLogStory must be used within a LogStoryProvider");
  }
  return context;
};

export const LogStoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [logStoryData, setLogStoryData] = useState<LogStoryData>({
    title: "",
    isMultiDay: false,
    start_date: "",
    end_date: "",
    isAllDay: true,
    start_time: "",
    end_time: "",
    image_urls: [],
    description: "",
  });

  const updateLogStoryData = (data: Partial<LogStoryData>) => {
    setLogStoryData((prev) => ({ ...prev, ...data }));
  };

  return (
    <LogStoryContext.Provider value={{ logStoryData, updateLogStoryData }}>
      {children}
    </LogStoryContext.Provider>
  );
};
