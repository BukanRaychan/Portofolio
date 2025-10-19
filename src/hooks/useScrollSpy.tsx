import { useEffect, useState } from "react";

export const useScrollSpy = (sectionIds: string[], offset = 0) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveId(id);
          if (window.location.hash !== `#${id}`) {
            history.replaceState(null, "", `#${id}`);
          }
        }
      },
      {
        rootMargin: `-${offset}px 0px 20px 0px`,
        threshold: [0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
};
