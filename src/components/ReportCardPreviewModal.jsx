import { X, Download, FileText } from "lucide-react";

const SUBJECTS = [
  { subject: "Mathematics", score: 92, grade: "A" },
  { subject: "English Language", score: 88, grade: "A" },
  { subject: "Science", score: 90, grade: "A" },
  { subject: "Social Studies", score: 84, grade: "B+" },
  { subject: "ICT", score: 95, grade: "A+" },
];

export default function ReportCardPreviewModal({
  open,
  student,
  onClose,
}) {
  if (!open || !student) return null;

  const average =
    Math.round(
      SUBJECTS.reduce((acc, s) => acc + s.score, 0) / SUBJECTS.length
    );

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close report preview"
      />

      {/* Dialog */}
      <div className="absolute inset-0 overflow-y-auto p-4">
        <div className="mx-auto flex min-h-full max-w-4xl items-center justify-center">
          <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 dark:border-slate-800">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-sm">
                  <FileText className="h-6 w-6" />
                </div>

                <div>
                  <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    PDF Report Card Preview
                  </div>

                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Simulated downloadable report card
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* PDF Sheet */}
            <div className="bg-slate-100 p-6 dark:bg-slate-950">
              <div className="mx-auto max-w-3xl rounded-md bg-white p-8 shadow-xl dark:bg-white">
                
                {/* School Header */}
                <div className="border-b border-slate-200 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-slate-900">
                        Greenwood Primary School
                      </div>

                      <div className="mt-1 text-sm text-slate-500">
                        Monthly Academic Performance Report
                      </div>
                    </div>

                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-600 text-white">
                      <span className="text-lg font-bold">GPS</span>
                    </div>
                  </div>

                  {/* Student info */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Student Name
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">
                        {student.name}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Grade Level
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">
                        {student.grade}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Fee Status
                      </div>
                      <div className="mt-1 text-sm font-semibold text-slate-900">
                        {student.feeStatus}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scores */}
                <div className="mt-6">
                  <div className="text-sm font-semibold text-slate-900">
                    Subject Performance
                  </div>

                  <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
                    <table className="min-w-full">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                          <th className="px-4 py-3">Subject</th>
                          <th className="px-4 py-3">Score</th>
                          <th className="px-4 py-3">Grade</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-200">
                        {SUBJECTS.map((s) => (
                          <tr key={s.subject}>
                            <td className="px-4 py-3 text-sm text-slate-900">
                              {s.subject}
                            </td>

                            <td className="px-4 py-3 text-sm text-slate-700">
                              {s.score}%
                            </td>

                            <td className="px-4 py-3">
                              <span className="inline-flex rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                                {s.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Attendance
                    </div>

                    <div className="mt-2 text-2xl font-bold text-slate-900">
                      96%
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Class Average
                    </div>

                    <div className="mt-2 text-2xl font-bold text-slate-900">
                      {average}%
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Position
                    </div>

                    <div className="mt-2 text-2xl font-bold text-slate-900">
                      4th
                    </div>
                  </div>
                </div>

                {/* Teacher comments */}
                <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                  <div className="text-sm font-semibold text-slate-900">
                    Teacher’s Comment
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {student.name} has demonstrated excellent academic
                    performance this term and continues to show strong classroom
                    participation, discipline, and leadership qualities.
                    Continued consistency is encouraged.
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-8 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      Generated automatically by Greenwood School Admin System
                    </div>

                    <div className="text-xs font-semibold text-slate-700">
                      Term 2 • 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-200 p-5 dark:border-slate-800">
              <button
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Close
              </button>

              <button
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                <Download className="h-4 w-4" />
                Download PDF (Demo)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}