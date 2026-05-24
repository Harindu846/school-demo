export default function ThemeToggle({ theme, setTheme }) {
  const items = [
    { key: "light", label: "Light" },
    { key: "dark", label: "Dark" },
    { key: "system", label: "System" },
  ];

  return (
    <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {items.map((it) => {
        const active = theme === it.key;
        return (
          <button
            key={it.key}
            onClick={() => setTheme(it.key)}
            className={[
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
              "focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-950/40",
              active
                ? "bg-blue-600 text-white"
                : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800",
            ].join(" ")}
            aria-pressed={active}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}