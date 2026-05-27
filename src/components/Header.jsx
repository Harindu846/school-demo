import { GraduationCap, Bell, Search, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Header({ theme, setTheme, onOpenSidebar }) {
  return (
    <header
      className="
        sticky top-0 z-30
        border-b border-slate-200 bg-white/80 backdrop-blur
        dark:border-slate-800 dark:bg-slate-950/80
      "
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={onOpenSidebar}
            className="
              inline-flex h-10 w-10 items-center justify-center rounded-xl
              border border-slate-200 bg-white text-slate-700 shadow-sm
              hover:bg-slate-50
              lg:hidden
              dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800
            "
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              School
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 sm:text-base">
              Greenwood Primary School
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search visual */}
          <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-2 hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500 lg:inline-block dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              Ctrl K
            </kbd>
          </div>

          <ThemeToggle theme={theme} setTheme={setTheme} />

          <button
            className="
              relative grid h-9 w-9 place-items-center rounded-xl
              border border-slate-200 bg-white text-slate-600 transition
              hover:bg-slate-50
              dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800
            "
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 dark:border-slate-800 dark:bg-slate-900">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              A
            </div>
            <div className="hidden leading-tight sm:block">
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                Admin User
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                Principal
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}