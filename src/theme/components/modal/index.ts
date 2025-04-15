import {modalAnatomy as parts} from "@chakra-ui/anatomy";
import {createMultiStyleConfigHelpers, defineStyle} from "@chakra-ui/styled-system";

const {definePartsStyle, defineMultiStyleConfig} = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => {
  const {colorScheme: c} = props;
  return {
    dialogContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dialog: {
      borderRadius: "md",
      bg: `${c}`,
      _dark: {
        bg: `${c}.600`,
        color: "white",
      },
    },
    footer: {
      justifyContent: "center",
    },
  };
});

//for size=xl
const dialogue_large = defineStyle({
  py: "0",
  fontSize: "md",
  minWidth: "80%",
  position: "fixed",
  overflowY: "auto",
  maxHeight: "85vh",
  mt: 14,
});
const header_large = defineStyle({
  fontSize: "md",
  borderTopRadius: "md",
  background: "primary.500",
  textAlign: "left",
  px: "30px",
  py: "5px",
  minW: "80%",
  whiteSpace: "nowrap",
  color: "white",
});
const close_large = defineStyle({
  border: "solid 2px",
  color: "white",
  maxHeight: "20px",
  width: "20px",
  mr: "10px",
});

//for size=lg
const dialogue_lg = defineStyle({
  py: "0",
  fontSize: "md",
  minWidth: "70%",
  position: "fixed",
  overflowY: "auto",
  maxHeight: "85vh",
  mt: 14,
});
const header_lg = defineStyle({
  fontSize: "md",
  borderTopRadius: "md",
  background: "primary.500",
  textAlign: "left",
  px: "30px",
  py: "5px",
  minW: "70%",
  whiteSpace: "nowrap",
  color: "white",
});
const close_lg = defineStyle({
  border: "solid 2px",
  color: "white",
  maxHeight: "20px",
  width: "20px",
  mr: "10px",
});

//for size=md

const dialogue_md = defineStyle({
  py: "0",
  fontSize: "md",
  minWidth: "50%",
  position: "fixed",
  overflowY: "auto",
  maxHeight: "85vh",
  mt: 14,
});
const header_md = defineStyle({
  fontSize: "md",
  borderTopRadius: "md",
  background: "primary.500",
  textAlign: "left",
  px: "10px",
  minW: "50%",
  py: "5px",
  color: "white",
  whiteSpace: "nowrap",
});
const close_md = defineStyle({
  border: "1px solid",
  color: "white",
  maxHeight: "20px",
  width: "20px",
  mr: "10px",
});
const dialogue_sm = defineStyle({
  py: "0",
  fontSize: "md",
  minWidth: "30%",
  position: "fixed",
  overflowY: "auto",
  maxHeight: "85vh",
  mt: 14,
});
const header_sm = defineStyle({
  fontSize: "md",
  borderTopRadius: "md",
  background: "primary.500",
  textAlign: "left",
  px: "10px",
  minW: "30%",
  py: "5px",
  color: "white",
  whiteSpace: "nowrap",
});
const close_sm = defineStyle({
  border: "1px solid",
  color: "white",
  maxHeight: "20px",
  width: "20px",
  mr: "10px",
});

const sizes = {
  xl: definePartsStyle({header: header_large, dialog: dialogue_large, closeButton: close_large}),
  lg: definePartsStyle({header: header_lg, dialog: dialogue_lg, closeButton: close_lg}),
  md: definePartsStyle({header: header_md, dialog: dialogue_md, closeButton: close_md}),
  sm: definePartsStyle({header: header_sm, dialog: dialogue_sm, closeButton: close_sm}),
};

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    colorScheme: "white",
    size: "xl",
  },
});
