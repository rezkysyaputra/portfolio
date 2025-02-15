import React from "react";

interface LabelProps {
  className?: string;
  htmlFor: string;
  children: string;
}
const Label: React.FC<LabelProps> = ({ className, htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className={`${className} font-medium block`}>
      {children}
    </label>
  );
};

export default Label;
