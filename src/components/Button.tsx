import React from "react";

interface ButtonProps {
  type?: "button" | "reset" | "submit" | undefined;
  className?: string;
  children: string;
}
const Button: React.FC<ButtonProps> = ({
  type = "submit",
  className,
  children,
}) => {
  return (
    <button
      type={type}
      className={`${className} w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 hover:from-cyan-500 hover:to-blue-600 text-white rounded-lg py-1.5 font-semibold text-lg transition-colors`}
    >
      {children}
    </button>
  );
};

export default Button;
