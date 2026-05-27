import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { SCHOOL_STRUCTURE } from "../data/schoolStructure";

const CLASS_OPTIONS = SCHOOL_STRUCTURE.flatMap((g) =>
  g.classes.map((c) => ({
    id: c.id,
    label: `${g.grade} — ${c.name}`,
  }))
);

const GRADES = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
const FEE_STATUSES = ["Paid", "Pending"];

function cleanPhone(value) {
  return value.replace(/[^\d+ ]/g, "");
}

export default function StudentModal({
  open,
  mode, // "add" | "edit"
  initialStudent,
  onClose,
  onSave,
}) {
  const title = mode === "edit" ? "Edit Student" : "Add Student";
  const subtitle =
    mode === "edit"
      ? "Update student details for dispatch and fee checks."
      : "Add a student to the dispatch list (demo mode).";

  const nameInputRef = useRef(null);

  const [form, setForm] = useState(() => ({
  name: "",
  admissionNo: "",
  attendance: 95,
  classId: "g1-a",
  whatsapp: "",
  grade: "Grade 1",
  feeStatus: "Pending",
}));

  const [errors, setErrors] = useState({});

  // When opening, load initial values
  useEffect(() => {
    if (!open) return;

    setErrors({});
    setForm({
      name: initialStudent?.name || "",
      admissionNo: initialStudent?.admissionNo || "",
      attendance: initialStudent?.attendance || 95,
      classId: initialStudent?.classId || "g1-a",
      whatsapp: initialStudent?.whatsapp || "",
      grade: initialStudent?.grade || "Grade 1",
      feeStatus: initialStudent?.feeStatus || "Pending",
    });

    // focus first input for a “premium” feel
    window.setTimeout(() => nameInputRef.current?.focus(), 50);
  }, [open, initialStudent]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const canSave = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.whatsapp.trim().length >= 7 &&
      !!form.grade &&
      !!form.feeStatus
    );
  }, [form]);

  function validate(nextForm) {
    const nextErrors = {};
    if (nextForm.name.trim().length < 2) nextErrors.name = "Enter a valid student name.";
    if (nextForm.whatsapp.trim().length < 7)
      nextErrors.whatsapp = "Enter a valid WhatsApp number.";
    if (!GRADES.includes(nextForm.grade)) nextErrors.grade = "Select a grade.";
    if (!FEE_STATUSES.includes(nextForm.feeStatus)) nextErrors.feeStatus = "Select a fee status.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function submit() {
    const nextForm = {
      ...form,
      admissionNo:
        form.admissionNo.trim() ||
        `ADM-2026-${Math.floor(Math.random() * 900 + 100)}`,
      name: form.name.trim(),
      whatsapp: form.whatsapp.trim(),
    };
    if (!validate(nextForm)) return;

    onSave(nextForm);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Dialog */}
      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          role="dialog"
          aria-modal="true"
          className="
            animate-[modalIn_180ms_ease]
            w-full max-w-lg max-h-[90vh]
            overflow-hidden rounded-2xl
            border border-slate-200 bg-white shadow-xl
            dark:border-slate-800 dark:bg-slate-900
          "
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800">
            <div>
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {subtitle}
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                inline-flex h-9 w-9 items-center justify-center rounded-xl
                text-slate-500 hover:bg-slate-100 hover:text-slate-700
                dark:hover:bg-slate-800 dark:hover:text-slate-200
              "
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[65vh] overflow-y-auto p-5">
            <div className="grid grid-cols-1 gap-4">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Student Name
                </label>
                <input
                  ref={nameInputRef}
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Amina Yusuf"
                  className="
                    mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm
                    text-slate-900 placeholder:text-slate-400
                    focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100
                    dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500
                    dark:focus:ring-blue-950/40
                  "
                />
                {errors.name ? (
                  <div className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                    {errors.name}
                  </div>
                ) : null}
              </div>
              
              {/* Admission Number */}
              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Admission Number
                </label>

                <input
                  value={form.admissionNo}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, admissionNo: e.target.value }))
                  }
                  placeholder="Leave blank to auto-generate"
                  className="
                    mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm
                    text-slate-900 placeholder:text-slate-400
                    focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100
                    dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                    dark:placeholder:text-slate-500 dark:focus:ring-blue-950/40
                  "
                />

                <div className="mt-1 text-xs text-slate-500">
                  Auto-generated if left empty.
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Parent WhatsApp Number
                </label>
                <input
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, whatsapp: cleanPhone(e.target.value) }))
                  }
                  placeholder="e.g. +234 803 123 4567"
                  className="
                    mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm
                    text-slate-900 placeholder:text-slate-400
                    focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100
                    dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500
                    dark:focus:ring-blue-950/40
                  "
                />
                {errors.whatsapp ? (
                  <div className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                    {errors.whatsapp}
                  </div>
                ) : (
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Tip: Use international format (e.g. +234…).
                  </div>
                )}
              </div>
              {/* Attendance */}
              <div>
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Attendance Percentage
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.attendance}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      attendance: Number(e.target.value),
                    }))
                  }
                  className="
                    mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm
                    text-slate-900
                    focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100
                    dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
                    dark:focus:ring-blue-950/40
                  "
                />
              </div>
              {/* Teacher helper */}
