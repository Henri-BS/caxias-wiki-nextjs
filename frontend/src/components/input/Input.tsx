import React from "react";

interface InputTextProps {
    style?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    id?: string;
    value?: string;
}



export const InputText: React.FC<InputTextProps> = ({
    style, ...inputProps
}: InputTextProps) => {
    return (
        <input
        {...inputProps}
            type="text"
            className={`${style} border border-gray-800 px-4 py-2 rounded-md text-gray-900`} />
    );
}

export const TextArea: React.FC<InputTextProps> = ({
    style, ...textProps
}: InputTextProps) => {
    return (
        <textarea
        {...textProps}
            className={`${style} border border-gray-800 px-4 py-2 rounded-md text-gray-900`}>
            </textarea> 
    );
}