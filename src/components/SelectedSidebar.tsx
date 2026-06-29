import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Avatar } from "./common/Avatar";
import { Button } from "./common/Button";
import { getPlatformFromUrl } from "@/utils/dataHelpers";
import type { Platform } from "@/types";

import { formatFollowers } from "@/utils/formatters";
import { Search, Trash2, X, Users, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PlatformBadge } from "./common/PlatformBadge";

interface SelectedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SelectedSidebar({ isOpen, onClose }: SelectedSidebarProps) {
  const selectedProfiles = useStore((state) => state.selectedProfiles);
  const removeProfile = useStore((state) => state.removeProfile);
  const clearProfiles = useStore((state) => state.clearProfiles);

  const [drawerQuery, setDrawerQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const handleClose = () => {
    setDrawerQuery("");
    onClose();
  };

  // Detect mobile screen
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Filter selected profiles locally inside the drawer
  const filtered = selectedProfiles.filter((p) => {
    return (
      p.fullname.toLowerCase().includes(drawerQuery.toLowerCase()) ||
      p.username.toLowerCase().includes(drawerQuery.toLowerCase())
    );
  });

  // Sum total followers
  const totalFollowers = selectedProfiles.reduce((sum, p) => sum + p.followers, 0);

  const mobileVariants = {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  };

  const desktopVariants = {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  };

  const variants = isMobile ? mobileVariants : desktopVariants;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs transition-opacity duration-300 z-[90] pointer-events-auto"
          />

          {/* Sidebar Drawer — bottom sheet on mobile, right panel on desktop */}
          <motion.aside
            id="saved-creators-sidebar"
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed z-[100] flex flex-col bg-white dark:bg-zinc-950 border-zinc-200 dark:border-white/[0.08] shadow-2xl
              ${isMobile
                ? "bottom-0 left-0 right-0 w-full max-h-[82vh] rounded-t-3xl border-t"
                : "right-0 top-0 h-full w-[420px] border-l"
              }`}
          >
            {/* Mobile drag handle pill */}
            {isMobile && (
              <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
            )}

            {/* Sidebar Header */}
            <header className="px-5 py-4 border-b border-zinc-200/70 dark:border-white/[0.08] flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/30 flex-shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50 m-0">
                  Selected Creators
                </h2>
                <span className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-black px-2.5 py-0.5 rounded-full">
                  {selectedProfiles.length}
                </span>
              </div>
              <Button
                onClick={handleClose}
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 flex items-center justify-center rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </Button>
            </header>

            {/* Inline search bar (if items exist) */}
            {selectedProfiles.length > 0 && (
              <div className="px-4 pt-3 pb-2 border-b border-zinc-100 dark:border-white/[0.03] flex-shrink-0">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
                    <Search className="h-3.5 w-3.5" />
                  </div>
                  <input
                    type="text"
                    value={drawerQuery}
                    onChange={(e) => setDrawerQuery(e.target.value)}
                    placeholder="Search shortlisted creators..."
                    aria-label="Search shortlisted creators"
                    className="w-full pl-9 pr-8 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all"
                  />
                  {drawerQuery && (
                    <button
                      onClick={() => setDrawerQuery("")}
                      type="button"
                      aria-label="Clear search query"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 cursor-pointer focus:outline-none focus:text-purple-600 rounded-lg"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Sidebar Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {selectedProfiles.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] flex items-center justify-center mb-4 text-zinc-400 dark:text-zinc-500 shadow-inner">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-zinc-800 dark:text-zinc-200 mb-1">
                    Your shortlist is empty
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[260px] leading-relaxed font-medium">
                    Select influencers from the explorer board to build your direct shortlist compilation.
                  </p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center p-6">
                  <div className="h-10 w-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] flex items-center justify-center mb-3 text-zinc-400 dark:text-zinc-500 shadow-inner">
                    <Search className="h-4 w-4" />
                  </div>
                  <h3 className="font-extrabold text-xs text-zinc-800 dark:text-zinc-200 mb-0.5">
                    No results found
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-[200px] leading-relaxed">
                    No shortlisted creators match "{drawerQuery}"
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {filtered.map((profile) => {
                    const platform = getPlatformFromUrl(profile.url);

                    return (
                      <motion.div
                        key={profile.user_id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200/80 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-zinc-900/20 hover:border-zinc-300 dark:hover:border-white/[0.1] transition-all duration-200 group"
                      >
                        <Avatar
                          src={profile.picture}
                          name={profile.fullname}
                          className="w-10 h-10 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50 truncate">
                              {profile.fullname}
                            </span>
                            {profile.is_verified && (
                              <span className="text-blue-500 text-xs flex-shrink-0" title="Verified Creator">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                              @{profile.username}
                            </span>
                            <PlatformBadge platform={platform as Platform} className="text-[7.5px] px-1.5 py-0.25 rounded" />
                          </div>
                          <div className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
                            {formatFollowers(profile.followers)} followers
                          </div>
                        </div>
                        <Button
                          onClick={() => removeProfile(profile.user_id)}
                          variant="ghost"
                          size="sm"
                          className="p-2 h-10 w-10 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all flex-shrink-0"
                          title="Remove from list"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Sidebar Footer with stats */}
            {selectedProfiles.length > 0 && (
              <footer className="px-4 py-4 border-t border-zinc-200/70 dark:border-white/[0.08] bg-zinc-50/50 dark:bg-zinc-900/20 space-y-3 flex-shrink-0">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Total Selected</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">
                      {selectedProfiles.length} Creator{selectedProfiles.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                      <span>Total Reach</span>
                    </span>
                    <span className="font-extrabold text-purple-700 dark:text-purple-400 text-sm">
                      {totalFollowers.toLocaleString()} followers
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 hover:bg-red-50 border-red-200 dark:border-red-950/20 dark:hover:bg-red-950/30"
                    onClick={clearProfiles}
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </div>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
