import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { SelectedSidebar } from "./SelectedSidebar";

import { Moon, Compass, Bookmark, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const selectedCount = useStore((state) => state.selectedProfiles.length);
  const location = useLocation();

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  const isExploreActive = location.pathname === "/" && !isSidebarOpen;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground w-full">
      {/* Floating Sticky header navbar */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 lg:px-12 pt-5 pb-2 bg-transparent pointer-events-none">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="max-w-[1600px] mx-auto w-full h-16 rounded-full border border-zinc-200/50 dark:border-white/[0.08] bg-white/85 dark:bg-[#141416]/80 backdrop-blur-xl shadow-lg shadow-zinc-250/5 dark:shadow-black/25 flex items-center justify-between px-3.5 sm:px-6 pointer-events-auto"
        >
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-2 text-lg font-black tracking-tight text-foreground hover:opacity-90 transition-opacity"
          >
            <svg className="h-5.5 w-5.5 text-purple-600 dark:text-purple-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" />
              <circle cx="12" cy="12" r="3.5" className="fill-white dark:fill-zinc-950" />
            </svg>
            <span className="hidden sm:inline font-extrabold bg-gradient-to-r from-zinc-950 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
              CreatorScope
            </span>
          </Link>

          {/* Center Segmented Navigation */}
          <nav className="flex items-center bg-zinc-100/60 dark:bg-white/[0.03] p-1 rounded-full border border-zinc-200/30 dark:border-white/[0.04] relative select-none">
            {/* Explore Tab */}
            <Link
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                isExploreActive
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Explore</span>
              {isExploreActive && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-white dark:bg-[#1c1c1f] border border-zinc-200/50 dark:border-white/[0.08] shadow-xs rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Saved Tab */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSidebarOpen
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>Saved</span>
              {selectedCount > 0 && (
                <motion.span
                  key={selectedCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="bg-purple-600 dark:bg-purple-500 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-md ml-0.5"
                >
                  {selectedCount}
                </motion.span>
              )}
              {isSidebarOpen && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-white dark:bg-[#1c1c1f] border border-zinc-200/50 dark:border-white/[0.08] shadow-xs rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Sliding Track Theme Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              className="relative flex items-center justify-between bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-white/[0.12] w-16 h-9 cursor-pointer p-1.5 rounded-full shadow-inner select-none pointer-events-auto transition-all"
              aria-label="Toggle Theme"
            >
              {/* Sliding bubble - animated automatically via Framer Motion layout */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="absolute top-1.5 h-6 w-6 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-white/[0.08] shadow-md z-0"
                style={{ left: theme === "dark" ? "calc(100% - 24px - 6px)" : "6px" }}
              />
              
              {/* Slot 1 Icon (Light Mode - Sparkles) */}
              <div className="w-6 h-6 flex items-center justify-center z-10 pointer-events-none">
                <Sparkles className={`h-3.5 w-3.5 transition-colors duration-200 ${theme === "light" ? "text-purple-600 font-extrabold" : "text-zinc-400"}`} />
              </div>

              {/* Slot 2 Icon (Dark Mode - Moon) */}
              <div className="w-6 h-6 flex items-center justify-center z-10 pointer-events-none">
                <Moon className={`h-3.5 w-3.5 transition-colors duration-200 ${theme === "dark" ? "text-purple-400 font-extrabold" : "text-zinc-500"}`} />
              </div>
            </button>
          </div>
        </motion.div>
      </header>

      {/* Main page content area */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-8 md:py-12 text-center">
        {title && (
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            {title}
          </h1>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-surface/40 backdrop-blur-sm py-5 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 dark:text-zinc-500">
          <span className="font-semibold">
            © 2026 <span className="text-purple-600 dark:text-purple-400 font-bold">CreatorScope</span>
          </span>
          <span className="hidden sm:block">·</span>
          <span>Built with React · TypeScript · Zustand · Framer Motion</span>
          <span className="hidden sm:block">·</span>
          <span>Designed & Developed by <span className="font-bold text-zinc-600 dark:text-zinc-300">Gaurav Kumar Dubey</span></span>
        </div>
      </footer>

      {/* Selected Influencers Drawer Panel */}
      <SelectedSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
