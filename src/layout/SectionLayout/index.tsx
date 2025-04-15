import {Box, BoxProps, Flex, ResponsiveValue} from "@chakra-ui/react";
import {ReactNode} from "react";

interface ISectionLayoutProps {
  borderColor?: string;
  headerBackground?: string;
  contentBg?: string;
  contentPadding?: BoxProps["padding"];
  height?: ResponsiveValue<string>;
  hasHeader?: boolean;
  headerRight?: boolean;
  mainTitle?: string;
  rightContent?: string;
  children: ReactNode;
  margin?: number;
  width?: string;
  minHeight?: string;
}

const SectionLayout = ({
  borderColor = "border.main",
  headerBackground = "primary.300",
  contentBg = "primary.200",
  contentPadding = 0,
  height,
  hasHeader = true,
  mainTitle,
  rightContent,
  headerRight = true,
  margin,
  children,
  width,
}: ISectionLayoutProps) => {
  return (
    <Box
      border="1px solid"
      m={margin}
      // height={"100%"}
      borderColor={borderColor}
      borderRadius={"lg"}
      background={contentBg}
      position={"relative"}
      width={width}
    >
      {hasHeader && (
        <Flex
          justifyContent={"space-between"}
          background={headerBackground}
          color="text.main"
          fontWeight={"bold"}
          px={5}
          py={2}
          borderBottom={"1px solid"}
          borderColor={borderColor}
          borderTopRadius={"lg"}
        >
          <Box>{mainTitle}</Box>
          {headerRight && <Box>{rightContent}</Box>}
        </Flex>
      )}
      <Box
        textAlign={"left"}
        background={contentBg}
        padding={contentPadding}
        borderTopRadius={"lg"}
        h={height}
        borderRadius={"lg"}
      >
        {children}
      </Box>
     
    </Box>
  );
};
export default SectionLayout;
