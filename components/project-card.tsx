"use client";

import { Project } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Youtube, Star } from "lucide-react";
import { motion } from "framer-motion";
import { getProjectIcon } from "@/lib/utils";
import Image from "next/image";

export function ProjectCard({ project }: { project: Project }) {
  const techStacks = project.techStack.split(",").map(tech => tech.trim());
  const Icon = getProjectIcon(project.name);

  const getValidUrl = (url: string | undefined) => {
    if (!url) return undefined;
    try {
      const markdownLinkMatch = url.match(/\[(.*?)\]\((.*?)\)/);
      if (markdownLinkMatch) {
        url = markdownLinkMatch[2];
      }
      url = url.split(")")[0];
      new URL(url);
      return url;
    } catch {
      return undefined;
    }
  };

  const demoUrl = getValidUrl(project.demo);
  const repoUrl = getValidUrl(project.repo);
  const tutorialUrl = getValidUrl(project.tutorial);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="h-full transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {Icon && <Icon className="w-6 h-6 text-primary" />}
            <span className="line-clamp-1">{project.name}</span>
            {project.stars && (
              <div className="flex items-center gap-1 ml-auto">
                <Star className="w-4 h-4" />
                <Image 
                  src={project.stars} 
                  alt="GitHub stars" 
                  width={80} 
                  height={20}
                  className="dark:invert"
                  unoptimized
                />
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStacks.map((tech, index) => (
              <Badge key={index} variant="outline" className="line-clamp-1">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink size={16} /> Demo
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={16} /> Repo
              </a>
            )}
            {tutorialUrl && (
              <a
                href={tutorialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube size={16} /> Tutorial
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}