import AVATAR_1 from "./assets/images/avatar-1.webp";
import AVATAR_2 from "./assets/images/avatar-2.webp";
import AVATAR_3 from "./assets/images/avatar-3.webp";
import CURRICULO_PDF from "./assets/pdfs/curriculo.pdf";

export const LINKS = {
    linkedin: "https://www.linkedin.com/in/richard-de-souza-bercheli/",
    github: "https://github.com/stocaline",
    email: "richardbercheli@gmail.com",
    phone: "(48) 9 9965-1911",
    cv: CURRICULO_PDF,
};

// `ui` picks the illustrative interface fragment drawn in Work.jsx.
// Purpose = what the product is; role = what Richard reported doing on it.
export const CASES = [
    {
        title: "Inno Auth",
        role: "Construção",
        kind: "Autenticação",
        purpose: "Central de login para todos os produtos da Innoscience.",
        contribution: "Atuei na construção da central que concentra a entrada nos projetos da empresa.",
        ui: "auth",
    },
    {
        title: "Inno Hub",
        role: "Construção",
        kind: "Treinamento em IA",
        purpose: "Central de conteúdos de IA, videoaulas e skills para treinamento interno.",
        contribution: "Atuei na construção da plataforma de treinamento.",
        ui: "hub",
    },
    {
        title: "Sonar",
        role: "Construção",
        kind: "Busca com IA",
        purpose: "Plataforma de busca de startups com IA.",
        contribution: "Atuei na construção da plataforma.",
        ui: "sonar",
    },
    {
        title: "Ideias Similares",
        role: "Feature",
        kind: "Feature do Innoup",
        purpose: "Funcionalidade do Innoup que busca e avalia ideias semelhantes dentro do ambiente do cliente.",
        contribution: "Atuei no desenvolvimento da funcionalidade.",
        ui: "ideas",
    },
    {
        title: "Innocase",
        role: "Construção",
        kind: "Business cases",
        purpose: "Plataforma de geração de business cases.",
        contribution: "Atuei na construção da plataforma.",
        ui: "case",
    },
    {
        title: "ITSA",
        role: "Desenvolvimento",
        kind: "Tiro esportivo",
        purpose: "Plataforma de competição esportiva de tiro.",
        contribution: "Atuei no desenvolvimento da plataforma.",
        ui: "itsa",
    },
    {
        title: "BS Method",
        role: "Otimização",
        kind: "Gestão de alunos",
        purpose: "Plataforma de gerenciamento de alunos.",
        contribution: "Revisei e otimizei o código.",
        ui: "bs",
    },
    {
        title: "Empregoou",
        role: "Evolução",
        kind: "Empregos",
        purpose: "Plataforma de empregos.",
        contribution: "Adicionei novas funcionalidades, melhorei o design e agreguei valor ao cliente.",
        ui: "job",
    },
];

export const JOURNEY = [
    {
        year: "2019 – 2020",
        title: "Estágio, Dev Java",
        company: "Involves",
        text: "Desenvolvimento e manutenção da API principal, implementando novas funcionalidades e otimizando desempenho com o time.",
    },
    {
        year: "2022 – 2024",
        title: "Análise e Desenvolvimento de Sistemas",
        company: "Unicesusc",
        text: "Graduação em lógica, estruturas de dados, engenharia de software e gestão de projetos.",
    },
    {
        year: "2023",
        title: "Estágio em Desenvolvimento",
        company: "CH JR Sistemas",
        text: "Suporte técnico, testes de software, ajustes e correção de bugs para garantir a qualidade do sistema.",
    },
    {
        year: "2023 – 2024",
        title: "Engenheiro de Software Jr",
        company: "Innoscience",
        text: "Desenvolvimento de novas funcionalidades, suporte e manutenção contínua dos sistemas.",
    },
    {
        year: "2024 – hoje",
        title: "Engenheiro de Software Pleno",
        company: "Innoscience",
        text: "Mais autonomia no design e na implementação de soluções complexas, mentoria de engenheiros juniores e participação nas decisões de arquitetura.",
    },
];

export const STACK = [
    {
        name: "Modelos de IA",
        note: "Modelos com que trabalho no dia a dia, via API e rodando localmente.",
        tools: ["Claude", "GPT", "Gemini", "Grok", "DeepSeek", "Hermes", "Ollama"],
    },
    {
        name: "IA em produto",
        note: "Levar modelos para dentro do produto: recuperar o contexto certo e ajustar o modelo ao caso real.",
        tools: ["RAG", "Fine-tuning"],
    },
    {
        name: "Agentes e orquestração",
        note: "IA dentro do fluxo de desenvolvimento: agentes de código, harness, skills e integrações por MCP.",
        tools: ["Claude Code", "Harness", "Maestri", "MCP", "Skills"],
    },
    {
        name: "Método",
        note: "Especificação antes do código, para guiar pessoas e agentes com o mesmo documento.",
        tools: ["SDD", "PRDs"],
    },
    {
        name: "Frontend",
        note: "Interfaces responsivas, animadas e fáceis de manter.",
        tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "GSAP"],
    },
    {
        name: "Backend",
        note: "APIs e serviços server-side.",
        tools: ["Node.js", "Express", "Java", "Spring Boot", "Python"],
    },
    {
        name: "Dados",
        note: "Bancos relacionais, documentos e plataformas gerenciadas.",
        tools: ["PostgreSQL", "Supabase", "MySQL", "MongoDB", "Firebase"],
    },
    {
        name: "Infra e entrega",
        note: "Do protótipo ao deploy, em plataforma gerenciada ou VPS própria.",
        tools: ["VPS", "Vercel", "Git", "GitHub", "Figma", "Postman", "Bubble"],
    },
];

export const TESTIMONIALS = [
    {
        name: "Alex Minoru Abe",
        role: "Tech Lead, Innoscience",
        avatar: AVATAR_3,
        quote: "[…] Além de sua sólida competência técnica, o que realmente diferencia o Richard é a sua postura consultiva e sua resiliência diante de desafios complexos. Ele não apenas entrega código de alta qualidade, mas entende o impacto de negócio por trás de cada projeto. É um profissional de extrema confiança, colaborativo e que eleva o nível de qualquer equipe.",
    },
    {
        name: "Pedro Henrique Garcia",
        role: "Product Designer, Innoscience",
        avatar: AVATAR_2,
        quote: "Tive o privilégio de fazer parte da mesma equipe e acompanhar de perto sua agilidade nas entregas e sua confiabilidade em cada etapa do processo. Richard é, sem dúvida, uma inspiração pela forma como resolve problemas com clareza e competência.",
    },
    {
        name: "Erick Gabriel de Paula",
        role: "Analista de TI, Portobello",
        avatar: AVATAR_1,
        quote: "O Richard foi fundamental na minha transição de carreira. […] Ele não só me deu as dicas técnicas certas, como me ajudou a entender o que as empresas realmente buscavam. Se hoje sou desenvolvedor, é porque tive o apoio de alguém que realmente sabe ensinar e quer ver os outros crescerem.",
    },
];
