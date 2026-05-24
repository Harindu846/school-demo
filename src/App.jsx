import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import MainContent from "./components/MainContent.jsx";
import { useTheme } from "./hooks/useTheme.js";

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="
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
    ">
      <Header theme={theme} setTheme={setTheme} />

      <div className="mx-auto flex max-w-[1400px]">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}