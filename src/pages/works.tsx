import { useEffect, useRef} from "react";
import { motion } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import scrollToSection from "@/utils/scrollToSection";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { techIcons } from "@/data/tech-Icons";
import { works } from "@/data/work";
import { useWorks } from "@/context/works-context";
import ProductIcon from "@mui/icons-material/CallMadeOutlined";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export default function Works() {
  const { activeWork, setActiveWork } = useWorks();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const manualSelect = useRef(false);

  useEffect(() => {
    const index = works.findIndex((w) => w.title === activeWork.title);
    if (window.location.hash != "#works") return;
    if (index >= 0) {
      if (index <= 4) {
        scrollToSection("works");
      } else if (index >= works.length - 5) {
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
          <h2 className="text-3xl font-bold text-foreground">
            {activeWork.title}
          </h2>
          {activeWork.position && (
            <p className="text-default-500">{activeWork.position}</p>
          )}
          {activeWork.link && (
            <a
              href={activeWork.link}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2 w-fit
                px-4 py-2 rounded-md
                bg-primary text-primary-foreground
                hover:bg-primary/90 transition
                text-sm font-medium
              "
            >
              View Product
              <span aria-hidden>
                <ProductIcon className="!w-5 !font-bold" />
              </span>
            </a>
          )}
          <p className="text-default-700 leading-relaxed">
            {activeWork.description}
          </p>
          {activeWork.images && <WorkCarousel images={activeWork.images} />}

          {activeWork.technologies && (
            <div className="flex gap-3 flex-wrap mt-3">
              {activeWork.technologies.map((tech) => (
                <div
                  className=" gap-x-2 flex items-center px-4 py-3 rounded-md group"
                  key={tech}
                >
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
              <h3
                key={i + 100}
                className="text-2xl font-semibold mb-6 text-foreground"
              >
                {work.header}
              </h3>
            );

          const card = (
            <motion.div
              ref={(el) => (cardRefs.current[i] = el)}
              key={i}
              onClick={() => handleManualSelect(work)}
              className={`
    relative p-4 pl-6 rounded-lg border cursor-pointer transition-all duration-300
    ${
      activeWork.title === work.title
        ? "bg-primary/10 border-primary"
        : "hover:bg-primary/5 border-primary/5 hover:-translate-x-1"
    }
  `}
            >
              <div
                className={`
      absolute left-0 top-0 h-full  rounded-l-lg
      ${activeWork.title === work.title ? "bg-primary w-1" : "bg-primary/20 w-0.5"}
    `}
              />

              <div className="flex items-center gap-6">
                <img
                  src={work.place_logo}
                  className="w-10 h-10 object-contain shrink-0 mt-1"
                />
                <div>
                  <h4 className="text-lg font-semibold text-default-900">
                    {work.title}
                  </h4>
                  {work.position && (
                    <p className="text-default-600">{work.position}</p>
                  )}
                  <p className="text-sm text-default-500">
                    {work.period} — {work.place}
                  </p>
                </div>
              </div>
            </motion.div>
          );

          if (i == works.length - 1) {
            return (
              <div className="pb-6" ref={(el) => (cardRefs.current[i] = el)}>
                {card}
              </div>
            );
          }

          return card;
        })}
      </div>

      {/* ===== MOBILE ACCORDION ===== */}
      <div className="block md:hidden px-4">
        <Accordion
          variant="splitted"
          itemClasses={{
            base: `
        relative overflow-hidden
        bg-background border border-primary/10 rounded-lg mb-3
        text-foreground transition-all duration-300
        data-[open=true]:bg-primary/10 data-[open=true]:border-primary
      `,
            // title row wrapper
            titleWrapper: "flex  py-3 px-2",
            // title text
            title: "font-semibold text-base text-default-900",
            // subtitle text (period—place)
            subtitle: "text-xs text-default-500 mt-0.5",
            // content area
            content: "text-default-700 pt-2 pb-4 px-4",
            // indicator (chevron)
            indicator: "text-default-500 data-[open=true]:text-primary",
          }}
        >
          {works.map((work, i) =>
            work.header ? (
              // ==== Section header (non-clickable) ====
              <AccordionItem
                key={`header-${i}`}
                title={work.header}
                hideIndicator
                className="
            !bg-transparent !border-0 !shadow-none
            pointer-events-none
             mb-2 px-0
          "
                // Header Style
                classNames={{
                  title:
                    "text-2xl mt-4 font-semibold text-foreground opacity-100",
                  titleWrapper: "px-0 py-0",
                }}
              />
            ) : (
              // ==== Work item ====
              <AccordionItem
                key={`work-${i}`}
                aria-label={work.title}
                title={
                  <div className="flex items-center gap-6 min-w-0">
                    {/* logo */}
                    <img
                      src={work.place_logo}
                      alt={work.place}
                      className="w-9 h-9 object-contain shrink-0"
                    />

                    {/* title + meta */}
                    <div className="min-w-0 flex-1">
                      <div className="text-default-900 font-semibold whitespace-normal break-words leading-snug">
                        {work.title}
                      </div>
                      <div className="text-xs text-default-500 whitespace-normal break-words leading-snug mt-0.5">
                        {work.period} — {work.place}
                      </div>
                    </div>
                  </div>
                }
                // left accent bar like desktop
                startContent={
                  <div
                    className={`absolute left-0 top-0 h-full rounded-l-lg transition-all
                      w-0.5 bg-primary/20 data-[open=true]:w-1 data-[open=true]:bg-primary
                    `}
                  />
                }
              >
                <div className="flex flex-col gap-3 text-left">
                  {work.position && (
                    <p className="text-default-600 font-medium text-sm">
                      {work.position}
                    </p>
                  )}
                  {work.link && (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex items-center gap-2 w-fit
                        px-4 py-2 rounded-md
                        bg-primary text-primary-foreground
                        hover:bg-primary/90 transition
                        text-sm font-medium
                        mt-1
                      "
                      onClick={(e) => e.stopPropagation()} // optional safety
                    >
                      View Product
                      <ProductIcon className="w-5" />
                    </a>
                  )}
                  <p className="text-default-700 leading-relaxed text-sm">
                    {work.description}
                  </p>

                  {work.images && (
                    <div className="rounded-md overflow-hidden">
                      <WorkCarousel images={work.images} />
                    </div>
                  )}

                  {work.technologies && (
                    <div className="flex flex-wrap gap-3 pt-2">
                      {work.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="
                      flex items-center gap-2 px-3 py-2 rounded-md
                      bg-transparent border border-transparent
                      hover:bg-muted/40 hover:border-border/60
                      transition
                    "
                        >
                          <img
                            src={techIcons[tech].logo}
                            alt={tech}
                            className={`
                              "w-5 h-5 opacity-70 group-hover:opacity-100 transition",
                              techIcons[tech].needsInvertion
                                ? "dark:invert"
                                : ""
                            `}
                          />
                          <span className="text-xs text-default-800 font-medium">
                            {techIcons[tech].name}
                          </span>
                        </div>
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
  height?: number;
}

const responsive = {
  all: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
  },
};

function WorkCarousel({
  images,
}: WorkCarouselProps) {


  const CustomDot = ({ onClick, active }: any) => {
    return (
      <button
      onClick={onClick}
      className={`w-3 h-1 mx-1 rounded-full transition-all duration-300 ${
        active
          ? "bg-primary scale-110"
          : "bg-default-800 hover:bg-primary"
      }`}
    />
    );
  };

  return (
    <div className="relative w-full rounded-md overflow-hidden group">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        transitionDuration={400}          
        arrows
        customDot={<CustomDot />}
        showDots
        dotListClass="!mb-2"
        draggable
        swipeable
        keyBoardControl
        containerClass="w-full"
        itemClass="px-1"                  
        customLeftArrow={
          <button
            className="
              absolute left-3 top-1/2 -translate-y-1/2 z-50
              bg-black/10 text-white p-1 rounded-full
              opacity-0 group-hover:opacity-100
              hover:bg-black/50 transition
            "
          >
            <ChevronLeftIcon />
          </button>
        }
        customRightArrow={
          <button
            className="
              absolute right-3 top-1/2 -translate-y-1/2 z-50
              bg-black/10 text-white p-1 rounded-full
              opacity-0 group-hover:opacity-100
              hover:bg-black/50 transition
            "
          >
            <ChevronRightIcon />
          </button>
        }
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="w-full overflow-hidden rounded-sm"

          >
            <img
              src={img}
              alt={`img-${i}`}
              className="
                h-full
                w-full
                aspect-video
                object-cover
                rounded-sm
              "
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
