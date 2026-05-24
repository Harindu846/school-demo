import {
  LayoutDashboard,
  Users,
  FileText,
  Wallet,
  MessageCircle,
  Settings,
  LifeBuoy,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Students", icon: Users },
  { label: "Report Cards", icon: FileText },
  { label: "Fees", icon: Wallet },
  { label: "WhatsApp Dispatch", icon: MessageCircle },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside
      className="
        hidden lg:flex lg:flex-col
        sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0
        border-r border-slate-200 bg-white
        dark:border-slate-800 dark:bg-slate-950
      "
    >
      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Workspace
        </div>

        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <button
                  className={[
                    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    "focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-950/40",
                    item.active
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "h-4 w-4",
                      item.active
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

      {/* Footer card (helps fill space + feels premium) */}
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
    </aside>
  );
}