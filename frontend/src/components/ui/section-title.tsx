import { cn } from "@/lib/cn";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  accent?: string;
  align?: "left" | "center";
  description?: string;
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  accent,
  align = "left",
  description,
  className
}: SectionTitleProps) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-[0.72rem] font-black uppercase tracking-[0.32em] text-brand-cyan">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-5xl leading-[0.92] tracking-normal text-brand-white sm:text-6xl">
        {title}
        {accent ? <span className="block neon-text">{accent}</span> : null}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-sm leading-7 text-brand-steel sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
