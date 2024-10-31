import React from "react";

interface InputTextProps {
    style?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    id?: string;
    type?: string;
    value?: string;
}

export const InputText: React.FC<InputTextProps> = ({
    style, type = "text", ...inputProps
}: InputTextProps) => {
    return (
        <input
            type={type}
            {...inputProps}
            className={`${style} border border-gray-800 px-4 py-2 rounded-md text-gray-900`} />
    );
}

export const TextArea: React.FC<InputTextProps> = ({
    style, ...textProps
}: InputTextProps) => {
    return (
        <textarea
            {...textProps}
            className={`${style} border border-gray-800 px-4 py-2 rounded-md text-gray-900 min-h-44`}>
        </textarea>
    );
}