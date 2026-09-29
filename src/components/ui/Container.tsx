import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  grid?: boolean;
};

export default function Container({ children, className, grid = false, ...rest }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-5 md:px-8 xl:px-16",
        grid && "grid grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-6 xl:grid-cols-12",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
