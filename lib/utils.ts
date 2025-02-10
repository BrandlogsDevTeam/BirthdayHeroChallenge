import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ConnectionType } from "./types";

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

export const formatDateOrdinal = (date: string | Date) => {
  try {
    if (typeof date === 'string') date = new Date(date)
    if (isNaN(date.getTime())) {
      return '';
    }


    const day = date.getDate();
    const month = date.toLocaleString('en', { month: 'short' });
    const year = date.getFullYear();

    // Get ordinal suffix (st, nd, rd, th)
    const suffix = (day >= 11 && day <= 13) ? 'th' :
      ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][day % 10];

    return `${day}${suffix} ${month} ${year}`;
  } catch (error) {
    console.error(error)
    return ''
  }
}

export function formatDateRelative(timestamp: Date | string) {
  try {
    const time = (typeof timestamp === 'string') ? +new Date(timestamp) : +timestamp
    
    const time_formats: [number, string, number | string][] = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    const seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;

    if (seconds < 60) {
      return 'Just now'
    }
    // if (seconds < 0) {
    //   seconds = Math.abs(seconds);
    //   token = 'from now';
    //   list_choice = 2;
    // }
    let i = 0,
      format;
    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  } catch (error) {
    console.error(error)
    return ''
  }
}

export const getConnectionColor = (type: ConnectionType | string) => {
  const colors: { [key: ConnectionType | string]: string } = {
    friend: "bg-blue-100 text-blue-800",
    folk: "bg-purple-100 text-purple-800",
    colleague: "bg-yellow-100 text-yellow-800",
    spouse: "bg-pink-100 text-pink-800",
    cake_shop: "bg-green-100 text-green-800",
    clothing: "bg-indigo-100 text-indigo-800",
    shoe: "bg-red-100 text-red-800",
    cologne: "bg-teal-100 text-teal-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};