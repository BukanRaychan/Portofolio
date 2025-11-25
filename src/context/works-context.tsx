import React, { createContext, useContext, useState } from "react";
import { works } from "@/data/work";

// 1) Infer the Work type from your works array
type Work = (typeof works)[number];

type WorksContextType = {
  activeWork: Work;
  setActiveWork: React.Dispatch<React.SetStateAction<Work>>;
  resetActiveWork: () => void;
};

// 2) Context can be WorksContextType OR undefined before provider
const WorksContext = createContext<WorksContextType | undefined>(undefined);

export function WorksProvider({ children }: { children: React.ReactNode }) {
  const [activeWork, setActiveWork] = useState<Work>(works[1]);

  const resetActiveWork = () => setActiveWork(works[1]);

  return (
    <WorksContext.Provider
      value={{ activeWork, setActiveWork, resetActiveWork }}
    >
      {children}
    </WorksContext.Provider>
  );
}

// 3) Typed hook with a nice error if used outside provider
export function useWorks() {
  const ctx = useContext(WorksContext);
  if (!ctx) {
    throw new Error("useWorks must be used within a WorksProvider");
  }
  return ctx;
}
