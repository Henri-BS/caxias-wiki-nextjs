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
        className={`${style} flex text-white font-bold transition ease-in duration-600 px-4 py-3 rounded-md `} 
        onClick={onClick}>
            {label} {icon}
        </button>

    );
}

