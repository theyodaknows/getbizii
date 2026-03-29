"use client";

import React from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface SectionHeadingProps {
  children: React.ReactNode;
  as?: HeadingLevel;
  className?: string;
}

export function SectionHeading({
  children,
  as = "h2",
  className,
}: SectionHeadingProps) {
  return React.createElement(
    as,
    { className: cn("text-3xl font-bold text-white", className) },
    children
  );
}
