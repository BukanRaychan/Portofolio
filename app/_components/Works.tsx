"use client";

/* eslint-disable @next/next/no-img-element */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  PiArrowUpRightBold,
  PiArrowRightBold,
  PiCaretDown,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiXBold,
} from "react-icons/pi";
import { SiGithub } from "react-icons/si";
import type { TechStack, Work } from "@/lib/database.types";
import { formatPeriod, isOngoing } from "@/lib/format";

const PAGE_SIZE = 5;

function Ongoing() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
      <span className="size-1.5 rounded-full bg-accent" />
      Ongoing
    </span>
  );
}

function TechRow({
  slugs,
  techMap,
  max = 7,
}: {
  slugs: string[];
  techMap: Map<string, TechStack>;
  max?: number;
}) {
  const techs = slugs
    .map((s) => techMap.get(s))
    .filter((t): t is TechStack => !!t && !!t.logo_url);
  if (techs.length === 0) return null;
  const shown = techs.slice(0, max);
  const rest = techs.length - shown.length;
  return (
    <span className="mt-2 flex flex-wrap items-center gap-1.5">
      {shown.map((t) => (
        <img
          key={t.slug}
          src={t.logo_url!}
          title={t.name}
          alt=""
          aria-hidden
          className={`size-4 shrink-0 object-contain opacity-70 ${
            t.needs_inversion ? "dark:invert" : ""
          }`}
        />
      ))}
      {rest > 0 && (
        <span className="text-[10px] font-medium text-muted">+{rest}</span>
      )}
    </span>
  );
}

