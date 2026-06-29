import type { Platform } from "@/types";

export interface InfluencerMeta {
  category: string;
  country: string;
  countryCode: string;
  brandColor: string;
}

export const INFLUENCER_METADATA: Record<string, InfluencerMeta> = {
  instagram: {
    category: "Brand / Tech",
    country: "United States 🇺🇸",
    countryCode: "US",
    brandColor: "from-purple-600 via-pink-500 to-yellow-500",
  },
  cristiano: {
    category: "Sports / Football",
    country: "Portugal 🇵🇹",
    countryCode: "PT",
    brandColor: "from-blue-600 to-emerald-500",
  },
  mrbeast: {
    category: "Entertainment / Philanthropy",
    country: "United States 🇺🇸",
    countryCode: "US",
    brandColor: "from-cyan-500 to-blue-600",
  },
  MrBeast6000: {
    category: "Entertainment / Philanthropy",
    country: "United States 🇺🇸",
    countryCode: "US",
    brandColor: "from-cyan-500 to-blue-600",
  },
  "khaby.lame": {
    category: "Comedy / Entertainment",
    country: "Italy 🇮🇹",
    countryCode: "IT",
    brandColor: "from-yellow-400 to-amber-600",
  },
  tseries: {
    category: "Music / Bollywood Labels",
    country: "India 🇮🇳",
    countryCode: "IN",
    brandColor: "from-red-600 to-orange-500",
  },
};

export function getInfluencerMeta(username: string): InfluencerMeta {
  const normalized = username.toLowerCase();
  for (const [key, value] of Object.entries(INFLUENCER_METADATA)) {
    if (key.toLowerCase() === normalized) {
      return value;
    }
  }
  return {
    category: "Content Creator",
    country: "Global 🌐",
    countryCode: "UN",
    brandColor: "from-indigo-500 to-purple-600",
  };
}

export const PLATFORM_BRANDS: Record<Platform, { label: string; color: string; bg: string; text: string }> = {
  instagram: {
    label: "Instagram",
    color: "bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600",
    bg: "bg-pink-50 dark:bg-pink-950/20",
    text: "text-pink-600 dark:text-pink-400",
  },
  youtube: {
    label: "YouTube",
    color: "bg-red-600",
    bg: "bg-red-50 dark:bg-red-950/20",
    text: "text-red-600 dark:text-red-400",
  },
  tiktok: {
    label: "TikTok",
    color: "bg-zinc-900 dark:bg-zinc-100",
    bg: "bg-zinc-100 dark:bg-zinc-800/30",
    text: "text-zinc-900 dark:text-zinc-100",
  },
};
