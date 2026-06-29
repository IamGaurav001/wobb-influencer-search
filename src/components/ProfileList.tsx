import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  onProfileClick,
}: ProfileListProps) {
  return (
    <div className="w-full">
      {profiles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20 flex flex-col items-center justify-center text-center max-w-sm mx-auto"
        >
          {/* Icon */}
          <div className="relative mb-6">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/[0.08] dark:to-indigo-500/[0.08] border border-purple-200/50 dark:border-purple-500/10 flex items-center justify-center shadow-inner">
              <Search className="h-8 w-8 text-purple-500/60 dark:text-purple-400/60" />
            </div>
            {/* Decorative dots */}
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-400/40 dark:bg-purple-500/30" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-indigo-400/40 dark:bg-indigo-500/30" />
          </div>

          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">
            No creators found
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            We couldn't find any creators matching your search.
            <br />
            Try a different keyword or clear the filter.
          </p>

          {/* Decorative pill tags */}
          <div className="flex gap-2 mt-5 flex-wrap justify-center">
            {["cristiano", "mrbeast", "khaby"].map((hint) => (
              <span
                key={hint}
                className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-white/[0.04]"
              >
                Try "{hint}"
              </span>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 w-full">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.user_id}
              profile={profile}
              platform={platform}
              onProfileClick={onProfileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
