import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ACCENT = "#3b82f6";

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, toggleDarkMode] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", isDarkMode);
    }, [isDarkMode]);

    // Sync --accent CSS var
    useEffect(() => {
        document.documentElement.style.setProperty("--accent", ACCENT);
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode: isDarkMode === "dark", toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);