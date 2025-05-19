
import { cn } from "@/lib/utils";

export function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function LeadText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-xl text-muted-foreground text-balance", className)}>
      {children}
    </p>
  );
}