<div className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-blue-300">
  Class teacher information will automatically link from the selected class.
</div>
              {/* Academic Year */}
<div>
  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
    Academic Year
  </label>

  <select
    className="
      mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm
      text-slate-900
      focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100
      dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100
      dark:focus:ring-blue-950/40
    "
    defaultValue="2026"
  >
    <option>2026</option>
    <option>2025</option>
  </select>
</div>
              {/* Grade + Class + Fee status */}
<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
  
  {/* Grade Level */}
  <div>
    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
      Grade Level
    </label>
    <select
      value={form.grade}
      onChange={(e) => {
        const newGrade = e.target.value;
        const gradeObj = SCHOOL_STRUCTURE.find(
          (g) => g.grade.replace("Grade 0", "Grade ") === newGrade
        );
        const firstClassId = gradeObj?.classes[0]?.id || "";
        setForm((p) => ({ ...p, grade: newGrade, classId: firstClassId }));
      }}
      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-950/40"
    >
      {SCHOOL_STRUCTURE.map((g) => {
        const label = g.grade.replace("Grade 0", "Grade ");
        return (
          <option key={g.grade} value={label}>
            {label}
          </option>
        );
      })}
    </select>
  </div>

  {/* Class */}
  <div>
    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
      Class
    </label>
    <select
      value={form.classId}
      onChange={(e) => setForm((p) => ({ ...p, classId: e.target.value }))}
      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-950/40"
    >
      {(() => {
        const gradeObj = SCHOOL_STRUCTURE.find(
          (g) => g.grade.replace("Grade 0", "Grade ") === form.grade
        );
        return (gradeObj?.classes || []).map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ));
      })()}
    </select>
  </div>

  {/* Fee Status */}
  <div>
    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
      Fee Status
    </label>
    <select
      value={form.feeStatus}
      onChange={(e) => setForm((p) => ({ ...p, feeStatus: e.target.value }))}
      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-blue-950/40"
    >
      {FEE_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  </div>
</div>
              
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-200 p-5 dark:border-slate-800">
            <button
              onClick={onClose}
              className="
                rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700
                hover:bg-slate-50
                focus:outline-none focus:ring-4 focus:ring-blue-100
                dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900
                dark:focus:ring-blue-950/40
              "
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={!canSave}
              className={[
                "rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
                canSave
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "cursor-not-allowed bg-blue-600/50",
                "focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-950/40",
              ].join(" ")}
            >
              {mode === "edit" ? "Save changes" : "Add student"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}