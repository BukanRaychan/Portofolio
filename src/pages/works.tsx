import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import scrollToSection from "@/utils/scrollToSection";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { techIcons } from "@/data/tech-Icons";
import { works } from "@/data/work";
import { useWorks } from "@/context/works-context";

export default function Works() {
  
  const { activeWork, setActiveWork } = useWorks();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const manualSelect = useRef(false);

  useEffect(() => {
    const index = works.findIndex((w) => w.title === activeWork.title);
    console.log(window.innerWidth, window.devicePixelRatio);
    if (window.location.hash != "#works") return;
    if (index >= 0) {
      if (index <= 3) {
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
          <h2 className="text-3xl font-bold text-foreground">{activeWork.title}</h2>
          {activeWork.position && <p className="text-default-500">{activeWork.position}</p>}
          <p className="text-default-700 leading-relaxed">{activeWork.description}</p>
          {activeWork.images && <WorkCarousel images={activeWork.images} />}

          {activeWork.technologies && (
            <div className="flex gap-3 flex-wrap mt-3">
              {activeWork.technologies.map((tech) => (
                <div className=" gap-x-2 flex items-center px-4 py-3 rounded-md group" key={tech}>  
                  <img
                    key={tech}
                    src={techIcons[tech].logo}
                    alt={tech}
                    className={`w-6 h-6 opacity-70 group-hover:opacity-100 transition ${techIcons[tech].needsInvertion ? "dark:invert" : ""}`}
                  />
                  <div className="text-default-800 font-medium cursor-default">
                    {techIcons[tech].name}
                  </div>
                  
                </div>
              ))}
            </div>
          )}

          
        </motion.div>
      </div>

      {/* RIGHT SIDE (DESKTOP SCROLL AREA) */}
      <div className="hidden md:block w-1/2 p-8 space-y-6 works-scroll-area overflow-y-auto">
        {works.map((work, i) => {
          if (work?.header)
            return (
              <h3 key={i + 100} className="text-2xl font-semibold mb-6 text-foreground">
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
              className={`p-4 rounded-lg border  cursor-pointer transition-all duration-300 flex items-center gap-x-9 ${
                activeWork.title === work.title
                  ? "bg-primary/10 border-primary"
                  : "hover:bg-primary/5 border-primary/5"
              }`}
            >
              <img
                src={work.place_logo}
                className="w-12"
              /> 
              <div>
                <h4 className="text-lg font-semibold text-default-900">{work.title}</h4>
                {work.position && <p className="text-default-600">{work.position}</p>}
                <p className="text-sm text-default-500">{work.period} — {work.place}</p>
              </div>
            </motion.div>
          );

          if (i == works.length - 1) {
            return (
              <div className="pb-6" ref={(el) => (cardRefs.current[i] = el)}>
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
            base: "bg-background border border-default-100 rounded-lg mb-2 text-foreground/70",
            title: "font-semibold text-lg text-default-900",
            content: "text-default-700 pt-2",
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
                  {work.images && (
                    <div className="">
                      <WorkCarousel images={work.images} />
                    </div>
                  )}
                  {work.technologies && (
                    <div className="flex flex-wrap gap-3 my-3 justify-center">
                      {work.technologies.map((tech) => (
                        <img
                          key={tech}
                          src={techIcons[tech].logo}
                          alt={tech}
                          className={`w-6 h-6 opacity-70 hover:opacity-100 transition ${techIcons[tech].needsInvertion ? "dark:invert" : ""}`}
                        />
                      ))}
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
      className="relative mt-0 md:mt-5 w-full overflow-hidden rounded-sm shadow-lg group"
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
