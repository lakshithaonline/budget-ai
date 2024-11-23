import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import Loader from "../components/loader/Loader"; // Import the loader component

interface AuthContextProps {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // To show loading state during initial auth state check and login
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const auth = getAuth();

    // OnAuthStateChanged listener to detect user changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const idToken = await currentUser.getIdToken();
                    setToken(idToken); // Store the token
                } catch (err) {
                    console.error("Error fetching token", err);
                    setToken(null);
                }
            } else {
                setUser(null);
                setToken(null);
            }
            setLoading(false); // Set loading to false once the auth state is checked
        });

        return unsubscribe;
    }, [auth]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            const idToken = await userCredential.user.getIdToken();
            setToken(idToken); // Set the token after login
            navigate("/"); // Redirect after successful login
        } catch (err: any) {
            setError(err.message || "Login failed.");
        } finally {
            setLoading(false); // Set loading to false after login attempt
        }
    };

    const register = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            const idToken = await userCredential.user.getIdToken();
            setToken(idToken); // Set the token after registration
            navigate("/"); // Redirect after successful registration
        } catch (err: any) {
            setError(err.message || "Registration failed.");
        } finally {
            setLoading(false); // Set loading to false after registration attempt
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            setToken(null);
            navigate("/sign-in"); // Redirect after logout
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setLoading(false); // Set loading to false after logout
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading, error }}>
            {loading ? <Loader /> : children} {/* Show loader while loading */}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
