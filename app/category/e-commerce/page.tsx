import { fetchAndParseReadme, groupProjectsByCategory } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";
import { notFound } from "next/navigation";
import { Project } from "@/lib/types";

export default async function EcommercePage() {
  const data = await fetchAndParseReadme();
  const allProjects = [...data.clonesWithTutorials, ...data.clonesAndAlternatives];
  
  const ecommerceProjects = allProjects.filter(project => {
    const projectCategory = project.category?.toLowerCase().trim() || 'others';
    return projectCategory === 'e-commerce';
  });

  if (ecommerceProjects.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">E-commerce Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ecommerceProjects.map((project, index) => (
          <ProjectCard key={`${project.name}-${index}`} project={project} />
        ))}
      </div>
    </div>
  );
}