import { Suspense } from "react";
import { ProjectCard } from "@/components/project-card";
import { fetchAndParseReadme, groupProjectsByCategory } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCard } from "@/components/stats-card";
import { AppLogos } from "@/components/app-logos";
import { Book, Code2, Database, Users } from "lucide-react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { ClientSearch } from "@/components/client-search";
import { getTranslations } from 'next-intl/server';
import { locales } from '@/config';

const AnimatedContainer = dynamic(() => import('@/components/animated-container'), { ssr: false });

export const revalidate = 3600;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function ProjectCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

function ProjectGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}

interface SearchParams {
  search?: string;
}

export default async function Home({
  params: { locale },
  searchParams
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  const t = await getTranslations('common');
  const data = await fetchAndParseReadme();
  const searchQuery = searchParams.search?.toLowerCase() || "";
  
  const filterProjects = (projects: any[]) => {
    if (!searchQuery) return projects;
    
    return projects.filter(project => {
      const searchableText = [
        project.name,
        project.techStack,
        project.category,
      ].join(" ").toLowerCase();
      
      return searchableText.includes(searchQuery);
    });
  };

  const filteredTutorials = filterProjects(data.clonesWithTutorials);
  const filteredAlternatives = filterProjects(data.clonesAndAlternatives);
  const groupedAlternatives = groupProjectsByCategory(filteredAlternatives);

  return (
    <div className="space-y-8">
      <div className="py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <AnimatedContainer>
            <div className="space-y-6">
              <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                {t('hero.title')}
              </h1>
              <p className="text-muted-foreground text-xl">
                {t('hero.description', { count: data.statistics.totalProjects })}
              </p>
            </div>
          </AnimatedContainer>
          <AnimatedContainer>
            <div className="relative">
              <Image
                src="https://i.postimg.cc/cJq3B6Dz/gourav.webp"
                alt="GorvGoyl"
                width={400}
                height={400}
                className="rounded-2xl"
                priority
              />
            </div>
          </AnimatedContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <StatsCard
            title={t('hero.stats.projects')}
            value={data.statistics.totalProjects}
            icon={<Code2 className="w-6 h-6" />}
            animate={true}
          />
          <StatsCard
            title={t('hero.stats.tutorials')}
            value={data.statistics.totalTutorials}
            icon={<Book className="w-6 h-6" />}
            delay={0.1}
            animate={true}
          />
          <StatsCard
            title={t('hero.stats.alternatives')}
            value={data.statistics.totalAlternatives}
            icon={<Database className="w-6 h-6" />}
            delay={0.2}
            animate={true}
          />
          <StatsCard
            title={t('hero.stats.categories')}
            value={Object.keys(data.statistics.categories).length}
            icon={<Users className="w-6 h-6" />}
            delay={0.3}
            animate={true}
          />
        </div>

        <AppLogos />
      </div>

      <div id="search-section" className="scroll-mt-16">
        <ClientSearch defaultValue={searchQuery} />
      </div>

      <div className="flex justify-center">
        <Tabs defaultValue="tutorials" className="w-full max-w-4xl">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="tutorials">{t('tabs.tutorials')}</TabsTrigger>
              <TabsTrigger value="clones">{t('tabs.clones')}</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="tutorials">
            <Suspense fallback={<ProjectGrid>{Array(6).fill(0).map((_, i) => <ProjectCardSkeleton key={i} />)}</ProjectGrid>}>
              <ProjectGrid>
                {filteredTutorials.map((project, index) => (
                  <ProjectCard key={`${project.name}-${index}`} project={project} />
                ))}
              </ProjectGrid>
              {filteredTutorials.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No projects found matching your search.
                </div>
              )}
            </Suspense>
          </TabsContent>
          <TabsContent value="clones">
            <Suspense fallback={<ProjectGrid>{Array(6).fill(0).map((_, i) => <ProjectCardSkeleton key={i} />)}</ProjectGrid>}>
              <div className="space-y-8">
                {Object.entries(groupedAlternatives).map(([category, projects]) => (
                  <div key={category}>
                    <h3 className="text-2xl font-semibold mb-4">{category}</h3>
                    <ProjectGrid>
                      {projects.map((project, index) => (
                        <ProjectCard key={`${project.name}-${index}`} project={project} />
                      ))}
                    </ProjectGrid>
                  </div>
                ))}
                {Object.keys(groupedAlternatives).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No projects found matching your search.
                  </div>
                )}
              </div>
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}