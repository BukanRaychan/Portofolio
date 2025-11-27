import { motion } from "framer-motion";
import { Chip } from "@heroui/chip";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useEffect, useMemo, useRef, useState } from "react";
import { techIcons } from "@/data/tech-Icons";
import telkom from "@/assets/images/telkom.png";

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
  "Game Online (Roblox)",
];

type ChipColor =
  | "default"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "primary";
const chipColors: ChipColor[] = ["primary", "secondary", "success", "danger"];

export default function About() {
  const logosRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [perPage, setPerPage] = useState(8);
  const [pages, setPages] = useState<number[][]>([]);
  const [activePage, setActivePage] = useState(0);

  const items = useMemo(() => Object.entries(techIcons), []);
  const totalItems = items.length;

  const autoPlayRef = useRef(true);

  useEffect(() => {
    if (!pages.length) return;
    const id = setInterval(() => {
      if (!autoPlayRef.current) return;

      const next = (activePage + 1) % pages.length;
      scrollToPage(next);
    }, 2000); // 👈 speed: 3.5s per slide (change as you like)

    return () => clearInterval(id);
  }, [activePage, pages.length]);

  useEffect(() => {
    const computePerPage = () => {
      const w = wrapperRef.current?.clientWidth ?? window.innerWidth;

      // Tailwind-ish breakpoints:
      // mobile < 640
      // tablet 640–1023
      // desktop >= 1024
      let pp = 3; // mobile
      if (w >= 640) pp = 4; // tablet
      if (w >= 1024) pp = 5; // desktop
      if (w >= 1280) pp = 8;
      setPerPage(pp);
    };

    computePerPage();
    window.addEventListener("resize", computePerPage);

    const ro = new ResizeObserver(computePerPage);
    if (wrapperRef.current) ro.observe(wrapperRef.current);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", computePerPage);
    };
  }, []);

  useEffect(() => {
    const indices = [...Array(totalItems)].map((_, i) => i);
    const chunks: number[][] = [];

    for (let i = 0; i < totalItems; i += perPage) {
      chunks.push(indices.slice(i, i + perPage));
    }

    const last = chunks[chunks.length - 1] ?? [];
    if (last.length < perPage) {
      const need = perPage - last.length;
      last.push(...indices.slice(0, need));
    }

    setPages(chunks);
    setActivePage(0);

    const el = logosRef.current;
    if (el) el.scrollLeft = 0;
  }, [perPage, totalItems]);

  const scrollToPage = (idx: number) => {
    const el = logosRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  const scrollBy = (dir: "left" | "right") => {
    const el = logosRef.current;
    if (!el) return;

    const next = dir === "left" ? activePage - 1 : activePage + 1;

    const target = (next + pages.length) % pages.length;
    scrollToPage(target);
  };

  return (
    <section className="flex flex-col items-center text-center relative h-full w-full ">
      <div className="relative overflow-hidden  flex-col flex gap-1 ">
        {/* Top moving row */}
        <motion.div
          className="flex gap-1 w-full relative"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 80,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[
            ...topImages,
            ...topImages,
            ...topImages,
            ...topImages,
            ...topImages,
          ].map((img, i) => (
            <motion.div
              key={`top-${i}`}
              className="flex-shrink-0"
              whileHover={{ zIndex: 30 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src={img}
                alt={`top-${i}`}
                className=" lg:h-[250px] h-[200px] rounded-md w-auto object-cover transition-all duration-300  opacity-80"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom moving row (reverse direction) */}
        <motion.div
          className="flex gap-1 w-full relative"
          animate={{ x: ["-100%", "0%"] }}
          transition={{
            duration: 80,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[
            ...bottomImages,
            ...bottomImages,
            ...bottomImages,
            ...bottomImages,
            ...bottomImages,
          ].map((img, i) => (
            <motion.div
              key={`bottom-${i}`}
              className="flex-shrink-0"
              whileHover={{ zIndex: 30 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src={img}
                alt={`bottom-${i}`}
                className="lg:h-[250px] h-[200px] rounded-md w-auto object-cover transition-all duration-300 "
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ===== Skills / Logos / Arrows overlay ===== */}
        <div
          className="
          absolute bottom-0 translate-y-2 left-0 w-full z-30
        "
        >
          <div
            className="
    px-4 sm:px-8 lg:px-12 pb-4 text-default-900
    flex flex-col gap-3
    sm:flex-row sm:items-end sm:justify-between
  "
          >
            {/* Title */}
            <div
              className="
      text-base sm:text-2xl lg:text-3xl
      font-semibold
      text-start
      sm:max-w-[70%]
      leading-snug
    "
            >
              Technologies I Work With
            </div>

            {/* Paginator */}
            <div className="flex justify-start sm:justify-center gap-2 sm:gap-3">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToPage(i)}
                  className={`
          h-1.5 rounded-full transition-all duration-300
          ${
            i === activePage
              ? "w-6 sm:w-8 bg-foreground/90"
              : "w-2.5 sm:w-3 bg-foreground/30 hover:bg-foreground/50"
          }
        `}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div
            ref={wrapperRef}
            onMouseEnter={() => (autoPlayRef.current = false)}
            onMouseLeave={() => (autoPlayRef.current = true)}
            className="
            flex items-center
            relative group
          "
          >
            {/* Left arrow */}
            <button
              onClick={() => scrollBy("left")}
              aria-label="Scroll skills left"
              className="
                absolute  
                grid place-items-center
                h-full w-9 
                transition-all 
                duration-100
              "
            >
              <ChevronLeft
                className="!text-sm md:!text-4xl text-default-900 scale-100 
              !transition duration-75 md:-translate-x-2 -translate-x-1 !shadow-xl hover:scale-120"
              />
            </button>

            {/* Logos (scrollable) */}
            <div
              ref={logosRef}
              onScroll={() => {
                const el = logosRef.current;
                if (!el) return;
                const idx = Math.round(el.scrollLeft / el.clientWidth);
                setActivePage(Math.min(pages.length - 1, Math.max(0, idx)));
              }}
              className="
                flex w-full overflow-x-auto scroll-smooth no-scrollbar
                snap-x snap-mandatory
              "
            >
              {pages.map((page, pageIdx) => (
                <div
                  key={pageIdx}
                  className="w-full shrink-0 flex justify-center gap-4 snap-start px-3"
                >
                  {page.map((itemIdx, i) => {
                    const [key, item] = items[itemIdx];
                    return (
                      <div
                        // attach ref to the FIRST rendered card for measurement
                        ref={pageIdx === 0 && i === 0 ? cardRef : undefined}
                        key={`${key}-${pageIdx}-${i}`}
                        className="
                          flex items-center justify-center gap-4
                          px-3 py-2 rounded-lg
                          bg-transparent
                          border border-transparent
                          transition-all duration-300
                          hover:bg-muted/40 hover:border-border/60
                        "
                        // dynamic width so exactly perPage fits
                        style={{ width: `${100 / perPage}%` }}
                      >
                        <img
                          src={item.logo}
                          alt={item.name}
                          className={`h-6 md:h-12  object-contain ${
                            item.needsInvertion ? "dark:invert" : ""
                          }`}
                        />
                        <span className="text-md md:text-lg text-foreground font-medium">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scrollBy("right")}
              className="
              absolute  
              grid place-items-center
              h-full w-9 
              transition-all 
              duration-100 right-0
            "
              aria-label="Scroll skills right"
            >
              <ChevronRight
                className="!text-sm md:!text-4xl text-default-900 scale-100 
              !transition duration-75 md:-translate-x-2 translate-x-1 !shadow-xl hover:scale-120"
              />
            </button>
          </div>
        </div>

        {/* bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-background/100 to-background/0 blur-md" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/100 to-background/0" />
        </div>
      </div>
      <div className="px-12 sm:px-0 grid grid-cols-1 space-y-8 lg:space-y-0 py-8 lg:pt-0 lg:grid-cols-2 place-items-center flex-1 lg:w-4/5">
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
            <div className="rounded-xl bg-background/70 backdrop-blur-sm px-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-default-900">
                    Telkom University
                  </div>
                  <div className="text-sm md:text-base text-default-600">
                    Bachelor of Technology, Software Enginering, Cumulative GPA
                    : 3.93/4.00
                  </div>
                </div>

                <div className="text-xs md:text-sm text-default-500 whitespace-nowrap">
                  2021 – 2025
                </div>
              </div>

              <div className="mt-3 text-sm md:text-base text-default-700 leading-relaxed">
                Focused on software engineering, web development, data
                structures, and AI-related coursework. Actively involved for 2
                years in organizing campus events, coordinating student
                activities, and collaborating across departments.
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
