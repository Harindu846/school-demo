import { useState } from "react";
import ClassExplorer from "./ClassExplorer.jsx";
import { Users, Wallet, AlertTriangle } from "lucide-react";
import StatCard from "./StatCard.jsx";
import StudentTable from "./StudentTable.jsx";


export default function MainContent() {
    const [selectedClass, setSelectedClass] = useState(null);
  return (
    <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
      {/* Page title block */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          Monthly Dispatch
        </div>

        <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">
          Monthly Report Card Dispatch Center
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Send report cards via WhatsApp automatically — but only for students whose fees are marked as{" "}
          <strong>Paid</strong>. Pending students receive a polite payment reminder.
        </p>
      </div>

      {/* KPI Cards */}
      <section className="mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Students"
            value="50"
            helper="Active enrollment"
            icon={Users}
            tone="blue"
          />
          <StatCard
            label="Fees Received"
            value="$12,500"
            helper="This month"
            icon={Wallet}
            tone="emerald"
          />
          <StatCard
            label="Pending"
            value="$2,500"
            helper="Outstanding balances"
            icon={AlertTriangle}
            tone="amber"
          />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
  <ClassExplorer
    selectedClassId={selectedClass?.id}
    onSelectClass={setSelectedClass}
  />

  <div>
    {/* Class summary */}
    <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Current Class
          </div>

          <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
            {selectedClass?.name || "Class A"} — {selectedClass?.teacher || "Mrs. Silva"}
          </div>

          <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Attendance: {selectedClass?.attendance || 96}% • Students: {selectedClass?.students || 32}
          </div>
        </div>

        <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          Active Academic Term
        </div>
      </div>
    </div>
<StudentTable
  selectedClass={selectedClass}
/>
    
  </div>
</div>
    </main>
  );
}