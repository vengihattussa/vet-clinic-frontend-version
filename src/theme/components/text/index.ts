import {defineStyle, defineStyleConfig} from "@chakra-ui/react";

const primary_500 = defineStyle({
  fontSize: "16px",
  fontWeight: 500,
});

const primary_600 = defineStyle({
  fontSize: "16px",
  fontWeight: 600,
});

const Text = defineStyleConfig({
  variants: {
    primary_500,
    primary_600,
  },
});

export default Text;
