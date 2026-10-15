import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/animations/Marquee";

const techStack = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Next.js",
  "Tailwind CSS",
  "REST APIs",
  "JWT Auth",
  "OpenAI",
];

const focusAreas = [
  "Full Stack Development",
  "MERN Stack",
  "AI Integration",
  "Scalable Systems",
  "Clean Architecture",
];

export default function Home() {
  return (
    <>
      <Hero />

      <div className="marquee py-6 border-y border-card-border bg-card-bg/30 overflow-hidden">
        <Marquee items={techStack} speed={35} variant="outline" />
      </div>

      <About />
      <Skills />
      <Experience />
      <Projects />

      <div className="marquee py-6 border-y border-card-border bg-card-bg/30 overflow-hidden">
        <Marquee items={focusAreas} speed={40} reverse variant="filled" />
      </div>

      <Education />
      <Contact />
    </>
  );
}
