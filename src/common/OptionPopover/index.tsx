import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Flex,
  Box,
  PopoverCloseButton,
  PopoverProps,
  FocusLock,
  Stack,
} from "@chakra-ui/react";
import {ReactNode} from "react";

interface IPopover {
  name?: ReactNode;
  children: ReactNode;
  hasHeader?: boolean;
  titleColor: string;
  headerName?: string;
  isOpen?: boolean;
  placement?: PopoverProps["placement"];
  onClose?: () => void;
}
const PopoverModal = ({
  name,
  hasHeader = false,
  titleColor,
  headerName,
  isOpen,
  children,
  placement = "top",
  onClose,
}: IPopover) => {
  return (
    <Flex>
      <FocusLock persistentFocus>
        <Popover
          size="md"
          isOpen={isOpen}
          closeOnBlur={true}
          placement={placement}
          onClose={onClose}
        >
          <PopoverTrigger>
            <Box color={titleColor} cursor={"pointer"} bg="transparent">
              {name}
            </Box>
          </PopoverTrigger>

          <PopoverContent as={Stack}>
            <PopoverArrow />
            {hasHeader && (
              <PopoverHeader>
                <Flex justify="space-between" align="center">
                  <Box>{headerName}</Box>
                  <Box>
                    <PopoverCloseButton />
                  </Box>
                </Flex>
              </PopoverHeader>
            )}
            <PopoverBody>{children}</PopoverBody>
          </PopoverContent>
        </Popover>
      </FocusLock>
    </Flex>
  );
};

export default PopoverModal;
