import React from "react";

interface InputTextProps {
    style?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const InputText: React.FC<InputTextProps> = ({
    onChange, style, placeholder
}: InputTextProps) => {
    return (

        <input
            type="text"
            onChange={onChange}
            className={`${style} border border-gray-800 px-4 py-2 rounded-md text-gray-900`} placeholder={placeholder}/>
    );
}