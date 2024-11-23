// src/auth/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>; // Replace with a spinner component

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
