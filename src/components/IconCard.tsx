import React from "react";
import { motion } from "framer-motion";

interface IconCardProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}
const IconCard: React.FC<IconCardProps> = ({ name, icon, color, index }) => {
  return (
    <motion.div
      key={index}
      className={`${color} flex flex-col items-center justify-center w-24 h-24 rounded-xl shadow-md border border-cyan-800/40 dark:border-cyan-900/60 bg-cyan-900/80 dark:bg-[#02111b] transition-all duration-200`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div className="text-4xl">{icon}</div>
      <span className="mt-2 text-sm font-semibold text-cyan-200 dark:text-cyan-300">
        {name}
      </span>
    </motion.div>
  );
};

export default IconCard;
