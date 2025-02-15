import React from "react";

interface IconCardProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}
const IconCard: React.FC<IconCardProps> = ({ name, icon, color, index }) => {
  return (
    <div
      key={index}
      className={`${color} flex flex-col items-center p-4 justify-center w-24 h-24 rounded-lg shadow-lg transform hover:scale-110 transition duration-300`}
    >
      <div className="text-4xl">{icon}</div>
      <p className="text-sm mt-2">{name}</p>
    </div>
  );
};

export default IconCard;
