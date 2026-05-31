import {
  LayoutDashboard,
  Users,
  FileText,
  Wallet,
  MessageCircle,
  Settings,
  LifeBuoy,
  X,
  Calendar,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "Attendance", icon: Calendar, id: "attendance" },
  { label: "Students", icon: Users, id: "students" },
  { label: "Report Cards", icon: FileText, id: "reports" },
  { label: "Fees", icon: Wallet, id: "fees" },
  { label: "WhatsApp Dispatch", icon: MessageCircle, id: "dispatch" },
  { label: "Settings", icon: Settings, id: "settings" },
];

function SidebarContent({ onCloseMobile, onNavigate, currentView }) {
  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-slate-200 p-4 lg:hidden dark:border-slate-800">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Navigation
        </div>
        <button
          onClick={onCloseMobile}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Desktop spacing */}
      <div className="hidden lg:block">
        <div className="border-b border-slate-200 px-4 py-4 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Workspace
          </div>
        </div>
      </div>

      {/* Mobile workspace label */}
      <div className="px-4 pt-4 lg:hidden">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Workspace
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <li key={item.label}>
                <button
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  className={[
                    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "h-4 w-4",
                      isActive
                        ? "text-blue-600 dark:text-blue-300"
                        : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300",
                    ].join(" ")}
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer help card */}
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Need help?
            </div>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-slate-600 dark:text-slate-400">
            We onboard your school in under 30 minutes.
          </p>
          <button className="mt-2 w-full rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">
            Talk to support
          </button>
        </div>
      </div>
    </>
  );
}

export default function Sidebar({
  mobileOpen,
  onCloseMobile,
  onNavigate,
  currentView,
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="
          hidden lg:flex lg:flex-col
          sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0
          border-r border-slate-200 bg-white
          dark:border-slate-800 dark:bg-slate-950
        "
      >
        <SidebarContent
          onCloseMobile={() => { }}
          onNavigate={onNavigate}
          currentView={currentView}
        />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
            onClick={onCloseMobile}
            aria-label="Close sidebar overlay"
          />
          <aside
            className="
              absolute left-0 top-0 h-full w-[88%] max-w-xs
              border-r border-slate-200 bg-white shadow-xl
              dark:border-slate-800 dark:bg-slate-950
            "
          >
            <div className="flex h-full flex-col">
              <SidebarContent
                onCloseMobile={onCloseMobile}
                onNavigate={onNavigate}
                currentView={currentView}
              />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}