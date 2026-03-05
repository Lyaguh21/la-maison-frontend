import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "burgundy",

  colors: {
    burgundy: [
      "#fdf2f4",
      "#f5d5da",
      "#e8a8b2",
      "#d97a89",
      "#c94d61",
      "#b32d44",
      "#8b1a2f",
      "#721527",
      "#59101e",
      "#400b16",
    ],
    gold: [
      "#fdf8e8",
      "#f5ecc2",
      "#e8d68a",
      "#d4bc52",
      "#c4a832",
      "#b89a1e",
      "#a68a15",
      "#8a7210",
      "#6e5a0c",
      "#524308",
    ],
  },

  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
    xxl: "120em",
  },

  fontFamily: "'Inter', sans-serif",
  headings: {
    fontFamily: "'Playfair Display', serif",
  },
});
