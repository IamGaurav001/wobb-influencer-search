import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) => {
    const up = item.account.user_profile as unknown as Record<string, unknown>;
    return {
      ...item.account.user_profile,
      username: (up.username || up.handle || up.custom_name || "creator") as string,
    };
  });
}

export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  if (!query) return profiles;
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return profiles;
  return profiles.filter((p) => {
    const matchUsername = (p.username || "").toLowerCase().includes(normalizedQuery);
    const matchFullname = (p.fullname || "").toLowerCase().includes(normalizedQuery);
    return matchUsername || matchFullname;
  });
}

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

export function getPlatformLabel(platform: Platform): string {
  if (platform === "instagram") return "Instagram";
  if (platform === "youtube") return "YouTube";
  return "TikTok";
}

export function getPlatformFromUrl(url: string): Platform | "unknown" {
  if (url.includes("youtube.com")) return "youtube";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("tiktok.com")) return "tiktok";
  return "unknown";
}

