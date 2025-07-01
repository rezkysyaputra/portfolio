import React from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "textarea";
  placeholder?: string;
  className?: string;
  name: string;
  required?: boolean;
}

const Input = (
  { type = "text", name, className = "", placeholder, required }: InputProps,
  ref: React.Ref<HTMLInputElement | HTMLTextAreaElement>
) => {
  if (type === "textarea") {
    return (
      <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        required={required}
        id={name}
        name={name}
        placeholder={placeholder}
        rows={4}
        className={`${className} w-full px-2.5 py-1.5 rounded-lg bg-[#02111b] border border-cyan-800 ring-1 focus:ring-2 ring-cyan-400 placeholder:text-cyan-600 text-cyan-100`}
      />
    );
  }

  return (
    <input
      ref={ref as React.Ref<HTMLInputElement>}
      required={required}
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className={`${className} w-full px-2.5 py-1.5 rounded-lg bg-[#02111b] border border-cyan-800 ring-1 focus:ring-2 ring-cyan-400 placeholder:text-cyan-600 text-cyan-100`}
    />
  );
};

export default React.forwardRef(Input);
