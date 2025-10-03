import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      xs: "text-xl md:text-2xl",                // very small (e.g. captions, small headers)
      sm: "text-2xl md:text-3xl lg:text-4xl",   // small headers
      md: "text-3xl md:text-4xl lg:text-5xl",   // medium headers
      lg: "text-4xl md:text-5xl lg:text-6xl",   // large headers
      xl: "text-5xl md:text-6xl lg:text-7xl",   // hero headers
      "2xl": "text-6xl md:text-7xl lg:text-8xl" // extra large / splash hero
    },
    fullWidth: {
      true: "w-full block",
    },
    font: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
  },
  defaultVariants: {
    size: "sm",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
