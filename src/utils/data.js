import {
    Code2,
    GraduationCap,
    Briefcase,
    Award,
    Rocket,
    Heart,
    Coffee,
    BookOpen,
    Zap,
    Database,
    Server,
    Cloud,
    Mail,
    MapPin,
    Phone,
    Terminal

} from "lucide-react";

import {
  FaAngular,
  FaBootstrap,
  FaCss3Alt,
  FaFacebook,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaSass,
} from "react-icons/fa";
import { MdOutlineSettingsApplications } from "react-icons/md";
import {
  SiC,
  SiCplusplus,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiPostgresql,
  SiPostman,
  SiRedux,
  SiSpring,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
  GiMaterialsScience,
  GiNorthStarShuriken,
  GiSandsOfTime,
} from "react-icons/gi";
import { DiJava, DiPython, DiVisualstudio } from "react-icons/di";
import { TbBrandCSharp } from "react-icons/tb";








import { FiGithub, FiLinkedin } from "react-icons/fi";

import PROJECT_IMG_1 from "../assets/images/project-1.png";
import PROJECT_IMG_2 from "../assets/images/project-2.png";
import PROJECT_IMG_3 from "../assets/images/project-3.png";
// import PROJECT_IMG_4 from "../assets/images/project-4.png";
// import PROJECT_IMG_5 from "../assets/images/project-5.png";
// import PROJECT_IMG_6 from "../assets/images/project-6.png";
// import PROJECT_IMG_7 from "../assets/images/project-7.png";

export const SKILLS_CATEGORY = [
    {
        title: "Frontend",
        icon: Code2,
        desc: "Construindo interfaces responsivas e interativas",
        skills: [
            { name: "HTML", icon: FaHtml5, classname: "text-orange-500" },
            { name: "CSS", icon: FaCss3Alt, clasname: "text-blue-500" },
            { name: "SASS", icon: FaSass, classname:"text-pink-400" },
            { name: "JavaScript", icon: FaJs, classname:"text-yellow-400"  },
            { name: "React JS", icon: FaReact, classname:"text-cyan-400"  },
            { name: "Angular", icon: FaAngular, classname:"text-red-500" },
            { name: "Redux", icon: SiRedux, classname:"text-purple-500" },
            { name: "Next JS", icon: RiNextjsFill, classname:"text-black" },
            { name: "Tailwind CSS", icon: RiTailwindCssFill, classname:"text-teal-400" },
            { name: "GSAP", icon: MdOutlineSettingsApplications, classname:"text-green-500" },
            { name: "Material UI", icon: GiMaterialsScience, classname:"text-blue-400" },
            { name: "Bootstrap", icon: FaBootstrap, classname:"text-purple-600" },
        ],
    },
    {
        title: "Backend",
        icon: Server,
        desc: "Criando aplicações server-side robustas e escalaveis",
        skills: [
            { name: "Spring Boot", icon: SiSpring, classname:"text-green-600" },
            { name: "Node JS", icon: FaNodeJs, classname:"text-green-400" },
            { name: "Express JS", icon: SiExpress, classname:"text-gray-300" },
            { name: "MySQL", icon: SiMysql, classname:"text-blue-400" },
            { name: "MongoDB", icon: SiMongodb, classname:"text-green-500" },
            { name: "Firebase", icon: SiFirebase, classname:"text-yellow-500" },
            { name: "PostgreSQL", icon: SiPostgresql, classname:"text-sky-500" },
        ]
    },
    {
        title: "Linguagens",
        icon: Terminal,
        desc: "Desenvolvendo aplicações com diferentes tecnologias",
        skills: [
            { name: "C", icon: SiC, classname:"text-blue-400" },
            { name: "C++", icon: SiCplusplus, classname:"text-blue-500" },
            { name: "Java", icon: DiJava, classname:"text-red-600" },
            { name: "Python", icon: DiPython, classname:"text-yellow-400" },
            { name: "C#", icon: TbBrandCSharp, classname:"text-purple-400" },
            { name: "JavaScript", icon: SiJavascript, classname:"text-yellow-400" },
            { name: "TypeScript", icon: SiTypescript, classname:"text-blue-400" },
        ]
    },
    {
        title: "Ferramentas",
        icon: BookOpen,
        desc: "Otimizando processos e organizando todo o trabalho feito",
        skills: [
            { name: "Git", icon: SiGit, classname:"text-orange-500" },
            { name: "GitHub", icon: SiGithub, classname:"text-white" },
            { name: "VS Code", icon: DiVisualstudio, classname:"text-blue-500" },
            { name: "Postman", icon: SiPostman, classname:"text-orange-400" },
            { name: "Vercel", icon: SiVercel, classname:"text-black" },
            { name: "Netlify", icon: SiNetlify, classname:"text-teal-400" },
            { name: "Figma", icon: SiFigma, classname:"text-pink-500" },
        ]
    }
]

