import React from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "textarea";
  placeholder?: string;
  className?: string;
  name: string;
  required?: boolean;
}
const Input: React.FC<InputProps> = ({
  type = "text",
  className,
  name,
  placeholder,
  required,
}) => {
  if (type === "textarea") {
    return (
      <textarea
        required={required}
        id={name}
        name={name}
        placeholder={placeholder}
        rows={4}
        className={`${className} w-full px-2.5 py-1.5 rounded-lg dark:bg-gray-800 bg-gray-50 border-0 ring-1 focus:ring-2 ring-gray-300 placeholder:text-gray-400`}
      />
    );
  }

  return (
    <input
      required={required}
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className={`${className} w-full px-2.5 py-1.5 rounded-lg dark:bg-gray-800  bg-gray-50 border-0 ring-1 focus:ring-2 ring-gray-300 placeholder:text-gray-400`}
    />
  );
};

export default Input;
