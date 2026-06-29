import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse, Platform } from "@/types";
import { formatEngagementRate, formatNumber } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useStore } from "@/store/useStore";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/common/Button";
import { getInfluencerMeta, PLATFORM_BRANDS } from "@/constants";
import {
  Users, TrendingUp, FileText, Heart, MessageSquare, Play, Zap,
  ArrowLeft, ExternalLink, Check, Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { PlatformBadge } from "@/components/common/PlatformBadge";

function fmt(count: number) {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(2) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(1) + "K";
  return count.toLocaleString();
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  const addProfile = useStore((s) => s.addProfile);
  const removeProfile = useStore((s) => s.removeProfile);
  const selectedProfiles = useStore((s) => s.selectedProfiles);

  useEffect(() => {
    if (!username) return;
    loadProfileByUsername(username).then((d) => { setProfileData(d); setLoaded(true); });
  }, [username]);

  if (!username) return (
    <Layout><div className="py-12 text-center">
      <p className="text-red-500 mb-4">Invalid username</p>
      <Link to="/"><Button variant="outline">Back to Search</Button></Link>
    </div></Layout>
  );

  if (!loaded) return (
    <Layout>
      <div className="max-w-6xl mx-auto animate-pulse space-y-4 py-4">
        <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">
          <div className="h-[500px] bg-zinc-100 dark:bg-zinc-800/40 rounded-3xl" />
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-32 bg-zinc-100 dark:bg-zinc-800/40 rounded-2xl" />)}
          </div>
        </div>
      </div>
    </Layout>
  );

  if (!profileData) return (
    <Layout><div className="max-w-md mx-auto py-12 text-center">
      <p className="text-red-600 mb-6 font-semibold">Could not load "{username}"</p>
      <Link to="/"><Button variant="primary">Back to search</Button></Link>
    </div></Layout>
  );

  const user: FullUserProfile = profileData.data.user_profile;
  const platform = (searchParams.get("platform") || user.type || "unknown") as Platform;
  const isSelected = selectedProfiles.some((p) => p.user_id === user.user_id);

  const toggle = () => isSelected ? removeProfile(user.user_id) : addProfile(user);

  const meta = getInfluencerMeta(user.username);
  const brand = PLATFORM_BRANDS[platform] || { label: platform };

  const stats = [
    { label: "Followers", value: fmt(user.followers), icon: <Users className="h-5 w-5 text-purple-500" />, highlight: true },
    user.engagement_rate != null && { label: "Engagement Rate", value: formatEngagementRate(user.engagement_rate), icon: <TrendingUp className="h-4 w-4" /> },
    user.posts_count != null && { label: "Total Posts", value: formatNumber(user.posts_count), icon: <FileText className="h-4 w-4" /> },
    user.avg_likes != null && { label: "Avg Likes", value: fmt(user.avg_likes), icon: <Heart className="h-4 w-4" /> },
    user.avg_comments != null && { label: "Avg Comments", value: formatNumber(user.avg_comments), icon: <MessageSquare className="h-4 w-4" /> },
    user.avg_views != null && user.avg_views > 0 && { label: "Avg Views", value: fmt(user.avg_views), icon: <Play className="h-4 w-4" /> },
    user.engagements != null && { label: "Total Engagements", value: formatNumber(user.engagements), icon: <Zap className="h-4 w-4" /> },
  ].filter(Boolean) as { label: string; value: string; icon: React.ReactNode; highlight?: boolean }[];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-6xl mx-auto text-left w-full"
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Link>

        {/* Main split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">

          {/* ── LEFT: Profile card ── */}
          <div className="rounded-3xl border border-border bg-card shadow-sm flex flex-col relative">

            {/* Gradient banner */}
            <div className={`h-36 w-full relative flex-shrink-0 rounded-t-3xl overflow-hidden bg-gradient-to-br ${meta.brandColor}`}>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="absolute inset-0 bg-black/15 dark:bg-black/30" />
            </div>

            {/* Avatar — sits exactly half-in, half-out of the banner */}
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '96px' }}>
              <div className={`p-[3px] rounded-full bg-gradient-to-tr ${meta.brandColor} shadow-xl`} style={{ padding: '3px' }}>
                <div className="rounded-full border-4 border-card dark:border-zinc-950 overflow-hidden w-24 h-24">
                  <Avatar
                    src={user.picture}
                    name={user.fullname}
                    className="w-24 h-24"
                  />
                </div>
              </div>
            </div>

            {/* Body — pt-16 to clear the avatar that overhangs */}
            <div className="flex flex-col items-center text-center px-6 pb-6 flex-1 pt-16">

              {/* Name */}
              <h2 className="mt-3 text-2xl font-black text-foreground flex items-center gap-1.5 m-0 leading-tight">
                {user.fullname}
                <VerifiedBadge verified={user.is_verified} />
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mt-0.5">
                @{user.username}
              </p>

              {/* Platform + Country badges */}
              <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
                <PlatformBadge platform={platform as Platform} className="text-xs px-2.5 py-1 rounded-lg" />
                <span className="text-xs font-semibold px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg">
                  {meta.country}
                </span>
              </div>

              {/* Category */}
              <p className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mt-2">
                {meta.category}
              </p>

              {/* Followers highlight pill */}
              <div className="mt-4 w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-500/[0.07] to-indigo-500/[0.07] border border-purple-500/20 dark:border-purple-500/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="text-xs font-semibold">Followers</span>
                </div>
                <span className="text-xl font-black text-zinc-900 dark:text-zinc-50">
                  {fmt(user.followers)}
                </span>
              </div>

              {/* Bio */}
              {user.description && (
                <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-4 text-left w-full">
                  {user.description}
                </p>
              )}

              {/* External link */}
              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  View on {brand.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {/* Save button pinned to bottom */}
              <div className="mt-auto pt-5 w-full">
                <Button
                  onClick={toggle}
                  variant={isSelected ? "primary" : "secondary"}
                  icon={isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  className={`w-full justify-center text-sm transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-transparent shadow-md shadow-emerald-500/15"
                      : ""
                  }`}
                >
                  {isSelected ? "Saved to List" : "Save Creator"}
                </Button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Stats panel ── */}
          <div className="flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
              📊 Account Statistics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  className={`rounded-2xl border p-5 flex flex-col gap-3 transition-all duration-200 ${
                    stat.highlight
                      ? "col-span-2 sm:col-span-3 bg-gradient-to-r from-purple-500/[0.06] to-indigo-500/[0.06] border-purple-500/20 dark:border-purple-500/10 border-t-2 border-t-purple-500/60"
                      : "bg-card border-border border-t-2 border-t-zinc-300/60 dark:border-t-white/[0.08] hover:border-t-purple-400/50 dark:hover:border-t-purple-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                      {stat.label}
                    </span>
                    <span className={`p-1.5 rounded-lg ${stat.highlight ? "bg-purple-500/10 text-purple-500" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"}`}>
                      {stat.icon}
                    </span>
                  </div>
                  <span className={`font-black text-foreground leading-none tracking-tight ${stat.highlight ? "text-5xl" : "text-3xl"}`}>
                    {stat.value}
                  </span>
                  {stat.highlight && (
                    <div className="w-full h-1 rounded-full bg-purple-200/40 dark:bg-purple-500/10 overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-60" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </Layout>
  );
}
