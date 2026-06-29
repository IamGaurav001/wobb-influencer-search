import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse, Platform } from "@/types";
import { formatEngagementRate, formatNumber } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useStore } from "@/store/useStore";
import { Avatar } from "@/components/common/Avatar";
import { StatCard } from "@/components/common/StatCard";
import { Button } from "@/components/common/Button";
import { getInfluencerMeta, PLATFORM_BRANDS } from "@/constants";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return count.toLocaleString();
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  
  const addProfile = useStore((state) => state.addProfile);
  const removeProfile = useStore((state) => state.removeProfile);
  const selectedProfiles = useStore((state) => state.selectedProfiles);

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="py-12">
          <p className="text-red-500 mb-4">Invalid profile username specified</p>
          <Link to="/">
            <Button variant="outline">Back to Search</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        {/* Simple layout skeletons */}
        <div className="max-w-3xl mx-auto py-12 animate-pulse space-y-6">
          <div className="h-24 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto" />
          <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto" />
          <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-zinc-150 dark:bg-zinc-850 rounded-xl" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <div className="max-w-md mx-auto py-12 text-center">
          <p className="text-red-600 mb-6 font-semibold">
            Could not load profile details for "{username}"
          </p>
          <Link to="/">
            <Button variant="primary">Back to search</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const platform = (searchParams.get("platform") || user.type || "unknown") as Platform;
  
  const isSelected = selectedProfiles.some((p) => p.user_id === user.user_id);

  const handleAddToggle = () => {
    if (isSelected) {
      removeProfile(user.user_id);
    } else {
      addProfile(user);
    }
  };

  const meta = getInfluencerMeta(user.username);
  const brand = PLATFORM_BRANDS[platform] || {
    label: platform,
    color: "bg-zinc-550",
    text: "text-zinc-600 dark:text-zinc-400",
    bg: "bg-zinc-100 dark:bg-zinc-850",
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Back navigation link */}
        <div className="text-left mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-650 hover:text-purple-800 transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Search</span>
          </Link>
        </div>

        {/* Profile Card details wrapper */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl shadow-md overflow-hidden text-left flex flex-col">
          {/* Header strip colored with user brand gradient */}
          <div className={`h-4 bg-gradient-to-r ${meta.brandColor}`} />

          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Left side: big avatar fallback */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className={`p-1 rounded-full bg-gradient-to-tr ${meta.brandColor}`}>
                <Avatar
                  src={user.picture}
                  name={user.fullname}
                  className="w-28 h-28 border-4 border-white dark:border-zinc-900"
                />
              </div>
              
              <Button
                onClick={handleAddToggle}
                variant={isSelected ? "primary" : "secondary"}
                className="w-full"
              >
                {isSelected ? "Added to Selection" : "Add to List"}
              </Button>
            </div>

            {/* Right side: details */}
            <div className="flex-1 min-w-0 w-full">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2 m-0">
                    {user.fullname}
                    <VerifiedBadge verified={user.is_verified} />
                  </h2>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-1">
                    @{user.username}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg ${brand.bg} ${brand.text}`}
                  >
                    {brand.label}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-350 rounded-lg">
                    {meta.country}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div className="text-xs font-semibold text-purple-650 dark:text-purple-400 uppercase tracking-wider mt-4">
                {meta.category}
              </div>

              {/* Bio/Description */}
              {user.description && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-650 dark:text-zinc-350 font-normal">
                  {user.description}
                </p>
              )}

              {/* External platform profile link */}
              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <span>View on {brand.label}</span>
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              {/* Statistics Grid */}
              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
                  Account Statistics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <StatCard
                    label="Followers"
                    value={formatFollowersDetail(user.followers)}
                  />
                  <StatCard
                    label="Engagement Rate"
                    value={formatEngagementRate(user.engagement_rate)}
                  />
                  {user.posts_count !== undefined && (
                    <StatCard
                      label="Total Posts"
                      value={formatNumber(user.posts_count)}
                    />
                  )}
                  {user.avg_likes !== undefined && (
                    <StatCard
                      label="Avg Likes"
                      value={formatFollowersDetail(user.avg_likes)}
                    />
                  )}
                  {user.avg_comments !== undefined && (
                    <StatCard
                      label="Avg Comments"
                      value={formatNumber(user.avg_comments)}
                    />
                  )}
                  {user.avg_views !== undefined && user.avg_views > 0 && (
                    <StatCard
                      label="Avg Views"
                      value={formatFollowersDetail(user.avg_views)}
                    />
                  )}
                  {user.engagements !== undefined && (
                    <StatCard
                      label="Total Engagements"
                      value={formatNumber(user.engagements)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
