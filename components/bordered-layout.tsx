import React from "react";
import { cn } from "@/lib/utils";

export default function BorderedLayout({
  children,
  className,
  innerClassName,
  innerContainerClassName,
  footer,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  innerContainerClassName?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-1 flex-col bg-muted/50 bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-md before:shadow-black/8 after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-2xl)+4px)] after:border after:border-border/50 after:bg-clip-padding max-lg:before:hidden lg:mt-8 lg:mr-4 lg:mb-8 rounded-2xl lg:border dark:shadow-sm dark:shadow-black/24 dark:after:bg-background/72",
        className
      )}
    >
      <div
        className={cn(
          "-m-px border bg-background px-4 py-6 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] sm:px-6 rounded-t-2xl rounded-b-xl lg:p-8 dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
          innerContainerClassName
        )}
      >
        <div className={cn("mx-auto w-full", innerClassName)}>{children}</div>
      </div>
      {footer && <div className="">{footer}</div>}
    </div>
  );
}
