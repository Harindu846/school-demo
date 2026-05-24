import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Send, Loader2, Plus, Pencil, Mail } from "lucide-react";
import Badge from "./Badge.jsx";
import { ToastStack } from "./Toast.jsx";
import StudentModal from "./StudentModal.jsx";
import BulkSendModal from "./BulkSendModal.jsx";
import WhatsAppPreviewModal from "./WhatsAppPreviewModal.jsx";
import ReportCardPreviewModal from "./ReportCardPreviewModal.jsx";

const STORAGE_KEY = "school_demo_students_v1";

const DEFAULT_STUDENTS = [
  { id: "s1", name: "Amina Yusuf", whatsapp: "+234 803 123 4567", grade: "Grade 3", feeStatus: "Paid", reportStatus: "Not Sent" },
  { id: "s2", name: "Chinedu Okafor", whatsapp: "+234 809 555 0192", grade: "Grade 5", feeStatus: "Pending", reportStatus: "Not Sent" },
  { id: "s3", name: "Grace Mensah", whatsapp: "+233 24 123 7788", grade: "Grade 2", feeStatus: "Paid", reportStatus: "Not Sent" },
  { id: "s4", name: "Liam Ndlovu", whatsapp: "+27 71 234 9901", grade: "Grade 6", feeStatus: "Paid", reportStatus: "Not Sent" },
  { id: "s5", name: "Zara Abiola", whatsapp: "+234 802 777 4400", grade: "Grade 1", feeStatus: "Pending", reportStatus: "Not Sent" },
];

