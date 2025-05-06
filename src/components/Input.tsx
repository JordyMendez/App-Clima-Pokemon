import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => (
    <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
        className="border p-2 rounded w-full"
        {...props}
    />
    </div>
);
