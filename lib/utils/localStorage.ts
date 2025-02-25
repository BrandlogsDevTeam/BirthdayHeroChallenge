export const getCachedData = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  const cachedData = localStorage.getItem(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

export const setCachedData = <T>(key: string, data: T): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const clearCachedData = (key: string): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};
