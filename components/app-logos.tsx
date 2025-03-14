"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Music, MessageSquare } from "lucide-react";
import Link from "next/link";

const logos = [
  { icon: Facebook, delay: 0, category: "Social Media" },
  { icon: Instagram, delay: 0.1, category: "Social Media" },
  { icon: Twitter, delay: 0.2, category: "Social Media" },
  { icon: Youtube, delay: 0.3, category: "Streaming" },
  { icon: Music, delay: 0.4, category: "Streaming" },
  { icon: MessageSquare, delay: 0.5, category: "Communication" },
];

export function AppLogos() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 my-8">
      {logos.map((Logo, index) => (
        <Link href={`/category/${Logo.category.toLowerCase().replace(" ", "-")}`} key={index}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: Logo.delay }}
            className="backdrop-blur-xl bg-background/40 p-4 rounded-xl border border-border/50 flex items-center justify-center hover:bg-background/60 transition-all cursor-pointer"
          >
            <Logo.icon className="w-8 h-8 text-primary" />
          </motion.div>
        </Link>
      ))}
    </div>
  );
}