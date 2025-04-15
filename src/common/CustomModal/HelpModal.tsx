import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import {ReactNode} from "react";

interface IModalProps {
  modalTitle: string;
  children: ReactNode;
  cancelLabel?: string;
  submitLabel?: string;
  helpLabel?: string;
  contentPadding?: string;
  isOpen: boolean;
  onClose: () => void;
  formId?: string;
  variant?: string;
  size?: string;
  hasFooter?: boolean;
}
const HelpCustomModal = ({
  modalTitle,
  cancelLabel = "Cancel",
  submitLabel = "Done",
  contentPadding = "0px",
  helpLabel = "Help",
  isOpen,
  onClose,
  formId,
  children,
  size,
  hasFooter = true,
}: IModalProps) => {
  return (
    <Box position="relative" margin="0px" width="100%">
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mt={2} padding={contentPadding} width={"100%"}>
            {children}
          </ModalBody>{" "}
          {hasFooter && (
            <ModalFooter>
              <Flex gap={2}>
                <Button variant="outline" minW={"100px"} borderRadius={"5px"} form={formId}>
                  {helpLabel}
                </Button>
                <Button variant={"outline"} borderRadius={"5px"} onClick={onClose}>
                  {cancelLabel}
                </Button>
                <Button type="submit" minW={"100px"} borderRadius={"5px"} form={formId}>
                  {submitLabel}
                </Button>
              </Flex>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default HelpCustomModal;
