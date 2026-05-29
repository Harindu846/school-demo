import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Users,
} from "lucide-react";
import { SCHOOL_STRUCTURE } from "../data/schoolStructure";

const ATTENDANCE_STORAGE_KEY = "school_demo_attendance_v1";

const STATUS_OPTIONS = [
  {
    id: "present",
    label: "Present",
    icon: CheckCircle2,
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    border: "border-emerald-500",
  },
  {
    id: "absent",
    label: "Absent",
    icon: XCircle,
    color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    border: "border-rose-500",
  },
  {
    id: "late",
    label: "Late",
    icon: Clock,
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    border: "border-amber-500",
  },
  {
    id: "excused",
    label: "Excused",
    icon: AlertCircle,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    border: "border-blue-500",
  },
];

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export default function Attendance({ students }) {
  const today = useMemo(() => new Date(), []);
  const todayKey = getTodayKey();

  const [selectedGrade, setSelectedGrade] = useState(SCHOOL_STRUCTURE[0]);
  const [selectedClass, setSelectedClass] = useState(
    SCHOOL_STRUCTURE[0].classes[0]
  );

  const [attendance, setAttendance] = useState(() => {
    try {
      const saved = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  useEffect(() => {
    localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(attendance));
  }, [attendance]);

  const classStudents = useMemo(() => {
    return students.filter((s) => s.classId === selectedClass.id);
  }, [students, selectedClass]);

  const stats = useMemo(() => {
    const total = classStudents.length;
    const present = classStudents.filter(
      (s) => attendance[todayKey]?.[s.id] === "present"
    ).length;
    const absent = classStudents.filter(
      (s) => attendance[todayKey]?.[s.id] === "absent"
    ).length;
    const late = classStudents.filter(
      (s) => attendance[todayKey]?.[s.id] === "late"
    ).length;
    const excused = classStudents.filter(
      (s) => attendance[todayKey]?.[s.id] === "excused"
    ).length;

    const percentage = total
      ? Math.round(((present + late) / total) * 100)
      : 0;

    return { total, present, absent, late, excused, percentage };
  }, [classStudents, attendance, todayKey]);

  function markAttendance(studentId, status) {
    setAttendance((prev) => ({
      ...prev,
      [todayKey]: {
        ...(prev[todayKey] || {}),
        [studentId]: status,
      },
    }));
  }

  function getStudentStatus(studentId) {
    return attendance[todayKey]?.[studentId] || null;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Daily Attendance Register
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Calendar className="h-4 w-4" />

            <span className="font-medium">
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
            <Users className="h-5 w-5" />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Today's Attendance
            </div>

            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {stats.percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total
          </div>
          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
            {stats.total}
          </div>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Present
          </div>
          <div className="mt-1 text-lg font-bold text-emerald-700 dark:text-emerald-300">
            {stats.present}
          </div>
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-center dark:border-rose-900/30 dark:bg-rose-950/20">
          <div className="text-xs font-semibold text-rose-600 dark:text-rose-400">
            Absent
          </div>
          <div className="mt-1 text-lg font-bold text-rose-700 dark:text-rose-300">
            {stats.absent}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center dark:border-amber-900/30 dark:bg-amber-950/20">
          <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            Late
          </div>
          <div className="mt-1 text-lg font-bold text-amber-700 dark:text-amber-300">
            {stats.late}
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-center dark:border-blue-900/30 dark:bg-blue-950/20">
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            Excused
          </div>
          <div className="mt-1 text-lg font-bold text-blue-700 dark:text-blue-300">
            {stats.excused}
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Class selector */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
              Select Class
            </h3>

            <div className="space-y-4">
              {SCHOOL_STRUCTURE.map((grade) => (
                <div key={grade.grade}>
                  <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {grade.grade}
                  </div>

                  <div className="space-y-2">
                    {grade.classes.map((cls) => (
                      <button
                        key={cls.id}
                        onClick={() => {
                          setSelectedGrade(grade);
                          setSelectedClass(cls);
                        }}
                        className={[
                          "w-full rounded-xl border p-3 text-left transition",
                          selectedClass.id === cls.id
                            ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
                            : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900",
                        ].join(" ")}
                      >
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {cls.name}
                        </div>

                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {cls.teacher} • {cls.students} Students
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Selected Class
            </h4>

            <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {selectedGrade.grade} — {selectedClass.name}
            </div>

            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {selectedClass.teacher}
            </div>
          </div>
        </div>

        {/* Register */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Attendance Register
              </h2>

              <div className="text-sm text-slate-500 dark:text-slate-400">
                {classStudents.length} Students
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {classStudents.map((student) => {
              const currentStatus = getStudentStatus(student.id);

              return (
                <div
                  key={student.id}
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-950/50"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {student.name.charAt(0)}
                      </div>

                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {student.name}
                        </div>

                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {student.admissionNo} • {student.grade}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map((status) => {
                        const Icon = status.icon;
                        const isActive = currentStatus === status.id;

                        return (
                          <button
                            key={status.id}
                            onClick={() =>
                              markAttendance(student.id, status.id)
                            }
                            className={[
                              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition",
                              isActive
                                ? `${status.color} ${status.border} border-2`
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900",
                            ].join(" ")}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {status.label}
                          </button>
                        );
                      })}

                      {currentStatus && (
                        <button
                          onClick={() => markAttendance(student.id, null)}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-900"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {classStudents.length === 0 && (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              No students found in this class.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}