import { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MainContent from "./components/MainContent.jsx";
import Attendance from "./components/Attendance.jsx";
import { useTheme } from "./hooks/useTheme.js";

// Import the default students for demo
const DEFAULT_STUDENTS = [
  {
    id: "s1",
    classId: "g3-a",
    admissionNo: "ADM-2026-001",
    attendance: 96,
    name: "Amina Yusuf",
    whatsapp: "+234 803 123 4567",
    grade: "Grade 3",
    feeStatus: "Paid",
    reportStatus: "Not Sent",
  },
  {
    id: "s2",
    classId: "g3-b",
    admissionNo: "ADM-2026-002",
    attendance: 91,
    name: "Chinedu Okafor",
    whatsapp: "+234 809 555 0192",
    grade: "Grade 5",
    feeStatus: "Pending",
    reportStatus: "Not Sent",
  },
  {
    id: "s3",
    classId: "g2-a",
    admissionNo: "ADM-2026-003",
    attendance: 97,
    name: "Grace Mensah",
    whatsapp: "+233 24 123 7788",
    grade: "Grade 2",
    feeStatus: "Paid",
    reportStatus: "Not Sent",
  },
  {
    id: "s4",
    classId: "g1-b",
    admissionNo: "ADM-2026-004",
    attendance: 88,
    name: "Liam Ndlovu",
    whatsapp: "+27 71 234 9901",
    grade: "Grade 6",
    feeStatus: "Paid",
    reportStatus: "Not Sent",
  },
  {
    id: "s5",
    classId: "g1-a",
    admissionNo: "ADM-2026-005",
    attendance: 94,
    name: "Zara Abiola",
    whatsapp: "+234 802 777 4400",
    grade: "Grade 1",
    feeStatus: "Pending",
    reportStatus: "Not Sent",
  },
];

export default function App() {
  const { theme, setTheme } = useTheme();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard"); // "dashboard" | "attendance"

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50
        via-slate-100
        to-slate-200
        text-slate-900
        dark:from-slate-950
        dark:via-[#020617]
        dark:to-black
        dark:text-slate-100
      "
    >
      <Header
        theme={theme}
        setTheme={setTheme}
        onOpenSidebar={() => setMobileSidebarOpen(true)}
      />

      <div className="mx-auto flex max-w-[1400px]">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          onNavigate={setCurrentView}
          currentView={currentView}
        />

        <main className="min-w-0 flex-1">
          {currentView === "dashboard" ? (
            <MainContent />
          ) : (
            <Attendance students={DEFAULT_STUDENTS} />
          )}
        </main>
      </div>
    </div>
  );
}