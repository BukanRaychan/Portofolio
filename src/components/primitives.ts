import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline",
  variants: {
    color: {
      primary: "from-primary-400 to-primary-600",
      secondary: "from-secondary-400 to-secondary-600",
      success: "from-success-400 to-success-600",
      warning: "from-warning-400 to-warning-600",
      danger: "from-danger-400 to-danger-600",
      default: "from-default-400 to-default-600",
      foreground: "from-foreground to-default-500"
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl",
      lg: "text-4xl lg:text-6xl",
      xl: "text-5xl lg:text-7xl",       // ✅ New: extra large (hero title)
      "2xl": "text-6xl lg:text-8xl",
    },
    fullWidth: {
      true: "w-full block",
    },
    font: {
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    }
  },
  defaultVariants: {
    size: "lg",
    font: "bold",
  },
  compoundVariants: [
    {
      color: [
        "primary",
        "secondary",
        "success",
        "warning",
        "default",
        "danger",
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