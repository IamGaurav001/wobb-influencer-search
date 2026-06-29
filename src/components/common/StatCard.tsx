import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  className?: string;
  accentColor?: string; // e.g. "purple" | "blue" | "emerald" | "pink"
}

const accentMap: Record<string, { border: string; iconBg: string; iconText: string; gradient: string }> = {
  purple: {
    border: "border-t-2 border-t-purple-500/70",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/[0.08]",
    iconText: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500/[0.03] to-transparent",
  },
  blue: {
    border: "border-t-2 border-t-blue-500/70",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/[0.08]",
    iconText: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500/[0.03] to-transparent",
  },
  emerald: {
    border: "border-t-2 border-t-emerald-500/70",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/[0.08]",
    iconText: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500/[0.03] to-transparent",
  },
  pink: {
    border: "border-t-2 border-t-pink-500/70",
    iconBg: "bg-pink-500/10 dark:bg-pink-500/[0.08]",
    iconText: "text-pink-600 dark:text-pink-400",
    gradient: "from-pink-500/[0.03] to-transparent",
  },
};

export function StatCard({
  label,
  value,
  icon,
  description,
  className = "",
  accentColor = "purple",
}: StatCardProps) {
  const accent = accentMap[accentColor] || accentMap.purple;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
      className={`relative p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-gradient-to-b ${accent.gradient} bg-white dark:bg-zinc-900/50 backdrop-blur-md shadow-xs transition-all duration-300 flex flex-col justify-between text-left overflow-hidden ${accent.border} ${className}`}
    >
      {/* Subtle corner glow */}
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20 blur-2xl pointer-events-none bg-current" />

      <div className="flex justify-between items-start mb-3">
        <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {label}
        </span>
        {icon && (
          <span className={`flex-shrink-0 p-1.5 rounded-lg ${accent.iconBg} ${accent.iconText}`}>
            {icon}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 truncate">
          {value}
        </div>
        {description && (
          <p className="text-[10.5px] sm:text-xs text-zinc-400 dark:text-zinc-500 mt-1.5 font-normal line-clamp-1">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
