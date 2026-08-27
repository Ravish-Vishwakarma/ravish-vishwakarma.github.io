import { NavLink } from "react-router-dom";
import { Home, BookOpen, ChartCandlestick, AppWindow } from "lucide-react";
import { ThemeIcon } from "./Icons";

const navItems = [
    {
        name: "Home",
        path: "/",
        icon: Home,
    },
    {
        name: "Blog",
        path: "/blog",
        icon: BookOpen,
    },
    {
        name: "Resources",
        path: "/resources",
        icon: ChartCandlestick,
    },
    {
        name: "Projects",
        path: "/projects",
        icon: AppWindow,
    },
];

function Sidebar({
    theme,
    setTheme,
    sidebarOpen,
    setSidebarOpen,
}: SidebarProps) {
    return (
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="sidebar-header">
                <div className="profile">
                    <img
                        src="/profile.png"
                        alt="Ravish"
                        className="profile-image"
                    />
                    <span>Ravish</span>
                </div>
                <div className="sidebar-header-actions">
                    <button
                        className="theme-button"
                        onClick={() => {
                            setTheme((prev) => {
                                const newTheme = prev === "light" ? "dark" : "light";
                                localStorage.setItem("theme", newTheme);
                                return newTheme;
                            });
                        }}
                    >
                        <ThemeIcon dark={theme === "dark"} />
                    </button>
                    <button
                        className="sidebar-close-btn"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        ✕
                    </button>
                </div>
            </div>
            <nav className="navigation">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                            onClick={() => setSidebarOpen(false)}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}

interface SidebarProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export { Sidebar };
