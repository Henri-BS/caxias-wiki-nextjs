import React from "react";

interface ButtonProps {
    style?: string;
    label?: string;
    onClick?: (event: any) => void;
    type?: "submit" | "button" | "reset" | undefined
}

export const Button: React.FC<ButtonProps> = ({
    onClick, style, label, type
}: ButtonProps) => {
    return (

        <button 
        type={type}
        className={`${style} text-white font-bold transition ease-in duration-600 px-4 py-2 rounded-md `} 
        onClick={onClick}>
            {label}
        </button>

    );
}