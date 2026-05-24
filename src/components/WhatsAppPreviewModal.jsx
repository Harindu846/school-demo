import { X, MessageCircle, FileText, AlertTriangle } from "lucide-react";

export default function WhatsAppPreviewModal({
  open,
  student,
  onClose,
}) {
  if (!open || !student) return null;

  const isPaid = student.feeStatus === "Paid";

  const message = isPaid
    ? `Hello Parent/Guardian,

${student.name}'s monthly report card is now available.

✅ Fee status: PAID
📄 Report card attached
🏫 ${student.grade}

Thank you for your continued support.

- Greenwood Primary School`
    : `Hello Parent/Guardian,

This is a reminder that ${student.name}'s school fees are currently pending.

⚠️ Fee status: PENDING
📄 Report card will be released once payment is completed.

Please contact the school office if payment has already been made.

- Greenwood Primary School`;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close WhatsApp preview"
      />

      {/* Dialog */}
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-green-600 text-white">
                <MessageCircle className="h-5 w-5" />
              </div>

              <div>
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  WhatsApp Message Preview
                </div>

                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Simulated parent message for{" "}
                  <span className="font-semibold">{student.name}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            
            {/* WhatsApp phone area */}
            <div className="rounded-2xl border border-slate-200 bg-[#e5ddd5] p-4 dark:border-slate-700 dark:bg-slate-950">
              
              {/* Chat bubble */}
              <div className="ml-auto max-w-md rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-4 py-3 shadow-sm dark:bg-emerald-950/40">
                
                {/* Top status */}
                <div className="mb-3 flex items-center gap-2">
                  {isPaid ? (
                    <>
                      <FileText className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        PDF Report Card Attached
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                        Payment Reminder
                      </span>
                    </>
                  )}
                </div>

                {/* Message */}
                <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-800 dark:text-slate-100">
                  {message}
                </pre>

                {/* Time */}
                <div className="mt-3 text-right text-[10px] text-slate-500">
                  10:42 AM ✓✓
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Parent Number
                </div>
                <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {student.whatsapp}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Grade
                </div>
                <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {student.grade}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Fee Status
                </div>
                <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {student.feeStatus}
                </div>
              </div>
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
              className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
            >
              Send Test Message (Demo)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}