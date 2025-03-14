export interface Project {
  name: string;
  demo?: string;
  repo: string;
  techStack: string;
  stars?: string;
  tutorial?: string;
  tutorialSite?: string;
  category?: string;
}

export interface ParsedData {
  clonesWithTutorials: Project[];
  clonesAndAlternatives: Project[];
  statistics: {
    totalProjects: number;
    totalTutorials: number;
    totalAlternatives: number;
    categories: { [key: string]: number };
  };
}

export interface GroupedProjects {
  [category: string]: Project[];
}