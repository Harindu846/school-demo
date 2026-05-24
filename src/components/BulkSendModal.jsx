import { X, MessageCircle, CheckCircle2, AlertTriangle } from "lucide-react";

export default function BulkSendModal({
  open,
  onClose,
  onStart,
  phase, // "idle" | "checking" | "sendingReports" | "sendingReminders" | "done"
  stats, // { paidEligible, pendingCount, alreadySent }
  result, // { reportsSent, remindersSent }
}) {
  if (!open) return null;

  const isRunning = phase !== "idle" && phase !== "done";

  const phaseLabel =
    phase === "checking"
      ? "Checking fee status…"
      : phase === "sendingReports"
      ? "Sending report cards to Paid students…"
      : phase === "sendingReminders"
      ? "Sending payment reminders to Pending students…"
      : phase === "done"
      ? "Completed"
      : "Ready";

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close bulk send modal"
      />

      {/* Dialog */}
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Bulk WhatsApp Dispatch (Demo)
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Sends report PDFs only to <span className="font-semibold">Paid</span> students. Sends reminders to{" "}
                  <span className="font-semibold">Pending</span>.
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Paid eligible</div>
                <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {stats.paidEligible}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending</div>
                <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {stats.pendingCount}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Already sent</div>
                <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {stats.alreadySent}
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              <div className="font-semibold">Status</div>
              <div className="mt-1">{phaseLabel}</div>

              {phase === "done" ? (
                <div className="mt-3 grid gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      Reports sent: <span className="font-semibold">{result.reportsSent}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span>
                      Reminders sent: <span className="font-semibold">{result.remindersSent}</span>
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-200 p-5 dark:border-slate-800">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Close
            </button>

            <button
              onClick={onStart}
              disabled={isRunning || stats.paidEligible + stats.pendingCount === 0}
              className={[
                "rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
                isRunning || stats.paidEligible + stats.pendingCount === 0
                  ? "cursor-not-allowed bg-blue-600/50"
                  : "bg-blue-600 hover:bg-blue-700",
                "focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-950/40",
              ].join(" ")}
            >
              {phase === "done" ? "Run again (Demo)" : "Start Bulk Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}