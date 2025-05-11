import { cva } from "class-variance-authority";

export const pills = cva(
  [
    "font-medium",
    "border-2",
    "rounded-md",
    "inline-flex",
    "items-center",
    "justify-center",
  ],
  {
    variants: {
      intent: {
        cyan: ["bg-cyan-800/10", "text-cyan-800", "border-cyan-800"],
        red: ["bg-red-800/10", "text-red-800", "border-red-800"],
        geekblue: ["bg-blue-300/10", "text-blue-300", "border-blue-300"],
      },
      size: {
        small: ["text-sm", "py-1", "px-4"],
        medium: ["text-base", "py-2", "px-4"],
      },
      border: {
        sm: ["border"],
        md: ["border-2"],
      },
      bold: {
        sm: ["font-light"],
        md: ["font-medium"],
      },
    },
    defaultVariants: {
      intent: "cyan",
      size: "small",
    },
  }
);
