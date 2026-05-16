import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-cyan text-brand-black shadow-glow hover:bg-brand-cyanDark hover:shadow-glow-strong",
  outline:
    "border border-brand-cyan/55 text-brand-cyan hover:bg-brand-cyan/10 hover:text-brand-white hover:shadow-glow",
  ghost: "text-brand-white/72 hover:bg-white/5 hover:text-brand-cyan"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-xs",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-sm"
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-sm font-extrabold uppercase tracking-wide transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;
type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  CommonProps & {
    href: string;
  };

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(baseClass, variants[variant], sizes[size], className)} {...props}>
      {icon}
      {children}
    </button>
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(baseClass, variants[variant], sizes[size], className)} {...props}>
      {icon}
      {children}
      {!icon && variant === "primary" ? <ArrowRight size={17} /> : null}
    </a>
  );
}
