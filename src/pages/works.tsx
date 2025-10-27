import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import scrollToSection from "@/utils/scrollToSection";
import { Accordion, AccordionItem } from "@heroui/accordion";

export default function Works() {
  const techIcons = import.meta.glob("../assets/images/tech/*.svg", {
    eager: true,
  });
  const techMap = Object.fromEntries(
    Object.entries(techIcons).map(([path, mod]) => {
      const name = path.split("/").pop()?.replace(".svg", "");
      return [name, (mod as any).default];
    })
  );

  const works = [
    { header: "Experience" },
    {
      title: "Backend Engineer Intern — ShowUp",
      position: "Backend Engineer Intern",
      place: "PT Inovasi Progresif Medika",
      period: "Jul 2025 – Sep 2025",
      description:
        "Developed health insights through data processing and AI model integration for patient reports. Designed and deployed the ShowUp app using Flask, Laravel, ReactJS, and MySQL with a downloadable PDF health report feature.",
      technologies: ["flask", "vite", "python", "docker", "mysql"],
      images: ["/works/showup1.png", "/works/showup2.png"],
    },
    {
      title: "Backend Developer Intern — POS FNB Lakeside Website",
      position: "Backend Developer Intern",
      place: "CAATIS (Telkom University)",
      period: "Jun 2024 – Aug 2024",
      description:
        "Developed backend services for a campus food & beverage POS system. Designed Laravel-based APIs, handled order processing, and improved integration between backend and frontend systems.",
      technologies: ["laravel", "mysql"],
      // images: ["/works/caatis-pos1.png"],
    },
    {
      title: "Practicum Assistant",
      position: "Lab Instructor",
      place: "Informatics Lab, Telkom University",
      period: "Feb 2024 – Jun 2025",
      description:
        "Assisted 500+ students over 3 semesters across 5 core courses, including Software Testing, Architecture & Design, and Operating Systems. Guided hands-on exercises with Java, Spring Boot, and process management simulations.",
      technologies: ["java", "springboot", "python", "go", "c"],
      images: [
        "/works/practicum1.jpg",
        "/works/practicum2.jpg",
        "/works/practicum3.jpg",
        "/works/practicum4.jpg",
        "/works/practicum5.jpg",
        "/works/practicum6.jpg",
      ],
    },
    {
      title: "Lecturer Assistant",
      position: "Teaching Assistant",
      place: "Telkom University",
      period: "Sep 2022 – Jun 2025",
      description:
        "Supported lectures for Operating Systems, Logic Mathematics, and Intro to Programming. Evaluated assignments and delivered coding sessions to help students strengthen theoretical understanding.",
      images: [
        "/works/lecturer1.png",
        "/works/lecturer2.png",
        "/works/lecturer3.png",
        "/works/lecturer4.png",
        "/works/lecturer5.png",
      ],
    },

    { header: "Projects" },

    {
      title: "Presentia — Automated Attendance System",
      position: "Backend Developer | CAATIS Lab Researcher",
      place: "Telkom University",
      period: "Sep 2024 – Aug 2025",
      description:
        "Built a SaaS attendance system used by multiple schools with 1,000+ daily records. Developed 100+ REST APIs using Laravel with multi-tenant database models for secure data isolation.",
      technologies: ["laravel", "mysql", "vite"],
      images: [
        "/works/presentia1.jpg",
        "/works/presentia2.jpg",
        "/works/presentia3.jpg",
        "/works/presentia4.jpg",
        "/works/presentia5.jpg",
        "/works/presentia6.jpg",
      ],
    },
    {
      title: "DetectMe — Healthcare App for Prenatal Tracking",
      position: "Fullstack Developer",
      place: "Telkom University, ITB & Unpad Collaboration",
      period: "May 2025 – Sep 2025",
      description:
        "Built an app to help health centers monitor prenatal conditions. Implemented real-time tracking with WebSocket using Socket.IO, developed Flutter mobile and React Vite web apps integrated with Laravel/Express backend.",
      technologies: [
        "flutter",
        "vite",
        "express",
        "nodejs",
        "laravel",
        "socketio",
      ],
      images: [
        "/works/detectme1.jpg",
        "/works/detectme2.jpg",
        "/works/detectme3.jpg",
        "/works/detectme4.jpg",
        '/works/detectme5.jpg'
      ],
    },
    {
      title: "SMKN 10 Bandung Website",
      position: "Fullstack Developer | CAATIS Lab Researcher",
      place: "CAATIS, Telkom University",
      period: "Mar 2024 – Jun 2024",
      description:
        "Delivered a digital school platform for admissions, announcements, and internal communication. Built with Laravel, Inertia.js, and ReactJS using TailwindCSS for the frontend.",
      technologies: ["laravel", "react", "tailwindcss", "vite", "mysql"],
      images: [
        "/works/smkn10-3.png",
        "/works/smkn10-1.png",
        "/works/smkn10-2.png",
      ],
    },
    {
      title: "CardiaInsight — AI for Cardiovascular Diagnosis",
      position: "AI Developer",
      place: "WRAP RESEARCHSHIP — Telemedicine AI Program",
      period: "Feb 2024 – Jun 2024",
      description:
        "Developed a Random Forest model with 74% validation accuracy for heart disease detection and Flask REST APIs for prediction services. Integrated ML model into a web platform for real-time AI-assisted diagnosis.",
      technologies: ["flask", "python"],
      images: ["/works/cardainsight1.jpg", "/works/cardainsight2.jpg"],
    },
    {
      title: "Tel-U Project Website",
      position: "Fullstack Developer | Final Course Project",
      place: "Telkom University",
      period: "Sep 2023 – Dec 2023",
      description:
        "Built a role-based project management app with React and ExpressJS for lecturers and students. Focused on modular architecture and authentication. Earned an A grade for completion.",
      technologies: ["react", "express", "nodejs", "mysql"],
      images: ["/works/teluproject1.png", "/works/teluproject2.png"],
    },
    {
      title: "On-demand Data Sharding Platform",
      position: "Frontend Developer",
      place: "TIDB Future App Hackathon 2023",
      period: "Jun 2023 – Aug 2023",
      description:
        "Built a data sharding dashboard using vanilla HTML, CSS, JS, and Bootstrap 5. Reached Top 60 among 1,492 global participants in the hackathon.",
      technologies: ["html", "css", "js", "bootstrap"],
      // images: ["/works/tidb1.png"],
    },
    {
      title: "TakeCare — Health Management App",
      position: "Fullstack Developer | Final OOP Project",
      place: "Telkom University",
      period: "Jun 2023",
      description:
        "Developed a CRUD-based web app using Spring MVC and MySQL. Implemented JWT authentication for secure access. Completed independently in 2 weeks and earned an A grade.",
      technologies: ["java", "springboot", "mysql"],
      // images: ["/works/takecare1.png"],
    },
  ];

  const [activeWork, setActiveWork] = useState(works[1]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const manualSelect = useRef(false);

  useEffect(() => {
    const index = works.findIndex((w) => w.title === activeWork.title);
    if (window.location.hash != "#works") return;
    if (index >= 0) {
      if (index == 1 || index == 2) {
        scrollToSection("works");
      } else if (index >= works.length - 4) {
        cardRefs.current[works.length - 1]?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else {
        cardRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [activeWork]);

  const handleManualSelect = (work: any) => {
    manualSelect.current = true;
    setActiveWork(work);
    setTimeout(() => (manualSelect.current = false), 800);
  };

  return (
    <div className="md:flex">
      {/* ===== DESKTOP VIEW ===== */}
      <div className="hidden md:flex sticky top-[60px] h-[calc(100dvh-60px)] w-1/2 flex-col justify-center items-center bg-background p-8">
        <motion.div
          key={activeWork.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg text-left space-y-4"
        >
          <h2 className="text-3xl font-bold text-danger">{activeWork.title}</h2>
          {activeWork.position && <p className="text-default-500">{activeWork.position}</p>}
          <p className="text-default-700 leading-relaxed">{activeWork.description}</p>

          {activeWork.technologies && (
            <div className="flex gap-3 flex-wrap mt-3">
              {activeWork.technologies.map((tech) => (
                <img
                  key={tech}
                  src={techMap[tech]}
                  alt={tech}
                  className="w-8 h-8 opacity-70 hover:opacity-100 transition"
                />
              ))}
            </div>
          )}

          {activeWork.images && <WorkCarousel images={activeWork.images} />}
        </motion.div>
      </div>

      {/* RIGHT SIDE (DESKTOP SCROLL AREA) */}
      <div className="hidden md:block w-1/2 p-8 space-y-6 works-scroll-area overflow-y-auto">
        {works.map((work, i) => {
          if (work?.header)
            return (
              <h3 key={i} className="text-2xl font-semibold mb-6 text-foreground">
                {work.header}
              </h3>
            );

          const card = (
            <motion.div
              ref={(el) => (cardRefs.current[i] = el)}
              data-index={i}
              key={i}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleManualSelect(work)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                activeWork.title === work.title
                  ? "bg-primary/10 border-primary"
                  : "hover:bg-primary/5 border-transparent"
              }`}
            >
              <h4 className="text-lg font-semibold text-default-900">{work.title}</h4>
              {work.position && <p className="text-default-600">{work.position}</p>}
              <p className="text-sm text-default-500">{work.period} — {work.place}</p>
            </motion.div>
          );

          if (i == works.length - 1) {
            return (
              <div className="pb-9" ref={(el) => (cardRefs.current[i] = el)}>
                {card}
              </div>
            )
          }

          return card;
        })}
      </div>

      {/* ===== MOBILE ACCORDION ===== */}
      <div className="block md:hidden px-4">
        <Accordion
          variant="splitted"
          itemClasses={{
            base: "bg-background border border-default-100 rounded-lg mb-2 text-success",
            title: "font-semibold text-lg text-default-900",
            content: "text-default-600 pt-2",
          }}
        >
          {works.map((work, i) =>
            work.header ? (
              <AccordionItem key={i} title={work.header} className="text-xl font-bold mt-6 mb-2 text-danger bg-background" hideIndicator isDisabled={true} />

            ) : (
              <AccordionItem
                key={i}
                aria-label={work.title}
                title={work.title}
                subtitle={work.period ? `${work.period} — ${work.place}` : undefined}
              >
                <div className="flex flex-col gap-3 text-left">
                  {work.position && (
                    <p className="text-default-500 font-medium">{work.position}</p>
                  )}
                  <p className="text-default-700 leading-relaxed text-sm">
                    {work.description}
                  </p>

                  {work.technologies && (
                    <div className="flex flex-wrap gap-3 mt-1">
                      {work.technologies.map((tech) => (
                        <img
                          key={tech}
                          src={techMap[tech]}
                          alt={tech}
                          className="w-6 h-6 opacity-70 hover:opacity-100 transition"
                        />
                      ))}
                    </div>
                  )}

                  {work.images && (
                    <div className="mt-3">
                      <WorkCarousel images={work.images} />
                    </div>
                  )}
                </div>
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>
    </div>
  );
}

interface WorkCarouselProps {
  images: string[];
  interval?: number; // optional custom interval (ms)
}

function WorkCarousel({ images, interval = 2500 }: WorkCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper: move to next image
  const next = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return; // Pause when hovered
    timeoutRef.current = setTimeout(next, interval);
    return () => clearTimeout(timeoutRef.current!);
  }, [activeIndex, isPaused, interval]);

  return (
    <div
      className="relative mt-5 w-full overflow-hidden rounded-xl shadow-lg group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image track */}
      <motion.div
        className="flex"
        animate={{ x: `-${activeIndex * 100}%` }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`img-${i}`}
            className="w-full h-64 object-cover flex-shrink-0"
          />
        ))}
      </motion.div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/10 text-white p-1.5 rounded-full scale-75
                    opacity-0 group-hover:opacity-100 transition hover:bg-black/50 cursor-pointer"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/10 text-white p-1.5 rounded-full scale-75
                    opacity-0 group-hover:opacity-100 transition hover:bg-black/50 cursor-pointer"
      >
        <ChevronRightIcon />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 gap-2 flex group-hover:opacity-100 opacity-0 transition">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "bg-primary scale-110"
                : "bg-default-800 hover:bg-primary"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
