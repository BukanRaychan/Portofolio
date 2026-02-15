import { motion } from "framer-motion";
import { Chip } from "@heroui/chip";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useMemo } from "react";
import { techIcons } from "@/data/tech-Icons";
import telkom from "@/assets/images/telkom.png";
import Marquee from "react-fast-marquee";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const techResponsive = {
  mobile: {
    breakpoint: { max: 639, min: 0 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1023, min: 640 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1279, min: 1024 },
    items: 5,
  },
  wide: {
    breakpoint: { max: 3000, min: 1280 },
    items: 8,
  },
};

const CustomDot = ({ onClick, active }: any) => {
  return (
    <button
      onClick={onClick}
      className={`
        h-1.5 rounded-full transition-all duration-300 mx-1 
        ${active ? "w-8 bg-foreground/90" : "w-3 bg-foreground/30 hover:bg-foreground/50"}
      `}
      aria-label="carousel dot"
    />
  );
};

const imageModules = import.meta.glob("../assets/images/about/*.jpg", {
  eager: true,
});
const images = Object.values(imageModules).map((mod: any) => mod.default);
const mid = Math.ceil(images.length / 2);
const topImages = images.slice(0, mid);
const bottomImages = images.slice(mid);

const interests = [
  "Web Development",
  "Artificial Intelligence",
  "Backend Engineering",
  "Data Structure",
  "System Engineering",
  "Data Engineering",
  "Gym",
  "Traveling",
  "Game",
];

type ChipColor =
  | "default"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "primary";
const chipColors: ChipColor[] = ["primary", "secondary", "success", "danger"];
const MARQUEE_REPEAT = 2;

export default function About() {
  const items = useMemo(() => Object.entries(techIcons), []);

  return (
    <section className="flex flex-col items-center text-center relative h-full w-full ">
      <div className="relative overflow-hidden flex-col flex gap-1.5">
        {/* Top moving row */}
        <Marquee
          speed={20}
          gradient={false}
          pauseOnHover={false}
          direction="left"
        >
          {Array.from({ length: MARQUEE_REPEAT }).flatMap((_, r) =>
            topImages.map((img, i) => (
              <div key={`${r}-${i}`} className="ml-1.5 flex-shrink-0">
                <img
                  src={img}
                  alt=""
                  className="h-[clamp(160px,25dvh,25dvh)] w-auto rounded-md object-cover"
                />
              </div>
            ))
          )}
        </Marquee>

        <Marquee
          speed={20}
          gradient={false}
          pauseOnHover={false}
          direction="right"
        >
          {Array.from({ length: MARQUEE_REPEAT }).flatMap((_, r) =>
            bottomImages.map((img, i) => (
              <div key={`${r}-${i}`} className="ml-1.5 flex-shrink-0">
                <img
                  src={img}
                  alt=""
                  className="h-[clamp(160px,25dvh,25dvh)] w-auto rounded-md object-cover"
                />
              </div>
            ))
          )}
        </Marquee>

        {/* ===== Skills / Logos / Arrows overlay ===== */}
        <div className="absolute bottom-0 left-0 w-full z-30 about-carousel">
          {/* Title + dots row */}
          <div className="px-4 sm:px-8 lg:px-12 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div className="text-3xl font-semibold text-start">Tech Stack</div>
          </div>

          {/* Carousel */}
          <Carousel
            responsive={techResponsive}
            slidesToSlide={3}
            infinite
            arrows
            showDots
            autoPlay
            autoPlaySpeed={2000}
            renderDotsOutside
            customDot={<CustomDot />}
            containerClass="relative"
            dotListClass=""
            itemClass="px-2"
            customLeftArrow={
              <button className="absolute left-0 z-40 grid place-items-center h-full w-10">
                <ChevronLeft className="text-default-900 md:!text-4xl" />
              </button>
            }
            customRightArrow={
              <button className="absolute right-0 z-40 grid place-items-center h-full w-10">
                <ChevronRight className="text-default-900 md:!text-4xl" />
              </button>
            }
          >
            {items.map(([key, item]) => (
              <div
                key={key}
                className="
                  flex items-center justify-center gap-4
                  px-3 py-2 rounded-lg
                  transition-all duration-300
                  hover:bg-muted/40 hover:border-border/60
                "
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className={`h-6 md:h-12 object-contain ${
                    item.needsInvertion ? "dark:invert" : ""
                  }`}
                />
                <span className="text-md md:text-lg font-medium">
                  {item.name}
                </span>
              </div>
            ))}
          </Carousel>
        </div>

        {/* bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-background/100 to-background/0 blur-md" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/100 to-background/0" />
        </div>
      </div>
      <div className="px-12 sm:px-0 grid grid-cols-1 space-y-12 lg:space-y-0 py-8 lg:pt-0 lg:grid-cols-2 place-items-center flex-1 lg:w-4/5">
        {/* Education */}
        <motion.div
          className="text-default-700 md:text-base flex-none text-left leading-relaxed max-w-xl lg:max-w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-3 text-2xl md:text-3xl font-semibold text-default-900">
            Education
          </div>
          <div className="flex items-start pl-2 pt-2">
            <img alt="Telkom University" src={telkom} className="h-12 pt-2" />
            <div className="rounded-xl px-5 ">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-default-900">
                    Telkom University
                  </div>
                  <div className="text-sm md:text-base text-default-600">
                    Bachelor of Science in Computer Science (Software
                    Engineering), Cum Laude | GPA : 3.93/4.00
                  </div>
                </div>

                <div className="text-xs md:text-sm text-default-500 whitespace-nowrap">
                  2021 – 2025
                </div>
              </div>

              <div className="mt-3 text-sm md:text-base text-default-700 leading-relaxed">
                Focused on software engineering, web development, data
                structures, and AI-related coursework. Actively involved in
                organizing campus events, coordinating student activities,
                collaborating across departments, and Competitions.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <div className="flex flex-wrap justify-start md:justify-center pr-16 md:pr-0 items-center gap-4 max-w-xl flex-none md:pl-6">
          <div className="relative w-full text-start md:text-center font-semibold md:text-3xl text-2xl text-warning mb-2">
            Interests
            <div className="absolute top-0 md:left-1/2 md:-translate-x-1/2 blur-sm ">
              Interests
            </div>
          </div>
          {interests.map((interest, i) => (
            <motion.div
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
            >
              <Chip
                color={`${chipColors[i % 4]}`}
                variant="flat"
                className="cursor-default hover:scale-105 transition-transform"
              >
                {interest}
              </Chip>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
