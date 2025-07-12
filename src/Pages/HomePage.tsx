import { useState, useEffect } from "react";
import Contact from "@/components/Contact";
import {
  FaReact,
  FaNodeJs,
  FaLaravel,
  FaLinkedin,
  FaGithubSquare,
  FaDownload,
  FaInstagramSquare,
  FaPhp,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiMongodb, SiMysql, SiSwagger, SiTypescript } from "react-icons/si";
import { RxHamburgerMenu } from "react-icons/rx";
import ProjectCard from "@/components/ProjectCard";
import IconCard from "@/components/IconCard";
import Link from "../components/Link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const skills = [
  { name: "React Js", icon: <FaReact />, color: "hover:text-blue-400" },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    color: "hover:text-green-500",
  },
  {
    name: "PHP",
    icon: <FaPhp />,
    color: "hover:text-blue-500",
  },
  {
    name: "Laravel",
    icon: <FaLaravel />,
    color: "hover:text-red-500",
  },
  {
    name: "TailwindCss",
    icon: <RiTailwindCssFill />,
    color: "hover:text-blue-400",
  },
  {
    name: "Typescript",
    icon: <SiTypescript />,
    color: "hover:text-blue-700",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb />,
    color: "hover:text-green-700",
  },
  {
    name: "MySQL",
    icon: <SiMysql />,
    color: "hover:text-yellow-500",
  },
  {
    name: "Swagger",
    icon: <SiSwagger />,
    color: "hover:text-green-500",
  },
];

const projects = [
  {
    name: "TriByte",
    image: "/bg-tribyte.png",
    link: "https://tribyte.me/",
    tags: ["ReactJs", "Tailwind", "Framer Motion"],
  },
  {
    name: "CINETIX",
    image: "/bg-cinetix.png",
    link: "https://cinetix.shop/",
    tags: ["Laravel", "Midtrans", "Filament", "MySQL"],
  },
  {
    name: "MSIB 7: API Beli Galon",
    image: "/bg-begal.png",
    link: "https://github.com/rezkysyaputra/begal-backend",
    tags: ["ExpressJs", "Midtrans", "MongoDB", "Rest API", "Swagger"],
  },
];

// Tambahkan variants untuk grid motion
const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

// Variants untuk grid motion project
const projectGridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const projectItemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 22 },
  },
};

