import { useEffect, useRef, useState } from "react";
import { X, Sparkles, FileText } from "lucide-react";

const DISCIPLINE_OPTIONS = [
  "Excellent",
  "Good",
  "Satisfactory",
  "Needs Improvement",
];

const ATTENTION_OPTIONS = [
  "Highly Engaged",
  "Engaged",
  "Sometimes Distracted",
  "Needs Monitoring",
];

export default function TeacherEntryModal({
  open,
  students,
  selectedClass,
  onClose,
  onPreview,
}) {
  const [selectedId, setSelectedId] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [roughNotes, setRoughNotes] = useState("");
  const [discipline, setDiscipline] = useState("Good");
  const [attention, setAttention] = useState("Engaged");

  const [subjects, setSubjects] = useState([
    { name: "Mathematics", score: "", comment: "" },
    { name: "English Language", score: "", comment: "" },
    { name: "Science", score: "", comment: "" },
  ]);

  const notesRef = useRef(null);

  // Filter students by current class
  const classStudents = selectedClass?.id
    ? students.filter((s) => s.classId === selectedClass.id)
    : students;

  // Search filter
  const visibleStudents = classStudents.filter((s) =>
    `${s.name} ${s.admissionNo}`
      .toLowerCase()
      .includes(studentSearch.toLowerCase())
  );

  // Current selected student
  const selectedStudent = students.find((s) => s.id === selectedId);

  // Reset modal
  useEffect(() => {
    if (!open) return;

    setSelectedId(classStudents[0]?.id || "");
    setStudentSearch("");
    setRoughNotes("");
    setDiscipline("Good");
    setAttention("Engaged");

    setSubjects([
      { name: "Mathematics", score: "", comment: "" },
      { name: "English Language", score: "", comment: "" },
      { name: "Science", score: "", comment: "" },
    ]);

    setTimeout(() => notesRef.current?.focus(), 100);
  }, [open]);

  function updateSubject(index, field, value) {
    setSubjects((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      )
    );
  }

  // Fake AI enhancement
  function enhanceText(text) {
    const map = {
      good: "demonstrates commendable",
      bad: "requires additional support in",
      lazy: "would benefit from increased consistency in",
      smart: "shows exceptional aptitude in",
      weak: "is developing foundational skills in",
      improved: "has shown measurable improvement in",
    };

    let result = text;

    Object.entries(map).forEach(([k, v]) => {
      result = result.replace(new RegExp(k, "gi"), v);
    });

    if (!result.endsWith(".")) result += ".";

    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  function handleGenerate() {
    if (!selectedStudent) return;

    const reportData = {
      student: selectedStudent,

      subjects: subjects.map((s) => ({
        ...s,
        score: Number(s.score) || 0,
        comment: s.comment.trim()
          ? enhanceText(s.comment)
          : "Continues to make steady progress.",
        grade:
          s.score >= 90
            ? "A"
            : s.score >= 80
            ? "B+"
            : s.score >= 70
            ? "B"
            : "C",
      })),

      discipline,
      attention,

      teacherComment: roughNotes.trim()
        ? enhanceText(roughNotes)
        : "The student continues to demonstrate positive academic engagement and is encouraged to maintain consistency in all subject areas.",
    };

    onPreview(reportData);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close"
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div className="w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Teacher Quick Entry
                </div>

                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Type rough notes. We structure the professional report.
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="grid h-[68vh] gap-5 overflow-hidden lg:grid-cols-[280px_minmax(0,1fr)] p-5">

            {/* LEFT STUDENT LIST */}
            <div className="overflow-hidden">
              {/* Search */}
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Search student..."
                className="
                  w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm
                  text-slate-900 placeholder:text-slate-400
                  focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100
                  dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                  dark:placeholder:text-slate-500 dark:focus:ring-blue-950/40
                "
              />

              {/* Student queue */}
              <div className="mt-3 h-[58vh] space-y-2 overflow-y-auto pr-1">
                {visibleStudents.map((s) => {
                  const active = selectedId === s.id;

                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedId(s.id)}
                      className={[
                        "w-full rounded-xl border p-3 text-left transition",
                        active
                          ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
                          : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900",
                      ].join(" ")}
                    >
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {s.name}
                      </div>

                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {s.admissionNo}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div
                          className={[
                            "rounded-full px-2 py-1 text-[10px] font-bold",
                            s.attendance >= 95
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                              : s.attendance >= 90
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
                          ].join(" ")}
                        >
                          {s.attendance}%
                        </div>

                        <div
                          className={[
                            "rounded-full px-2 py-1 text-[10px] font-bold",
                            s.feeStatus === "Paid"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
                          ].join(" ")}
                        >
                          {s.feeStatus}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="h-[58vh] overflow-y-auto pr-2">

              {/* Student info */}
              {selectedStudent ? (
                <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {selectedStudent.name}
                  </div>

                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {selectedStudent.admissionNo} • {selectedStudent.grade}
                  </div>
                </div>
              ) : null}

              {/* Subjects */}
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Subject Scores & Comments
                </div>

                <div className="mt-3 space-y-3">
                  {subjects.map((sub, idx) => (
                    <div
                      key={sub.name}
                      className="rounded-xl border border-slate-200 p-3 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="min-w-[8rem] text-sm font-medium text-slate-700 dark:text-slate-300">
                          {sub.name}
                        </div>

                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Score"
                          value={sub.score}
                          onChange={(e) =>
                            updateSubject(idx, "score", e.target.value)
                          }
                          className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        />

                        <span className="text-xs text-slate-500">/100</span>
                      </div>

                      <input
                        type="text"
                        placeholder={`Rough comment for ${sub.name}...`}
                        value={sub.comment}
                        onChange={(e) =>
                          updateSubject(idx, "comment", e.target.value)
                        }
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Discipline */}
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Discipline & Conduct
                  </label>

                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {DISCIPLINE_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Attention & Participation
                  </label>

                  <select
                    value={attention}
                    onChange={(e) => setAttention(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {ATTENTION_OPTIONS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-5">
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Overall Rough Notes
                </label>

                <textarea
                  ref={notesRef}
                  rows={4}
                  value={roughNotes}
                  onChange={(e) => setRoughNotes(e.target.value)}
                  placeholder="e.g. good student but lazy with homework. improved in math. needs to focus in class."
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-blue-950/40"
                />

                <div className="mt-1 text-xs text-slate-500">
                  Tip: Write roughly. The system professionalizes it automatically.
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
              Cancel
            </button>

            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <FileText className="h-4 w-4" />
              Generate Report Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}