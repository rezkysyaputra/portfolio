import React from "react";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
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
    <div
      key={index}
      className="relative h-64 w-80 overflow-hidden bg-cover p-6 rounded-lg shadow-lg  hover:scale-105 transition duration-300"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-black to-transparent" />
      <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-50  transition duration-300" />
      <div className="absolute bottom-4 left-4 text-white">
        <h4 className="flex gap-2 items-center text-lg font-semibold mb-2">
          {name}{" "}
          <a
            href={link === "" ? undefined : link}
            className="text-indigo-500 hover:underline cursor-pointer"
          >
            {link !== "" ? <FaLink size={18} /> : <FaLinkSlash size={18} />}
          </a>
        </h4>
        <div className="flex flex-wrap gap-2 items-center mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-transparent border border-gray-200 rounded text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
