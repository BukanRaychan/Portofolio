"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { PiArrowRightBold, PiArrowDownRightBold } from "react-icons/pi";

// Wireframe sphere — concentric rotated ellipses, like a pencil-scribble orbit.
function Orbit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden>
      <circle
        cx="100"
        cy="100"
        r="96"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      {[0, 26, 52, 78, 104, 130, 156].map((r) => (
        <ellipse
          key={r}
          cx="100"
          cy="100"
          rx="96"
          ry="34"
          stroke="currentColor"
          strokeWidth="0.6"
          transform={`rotate(${r} 100 100)`}
        />
      ))}
    </svg>
  );
}

export function Hero({
  title,
  role,
  subtitle,
  name,
  avatar,
  onExplore,
  onContact,
}: {
  title: string;
  role: string;
  subtitle: string;
  name: string;
  avatar: string | null;
  onExplore?: () => void;
  onContact?: () => void;
}) {
  const reduce = useReducedMotion();
  const portrait = avatar ?? "https://picsum.photos/seed/ray-portrait/640/800";

  const segments = subtitle
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.15 },
    },
  };
  const item: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 26, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", duration: 0.7, bounce: 0.12 },
    },
  };

  return (
    <>
      <section className="relative h-full w-full overflow-hidden">
        {/* Photo — bleeds from the left edge; full-bleed backdrop on mobile.
          Fades into the paper background so the headline crosses it legibly. */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 md:inset-y-0 md:left-0 md:w-[46%]"
        >
          {/* <Image
          src={portrait}
          alt="Portrait"
          fill
          priority
          sizes="(min-width: 768px) 46vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-transparent" />
        <div className="absolute inset-0 hidden bg-linear-to-l from-background to-transparent to-30% md:block" /> */}

          {/* <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-background/70 to-transparent" /> */}
        </motion.div>

        {/* Name — clears the deck's menu chip
        <p className="absolute right-1/ 2 top-0 z-10 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          {name}
        </p> */}

        {/* Orbit — straddles the photo's right edge, slowly turning */}
        <motion.div
          
          transition={{ duration: 1.2, delay :0.4}}
          className="pointer-events-none absolute left-[34%] top-[8%] z-10 hidden text-muted/40 md:block"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, ease: "linear", repeat: Infinity }}
          >
            <Orbit className="size-[36vmin]" />
          </motion.div>
        </motion.div>

        {/* Content — headline crosses from the photo onto the paper field */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="absolute inset-x-6 bottom-20 z-10 flex flex-col gap-8 sm:inset-x-10 sm:bottom-12 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <motion.h1
            variants={item}
            className="text-[clamp(2.75rem,9vw,8rem)] font-semibold leading-[1.05] tracking-tight"
          >
            {title.replace(/\.$/, "")}
            <br />
            <span className="marker">{role.replace(/\.$/, "")}</span>
          </motion.h1>

          <div className="flex shrink-0 flex-col gap-6 md:items-end md:text-right">
            {segments.length > 0 && (
              <motion.div variants={item} className="flex flex-col gap-1">
                {segments.map((s, i) => (
                  <p
                    key={s}
                    className="font-mono text-xs leading-relaxed text-muted"
                  >
                    <span className="text-muted/50">
                      ({String(i + 1).padStart(2, "0")})
                    </span>{" "}
                    {s}
                  </p>
                ))}
              </motion.div>
            )}

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-3"
            >
              {onExplore && (
                <button
                  onClick={onExplore}
                  className="group inline-flex items-center gap-2 bg-accent px-2 text-base font-medium text-accent-foreground transition-transform duration-150 ease-out active:scale-[0.97]"
                >
                  See my work
                  <PiArrowRightBold className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </button>
              )}
              {onContact && (
                <button
                  onClick={onContact}
                  className="group inline-flex items-center gap-2 border border-border px-2 text-base font-medium text-foreground transition-[transform,color,border-color] duration-150 ease-out hover:border-accent hover:text-accent active:scale-[0.97]"
                >
                  Get in touch
                  <PiArrowDownRightBold className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
