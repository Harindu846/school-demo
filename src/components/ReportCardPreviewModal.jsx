import { X, Download } from "lucide-react";

export default function ReportCardPreviewModal({ open, reportData, onClose }) {
  if (!open || !reportData) return null;

  const { student, subjects, discipline, attention, teacherComment } = reportData;

  const average = Math.round(
    subjects.reduce((acc, s) => acc + (Number(s.score) || 0), 0) / subjects.length
  );

  const getDisciplineColor = (d) => {
    if (d === "Excellent") return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200";
    if (d === "Good") return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
    if (d === "Satisfactory") return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200";
    return "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200";
  };

  const getAttentionColor = (a) => {
    if (a === "Highly Engaged") return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200";
    if (a === "Engaged") return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
    if (a === "Sometimes Distracted") return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200";
    return "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200";
  };

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" onClick={onClose} aria-label="Close" />
      <div className="absolute inset-0 overflow-y-auto p-4">
        <div className="mx-auto flex min-h-full max-w-4xl items-center justify-center">
          <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 dark:border-slate-800">
              <div>
                <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">PDF Report Preview</div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">AI-structured from teacher notes</div>
              </div>
              <button onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
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
                      <div className="text-2xl font-bold text-slate-900">Greenwood Primary School</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                        Official Academic Report
                      </div>
                      <div className="mt-1 text-sm text-slate-500">Monthly Academic Performance Report</div>
                      <div className="mt-2 text-xs text-slate-500">
                        24 Palm Avenue, Colombo • +94 77 123 4567
                      </div>

                      <div className="mt-1 text-xs text-slate-500">
                        admin@greenwoodschool.edu
                      </div>
                    </div>
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-600 text-white">
                      <span className="text-lg font-bold">GPS</span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Student</div>
                      <div className="mt-1 text-sm font-bold text-slate-900">{student?.name}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Grade</div>
                      <div className="mt-1 text-sm font-bold text-slate-900">{student?.grade}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fee Status</div>
                      <div className="mt-1 text-sm font-bold text-slate-900">{student?.feeStatus}</div>
                    </div>
                  </div>
                </div>

                {/* Subject Performance */}
                <div className="mt-6">
                  <div className="text-sm font-bold text-slate-900">Subject Performance</div>
                  <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
                    <table className="min-w-full">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                          <th className="px-4 py-3">Subject</th>
                          <th className="px-4 py-3">Score</th>
                          <th className="px-4 py-3">Grade</th>
                          <th className="px-4 py-3">Comment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {subjects.map((s) => (
                          <tr key={s.name}>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">{s.name}</td>
                            <td className="px-4 py-3 text-sm text-slate-700">{s.score}%</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                                {s.grade}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm italic text-slate-600">{s.comment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Discipline & Attention */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Discipline & Conduct</div>
                    <div className="mt-2 text-xs leading-relaxed text-slate-600">
                      The student demonstrates positive classroom behavior, respect towards peers,
                      and adherence to school expectations.
                    </div>
                    <div className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold ${getDisciplineColor(discipline)}`}>
                      {discipline}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Attention & Participation</div>
                    <div className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold ${getAttentionColor(attention)}`}>
                      {attention}
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Average Score</div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">{average}%</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Attendance</div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">96%</div>
                    <div className="mt-1 text-xs text-slate-500">
                      Excellent attendance consistency
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Class Position</div>
                    <div className="mt-2 text-2xl font-bold text-slate-900">4th</div>
                  </div>
                </div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                  AI-Enhanced Professional Summary
                </div>
                {/* Teacher Comment */}
                <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                  <div className="text-sm font-bold text-slate-900">Teacher's Comment</div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{teacherComment}</p>
                </div>
                {/* Signatures */}
<div className="mt-8 grid gap-8 sm:grid-cols-2">
  
  {/* Teacher */}
  <div>
    <div className="h-12 border-b border-slate-300"></div>

    <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
      Class Teacher
    </div>

    <div className="mt-1 text-sm font-semibold text-slate-900">
      {student?.teacher || "Mrs. Silva"}
    </div>
  </div>

  {/* Principal */}
  <div>
    <div className="h-12 border-b border-slate-300"></div>

    <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
      Principal
    </div>

    <div className="mt-1 text-sm font-semibold text-slate-900">
      Mrs. Fernando
    </div>
  </div>
</div>
                {/* Footer */}
                <div className="mt-8 border-t border-slate-200 pt-4">
                  <div className="mb-6 flex justify-end">
  <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-blue-200 text-center text-[10px] font-bold uppercase tracking-wide text-blue-600 opacity-70">
    Greenwood
    <br />
    Official
    <br />
    Seal
  </div>
</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">Generated automatically by Greenwood AI Academic Reporting System</div>
                    <div className="text-xs font-bold text-slate-700">Term 2 • 2026</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-200 p-5 dark:border-slate-800">
              <button onClick={onClose} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">Close</button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
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