// Horizontal carousel. Scrolls natively on touch/trackpad, drags with the mouse
// (click-and-drag), and on desktop gets prev/next arrows that page through
// smoothly. Arrows fade in only when there's room to scroll that way, and edge
// gradients hint at more off-screen. A frame opens the lightbox — unless the
// pointer was dragging, so a drag never triggers an accidental open.
function Carousel({
  images,
  onOpen,
}: {
  images: string[];
  onOpen: (src: string) => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [edges, setEdges] = useState({ left: false, right: false });

  function updateEdges() {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setEdges({
      left: scrollLeft > 4,
      right: scrollLeft < scrollWidth - clientWidth - 4,
    });
  }

  useEffect(() => {
    updateEdges();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [images]);

  function page(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({
      left: dir * el.clientWidth * 0.85,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  function onPointerDown(e: ReactPointerEvent) {
    if (e.pointerType !== "mouse") return; // touch/pen already scroll natively
    const el = ref.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
  }
  function onPointerMove(e: ReactPointerEvent) {
    const el = ref.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  }
  function endDrag() {
    drag.current.down = false;
  }

  const arrowBase =
    "pointer-events-auto grid size-9 place-items-center rounded-full border border-border bg-background/85 text-muted shadow-lg backdrop-blur outline-none transition-[transform,color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-foreground/30 hover:text-foreground active:scale-[0.9] focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <div className="relative -mx-1">
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (drag.current.moved) return; // a drag, not a click
              onOpen(src);
            }}
            className="group relative shrink-0 snap-start overflow-hidden rounded-xl border border-border outline-none transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-accent"
          >
            <img
              src={src}
              alt=""
              aria-hidden
              draggable={false}
              className="h-44 w-72 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:h-52 sm:w-80"
            />
          </button>
        ))}
      </div>

      {/* Edge fades — hint that more images live off-screen. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r from-background to-transparent transition-opacity duration-200 ease-out ${
          edges.left ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l from-background to-transparent transition-opacity duration-200 ease-out ${
          edges.right ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Desktop arrows — hidden on touch (native swipe/drag covers it). */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
        <AnimatePresence>
          {edges.left && (
            <motion.button
              key="prev"
              type="button"
              aria-label="Previous images"
              onClick={() => page(-1)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className={arrowBase}
            >
              <PiCaretLeftBold className="size-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <AnimatePresence>
          {edges.right && (
            <motion.button
              key="next"
              type="button"
              aria-label="Next images"
              onClick={() => page(1)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className={arrowBase}
            >
              <PiCaretRightBold className="size-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// A full-screen peek of one image. Any click or any key press dismisses it —
// no close button, no navigation (browse in the carousel instead).
function Lightbox({
  src,
  onClose,
  reduce,
}: {
  src: string;
  onClose: () => void;
  reduce: boolean;
}) {
  useEffect(() => {
    const close = () => onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClose}
      className="fixed inset-0 z-60 flex cursor-zoom-out items-center justify-center bg-background/90 p-4 backdrop-blur-sm sm:p-10"
    >
      <motion.img
        src={src}
        alt=""
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="max-h-full max-w-full rounded-xl border border-border object-contain shadow-2xl"
      />
    </motion.div>
  );
}

export function Works({ works, tech }: { works: Work[]; tech: TechStack[] }) {
  const reduce = useReducedMotion();
  const techMap = useMemo(() => new Map(tech.map((t) => [t.slug, t])), [tech]);

  const [tab, setTab] = useState<"experience" | "project">("experience");
  const [openId, setOpenId] = useState<string | null>(null);
  const [techFilter, setTechFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [fromExp, setFromExp] = useState<{ id: string; title: string } | null>(
    null,
  );
  const [highlight, setHighlight] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const scrollRef = useRef<HTMLElement>(null);

  // Clear the highlight flash after it has played.
  useEffect(() => {
    if (highlight.length === 0) return;
    const t = setTimeout(() => setHighlight([]), 2200);
    return () => clearTimeout(t);
  }, [highlight]);

  const projectCountByExp = useMemo(() => {
    const m = new Map<string, number>();
    for (const w of works) {
      if (w.category === "project" && w.experience_id)
        m.set(w.experience_id, (m.get(w.experience_id) ?? 0) + 1);
    }
    return m;
  }, [works]);

  const tabItems = useMemo(
    () => works.filter((w) => w.category === tab),
    [works, tab],
  );

  // Tech chips reflect only what the current tab actually uses (sorted).
  const availableTechs = useMemo(() => {
    const used = new Set<string>();
    tabItems.forEach((w) => w.technologies.forEach((s) => used.add(s)));
    return tech.filter((t) => used.has(t.slug));
  }, [tabItems, tech]);

  const filtered = useMemo(() => {
    let list = tabItems;
    if (tab === "project" && fromExp)
      list = list.filter((w) => w.experience_id === fromExp.id);
    // One pick (default) is OR; a multi-select (Shift, 2+ picks) is AND —
    // the work must use every selected tech.
    if (techFilter.length)
      list = list.filter((w) =>
        techFilter.length > 1
          ? techFilter.every((s) => w.technologies.includes(s))
          : w.technologies.includes(techFilter[0]),
      );
    return list;
  }, [tabItems, tab, fromExp, techFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function scrollTop() {
    requestAnimationFrame(() =>
      scrollRef.current?.scrollTo({
        top: 0,
        behavior: reduce ? "auto" : "smooth",
      }),
    );
  }

  function selectTab(t: "experience" | "project") {
    setTab(t);
    setOpenId(null);
    setFromExp(null);
    setTechFilter([]);
    setPage(1);
  }

  // Single-select by default (click replaces, or clears if it's the active one).
  // Shift-click is additive → multi-select (OR filter across the picks).
  function toggleTech(slug: string, additive: boolean) {
    setTechFilter((prev) => {
      if (additive)
        return prev.includes(slug)
          ? prev.filter((s) => s !== slug)
          : [...prev, slug];
      return prev.length === 1 && prev[0] === slug ? [] : [slug];
    });
    setPage(1);
  }

  function seeRelatedProjects(exp: Work) {
    const related = works.filter(
      (w) => w.category === "project" && w.experience_id === exp.id,
    );
    setTab("project");
    setFromExp({ id: exp.id, title: exp.title });
    setTechFilter([]);
    setOpenId(null);
    setPage(1);
    setHighlight(related.map((r) => r.id));
    scrollTop();
  }

  function goToPage(next: number) {
    setPage(next);
    scrollTop();
  }

  return (
    <section
      ref={scrollRef}
      className="no-scrollbar h-full w-full overflow-y-auto px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none tracking-tight">
            Selected <span className="marker">work</span>
          </h2>
          <div className="flex rounded-full border border-border p-1 text-xs sm:text-sm">
            {(["experience", "project"] as const).map((t) => (
              <button
                key={t}
                onClick={() => selectTab(t)}
                className={`relative rounded-full px-4 py-1.5 capitalize outline-none transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97] ${
                  tab === t
                    ? "text-accent-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="worksTabPill"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", duration: 0.4, bounce: 0.18 }
                    }
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                  />
                )}
                {t === "experience" ? "Experience" : "Projects"}
              </button>
            ))}
          </div>
        </div>

        {/* Filters: active experience filter chip + multi-select tech chips */}
        {(availableTechs.length > 0 || fromExp) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {fromExp && (
              <button
                onClick={() => {
                  setFromExp(null);
                  setPage(1);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground outline-none transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-accent"
              >
                From: {fromExp.title}
                <PiXBold className="size-3.5" />
              </button>
            )}
            {availableTechs.map((t) => {
              const on = techFilter.includes(t.slug);
              return (
                <button
                  key={t.slug}
                  onClick={(e) => toggleTech(t.slug, e.shiftKey)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium outline-none transition-[transform,color,background-color,border-color] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-accent ${
                    on
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {t.logo_url && (
                    <img
                      src={t.logo_url}
                      alt=""
                      aria-hidden
                      className={`size-3.5 object-contain ${
                        t.needs_inversion ? "dark:invert" : ""
                      }`}
                    />
                  )}
                  {t.name}
                </button>
              );
            })}
            {techFilter.length > 0 && (
              <button
                onClick={() => {
                  setTechFilter([]);
                  setPage(1);
                }}
                className="text-xs font-medium text-muted underline underline-offset-2 hover:text-accent"
              >
                Clear
              </button>
            )}
            {availableTechs.length > 1 && (
              <span className="inline-flex items-center gap-1 text-xs text-muted/70">
                Hold
                <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground">
                  Shift
                </kbd>
                to pick several
              </span>
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="border-y border-border py-20 text-center text-sm text-muted">
            No {tab} matches these filters.
          </div>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {pageItems.map((work, j) => {
              const isOpen = work.id === openId;
              const num = (currentPage - 1) * PAGE_SIZE + j + 1;
              const isHi = highlight.includes(work.id);
              const relatedCount = projectCountByExp.get(work.id) ?? 0;
              return (
                <motion.li
                  key={work.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.45,
                    ease: [0.23, 1, 0.32, 1],
                    delay: Math.min(j * 0.05, 0.25),
                  }}
                  className={`transition-[background-color,box-shadow] duration-700 ease-out ${
                    isHi
                      ? "bg-accent/6 shadow-[inset_3px_0_0_var(--accent)]"
                      : "shadow-[inset_0_0_0_transparent]"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenId((p) => (p === work.id ? null : work.id))
                    }
                    className="group flex w-full items-start gap-4 py-5 pl-3 pr-1 text-left"
                  >
                    <span className="mt-1 font-mono text-xs text-muted tabular-nums self-center">
                      {String(num).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                          {work.title}
                        </span>
                        {isOngoing(work.start_date, work.end_date) && (
                          <Ongoing />
                        )}
                      </span>
                      <span className="block truncate text-sm text-muted">
                        {work.place}
                      </span>
                      <TechRow slugs={work.technologies} techMap={techMap} />
                    </span>
                    {/* Collapsed preview thumbnail — hands off to the
                        carousel when the row expands */}
                    {work.images[0] && (
                      <img
                        src={work.images[0]}
                        alt=""
                        aria-hidden
                        className={`hidden shrink-0 self-center rounded-lg border object-cover transition-all duration-300 ease-out sm:block ${
                          isOpen
                            ? "h-0 w-0 border-transparent opacity-0"
                            : "h-14 w-24 border-border opacity-100 group-hover:scale-[1.04]"
                        }`}
                      />
                    )}
                    <span className="hidden shrink-0 pt-1 font-mono text-xs text-muted sm:block">
                      {formatPeriod(work.start_date, work.end_date)}
                    </span>
                    <PiCaretDown
                      className={`mt-1 size-4 shrink-0 text-muted transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={
                          reduce ? { opacity: 0 } : { height: 0, opacity: 0 }
                        }
                        animate={
                          reduce
                            ? { opacity: 1 }
                            : { height: "auto", opacity: 1 }
                        }
                        exit={
                          reduce ? { opacity: 0 } : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: 0.32,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-5 pb-7 pl-3 pr-1">
                          {work.position && (
                            <p className="text-sm font-medium text-muted">
                              {work.position}
                            </p>
                          )}
                          {work.description && (
                            <p className="leading-relaxed text-muted">
                              {work.description}
                            </p>
                          )}
                          {work.images.length > 0 && (
                            <Carousel
                              images={work.images}
                              onOpen={(src) => setLightbox(src)}
                            />
                          )}

                          {/* Actions */}
                          {tab === "experience" ? (
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                              {relatedCount > 0 && (
                                <button
                                  type="button"
                                  onClick={() => seeRelatedProjects(work)}
                                  className="inline-flex flex-1 justify-center items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground outline-none transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-accent"
                                >
                                  See {relatedCount} related project
                                  {relatedCount > 1 ? "s" : ""}
                                  <PiArrowRightBold className="size-4" />
                                </button>
                              )}
                              {work.link && (
                                <a
                                  href={work.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex flex-1 justify-center items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform duration-150 ease-out active:scale-[0.97]"
                                >
                                  View Product
                                  <PiArrowUpRightBold className="size-4" />
                                </a>
                              )}
                            </div>
                          ) : (
                            (work.link || work.github_link) && (
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                                {work.link && (
                                  <a
                                    href={work.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex basis-full items-center justify-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform duration-150 ease-out active:scale-[0.97]"
                                  >
                                    View Product
                                    <PiArrowUpRightBold className="size-4" />
                                  </a>
                                )}
                                {work.github_link && (
                                  <a
                                    href={work.github_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex basis-full bg-foreground text-background items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-[transform,color,border-color] duration-150 ease-out hover:text-background/90 active:scale-[0.97]"
                                  >
                                    <SiGithub className="size-4" />
                                    GitHub
                                  </a>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3 text-sm">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-muted outline-none transition-[transform,color,border-color] duration-150 ease-out hover:border-accent hover:text-accent active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40"
            >
              <PiCaretLeftBold className="size-4" />
              Prev
            </button>
            <span className="font-mono text-xs text-muted tabular-nums">
              {currentPage} / {pageCount}
            </span>
            <button
              type="button"
              disabled={currentPage === pageCount}
              onClick={() => goToPage(currentPage + 1)}
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-muted outline-none transition-[transform,color,border-color] duration-150 ease-out hover:border-accent hover:text-accent active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40"
            >
              Next
              <PiCaretRightBold className="size-4" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox}
            reduce={!!reduce}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
