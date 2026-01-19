import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export const BroomIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", props.className)}
    {...props}
  >
    <path d="M19.4 12.6a4 4 0 0 0-5.6-5.6l-6.3 6.3a1 1 0 0 0 1.4 1.4l6.3-6.3a1.99 1.99 0 0 1 0 2.8c-1.6 1.5-4 .9-5.2-1.2L8 8.4" />
    <path d="M12.7 2.7a2.5 2.5 0 0 1 3.6 3.6L5.1 17.5a1 1 0 0 1-1.4-1.4Z" />
    <path d="M4 14l-1.5 1.5a1 1 0 0 0 0 1.4l1.5 1.5a1 1 0 0 0 1.4 0L7 17" />
    <path d="m3 21 6-6" />
  </svg>
);
