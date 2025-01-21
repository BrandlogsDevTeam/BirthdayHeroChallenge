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
export function getBHI(birth_date: Date | null) {
  if (!birth_date) {
    return {
      permissiory_donations: 0,
      gift_bonus: 250
    }
  }

  const LIFE_EXPECTANCY = 80;
  const BASE_DONATION = 280;
  const YEARLY_INCREMENT = 20;
  const INITIAL_YEARS = 4;

  const today = new Date();
  let age = today.getFullYear() - birth_date.getFullYear();
  const monthDiff = today.getMonth() - birth_date.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birth_date.getDate())
  ) {
    age--;
  }

  let remainingLife = LIFE_EXPECTANCY - age;

  // cap permissiory donations
  if (remainingLife > 80) remainingLife = 80;
  if (remainingLife < INITIAL_YEARS) remainingLife = INITIAL_YEARS;

  const totalDonation =
    BASE_DONATION + (remainingLife - INITIAL_YEARS) * YEARLY_INCREMENT;

  return {
    permissiory_donations: totalDonation,
    gift_bonus: 250
  }

}

export const removeDate = (timestamp: Date) => {
  const timeOnly = new Date(0);
  timeOnly.setHours(timestamp.getHours());
  timeOnly.setMinutes(timestamp.getMinutes());
  timeOnly.setSeconds(timestamp.getSeconds());
  timeOnly.setMilliseconds(timestamp.getMilliseconds());

  return timeOnly;
}

export const toTimeString = (timestamp: Date) => {
  const hours = timestamp.getHours().toString().padStart(2, '0');
  const minutes = timestamp.getMinutes().toString().padStart(2, '0');
  const seconds = timestamp.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`
} 

export const mergeDateTime = (date: string, time: string) => {
  return new Date(`${date} ${time}`)
}