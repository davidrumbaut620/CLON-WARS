import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GroupedProjects, ParsedData, Project } from "./types";
import { Facebook, Twitter, Youtube, Music, MessageSquare, FileText, Code, Box, Briefcase, ShoppingCart, Gamepad, PenTool as Tool, Instagram, Send as TelegramIcon, Video as TikTokIcon, Camera as SnapchatIcon, LinkedinIcon, PlaySquare as NetflixIcon, Tv as DisneyIcon, Layout as TrelloIcon, FileCode as NotionIcon, MessageCircle as SlackIcon, Hash as DiscordIcon, TicketCheck as JiraIcon, Store as AmazonIcon, Home as AirbnbIcon, ShoppingBag as NikeIcon, Phone as ContactIcon, Dices as GameIcon, Terminal as PostmanIcon, Flame as FirebaseIcon, Lock as AuthIcon, Settings as DevToolIcon } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProjectIcon(name: string) {
  const lowerName = name.toLowerCase();
  
  // Social Media
  if (lowerName.includes('facebook')) return Facebook;
  if (lowerName.includes('twitter') || lowerName.includes('x.com')) return Twitter;
  if (lowerName.includes('instagram')) return Instagram;
  if (lowerName.includes('tiktok')) return TikTokIcon;
  if (lowerName.includes('snapchat')) return SnapchatIcon;
  if (lowerName.includes('linkedin')) return LinkedinIcon;
  
  // Streaming
  if (lowerName.includes('youtube')) return Youtube;
  if (lowerName.includes('netflix')) return NetflixIcon;
  if (lowerName.includes('spotify') || lowerName.includes('music')) return Music;
  if (lowerName.includes('disney')) return DisneyIcon;
  
  // Productivity
  if (lowerName.includes('trello')) return TrelloIcon;
  if (lowerName.includes('notion')) return NotionIcon;
  if (lowerName.includes('slack')) return SlackIcon;
  if (lowerName.includes('discord')) return DiscordIcon;
  if (lowerName.includes('jira')) return JiraIcon;
  if (lowerName.includes('docs') || lowerName.includes('word')) return FileText;
  
  // E-commerce
  if (lowerName.includes('amazon')) return AmazonIcon;
  if (lowerName.includes('airbnb')) return AirbnbIcon;
  if (lowerName.includes('nike')) return NikeIcon;
  if (lowerName.includes('shop') || lowerName.includes('store')) return ShoppingCart;
  
  // Communication
  if (lowerName.includes('whatsapp') || lowerName.includes('chat')) return ContactIcon;
  if (lowerName.includes('telegram')) return TelegramIcon;
  if (lowerName.includes('messenger')) return MessageSquare;
  
  // Gaming
  if (lowerName.includes('2048') || lowerName.includes('tetris') || lowerName.includes('game')) return GameIcon;
  if (lowerName.includes('chess')) return Gamepad;
  
  // Developer Tools
  if (lowerName.includes('postman')) return PostmanIcon;
  if (lowerName.includes('firebase')) return FirebaseIcon;
  if (lowerName.includes('auth')) return AuthIcon;
  if (lowerName.includes('dev') || lowerName.includes('code')) return Code;
  
  // Others
  if (lowerName.includes('product')) return Box;
  if (lowerName.includes('work') || lowerName.includes('office')) return Briefcase;
  
  // Default icon for unmatched cases
  return DevToolIcon;
}

function categorizeProject(name: string): string {
  const categories: { [key: string]: string[] } = {
    "Social Media": ["Facebook", "Instagram", "Twitter", "TikTok", "Snapchat", "LinkedIn"],
    "Streaming": ["Netflix", "Spotify", "YouTube", "Disney+", "Apple Music"],
    "Productivity": ["Trello", "Notion", "Slack", "Discord", "Jira"],
    "E-commerce": ["Amazon", "Airbnb", "Nike"],
    "Communication": ["WhatsApp", "Telegram", "Messenger"],
    "Gaming": ["2048", "Tetris", "Battleship", "Sliders"],
    "Developer Tools": ["Postman", "Firebase", "Auth0", "Okta"],
    "Others": []
  };

  for (const [category, apps] of Object.entries(categories)) {
    if (apps.some(app => name.toLowerCase().includes(app.toLowerCase()))) {
      return category;
    }
  }
  return "Others";
}

export function getGitHubRepoPath(url: string): string | null {
  try {
    // Extraer la URL del formato markdown si existe
    const markdownMatch = url.match(/\[.*?\]\((.*?)\)/);
    const cleanUrl = markdownMatch ? markdownMatch[1] : url;

    const githubUrl = new URL(cleanUrl);
    if (githubUrl.hostname === 'github.com') {
      const pathParts = githubUrl.pathname.split('/');
      if (pathParts.length >= 3) {
        return `${pathParts[1]}/${pathParts[2]}`;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchAndParseReadme(): Promise<ParsedData> {
  const response = await fetch(process.env.GITHUB_README_URL!);
  const text = await response.text();

  const clonesWithTutorials: Project[] = [];
  const clonesAndAlternatives: Project[] = [];

  const tables = text.split('\n## ').filter(section => 
    section.includes('| Clone') || section.includes('| Clone/Alt')
  );

  tables.forEach(table => {
    const rows = table.split('\n').filter(row => row.startsWith('|') && !row.includes('---'));
    const isMainTable = table.includes('Clone/Alt');

    rows.slice(1).forEach(row => {
      const cells = row.split('|').slice(1, -1).map(cell => cell.trim());
      
      if (isMainTable) {
        const repoPath = getGitHubRepoPath(cells[2]);
        const starsUrl = repoPath ? `https://img.shields.io/github/stars/${repoPath}?style=social` : undefined;
        
        const project: Project = {
          name: cells[0],
          demo: cells[1],
          repo: cells[2],
          techStack: cells[3],
          stars: starsUrl,
          category: categorizeProject(cells[0])
        };
        clonesAndAlternatives.push(project);
      } else {
        const repoPath = getGitHubRepoPath(cells[3]);
        const starsUrl = repoPath ? `https://img.shields.io/github/stars/${repoPath}?style=social` : undefined;
        
        const project: Project = {
          name: cells[0],
          demo: cells[1],
          tutorial: cells[2],
          tutorialSite: cells[2],
          repo: cells[3],
          techStack: cells[4],
          stars: starsUrl,
          category: categorizeProject(cells[0])
        };
        clonesWithTutorials.push(project);
      }
    });
  });

  const categories: { [key: string]: number } = {};
  [...clonesWithTutorials, ...clonesAndAlternatives].forEach(project => {
    categories[project.category!] = (categories[project.category!] || 0) + 1;
  });

  return {
    clonesWithTutorials,
    clonesAndAlternatives,
    statistics: {
      totalProjects: clonesWithTutorials.length + clonesAndAlternatives.length,
      totalTutorials: clonesWithTutorials.length,
      totalAlternatives: clonesAndAlternatives.length,
      categories
    }
  };
}

export function groupProjectsByCategory(projects: Project[]): GroupedProjects {
  return projects.reduce((acc: GroupedProjects, project) => {
    const category = project.category || "Others";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {});
}