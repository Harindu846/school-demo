export default function StatCard({ label, value, helper, icon: Icon, tone = "blue" }) {
  const toneMap = {
    blue: {
      ring: "ring-blue-600/10 dark:ring-blue-400/10",
      iconBg: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    },
    emerald: {
      ring: "ring-emerald-600/10 dark:ring-emerald-400/10",
      iconBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    },
    amber: {
      ring: "ring-amber-600/10 dark:ring-amber-400/10",
      iconBg: "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
    },
  };

  const t = toneMap[tone] || toneMap.blue;

  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
        "ring-1",
        "hover:-translate-y-1 hover:shadow-lg",
        t.ring,
        "dark:border-slate-800 dark:bg-slate-900"
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
            {label}
          </div>
          <div className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {value}
          </div>
          {helper ? (
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              {helper}
            </div>
          ) : null}
        </div>

        {Icon ? (
          <div className={["grid h-10 w-10 place-items-center rounded-xl", t.iconBg].join(" ")}>
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
    </div>
  );
}