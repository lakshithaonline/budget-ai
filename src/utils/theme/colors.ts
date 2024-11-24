// theme/colors.ts
export const lightTheme = {
    palette: {
        mode: "light",
        primary: { main: "#000000", contrastText: "#ffffff" }, // Black
        secondary: { main: "#6c757d", contrastText: "#ffffff" }, // Neutral grey for accents
        background: {
            default: "#f8f9fa", // Near white for the main background
            paper: "#ffffff", // Pure white for cards, modals, etc.
        },
        text: {
            primary: "#212529", // Dark neutral for main text
            secondary: "#495057", // Medium grey for secondary text
            disabled: "#adb5bd", // Lighter grey for disabled text
        },
        divider: "#dee2e6", // Light grey for dividers
        action: {
            active: "#000000", // Black for active icons
            hover: "#e9ecef", // Light grey for hover effects
            selected: "#d6d8db", // Muted grey for selected items
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: 14, // Base font size
        fontWeightBold: 600, // Bold for headings
    },
};


export const darkTheme = {
    palette: {
        mode: "dark",
        primary: { main: "#ffffff", contrastText: "#000000" }, // White
        secondary: { main: "#adb5bd", contrastText: "#000000" }, // Neutral light grey for accents
        background: {
            default: "#121212", // Pure black for the main background
            paper: "#1e1e1e", // Slightly lighter black for containers
        },
        text: {
            primary: "#ffffff", // Bright white for main text
            secondary: "#e9ecef", // Light grey for secondary text
            disabled: "#6c757d", // Dimmed grey for disabled text
        },
        divider: "#444444", // Dark grey for dividers
        action: {
            active: "#ffffff", // White for active icons
            hover: "#333333", // Dark grey for hover effects
            selected: "#444444", // Dark muted grey for selected items
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: 14, // Base font size
        fontWeightBold: 600, // Bold for headings
    },
};
