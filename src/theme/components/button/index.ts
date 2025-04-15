import {defineStyle, defineStyleConfig} from "@chakra-ui/react";

const variants = {
  solid: defineStyle({
    border: "none",
    fontWeight: "semibold",
    color: "white",
  }),
  outline: defineStyle(({colorScheme: c}) => ({
    bg: "transparent",
    border: "1px solid",
    borderColor: `${c}.500`,
    fontWeight: "semibold",
    color: `${c}.500`,
  })),

  solidBold: defineStyle({
    border: "none",
    fontWeight: "600",
    fontSize: 16,
    height: "38px",
    borderRadius: 4,
    color: "white",
    bg: "primary.500",
  }),
  outlineBold: defineStyle(({colorScheme: c}) => ({
    bg: "transparent",
    border: "1px solid",
    borderColor: `${c}.500`,
    fontWeight: "700",
    fontSize: 16,
    height: "38px",
    borderRadius: 4,
    color: `${c}.500`,
  })),
};

const sizes = {
  with_icon: defineStyle({
    fontSize: "xs",
    px: 2,
    h: 6,
    borderRadius: "sm",
  }),
  sm: defineStyle({
    fontSize: "xs",
    px: 6,
    h: 6,
    borderRadius: "sm",
  }),
};

export const buttonTheme = defineStyleConfig({
  variants,
  sizes,
  defaultProps: {
    variant: "solid",
    size: "sm",
    colorScheme: "primary",
  },
});
