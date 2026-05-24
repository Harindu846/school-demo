import { Users, Wallet, AlertTriangle } from "lucide-react";
import StatCard from "./StatCard.jsx";
import StudentTable from "./StudentTable.jsx";


export default function MainContent() {
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

      <StudentTable />
    </main>
  );
}