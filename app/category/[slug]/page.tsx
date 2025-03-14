import { fetchAndParseReadme, groupProjectsByCategory } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";
import { notFound } from "next/navigation";
import { Project } from "@/lib/types";

export async function generateStaticParams() {
  try {
    const data = await fetchAndParseReadme();
    const allProjects = [...data.clonesWithTutorials, ...data.clonesAndAlternatives];
    
    // Get unique categories and ensure they're properly formatted
    const categories = Array.from(new Set(allProjects.map(project => 
      project.category?.toLowerCase().trim() || 'others'
    )));

    return categories.map(category => ({
      slug: category.replace(/\s+/g, '-')
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ slug: 'others' }];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await fetchAndParseReadme();
  const allProjects = [...data.clonesWithTutorials, ...data.clonesAndAlternatives];
  const categoryName = params.slug.replace(/-/g, " ").replace(/(^\w|\s\w)/g, l => l.toUpperCase());
  
  const categoryProjects = allProjects.filter(project => {
    const projectCategory = project.category?.toLowerCase().trim() || 'others';
    const normalizedCategory = categoryName.toLowerCase().trim();
    return projectCategory === normalizedCategory;
  });

  if (categoryProjects.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{categoryName} Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryProjects.map((project, index) => (
          <ProjectCard key={`${project.name}-${index}`} project={project} />
        ))}
      </div>
    </div>
  );
}