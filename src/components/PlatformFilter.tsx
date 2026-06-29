import { motion } from "framer-motion";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

const BRAND_COLORS: Record<Platform, string> = {
  instagram: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-lg shadow-pink-500/10",
  youtube: "bg-[#FF0000] text-white shadow-lg shadow-red-500/10",
  tiktok: "bg-gradient-to-r from-[#00F2EA] to-[#FF0050] text-white shadow-lg shadow-cyan-500/10",
};

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
  inputRef,
}: PlatformFilterProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-10 space-y-6">
      {/* Premium Segmented Platform Tabs with active slider indicator */}
      <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] p-1 rounded-2xl flex items-center justify-between w-full max-w-sm mx-auto shadow-inner select-none relative h-11.5">
        {PLATFORMS.map((p) => {
          const isSelected = selected === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={`flex-1 text-center py-2 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer relative z-10 h-full flex items-center justify-center rounded-xl focus:outline-none ${
                isSelected
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activePlatformIndicator"
                  className={`absolute inset-0 rounded-xl z-[-1] ${BRAND_COLORS[p]}`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span>{getPlatformLabel(p)}</span>
            </button>
          );
        })}
      </div>

      {/* Modern Search bar wrapper with icon and command shortcut */}
      <div className="relative max-w-[900px] mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search ${getPlatformLabel(selected)} creators by handle or name...`}
          aria-label={`Search ${getPlatformLabel(selected)} creators by handle or name`}
          className="w-full pl-11 pr-4 sm:pr-16 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 focus:shadow-xl focus:shadow-purple-500/[0.02] shadow-sm transition-all duration-200"
        />

        {searchQuery ? (
          <button
            onClick={() => onSearchChange("")}
            type="button"
            aria-label="Clear search query"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300 cursor-pointer transition-colors focus:outline-none focus:text-purple-600 rounded-lg"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-800 text-[10px] font-black text-zinc-400 dark:text-zinc-500 rounded-md select-none">
              <span>⌘</span>K
            </kbd>
          </div>
        )}
      </div>
    </div>
  );
}
