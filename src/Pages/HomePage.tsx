import { useState } from "react";
import Contact from "@/components/Contact";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaLaravel,
  FaLinkedin,
  FaGithubSquare,
  FaDownload,
  FaSun,
  FaMoon,
  FaInstagramSquare,
} from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RiTailwindCssFill } from "react-icons/ri";
import {
  SiExpress,
  SiJest,
  SiMongodb,
  SiSwagger,
  SiTypescript,
} from "react-icons/si";
import { PiFileSqlFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import ProjectCard from "@/components/ProjectCard";
import IconCard from "@/components/IconCard";
import Link from "../components/Link";

const skills = [
  { name: "React Js", icon: <FaReact />, color: "hover:text-blue-400" },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    color: "hover:text-green-500",
  },
  {
    name: "Laravel",
    icon: <FaLaravel />,
    color: "hover:text-red-500",
  },
  {
    name: "Express Js",
    icon: <SiExpress />,
    color: "hover:text-yellow-500",
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
    name: "Git",
    icon: <FaGitAlt />,
    color: "hover:text-red-500",
  },
  {
    name: "SQL",
    icon: <PiFileSqlFill />,
    color: "hover:text-blue-500",
  },
  {
    name: "Jest",
    icon: <SiJest />,
    color: "hover:text-red-500",
  },
  {
    name: "Rest API",
    icon: <MdMiscellaneousServices />,
    color: "hover:text-blue-800",
  },
  {
    name: "Swagger",
    icon: <SiSwagger />,
    color: "hover:text-green-500",
  },
];

const projects = [
  {
    name: "JobXplore",
    image: "/bg-project1.jpg",
    link: "",
    tags: ["Laravel", "Tailwind", "MySQL"],
  },
  {
    name: "Movie TMDB",
    image: "/bg-project2.jpg",
    link: "",
    tags: ["React", "Tailwind", "TMDB API"],
  },
];

export default function HomePage() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkMode") === "true" ? true : false
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={`${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen transition-all`}
    >
      <header className="container mx-auto py-6 flex justify-between items-center px-6 md:px-12">
        <div
          className={`flex fixed flex-col space-y-4 bg-white dark:bg-gray-900 h-screen w-2/3 items-center top-0 right-0 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } z-50 transition-transform duration-300 ease-in-out shadow-lg`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden  text-2xl font-bold mt-6"
          >
            {isOpen ? <IoClose /> : <RxHamburgerMenu />}
          </button>
          <div className="flex flex-col w-full text-center">
            <Link
              href="#about"
              className="py-4 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="py-4 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="py-4 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Contact
            </Link>
          </div>
        </div>
        <h1 className="text-2xl font-bold">
          <a href="/">
            Code<span className="text-yellow-500">Kz.</span>
          </a>
        </h1>
        <nav className="hidden md:flex flex-row space-x-6 font-semibold">
          <Link href="#about" className="hover:text-yellow-500">
            About
          </Link>
          <Link href="#projects" className="hover:text-yellow-500">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-yellow-500">
            Contact
          </Link>
        </nav>
        <div className="flex flex-row space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl font-bold"
          >
            {isOpen ? <IoClose /> : <RxHamburgerMenu />}
          </button>
        </div>
      </header>

      <main className="container mx-auto text-center py-12 px-6">
        <div className="flex justify-center items-center relative mb-6">
          <svg
            width={280}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#F1C21B"
              d="M57.6,-31.4C65,-20.5,54.6,2.5,42.1,22.2C29.5,42,14.7,58.4,0.6,58.1C-13.6,57.7,-27.3,40.7,-37.3,22.5C-47.3,4.2,-53.6,-15.2,-46.8,-25.8C-40,-36.5,-20,-38.3,2.6,-39.8C25.1,-41.3,50.2,-42.4,57.6,-31.4Z"
              transform="translate(100 100)"
            />
          </svg>
          <img
            width={250}
            src="./profile.png"
            alt="profile"
            className="absolute mx-auto top-0 left-0 right-0"
          />
        </div>
        <h2 className="text-4xl font-extrabold">Hi, I'm Rezky</h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-500 dark:text-gray-300">
          A passionate full-stack developer who loves building interactive and
          engaging user experiences.
        </p>
        <div className="flex justify-center space-x-6 mt-6 pt-4">
          <Link
            className="hover:text-yellow-500 dark:hover:text-yellow-500"
            href="https://github.com/rezkysyaputra"
          >
            <FaGithubSquare size={30} />
          </Link>
          <Link
            className="hover:text-yellow-500 dark:hover:text-yellow-500"
            href="https://www.linkedin.com/in/muh-rezky-syaputra-a65a42250/"
          >
            <FaLinkedin size={30} />
          </Link>
          <Link
            className="hover:text-yellow-500 dark:hover:text-yellow-500"
            href="https://www.instagram.com/rezky.s_/"
          >
            <FaInstagramSquare size={30} />
          </Link>
        </div>
        {/* About */}
        <div id="about" className="mt-28 pt-4">
          <h2 className="text-3xl font-bold text-center mb-14">About Me</h2>
          <div className="grid md:grid-cols-2 gap-6 items-center text-lg leading-relaxed ">
            <img
              src="/about-portfolio-clear.png"
              alt="Illustration of a developer"
              height={500}
              width={500}
              className="mx-auto"
            />
            <div>
              <p className="md:text-left md:max-w-md">
                Hi! I'm <span className="font-bold">Muh. Rezky Syaputra</span>,
                a{" "}
                <span className="font-bold text-yellow-500">
                  Fullstack Web Developer
                </span>{" "}
                from Southeast Sulawesi, Indonesia, currently based in
                Yogyakarta. I'm studying at Universitas Amikom Yogyakarta and
                passionate about building intuitive and efficient web
                applications. With expertise in both front-end and back-end
                development, I focus on creating user-friendly solutions that
                make an impact.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link
                  href="#"
                  className="w-fit flex space-x-2 items-center py-2 px-4 rounded-lg mt-4 bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white dark:hover:text-white transition duration-300 dark:text-yellow-500"
                >
                  <FaDownload size={16} /> <span>Download CV</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Skilss */}
        <div className="mt-28 pt-4">
          <h2 className="text-3xl font-bold text-center mb-8">Tech Stack</h2>
          <div className="flex flex-wrap md:max-w-2xl mx-auto items-center gap-4 justify-center">
            {skills.map((skill, index) => (
              <IconCard {...skill} index={index} />
            ))}
          </div>
        </div>
        {/* Projects */}
        <div id="projects" className="mt-28 pt-4">
          <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
          <div className="flex flex-wrap justify-center gap-6 text-start">
            {projects.map((project, index) => (
              <ProjectCard {...project} index={index} />
            ))}
          </div>
        </div>
        <div id="contact" className="mt-28 pt-4">
          <Contact />
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400">
        &copy; 2025 Muh. Rezky Syaputra. All rights reserved.
      </footer>
    </div>
  );
}