export const TECH_STACK = [
    "GPT",
    "Ollama",
    "Gemini",
    "Grok",
    "Claude",
    "Deepseek"
]

export const STATS = [
    { number: "50+", label: "Projetos Completos" },
    { number: "5", label: "Anos de Experiência" },
    { number: "10+", label: "Tecnologias" },
    { number: "100%", label: "Satisfação do Cliente" },
]

export const PROJECTS = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: " A full-stack e-commerce platform with user authentication and payment integration",
        image: PROJECT_IMG_1,
        tags: ["React", "Tailwind", "Framer motion"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 2,
        title: "Blog App with AI Post Generator",
        description: "A blogging platform that uses AI to help users generate content ideas and drafts.",
        image: PROJECT_IMG_2,
        tags: ["React", "Node.js", "MongoDB", "Tailwind"],
        liveUrl: "https://youtu.be/tUnGudIBBjQ",
        githubUrl: "#",
        featured: true,
        category: "Full Stack",
    },
    {
        id: 3,
        title: "Pokedex",
        description: "Uma pokedex interativa para visualizar pokemons",
        image: PROJECT_IMG_3,
        tags: ["HTML", "CSS", "API"],
        liveUrl: "https://pokedex-eight-phi.vercel.app/",
        githubUrl: "https://github.com/stocaline/pokedex",
        featured: false,
        category: "Frontend",
    },
]

export const JOURNEY_STEPS = [
    {
        year: "2019 - 2020",
        title: "Estágio - Dev Java",
        company: "Involves",
        description: "Trabalhando no time responsável pela API",
        icon: Code2,
        color: "bg-blue-500"
    },
    {
        year: "2022 - 2024",
        title: "Faculdade de ADS",
        company: "Unicesusc",
        description: "Formação em análise e densenvolvimento de sistemas",
        icon: GraduationCap,
        color: "bg-red-500",
    },
    {
        year: "2023",
        title: "Estágio Dev",
        company: "CH JR Sistemas",
        description: "Trabalhos como suporte, testes, ajustes e correções",
        icon: Code2,
        color: "bg-green-500",
    },
    {
        year: "2023 - 2024",
        title: "Desenvolvedor Jr",
        company: "Innoscience",
        description: "Trabalhos como suporte, testes, ajustes e correções",
        icon: Briefcase,
        color: "bg-orange-500",
    },
    {
        year: "2024 - 2025",
        title: "Desenvolvedor Pl",
        company: "Innoscience",
        description: "Trabalhos como suporte, testes, ajustes e correções",
        icon: Rocket,
        color: "bg-purple-500",
    }
]

export const PASSIONS = [
    {
        icon: Heart,
        title: "Experiência dos Usuários",
        description: "Construindo interfaces intuitivas",
    },
    {
        icon: Coffee,
        title: "Solução de Problemas",
        description: "Tornando desafios complexos em soluções elegantes"
    },
    {
        icon: BookOpen,
        title: "Aprendizado Continuo",
        description: "Sempre explorando novas tecnologias e melhores praticas",
    }
]

export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: FiGithub,
        url: "https://github.com/stocaline",
        color: "hover:text-gray-400",
        bgColor: "hover:bg-gray-800"
    },
    {
        name: "LinkedIn",
        icon: FiLinkedin,
        url: "https://www.linkedin.com/in/richard-de-souza-bercheli/",
        color: "hover:text-blue-400",
        bgColor: "hover:bg-blue-500/10"
    },
    {
        name: "Email",
        icon: Mail,
        url: "malito:richardbercheli@gmail.com",
        color: "hover:text-green-400",
        bgColor: "hover:bg-green-500/10"
    },
]

export const CONTACT_INFO = [
    {
        icon: MapPin,
        label: "Location",
        value: "Florianópolis, SC - Brazil",
    },
    {
        icon: Mail,
        label: "Location",
        value: "richardbercheli@gmail.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "(48) 9 99965-1911",
    }
]
