import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SocialButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon: ReactNode;
  label: string;
};

export function SocialButton({ icon, label, className, ...props }: SocialButtonProps) {
  return (
    <a
      className={cn(
        "grid h-10 w-10 place-items-center rounded-sm border border-brand-line bg-white/[0.03] text-brand-steel transition hover:border-brand-cyan hover:text-brand-cyan hover:shadow-glow",
        className
      )}
      aria-label={label}
      {...props}
    >
      {icon}
    </a>
  );
}
