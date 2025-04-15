import {checkboxAnatomy} from "@chakra-ui/anatomy";
import {createMultiStyleConfigHelpers} from "@chakra-ui/react";

const {definePartsStyle, defineMultiStyleConfig} = createMultiStyleConfigHelpers(
  checkboxAnatomy.keys,
);

const baseStyle = definePartsStyle({
  control: {
    background: "white",
  },
  label: {
    fontWeight: "semibold",
  },
});

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    colorScheme: "primary",
    size: "md",
  },
});
