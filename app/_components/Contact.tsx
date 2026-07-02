"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, useReducedMotion, type Variants } from "motion/react";
import { PiArrowUpRightBold, PiLinkSimpleBold } from "react-icons/pi";
import type { SocialLink } from "@/lib/database.types";

export function Contact({
  email,
  socials,
}: {
  email: string;
  socials: SocialLink[];
}) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
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
    <section className="grid h-full w-full place-items-center px-6 text-center sm:px-10">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center gap-8"
      >
        <motion.p
          variants={item}
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted"
        >
          Available for work
        </motion.p>

        <motion.h2
          variants={item}
          className="text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-[1.12] tracking-tight"
        >
          Let&apos;s build
          <br />
          <span className="marker">something</span>
        </motion.h2>

        <motion.a
          variants={item}
          href={`mailto:${email}?subject=Hello%20Ray`}
          className="group inline-flex items-center gap-2 text-lg font-medium underline decoration-accent decoration-2 underline-offset-4 transition-transform duration-150 ease-out active:scale-[0.98] sm:text-2xl"
        >
          {email}
          <PiArrowUpRightBold className="size-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>

        {socials.length > 0 && (
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.link}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="grid size-12 place-items-center rounded-full group border border-border text-muted transition-all duration-200 ease-out hover:border-accent hover:text-foreground active:scale-[0.95]"
              >
                {s.logo_url ? (
                  <img
                    src={s.logo_url}
                    alt=""
                    aria-hidden
                    className="size-5 object-contain opacity-50 transition-opacity duration-200 group-hover:opacity-100"
                  />
                ) : (
                  <PiLinkSimpleBold className="size-5" />
                )}
              </a>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
