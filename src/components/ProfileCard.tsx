import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useStore } from "@/store/useStore";
import { Avatar } from "./common/Avatar";
import { Button } from "./common/Button";
import { getInfluencerMeta } from "@/constants";
import { Check, Eye, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { PlatformBadge } from "./common/PlatformBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return count.toString();
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const isSelected = useStore((state) => state.isSelected(profile.user_id));
  const addProfile = useStore((state) => state.addProfile);
  const removeProfile = useStore((state) => state.removeProfile);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAddToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeProfile(profile.user_id);
    } else {
      addProfile(profile);
    }
  };

  const meta = getInfluencerMeta(profile.username);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={handleClick}
      className="bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-900 dark:to-zinc-950/70 border border-zinc-200/60 dark:border-white/[0.04] rounded-3xl p-5 flex flex-col justify-between gap-5 cursor-pointer hover:border-purple-400/50 dark:hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/[0.08] dark:hover:shadow-purple-500/[0.06] transition-all duration-200 text-center relative"
    >
      {/* Category / Platform Header Tag */}
      <div className="flex justify-between items-center w-full">
        <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
          {meta.category.split(" / ")[0]}
        </span>
        <PlatformBadge platform={platform} />
      </div>

      {/* Main details with big Avatar */}
      <div className="flex flex-col items-center gap-3">
        <div className={`p-[1.5px] rounded-full bg-gradient-to-tr ${meta.brandColor} shadow-md`}>
          <Avatar
            src={profile.picture}
            name={profile.fullname}
            className="w-22 h-22 border-2 border-white dark:border-zinc-900"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-center gap-1">
            <span className="font-extrabold text-base sm:text-[17px] text-zinc-900 dark:text-zinc-50 truncate max-w-[160px]">
              {profile.fullname}
            </span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <div className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            @{profile.username}
          </div>
          <div className="text-[11px] sm:text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-semibold">
            {meta.country}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-2 bg-zinc-50/50 dark:bg-zinc-900/30 p-3 rounded-2xl border border-zinc-200/40 dark:border-white/[0.03]">
        <div className="text-center">
          <div className="text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
            Followers
          </div>
          <div className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-zinc-100 mt-0.5">
            {formatFollowersLocal(profile.followers)}
          </div>
        </div>
        <div className="text-center border-l border-zinc-200/50 dark:border-white/[0.04]">
          <div className="text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
            Engagement
          </div>
          <div className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-zinc-100 mt-0.5">
            {profile.engagement_rate !== undefined
              ? `${(profile.engagement_rate * 100).toFixed(2)}%`
              : "N/A"}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-white/[0.04]">
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          variant="outline"
          size="md"
          icon={<Eye className="h-3.5 w-3.5" />}
          className="justify-center w-full"
        >
          View
        </Button>
        <Button
          type="button"
          onClick={handleAddToggle}
          variant={isSelected ? "primary" : "secondary"}
          size="md"
          icon={isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          className={`justify-center w-full transition-all duration-300 ${
            isSelected
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-transparent shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20"
              : ""
          }`}
        >
          {isSelected ? "Saved" : "Save"}
        </Button>
      </div>
    </motion.div>
  );
});
