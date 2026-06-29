import type { Platform } from "@/types";

interface PlatformBadgeProps {
  platform: Platform;
  className?: string;
}

export function PlatformBadge({ platform, className = "" }: PlatformBadgeProps) {
  if (platform === "instagram") {
    return (
      <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-500/10 dark:bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/20 dark:border-pink-500/10 ${className}`}>
        <svg className="h-3 w-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
        <span>Instagram</span>
      </span>
    );
  }
  if (platform === "youtube") {
    return (
      <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-500/10 dark:bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20 dark:border-red-500/10 ${className}`}>
        <svg className="h-3 w-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
        </svg>
        <span>YouTube</span>
      </span>
    );
  }
  if (platform === "tiktok") {
    return (
      <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-800/10 dark:bg-zinc-100/10 text-zinc-800 dark:text-zinc-300 border border-zinc-500/20 dark:border-zinc-100/10 ${className}`}>
        <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86 1.08 2.07 1.85 3.4 2.27.01.99.01 1.98.01 2.97-.84-.04-1.68-.22-2.47-.53-.8-.32-1.54-.78-2.18-1.37-.09 1.41-.06 2.82-.07 4.24-.04 2.29-.87 4.54-2.33 6.32-1.55 1.9-3.9 3.09-6.31 3.24-2.1.13-4.24-.4-5.97-1.62-1.89-1.33-3.08-3.48-3.18-5.81-.15-3.32 2.01-6.42 5.17-7.46.74-.24 1.51-.36 2.29-.35v3.1c-.81-.07-1.64.12-2.34.54-.78.47-1.37 1.25-1.62 2.14-.38 1.34.1 2.85 1.15 3.73.91.77 2.15 1.07 3.3.77 1.12-.29 2.05-1.18 2.39-2.27.18-.58.24-1.19.22-1.8V0z" />
        </svg>
        <span>TikTok</span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-500/10 dark:bg-zinc-400/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20 dark:border-zinc-400/10 ${className}`}>
      <span>{platform}</span>
    </span>
  );
}
