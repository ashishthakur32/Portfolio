import type {
  PersonalInfo,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  TestimonialItem,
  CertificationItem,
  NavLink,
} from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Ashish Kumar Thakur',
  title: 'Software Developer',
  summary:
    'Software Developer skilled in MERN stack development, RESTful APIs, and scalable web applications. Proficient in Java, JavaScript, React.js, Node.js, Express.js, MongoDB, PostgreSQL, and Data Structures & Algorithms.',
  email: 'ashishthakur1014@gmail.com',
  phone: '+91-8114901264',
  location: 'Bengaluru, Karnataka, India',
  linkedin: 'https://linkedin.com/in/ashishthakur',
  github: 'https://github.com/ashishthakur',
  resumeUrl: '/resume.pdf',
};

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const typingRoles: string[] = [
  'Software Developer',
  'MERN Stack Developer',
  'Full Stack Developer',
  'Backend Engineer',
  'Java & JavaScript Developer',
];

export const heroStats = [
  { value: '3+', label: 'Projects Built' },
  { value: '2', label: 'Years Experience' },
  { value: '10+', label: 'Technologies' },
  { value: '15+', label: 'APIs Built' },
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    icon: 'code',
    skills: ['Java', 'Python', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    category: 'Frontend',
    icon: 'layout',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Responsive Web Design'],
  },
  {
    category: 'Backend',
    icon: 'server',
    skills: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT Authentication',
      'RBAC',
      'MVC Architecture',
    ],
  },
  {
    category: 'Databases',
    icon: 'database',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'Tools',
    icon: 'wrench',
    skills: [
      'Git',
      'GitHub',
      'GitHub Actions (CI/CD)',
      'Postman',
      'VS Code',
      'Antigra',
    ],
  },
  {
    category: 'Cloud & Storage',
    icon: 'cloud',
    skills: ['Cloudinary', 'Vercel', 'DigitalOcean', 'Render', 'MongoDB Atlas'],
  },
  {
    category: 'AI / ML',
    icon: 'brain',
    skills: [
      'NLP',
      'CNN',
      'scikit-learn',
      'TF-IDF Vectorization',
      'OpenAI API Integration',
    ],
  },
  {
    category: 'Core CS',
    icon: 'cpu',
    skills: [
      'Data Structures & Algorithms',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'OOP',
    ],
  },
  {
    category: 'Methodologies',
    icon: 'users',
    skills: ['Agile', 'Scrum'],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: 'Software Development Engineer Intern',
    company: 'AIVI Technologies',
    period: 'Feb 2026 – Present',
    location: 'India',
    current: true,
    description:
      'Enterprise web application development with focus on attendance management and geolocation-based systems.',
    liveDemo: 'https://aivisuite.duckdns.org/',
    highlights: [
      'Developed and maintained enterprise-grade web application features using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB, improving application reliability and feature coverage.',
      'Implemented geolocation-based employee check-in/check-out and attendance management system with secure JWT-based user authentication, reducing manual HR tracking effort.',
      'Designed and integrated RESTful APIs following industry best practices; performed debugging and API testing using Postman in an Agile/Scrum environment with Git version control.',
    ],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'REST APIs', 'JWT'],
  },
  {
    role: 'Artificial Intelligence Intern',
    company: 'Acmegrade',
    period: 'May 2025 – Jul 2025',
    location: 'India',
    certificateUrl: '#certifications',
    description:
      'Built Machine Learning systems with focus on NLP, text classification, and deep learning models.',
    highlights: [
      'Built a Spam/Ham text classification system using NLP techniques, TF-IDF vectorization, and CNN-based deep learning models, achieving measurable improvements in precision and F1-score.',
      'Developed end-to-end ML pipeline covering text preprocessing, tokenization, feature extraction, model training, and hyperparameter tuning using Python and scikit-learn.',
      'Evaluated model quality with accuracy, precision, recall, and F1-score metrics, ensuring production-ready performance of the classification pipeline.',
    ],
    technologies: ['Python', 'scikit-learn', 'NLP', 'CNN', 'TF-IDF'],
  },
];

export const education: EducationItem[] = [
  {
    degree: 'B.Tech in Computer Science Engineering (CSE)',
    institution: 'Parala Maharaja Engineering College',
    period: 'Aug 2023 – May 2026',
    location: 'Berhampur, Odisha, India',
    description:
      'Pursuing Bachelor of Technology with focus on Computer Science, covering Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, and Object-Oriented Programming.',
    highlights: [
      'Core coursework: DSA, DBMS, Operating Systems, Computer Networks',
      'Hands-on projects in MERN stack and AI/ML',
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    title: 'CureX',
    description:
      'Full-stack doctor appointment platform with patient booking, doctor onboarding, JWT-based authentication, and Role-Based Access Control (RBAC) for User, Doctor, and Admin roles. 10+ RESTful APIs using MVC architecture with Cloudinary for media storage.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://heal-book-hms-nuqa.vercel.app/',
    category: 'fullstack',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Hanuman',
    description:
      'AI-powered SaaS platform for automated content generation and resume creation. Integrates OpenAI APIs into Node.js/Express.js backend with PostgreSQL persistence. 3 AI content generation workflows with backend validation and error handling.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'OpenAI API'],
    liveUrl: 'https://quickai-gs.vercel.app/',
    category: 'ai-ml',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Airbnb Clone',
    description:
      'Production-grade rental listing platform with property listings, search, filtering, and secure session-based user authentication using modular MVC architecture. RESTful APIs with MongoDB data management, deployed on Render with CI/CD via GitHub Actions.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    liveUrl: 'https://webdev-wk59.onrender.com/',
    category: 'fullstack',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    title: 'Smart Attendance & Leave Management System',
    description:
      'Enterprise web application with geolocation-based employee check-in/check-out, attendance tracking, leave management, and secure JWT-based authentication. Built with RESTful API best practices.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'JWT'],
    liveUrl: 'https://aivisuite.duckdns.org/',
    category: 'fullstack',
    gradient: 'from-cyan-400 to-blue-500',
  },
];

export const testimonials: TestimonialItem[] = [
  {
    name: 'Alex Johnson',
    role: 'Engineering Manager',
    company: 'Tech Corp',
    quote:
      'Ashish is an exceptional developer who consistently delivers high-quality, scalable solutions. His understanding of the MERN stack is outstanding.',
    avatarColor: 'from-cyan-400 to-blue-500',
  },
  {
    name: 'Sarah Chen',
    role: 'Product Lead',
    company: 'Startup Inc',
    quote:
      'Working with Ashish was a pleasure. He has a keen eye for detail and always goes above and beyond to ensure the end product is polished and performant.',
    avatarColor: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Senior Backend Engineer',
    company: 'Fintech Co',
    quote:
      'Ashish\'s approach to API design and database modeling is professional and thoughtful. He brings both technical depth and practical problem-solving to every project.',
    avatarColor: 'from-teal-400 to-cyan-500',
  },
];

export const certifications: CertificationItem[] = [
  {
    title: 'Artificial Intelligence Intern',
    issuer: 'Acmegrade',
    year: '2025',
    certificateUrl: 'https://drive.google.com/file/d/1kUZJLLCtikbUPfB8N3EwLyxIMdAExybZ/view',
  },
  {
    title: 'Full Stack Web Development using Python',
    issuer: 'Acmegrade',
    year: '2025',
    certificateUrl: '#',
  },
  {
    title: 'MERN Stack Development',
    issuer: 'Acmegrade',
    year: '2025',
    certificateUrl: '#',
  },
];
