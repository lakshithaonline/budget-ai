import React, { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

const SignIn: React.FC = () => {
    const { login, loading, error } = useAuth(); // Use AuthProvider's context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload on form submission
        await login(email, password); // Call the login function from AuthProvider
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h2>Sign In</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if login fails */}
            <form onSubmit={handleSignIn}>
                <div style={{ marginBottom: "1rem" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            margin: "8px 0",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            margin: "8px 0",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#6200ea",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
};

export default SignIn;
