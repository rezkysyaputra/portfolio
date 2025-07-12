import React from "react";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
import { motion } from "framer-motion";

interface ProjectCardProps {
  name: string;
  image: string;
  link: string;
  tags: string[];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  image,
  link,
  tags,
  index,
}) => {
  return (
    <motion.div
      key={index}
      className="relative flex flex-col h-64 w-full max-w-xs bg-[#0a2342]/90 border border-cyan-800 rounded-2xl shadow-[0_4px_24px_0_rgba(0,80,180,0.10)] overflow-hidden transition-all duration-300 group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Content overlay section */}
      <div className="absolute top-0 left-0 w-full px-4 pt-4 z-20">
        <div className="bg-cyan-900 bg-opacity-40 rounded-xl p-3 flex flex-col gap-2 shadow-cyan-900/40">
          <h4 className="text-base font-bold text-cyan-200 truncate">{name}</h4>
          <div className="flex flex-wrap gap-2 items-center">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-cyan-800/60 text-cyan-100 border border-cyan-700 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {link !== "" ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 bg-cyan-700 hover:bg-cyan-400 text-cyan-100 hover:text-cyan-900 rounded-full p-2 transition-colors duration-200 shadow border border-cyan-400/40 z-30"
            title="Visit project"
          >
            <FaLink size={16} />
          </a>
        ) : (
          <span
            className="absolute top-3 right-3 bg-cyan-900 text-cyan-700 rounded-full p-2 border border-cyan-800/40 cursor-not-allowed z-30"
            title="No link available"
          >
            <FaLinkSlash size={16} />
          </span>
        )}
      </div>
      {/* Image section */}
      <div className="h-64 w-full overflow-hidden flex items-center justify-center bg-[#07304b]">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full opacity-80"
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
