import React, { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

const SignUp: React.FC = () => {
    const { register, loading } = useAuth(); // Use the `register` method from AuthProvider
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(email, password);
            setSuccess(true);
            setError(null);
        } catch (err: any) {
            setError(err.message || "An error occurred during registration.");
            setSuccess(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h2>Sign Up</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Account created successfully!</p>}
            <form onSubmit={handleSignUp}>
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
                    {loading ? "Registering..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
