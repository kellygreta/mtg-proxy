import { createContext, useState, useContext } from "react";

// creiamo il contesto
const ThemeContext = createContext();

// provider che avvolge l'app
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme} style={{ minHeight: "100vh" }}>
        {/* bottone di switch tema */}
        <button
          onClick={toggleTheme}
          className="btn btn-sm btn-outline-secondary position-fixed top-0 end-0 m-3 no-print"
        >
          {/* TODO aggiustare bottone da mobile */}
          {/* Solo emoji sempre visibile */}
          {theme === "light" ? "🌙" : "☀️"}

          {/* Testo visibile solo da md in su */}
          <span className="d-none d-md-inline ms-1">
            {theme === "light" ? "Dark" : "Light"}
          </span>
        </button>

        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// hook personalizzato per usare il tema
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve essere usato dentro ThemeProvider");
  }
  return context;
}
