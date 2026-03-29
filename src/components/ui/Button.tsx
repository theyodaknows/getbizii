"use client";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

interface BaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}

interface ButtonAsAnchor extends BaseProps {
  href: string;
  onClick?: never;
}

interface ButtonAsButton extends BaseProps {
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600",
  secondary:
    "bg-white/10 text-white border border-white/20 backdrop-blur-xl hover:bg-white/20",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export function Button({
  children,
  href,
  onClick,
  disabled,
  variant = "primary",
  className,
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (href !== undefined) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