function makeId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `s_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function StudentTable() {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEFAULT_STUDENTS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  });

  const [query, setQuery] = useState("");
  const [sendingById, setSendingById] = useState({});

  // Persist students
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  // Toasts
  const toastIdRef = useRef(1);
  const [toasts, setToasts] = useState([]);

  function pushToast({ type, title, message, ttl = 3200 }) {
    const id = toastIdRef.current++;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, ttl);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  // Student modal state
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [studentModalMode, setStudentModalMode] = useState("add"); // "add" | "edit"
  const [activeStudent, setActiveStudent] = useState(null);

  function openAdd() {
    setActiveStudent(null);
    setStudentModalMode("add");
    setStudentModalOpen(true);
  }

  function openEdit(student) {
    setActiveStudent(student);
    setStudentModalMode("edit");
    setStudentModalOpen(true);
  }

  function saveStudent(payload) {
    if (studentModalMode === "add") {
      const newStudent = { id: makeId(), ...payload, reportStatus: "Not Sent" };
      setStudents((prev) => [newStudent, ...prev]);
      pushToast({ type: "success", title: "Student added", message: `${newStudent.name} added to the list.` });
      return;
    }

    setStudents((prev) =>
      prev.map((s) => (s.id === activeStudent.id ? { ...s, ...payload } : s))
    );

    pushToast({ type: "success", title: "Changes saved", message: `${payload.name} was updated.` });
  }

  function resetDemo() {
    setStudents((prev) => prev.map((s) => ({ ...s, reportStatus: "Not Sent" })));
    setQuery("");
    pushToast({
      type: "info",
      title: "Demo reset",
      message: "Report statuses reset to Not Sent. Added students kept.",
    });
  }

  // Bulk send modal state
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkPhase, setBulkPhase] = useState("idle"); // idle | checking | sendingReports | sendingReminders | done
  const [bulkResult, setBulkResult] = useState({ reportsSent: 0, remindersSent: 0 });
    // WhatsApp preview modal
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewStudent, setPreviewStudent] = useState(null);

  function openPreview(student) {
    setPreviewStudent(student);
    setPreviewOpen(true);
  }

  // Report preview modal
const [reportOpen, setReportOpen] = useState(false);
const [reportStudent, setReportStudent] = useState(null);

function openReport(student) {
  setReportStudent(student);
  setReportOpen(true);
}

  const bulkStats = useMemo(() => {
    const paidEligible = students.filter((s) => s.feeStatus === "Paid" && s.reportStatus !== "Sent").length;
    const pendingCount = students.filter((s) => s.feeStatus === "Pending").length;
    const alreadySent = students.filter((s) => s.reportStatus === "Sent").length;
    return { paidEligible, pendingCount, alreadySent };
  }, [students]);

  function openBulk() {
    setBulkResult({ reportsSent: 0, remindersSent: 0 });
    setBulkPhase("idle");
    setBulkOpen(true);
  }

  function startBulkSend() {
    // If already running, do nothing
    if (bulkPhase !== "idle" && bulkPhase !== "done") return;

    const paidToSend = students.filter((s) => s.feeStatus === "Paid" && s.reportStatus !== "Sent");
    const pendingToRemind = students.filter((s) => s.feeStatus === "Pending");

    setBulkPhase("checking");

    // Step 1: check fees
    window.setTimeout(() => {
      setBulkPhase("sendingReports");

      // Step 2: send reports to paid
      window.setTimeout(() => {
        if (paidToSend.length > 0) {
          setStudents((prev) =>
            prev.map((s) =>
              s.feeStatus === "Paid" ? { ...s, reportStatus: "Sent" } : s
            )
          );
        }

        setBulkPhase("sendingReminders");

        // Step 3: send reminders
        window.setTimeout(() => {
          setBulkPhase("done");
          setBulkResult({
            reportsSent: paidToSend.length,
            remindersSent: pendingToRemind.length,
          });

          pushToast({
            type: "success",
            title: "Bulk dispatch complete",
            message: `Reports sent: ${paidToSend.length}. Reminders sent: ${pendingToRemind.length}.`,
            ttl: 4500,
          });
        }, 900);
      }, 1200);
    }, 700);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      `${s.name} ${s.whatsapp} ${s.grade} ${s.feeStatus} ${s.reportStatus}`.toLowerCase().includes(q)
    );
  }, [students, query]);

  const feeBadge = (status) =>
    status === "Paid" ? <Badge tone="green">Paid</Badge> : <Badge tone="red">Pending</Badge>;

  const reportBadge = (status) =>
    status === "Sent" ? <Badge tone="blue">Sent</Badge> : <Badge tone="slate">Not Sent</Badge>;

  function handleSend(student) {
    if (sendingById[student.id]) return;
    if (student.reportStatus === "Sent") return;

    setSendingById((prev) => ({ ...prev, [student.id]: true }));

    window.setTimeout(() => {
      if (student.feeStatus === "Paid") {
        setStudents((prev) =>
          prev.map((s) => (s.id === student.id ? { ...s, reportStatus: "Sent" } : s))
        );
        pushToast({
          type: "success",
          title: "Report sent",
          message: `PDF report card for ${student.name} sent successfully!`,
        });
      } else {
        pushToast({
          type: "warning",
          title: "Fees pending",
          message: "Fee status Pending. Sent payment reminder instead of report card.",
        });
      }
      setSendingById((prev) => ({ ...prev, [student.id]: false }));
    }, 1000);
  }

  return (
    <>
      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Student Overview
            </div>
            <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Add/edit students and dispatch report cards with a fee-status check.
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={openAdd}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-950/40"
            >
              <Plus className="h-4 w-4" />
              Add Student
            </button>

            <button
              type="button"
              onClick={openBulk}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
              title="Simulate sending to all students"
            >
              <Mail className="h-4 w-4" />
              Bulk Send (Demo)
            </button>

            <div className="w-full sm:w-72">
              <label htmlFor="student-search" className="sr-only">
                Search students
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  id="student-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, number, grade…"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-blue-950/40"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={resetDemo}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus:ring-blue-950/40"
            >
              Reset Demo
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="max-h-[420px] overflow-auto">
          <table className="min-w-full">
            <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-950/60">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Parent WhatsApp</th>
                <th className="px-4 py-3">Grade Level</th>
                <th className="px-4 py-3">Fee Status</th>
                <th className="px-4 py-3">Report Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-600 dark:text-slate-300">
                    No students match “{query}”.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => {
                  const isSending = !!sendingById[s.id];
                  const isSent = s.reportStatus === "Sent";

                  return (
                    <tr
                      key={s.id}
                      className={[
                        "transition",
                        isSent ? "bg-emerald-50/60 dark:bg-emerald-950/15" : "",
                        "hover:bg-slate-50/40 dark:hover:bg-blue-950/10",
                      ].join(" ")}
                    >
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{s.name}</div>
                        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          ID: {String(s.id).slice(0, 8).toUpperCase()}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="text-sm text-slate-900 dark:text-slate-100">{s.whatsapp}</div>
                        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Preferred: WhatsApp</div>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-900 dark:text-slate-100">{s.grade}</td>
                      <td className="px-4 py-4">{feeBadge(s.feeStatus)}</td>
                      <td className="px-4 py-4">{reportBadge(s.reportStatus)}</td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(s)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => openPreview(s)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                          >
                            Preview
                          </button>

                          <button
                            type="button"
                            onClick={() => openReport(s)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                          >
                            View Report
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSend(s)}
                            disabled={isSending || isSent}
                            className={[
                              "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold shadow-sm transition",
                              isSent
                                ? "cursor-not-allowed bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                : "bg-blue-600 text-white hover:bg-blue-700",
                            ].join(" ")}
                          >
                            {isSending ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending…
                              </>
                            ) : isSent ? (
                              "Sent"
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                Send
                              </>
                            )}
                          </button>
                        </div>

                        <div className="mt-2 text-right text-xs text-slate-500 dark:text-slate-400">
                          {s.feeStatus === "Paid" ? "Sends PDF report card" : "Sends payment reminder"}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200 p-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-400">
          <div>
            Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{filtered.length}</span> of{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">{students.length}</span> students.
          </div>
          <div>Try Bulk Send (Demo) to impress principals.</div>
        </div>
      </section>

      <StudentModal
        open={studentModalOpen}
        mode={studentModalMode}
        initialStudent={activeStudent}
        onClose={() => setStudentModalOpen(false)}
        onSave={saveStudent}
      />

      <BulkSendModal
        open={bulkOpen}
        onClose={() => setBulkOpen(false)}
        onStart={startBulkSend}
        phase={bulkPhase}
        stats={bulkStats}
        result={bulkResult}
      />
      <WhatsAppPreviewModal
        open={previewOpen}
        student={previewStudent}
        onClose={() => setPreviewOpen(false)}
      />

      <ReportCardPreviewModal
        open={reportOpen}
        student={reportStudent}
        onClose={() => setReportOpen(false)}
      />

      <ToastStack toasts={toasts} removeToast={removeToast} />
    </>
  );
}