export default function HomePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavSolid(true);
      } else {
        setNavSolid(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#0a2342] via-[#07304b] to-[#02111b] text-white min-h-screen transition-all duration-500">
      <header
        className={`fixed w-full top-0 left-0 z-40 transition-all duration-300 font-sans
          ${
            navSolid
              ? "backdrop-blur bg-[#02111b]/95 shadow-md "
              : "bg-gradient-to-b from-[#02111b]/70 to-transparent "
          }
        `}
      >
        <div className="container mx-auto py-4 flex justify-between items-center px-4 md:px-12">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight md:tracking-wider">
            <a href="/" className="select-none">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                Tandaki
              </span>
              <span className="text-cyan-400">Code</span>
            </a>
          </h1>
          <nav className="hidden md:flex flex-row space-x-8 font-semibold ml-auto">
            <Link
              href="#about"
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>
          <div className="flex flex-row space-x-2 items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl font-bold ml-2"
            >
              {isOpen ? <IoClose /> : <RxHamburgerMenu />}
            </button>
          </div>
        </div>
        {/* Mobile nav overlay */}
        <div
          className={`fixed flex flex-col space-y-4 bg-[#02111b]/95 backdrop-blur h-screen w-2/3 items-center top-0 right-0 md:hidden z-50 transition-transform duration-300 ease-in-out shadow-lg ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl font-bold mt-10 mb-5"
          >
            <IoClose />
          </button>
          <div className="flex flex-col w-full text-center">
            <Link
              href="#about"
              className="py-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="py-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="py-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto text-center pt-32 pb-12 px-4 md:px-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center relative mb-10">
          <div className="relative">
            <motion.img
              width={170}
              src="./profile.png"
              alt="profile"
              className="relative z-10 rounded-full border-4 border-blue-400 shadow-xl object-cover aspect-square bg-white"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight md:tracking-wider">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-400 bg-clip-text text-transparent font-black">
                  Rezky
                </span>
              </motion.span>
            </h2>
            <div className="text-base md:text-lg text-gray-500 dark:text-gray-300 mt-2 font-medium tracking-wide min-h-[32px]">
              <TypeAnimation
                sequence={[
                  "Fullstack Web Developer",
                  1200,
                  "UI Enthusiast",
                  1200,
                  "React & Laravel Specialist",
                  1200,
                  "Open Source Contributor",
                  1200,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                style={{ display: "inline-block" }}
              />
            </div>
            <motion.p
              className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-gray-500 dark:text-gray-300 font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              A passionate full-stack web developer who loves building
              interactive and engaging user experiences.
            </motion.p>
          </div>
          <div className="flex justify-center space-x-6 mt-6 pt-4">
            <Link
              className="hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
              href="https://github.com/rezkysyaputra"
            >
              <FaGithubSquare size={32} />
            </Link>
            <Link
              className="hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
              href="https://www.linkedin.com/in/muh-rezky-syaputra-a65a42250/"
            >
              <FaLinkedin size={32} />
            </Link>
            <Link
              className="hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors"
              href="https://www.instagram.com/rezky.s_/"
            >
              <FaInstagramSquare size={32} />
            </Link>
          </div>
        </div>
        {/* About */}
        <motion.div
          id="about"
          className="mt-24 md:mt-32 pt-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cyan-400 tracking-tight md:tracking-wider">
            About Me
          </h2>
          <div className="flex flex-col items-center justify-center gap-6 text-lg leading-relaxed max-w-2xl mx-auto">
            <motion.p
              className="italic text-lg md:text-xl text-cyan-200 dark:text-cyan-300 mb-4 border-l-4 border-cyan-400 pl-4 font-medium text-left w-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              "Building digital experiences that matter."
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-cyan-100 dark:text-cyan-200 font-medium leading-relaxed text-left w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi! I'm{" "}
              <span className="font-bold text-cyan-500">
                Muh. Rezky Syaputra
              </span>
              , a passionate{" "}
              <span className="font-bold">Fullstack Web Developer</span> from
              Southeast Sulawesi, Indonesia, currently based in Yogyakarta. I
              love building intuitive and efficient web applications that make
              an impact.
            </motion.p>
            <motion.p
              className="text-base md:text-lg text-gray-500 dark:text-gray-300 font-medium leading-relaxed text-left w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I'm currently studying at{" "}
              <span className="font-semibold">
                Universitas Amikom Yogyakarta
              </span>{" "}
              and always eager to learn new technologies and collaborate on
              exciting projects.
            </motion.p>
            <div className="flex justify-start w-full mt-2">
              <Link
                href="#"
                className="w-fit flex space-x-2 items-center py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 text-white hover:from-cyan-500 hover:to-blue-600 transition-colors font-semibold text-base md:text-lg"
              >
                <FaDownload size={16} /> <span>Download CV</span>
              </Link>
            </div>
          </div>
        </motion.div>
        {/* Skills */}
        <motion.div
          className="mt-24 md:mt-32 pt-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-cyan-400 tracking-tight md:tracking-wider">
            Tech Stack
          </h2>
          <motion.div
            className="flex flex-wrap md:max-w-2xl mx-auto items-center gap-5 justify-center"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.13,
                  rotate: -3,
                  boxShadow: "0 8px 32px 0 rgba(251, 191, 36, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <IconCard {...skill} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* Projects */}
        <motion.div
          id="projects"
          className="mt-24 md:mt-32 pt-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-cyan-400 tracking-tight md:tracking-wider">
            Projects
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 max-w-6xl mx-auto w-full justify-items-center"
            variants={projectGridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                variants={projectItemVariants}
                whileHover={{
                  scale: 1.06,
                  y: -8,
                  boxShadow: "0 8px 32px 0 rgba(251, 191, 36, 0.18)",
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="w-[320px] max-w-full"
              >
                <ProjectCard {...project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <div id="contact" className="mt-24 md:mt-32 pt-4">
          <Contact />
        </div>
      </main>
      <footer className="text-center py-8 text-cyan-400 text-sm border-t border-cyan-800/40 bg-[#02111b]/80 backdrop-blur mt-12 font-medium">
        &copy; 2025 Muh. Rezky Syaputra. All rights reserved.
      </footer>
    </div>
  );
}
