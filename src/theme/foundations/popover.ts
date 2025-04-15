import {popoverAnatomy as parts} from "@chakra-ui/anatomy";
import {createMultiStyleConfigHelpers} from "@chakra-ui/styled-system";

const {definePartsStyle, defineMultiStyleConfig} = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle(() => ({
  content: {
    boxShadow: "lg",
    w: "auto",
    textAlign: "left",
    _focusVisible: {
      boxShadow: "none",
    },
  },
  header: {
    pb: 0,
    borderBottomWidth: "1px",
  },
  body: {
    p: 0,
  },
}));

const sizes = {
  xl: definePartsStyle({
    content: {
      w: "400px",
    },
  }),
};

const rounded = definePartsStyle({
  content: {
    borderRadius: "35px",
  },
});

const variants = {
  rounded,
};

export const popoverTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
});
