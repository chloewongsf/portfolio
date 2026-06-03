"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type Project } from "@/content/projects";

interface ProjectWindowContextValue {
  activeProject: Project | null;
  openProject: (project: Project) => void;
  closeProject: () => void;
}

const ProjectWindowContext = createContext<ProjectWindowContextValue>({
  activeProject: null,
  openProject: () => {},
  closeProject: () => {},
});

export function ProjectWindowProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <ProjectWindowContext.Provider
      value={{
        activeProject,
        openProject: (project) => setActiveProject(project),
        closeProject: () => setActiveProject(null),
      }}
    >
      {children}
    </ProjectWindowContext.Provider>
  );
}

export function useProjectWindow() {
  return useContext(ProjectWindowContext);
}
