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
      className={`${className} w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg py-1.5 font-semibold text-lg`}
    >
      {children}
    </button>
  );
};

export default Button;
