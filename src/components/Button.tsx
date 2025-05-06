import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
    <button
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    {...props}
        >
    {children}
    </button>
);
