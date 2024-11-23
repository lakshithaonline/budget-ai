import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import AddExpense from "./features/expenses/AddExpense";
import ExpenseList from "./features/expenses/ExpenseList";
import BudgetOverview from "./features/budgets/BudgetOverview";
import Navbar from "./components/Navbar";
import SignIn from "./components/auth/sign-In";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import { ThemeProvider, useTheme } from "./context/theme-context";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }

    return <>{children}</>;
};

const AppWithTheme: React.FC = () => {
    const { currentTheme, toggleTheme } = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                backgroundColor: currentTheme.background,
                color: currentTheme.text,
                minHeight: "100vh",
            }}
        >
            <Navbar toggleTheme={toggleTheme} />

            {/* Main content container */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - 240px)` },
                    bgcolor: currentTheme.background,
                    p: 3,
                    mt: '64px',
                }}
            >
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<BudgetOverview />} />
                    <Route path="/sign-in" element={<SignIn />} />

                    {/* Protected Routes */}
                    <Route
                        path="/add-expense"
                        element={
                            <ProtectedRoute>
                                <AddExpense />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/expenses"
                        element={
                            <ProtectedRoute>
                                <ExpenseList />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Box>
        </Box>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <AppWithTheme />
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
};

export default App;