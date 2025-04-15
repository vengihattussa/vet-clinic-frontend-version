import {extendTheme} from "@chakra-ui/react";
import {buttonTheme} from "./components/button";
import breakpoints from "./foundations/breakpoint";
import {colors} from "./foundations/colors";
import styles from "./styles";
import {popoverTheme} from "./foundations/popover";
import {modalTheme} from "./components/modal";
import {tabsTheme} from "./components/tabs";
import {checkboxTheme} from "./components/checkbox";
import Text from "./components/text";
const baseTheme = {
  styles,
  breakpoints,
  colors: colors,
  components: {
    Popover: popoverTheme,
    Button: buttonTheme,
    Modal: modalTheme,
    Tabs: tabsTheme,
    Checkbox: checkboxTheme,
    Text,
    TimePicker: {
      baseStyle: {
        width: "400px",
        borderRadius: "md",
        borderColor: "gray.300",
      },
    },
  },
};

export const theme = extendTheme(baseTheme);
