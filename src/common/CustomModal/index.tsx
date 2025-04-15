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
} from "@chakra-ui/react";
import {ReactNode} from "react";

interface IModalProps {
  modalTitle: string | null;
  children: ReactNode;
  cancelLabel?: string;
  submitLabel?: string;
  contentPadding?: string;
  isOpen: boolean;
  onClose: () => void;
  formId?: string;
  variant?: string;
  size?: string;
  hasFooter?: boolean;
}

const CustomModal = ({
  modalTitle,
  cancelLabel = "Cancel",
  submitLabel = "OK",
  contentPadding = "0px",
  isOpen,
  onClose,
  formId,
  children,
   //size,
  hasFooter = true,
}: IModalProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Box position="relative" margin="0px" width="100%">
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent onKeyDown={handleKeyDown}>
          <ModalHeader position={"sticky"} top="0">
            {modalTitle}
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody padding={contentPadding} width={"100%"} maxHeight={"80vh"} overflowY={"auto"}>
            {children}
          </ModalBody>
          {hasFooter && (
            <ModalFooter>
              <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onClose}>
                {cancelLabel}
              </Button>
              <Button type="submit" minW={"100px"} borderRadius={"5px"} form={formId}>
                {submitLabel}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomModal;
