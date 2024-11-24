import React, { createContext, useContext, useState, ReactNode } from "react";
import { darkTheme, lightTheme } from "../utils/theme/colors";

// Define the shape of the theme context
interface ThemeContextType {
    theme: 'light' | 'dark'; // Current theme state
    toggleTheme: () => void; // Function to toggle between themes
    currentTheme: typeof lightTheme | typeof darkTheme; // The active theme object
}

// Create the Theme Context
const ThemeContext = createContext<ThemeContextType | null>(null);

// Custom hook to use the ThemeContext
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode; // React children that will consume this context
}

// ThemeProvider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default theme is light

    // Function to toggle theme between light and dark
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Determine the current theme object
    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
