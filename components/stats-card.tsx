"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useSpring, useMotionValue, useTransform, animate as framerAnimate } from "framer-motion";
import { useEffect } from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  delay?: number;
  animate?: boolean;
}

export function StatsCard({ title, value, icon, delay = 0, animate = false }: StatsCardProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    if (animate) {
      const controls = framerAnimate(count, value, {
        duration: 2,
        delay,
        ease: "easeOut"
      });

      return controls.stop;
    } else {
      count.set(value);
    }
  }, [value, delay, animate, count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <Card className="backdrop-blur-lg bg-background/60 border-none shadow-lg">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            {icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <motion.p className="text-2xl font-bold">
              {animate ? rounded : value}
            </motion.p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}