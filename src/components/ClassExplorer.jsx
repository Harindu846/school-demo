import { ChevronDown, GraduationCap, Users, UserCircle2 } from "lucide-react";
import { SCHOOL_STRUCTURE } from "../data/schoolStructure";

export default function ClassExplorer({
  selectedClassId,
  onSelectClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      
      {/* Header */}
      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />

          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              School Structure
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              Grades, classes & teachers
            </div>
          </div>
        </div>
      </div>

      {/* Grades */}
      <div className="p-3 space-y-3">
        {SCHOOL_STRUCTURE.map((grade) => (
          <div key={grade.grade}>
            
            {/* Grade title */}
            <div className="mb-2 flex items-center gap-2 px-2">
              <ChevronDown className="h-4 w-4 text-slate-400" />

              <div className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {grade.grade}
              </div>
            </div>

            {/* Classes */}
            <div className="space-y-2">
              {grade.classes.map((cls) => {
                const active = selectedClassId === cls.id;

                return (
                  <button
                    key={cls.id}
                    onClick={() => onSelectClass(cls)}
                    className={[
                      "w-full rounded-xl border p-3 text-left transition",
                      active
                        ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
                        : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900",
                    ].join(" ")}
                  >
                    {/* Top */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {cls.name}
                      </div>

                      <div
                        className={[
                          "rounded-full px-2 py-1 text-[10px] font-bold",
                          cls.attendance >= 95
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : cls.attendance >= 90
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
                        ].join(" ")}
                      >
                        {cls.attendance}% Attendance
                      </div>
                    </div>

                    {/* Teacher */}
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <UserCircle2 className="h-3.5 w-3.5" />
                      {cls.teacher}
                    </div>

                    {/* Student count */}
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                      <Users className="h-3.5 w-3.5" />
                      {cls.students} Students
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}