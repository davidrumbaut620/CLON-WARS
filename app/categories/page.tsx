import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Music, 
  FileText, 
  ShoppingCart, 
  MessageSquare, 
  Gamepad, 
  Code, 
  Box 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const categories = [
  {
    name: "Social Media",
    icon: Facebook,
    apps: ["Facebook", "Instagram", "Twitter", "TikTok", "Snapchat", "LinkedIn"],
    description: "Social networking and content sharing platforms",
    slug: "social-media"
  },
  {
    name: "Streaming",
    icon: Music,
    apps: ["Netflix", "Spotify", "YouTube", "Disney+", "Apple Music"],
    description: "Video and music streaming services",
    slug: "streaming"
  },
  {
    name: "Productivity",
    icon: FileText,
    apps: ["Trello", "Notion", "Slack", "Discord", "Jira"],
    description: "Tools for work and organization",
    slug: "productivity"
  },
  {
    name: "E-commerce",
    icon: ShoppingCart,
    apps: ["Amazon", "Airbnb", "Nike"],
    description: "Online shopping and marketplace platforms",
    slug: "e-commerce"
  },
  {
    name: "Communication",
    icon: MessageSquare,
    apps: ["WhatsApp", "Telegram", "Messenger"],
    description: "Messaging and communication apps",
    slug: "communication"
  },
  {
    name: "Gaming",
    icon: Gamepad,
    apps: ["2048", "Tetris", "Battleship", "Sliders"],
    description: "Games and gaming platforms",
    slug: "gaming"
  },
  {
    name: "Developer Tools",
    icon: Code,
    apps: ["Postman", "Firebase", "Auth0", "Okta"],
    description: "Tools for developers and APIs",
    slug: "developer-tools"
  },
  {
    name: "Others",
    icon: Box,
    apps: [],
    description: "Other miscellaneous applications",
    slug: "others"
  }
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link href={`/category/${category.slug}`} key={category.slug}>
              <Card className="h-full transition-all hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="w-6 h-6 text-primary" />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.apps.map((app) => (
                      <span
                        key={app}
                        className="bg-muted px-2 py-1 rounded-md text-sm"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}