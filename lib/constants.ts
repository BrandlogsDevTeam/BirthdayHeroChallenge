export const LOG_STORY_BHC = [
    {
        "title": "Birthday Log Story",
        "image_urls": [
            "https://nvscstkpbvmpgfdaqlqk.supabase.co/storage/v1/object/public/public-image/default/bhc-1.png"
        ],
        "story_type": "single_day",
        "description": "Hey guys! I can't wait for my birthday this year as I impact lives through Birthday Hero Challenge."
    }
]

export const LOG_STORY_ECS = [
    {
        "title": "Birthday Hero Challenge",
        "description": "Welcome to the age of hunger liberation! Redefining hunger philanthropy for 8 billion people!",
        "image_urls": [
            "https://nvscstkpbvmpgfdaqlqk.supabase.co/storage/v1/object/public/public-image/default/ecs-1.png"
        ],
        "story_type": "multi_day",
        "start_date": "2024-12-31T18:30:00.000Z",
        "end_date": "2029-12-30T18:30:00.000Z",
        "start_time": "00:00",
        "end_time": "23:59"
    },
    {
        "title": "Birthday Hero Challenge",
        "description": "Welcome to the age of hunger liberation! Redefining hunger philanthropy for 8 billion people!",
        "image_urls": [
            "https://nvscstkpbvmpgfdaqlqk.supabase.co/storage/v1/object/public/public-image/default/ecs-2.png"
        ],
        "story_type": "multi_day",
        "start_date": "2024-12-31T18:30:00.000Z",
        "end_date": "2029-12-30T18:30:00.000Z",
        "start_time": "00:00",
        "end_time": "23:59"
    },
    {
        "title": "Birthday Hero Challenge",
        "description": "Welcome to the age of hunger liberation! Redefining hunger philanthropy for 8 billion people!",
        "image_urls": [
            "https://nvscstkpbvmpgfdaqlqk.supabase.co/storage/v1/object/public/public-image/default/ecs-3.png"
        ],
        "story_type": "multi_day",
        "start_date": "2024-12-31T18:30:00.000Z",
        "end_date": "2029-12-30T18:30:00.000Z",
        "start_time": "00:00",
        "end_time": "23:59"
    },
    {
        "title": "Birthday Hero Challenge",
        "description": "Welcome to the age of hunger liberation! Redefining hunger philanthropy for 8 billion people!",
        "image_urls": [
            "https://nvscstkpbvmpgfdaqlqk.supabase.co/storage/v1/object/public/public-image/default/ecs-4.png"
        ],
        "story_type": "multi_day",
        "start_date": "2024-12-31T18:30:00.000Z",
        "end_date": "2029-12-30T18:30:00.000Z",
        "start_time": "00:00",
        "end_time": "23:59"
    },
]

interface Timezone {
    value: string;
    label: string;
    offset: string;
    interval: string;
}

export const TIMEZONE_OPTIONS: Timezone[] = [
    { "value": "UTC", "interval": "00:00:00", "label": "UTC", "offset": "Coordinated Universal Time" },
    { "value": "GMT", "interval": "00:00:00", "label": "GMT", "offset": "Greenwich Mean Time" },
    { "value": "EST", "interval": "-05:00:00", "label": "EST", "offset": "Eastern Standard Time (UTC-5)" },
    { "value": "EDT", "interval": "-04:00:00", "label": "EDT", "offset": "Eastern Daylight Time (UTC-4)" },
    { "value": "CST", "interval": "-06:00:00", "label": "CST", "offset": "Central Standard Time (UTC-6)" },
    { "value": "CDT", "interval": "-05:00:00", "label": "CDT", "offset": "Central Daylight Time (UTC-5)" },
    { "value": "PST", "interval": "-08:00:00", "label": "PST", "offset": "Pacific Standard Time (UTC-8)" },
    { "value": "PDT", "interval": "-07:00:00", "label": "PDT", "offset": "Pacific Daylight Time (UTC-7)" },
    { "value": "IST", "interval": "05:30:00", "label": "IST", "offset": "Indian Standard Time (UTC+5:30)" },
    { "value": "EAT", "interval": "03:00:00", "label": "EAT", "offset": "East Africa Time (UTC+3)" },
    { "value": "CAT", "interval": "02:00:00", "label": "CAT", "offset": "Central Africa Time (UTC+2)" },
    { "value": "WAT", "interval": "01:00:00", "label": "WAT", "offset": "West Africa Time (UTC+1)" },
    { "value": "CET", "interval": "01:00:00", "label": "CET", "offset": "Central European Time (UTC+1)" },
    { "value": "EET", "interval": "02:00:00", "label": "EET", "offset": "Eastern European Time (UTC+2)" },
    { "value": "JST", "interval": "09:00:00", "label": "JST", "offset": "Japan Standard Time (UTC+9)" },
    { "value": "AEST", "interval": "10:00:00", "label": "AEST", "offset": "Australian Eastern Standard Time (UTC+10)" },
    { "value": "ACST", "interval": "09:30:00", "label": "ACST", "offset": "Australian Central Standard Time (UTC+9:30)" },
    { "value": "AWST", "interval": "08:00:00", "label": "AWST", "offset": "Australian Western Standard Time (UTC+8)" },
    { "value": "NZST", "interval": "12:00:00", "label": "NZST", "offset": "New Zealand Standard Time (UTC+12)" },
    { "value": "NST", "interval": "11:30:00", "label": "NST", "offset": "Newfoundland Standard Time (UTC-3:30)" },
    { "value": "HST", "interval": "-10:00:00", "label": "HST", "offset": "Hawaii-Aleutian Standard Time (UTC-10)" }
]

export const LOG_STORY_DURATIONS = [
    {
        "id": "-24hr",
        "value": 86400,
        "content": "24 Hours before Log Story"
    },
    {
        "id": "-6hr",
        "value": 21600,
        "content": "6 Hours before Log Story"
    },
    {
        "id": "-2hr",
        "value": 7200,
        "content": "2 Hours before Log Story"
    },
    {
        "id": "-30min",
        "value": 1800,
        "content": "30 mins before Log Story"
    },
    {
        "id": "0hrs",
        "value": 0,
        "content": "Same as Log Story"
    },
    {
        "id": "24hr",
        "value": -86400,
        "content": "24 Hours after Log Story"
    }
]