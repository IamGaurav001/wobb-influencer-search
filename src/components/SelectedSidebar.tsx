import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Avatar } from "./common/Avatar";
import { Button } from "./common/Button";
import { getPlatformFromUrl } from "@/utils/dataHelpers";
import { PLATFORM_BRANDS } from "@/constants";
import { formatFollowers } from "@/utils/formatters";

interface SelectedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SelectedSidebar({ isOpen, onClose }: SelectedSidebarProps) {
  const selectedProfiles = useStore((state) => state.selectedProfiles);
  const removeProfile = useStore((state) => state.removeProfile);
  const clearProfiles = useStore((state) => state.clearProfiles);

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

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-300 z-[90] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar Drawer container */}
      <aside
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-[100] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <header className="p-4 border-b border-zinc-200 dark:border-zinc-850 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 m-0">
              Selected Creators
            </h2>
            <span className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold px-2 py-0.5 rounded-full">
              {selectedProfiles.length}
            </span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        {/* Sidebar Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selectedProfiles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 dark:text-zinc-550">
              <svg
                className="h-16 w-16 text-zinc-300 dark:text-zinc-700 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                Your list is empty
              </h3>
              <p className="text-xs max-w-[260px]">
                Browse through creators and add them to your selection list to see them here.
              </p>
            </div>
          ) : (
            selectedProfiles.map((profile) => {
              const platform = getPlatformFromUrl(profile.url);
              const brand =
                platform !== "unknown"
                  ? PLATFORM_BRANDS[platform]
                  : { label: "Social", color: "bg-zinc-500", text: "text-zinc-500", bg: "bg-zinc-50" };

              return (
                <div
                  key={profile.user_id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 group"
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
                      <span
                        className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.25 rounded-md ${brand.bg} ${brand.text}`}
                      >
                        {brand.label}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                      {formatFollowers(profile.followers)} followers
                    </div>
                  </div>
                  <button
                    onClick={() => removeProfile(profile.user_id)}
                    type="button"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer flex-shrink-0"
                    title="Remove from list"
                  >
                    <svg
                      className="h-4.5 w-4.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer */}
        {selectedProfiles.length > 0 && (
          <footer className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              <span>Total Selected</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                {selectedProfiles.length} Creator{selectedProfiles.length > 1 ? "s" : ""}
              </span>
            </div>
            <Button
              variant="outline"
              size="md"
              className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-950/20 hover:border-red-300"
              onClick={clearProfiles}
            >
              Clear Selection List
            </Button>
          </footer>
        )}
      </aside>
    </>
  );
}
