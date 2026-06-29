import { useState, useCallback, useRef, useEffect } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles, getPlatformFromUrl } from "@/utils/dataHelpers";
import { useStore } from "@/store/useStore";
import { StatCard } from "@/components/common/StatCard";
import { motion } from "framer-motion";
import { Target, Users, TrendingUp, Zap, Bookmark } from "lucide-react";

function formatReach(count: number) {
  if (count >= 1000000000) return (count / 1000000000).toFixed(1) + "B";
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return count.toLocaleString();
}

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut command listener for ⌘ K / Ctrl K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  // Compute platform statistics dynamically
  const totalPlatformReach = allProfiles.reduce((sum, p) => sum + p.followers, 0);
  
  const validRates = allProfiles.filter((p) => p.engagement_rate !== undefined);
  const avgPlatformEngagement =
    validRates.length > 0
      ? validRates.reduce((sum, p) => sum + (p.engagement_rate || 0), 0) / validRates.length
      : 0;

  const savedCount = useStore((state) => 
    state.selectedProfiles.filter(p => getPlatformFromUrl(p.url) === platform).length
  );

  const handleProfileClick = useCallback(() => {
    // Navigation handled inside ProfileCard
  }, []);

  const handlePlatformChange = useCallback((p: Platform) => {
    setPlatform(p);
    setSearchQuery("");
  }, []);

  return (
    <Layout>
      {/* Premium Hero Section */}
      <div className="relative pt-10 pb-12 overflow-hidden w-full">
        {/* Glow circles behind the Hero */}
        <div className="absolute top-0 left-1/4 glow-purple opacity-70 -z-10 translate-x-[-50%] translate-y-[-20%]" />
        <div className="absolute top-0 right-1/4 glow-indigo opacity-70 -z-10 translate-x-[50%] translate-y-[-20%]" />

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center space-y-3"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-200/50 dark:border-white/[0.06] bg-purple-500/5 backdrop-blur-md text-xs font-black text-purple-700 dark:text-purple-400 select-none">
            <Target className="h-3.5 w-3.5" />
            <span>Introducing CreatorScope 1.0</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
            Discover the World's <br />
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              Top Content Creators
            </span>
          </h2>
          
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Search, analyze, and shortlist top influencers across Instagram, YouTube, and TikTok with real-time analytics.
          </p>
        </motion.div>
      </div>

      {/* Custom platform switcher and search box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <PlatformFilter
          selected={platform}
          onChange={handlePlatformChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          inputRef={searchInputRef}
        />
      </motion.div>

      {/* Dashboard Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-10"
      >
        <StatCard
          label="Total Creators"
          value={allProfiles.length}
          icon={<Users className="h-4.5 w-4.5" />}
          description="Indexed platform accounts"
          accentColor="purple"
        />
        <StatCard
          label="Total Reach"
          value={formatReach(totalPlatformReach)}
          icon={<TrendingUp className="h-4.5 w-4.5" />}
          description="Combined follower count"
          accentColor="blue"
        />
        <StatCard
          label="Avg Engagement"
          value={(avgPlatformEngagement * 100).toFixed(2) + "%"}
          icon={<Zap className="h-4.5 w-4.5" />}
          description="Mean platform interaction rate"
          accentColor="emerald"
        />
        <StatCard
          label="Saved Creators"
          value={savedCount}
          icon={<Bookmark className="h-4.5 w-4.5" />}
          description="Shortlisted on this platform"
          accentColor="pink"
        />
      </motion.div>

      {/* Grid stats line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-4 w-full border-b border-border pb-2 text-left"
      >
        <span className="text-[11px] sm:text-xs text-zinc-400 dark:text-zinc-500 font-extrabold uppercase tracking-wider">
          🔍 Creator Discovery
        </span>
        <span className="text-[11px] sm:text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
          {filtered.length === allProfiles.length
            ? `${allProfiles.length} Influencers Available`
            : `${filtered.length} of ${allProfiles.length} Influencers Matched`}
        </span>
      </motion.div>

      {/* Grid Content List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <ProfileList
          profiles={filtered}
          platform={platform}
          onProfileClick={handleProfileClick}
        />
      </motion.div>
    </Layout>
  );
}
