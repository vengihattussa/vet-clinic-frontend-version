import {tabsAnatomy} from "@chakra-ui/anatomy";
import {createMultiStyleConfigHelpers} from "@chakra-ui/react";

const {definePartsStyle, defineMultiStyleConfig} = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  root: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  tab: {
    fontWeight: "semibold",
    userSelect: "none",
    flexShrink: 0,
  },
  tablist: {
    borderTopWidth: "0px !important",
  },
  tabpanel: {
    padding: 0,
  },
});

const capsuleVariant = definePartsStyle((props) => {
  const {colorScheme: c} = props;

  return {
    root: {
      gap: 2,
    },
    tablist: {
      padding: "1px",
      overflowX: "auto",
    },
    tab: {
      color: "text.100",
      outline: "1px solid",
      outlineColor: "transparent",
      borderBottom: "4px solid",
      borderBottomColor: "transparent",
      borderTopRadius: "md",
      _selected: {
        outline: "1px solid",
        outlineColor: "border.main",
        borderBottomColor: `${c}.500`,
        color: `${c}.500`,
        background: "white",
      },
    },
  };
});

const primaryVariant = definePartsStyle((props) => {
  const {colorScheme: c} = props;

  return {
    tablist: {
      overflowX: "auto",
      gap: 0.5,
      background: "white",
    },
    tab: {
      color: "text.100",
      outline: "1px solid",
      outlineColor: "transparent",
      borderTop: "4px solid",
      borderTopColor: "transparent",
      background: "white",
      _selected: {
        outlineColor: "border.main",
        borderTopColor: `${c}.500`,
        color: `${c}.500`,
        _hover: {
          bg: "transparent",
        },
      },
      _hover: {
        bg: "gray.200",
      },
    },
  };
});

const arrowVariant = definePartsStyle((props) => {
  const {colorScheme: c} = props;

  return {
    tab: {
      position: "relative",
      color: "text.100",
      outline: "1px solid",
      outlineColor: "transparent",
      borderTop: "4px solid",
      borderTopColor: "transparent",
      background: "white",
      _selected: {
        outline: "1px solid",
        outlineColor: "border.200",
        borderTopColor: `${c}.500`,
        color: `${c}.500`,
        _after: {
          content: '""',
          width: 0,
          height: 0,
          position: "absolute",
          top: "-12px",
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderBottom: "12px solid",
          borderBottomColor: "primary.500",
        },
      },
    },
    tablist: {
      border: "1px solid",
      borderColor: "border.200",
      background: "white",
      gap: 0.5,
    },
  };
});

const primaryReverse = definePartsStyle((props) => {
  const primary = {...primaryVariant(props)};
  return {
    ...primary,
    root: {
      flexDirection: "column",
    },
    tab: {
      ...primary.tab,
      background: "transparent",
      _selected: {
        ...primary.tab._selected,
        background: "white",
      },
    },
    tablist: {
      ...primary.tablist,
      background: "transparent",
    },
  };
});

const variants = {
  arrow: arrowVariant,
  primary: primaryVariant,
  capsule: capsuleVariant,
  reverse: primaryReverse,
};

export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "primary",
    colorScheme: "primary",
  },
});
