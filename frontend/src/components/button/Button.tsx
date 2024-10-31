import React from "react";

interface ButtonProps {
    style?: string;
    icon?: any;
    label?: string;
    onClick?: (event: any) => void;
    type?: "submit" | "button" | "reset" | undefined
}

export const Button: React.FC<ButtonProps> = ({
    onClick, style, label, type, icon
}: ButtonProps) => {
    return (

        <button 
        type={type}
        className={`${style} flex items-center gap-x-2 text-white font-bold transition ease-in duration-600 px-3 py-2 rounded-md `} 
        onClick={onClick}>
            {label} {icon}
        </button>

    );
}

