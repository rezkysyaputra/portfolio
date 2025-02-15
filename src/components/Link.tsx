import React from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode | string;
  className?: string;
}
const Link: React.FC<LinkProps> = ({ href, children, className }) => {
  return (
    <a
      href={href}
      className={`${className} text-gray-700 dark:text-gray-300  transition`}
    >
      {children}
    </a>
  );
};

export default Link;
