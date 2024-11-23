import React from "react";

interface ButtonProps {
    label: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, style }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                ...style,
            }}
        >
            {label}
        </button>
    );
};

export default Button;
