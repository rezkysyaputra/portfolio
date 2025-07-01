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
      className={`${className} text-cyan-800 dark:text-cyan-200 transition`}
    >
      {children}
    </a>
  );
};

export default Link;
