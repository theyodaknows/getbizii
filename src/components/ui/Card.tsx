"use client";

import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white/5 border border-white/10 backdrop-blur-xl rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
