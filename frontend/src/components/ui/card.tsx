import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
};

export function Card({ className, glow = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "sport-panel rounded-sm p-6 transition duration-300 hover:border-brand-cyan/55",
        glow && "shadow-glow",
        className
      )}
      {...props}
    />
  );
}
