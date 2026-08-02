import { Sidebar } from "./components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./HomePage";
import { Blog } from "./Blog";
import { HelloWorld } from "./blogs/hello-world";
import { ResourcesPage } from "./Resources";
import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { ProjectsPage } from "./Projects";
import { PythonPage } from "./resources/PythonPage";
import { FlutterPage } from "./resources/FlutterPage";
import { CyberSecurityPage } from "./resources/CyberSecurityPage";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  return (
    <div className="app">
      <header className="topbar">
        <button
          className={`menu-btn ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <Menu className="hamburger-icon" />
          <X className="close-icon" />
        </button>
      </header>
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      />
      <Sidebar
        theme={theme}
        setTheme={setTheme}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/hello-world" element={<HelloWorld />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/python" element={<PythonPage />} />
          <Route path="/resources/flutter" element={<FlutterPage />} />
          <Route path="/resources/cyber-security" element={<CyberSecurityPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
