import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function validateEmail(email: string) {
  if (typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  const maxEmailLength = 320; // RFC 5321 suggests this maximum
  if (email.length > maxEmailLength) {
    return false;
  }

  return true;
}

export function generateUniqueUsername() {
  const adjectives = ["Swift", "Brave", "Lucky", "Happy", "Clever", "Bright", "Bold", "Sharp", "Fierce", "Quick"];
  const nouns = ["Eagle", "Tiger", "Phoenix", "Lion", "Wolf", "Bear", "Falcon", "Panther", "Dragon", "Hawk"];
  const randomNumber = () => Math.floor(Math.random() * 10000);

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = randomNumber();
  return `${adjective}${noun}${number}`;
}

export function getInitials(name?: string) {
  if (!name) {
    return "OO";
  }
  return name
    .split(" ")
    .map((n) => n[0])
    .join("").slice(0, 2).toUpperCase()
}
export function getNextOccurrence(date: Date) {
  const now = new Date(); // Current date
  const targetDate = new Date(now.getFullYear(), date.getMonth(), date.getDate());

  // If the target date in the current year has already passed, move to the next year
  if (targetDate < now) {
    targetDate.setFullYear(targetDate.getFullYear() + 1);
  }

  return targetDate;
}