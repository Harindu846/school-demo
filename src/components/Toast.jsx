export function ToastItem({ toast, onClose }) {
  const styles = {
    success: {
      border: "border-emerald-200 dark:border-emerald-900",
      dot: "bg-emerald-500",
      title: "text-slate-900 dark:text-slate-50",
      msg: "text-slate-600 dark:text-slate-300",
    },
    warning: {
      border: "border-amber-200 dark:border-amber-900",
      dot: "bg-amber-500",
      title: "text-slate-900 dark:text-slate-50",
      msg: "text-slate-600 dark:text-slate-300",
    },
    info: {
      border: "border-slate-200 dark:border-slate-800",
      dot: "bg-blue-500",
      title: "text-slate-900 dark:text-slate-50",
      msg: "text-slate-600 dark:text-slate-300",
    },
  };

  const s = styles[toast.type] || styles.info;

  return (
    <div className={`pointer-events-auto w-full max-w-sm rounded-2xl border bg-white shadow-sm dark:bg-slate-900 ${s.border}`}>
      <div className="flex gap-3 p-4">
        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${s.dot}`} />
        <div className="min-w-0 flex-1">
          <div className={`text-sm font-semibold ${s.title}`}>{toast.title}</div>
          {toast.message ? <div className={`mt-0.5 text-sm ${s.msg}`}>{toast.message}</div> : null}
        </div>
        <button
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function ToastStack({ toasts, removeToast }) {
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-50 flex w-[calc(100%-2rem)] flex-col gap-3 sm:w-auto">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
}