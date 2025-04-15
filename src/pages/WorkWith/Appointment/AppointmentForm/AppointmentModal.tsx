import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  RadioGroup,
  Radio,
  Stack,
  VStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import {useDeleteAppointment, useUpdateAppointmentStatus} from "@src/services/Appointment/mutation";
import {useState} from "react";
import {FaExclamationTriangle} from "react-icons/fa";

interface Appointment {
  name: string;
  status: string;
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onConfirm: (status: string) => void;
  appointment: Appointment | null;
  appointmentId: string;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  // onConfirm,
  appointment,
  appointmentId,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("3");
  const {mutate: updateAppointment} = useUpdateAppointmentStatus();
  const {mutate: deleteAppointment} = useDeleteAppointment();

  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const submitHandler = (data: any) => {
    updateAppointment(
      {
        id: appointmentId,
        status: data,
      },
      {
        onSuccess: () => {
          setConfirmOpen(false);
          onClose();
        },
        onError: (error) => {
          console.error("Update failed:", error);
        },
      },
    );
  };

  const DeleteAppointmentHandler = (appointmentId: string) => {
    deleteAppointment(
      {
        id: appointmentId,
      },
      {
        onSuccess: () => {
          setConfirmOpen(false);
          onClose();
        },
        onError: (error) => {
          console.error("Delete failed:", error);
        },
      },
    );
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"sm"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Appointment For {appointment?.name || "Unknown"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start">
              <RadioGroup onChange={setSelectedOption} value={selectedOption}>
                <Stack spacing={2}>
                  <Radio value="3">Delete the reservation</Radio>
                  <Radio value="4">Mark as "Canceled"</Radio>
                  <Radio value="5">Mark as "No Show"</Radio>
                  <Radio value="6">Mark as "Kept"</Radio>
                  <Radio value="7">Mark as "Rescheduled"</Radio>
                  <Radio value="8">Mark as "Late"</Radio>
                </Stack>
              </RadioGroup>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() =>
                selectedOption === "3" ? setConfirmOpen(true) : submitHandler(selectedOption)
              }
            >
              {/* <Button colorScheme="green" mr={3} onClick={() => onConfirm(selectedOption)}> */}
              ✅ Done
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              ❌ Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isConfirmOpen} onClose={() => setConfirmOpen(false)} size="md" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Icon as={FaExclamationTriangle} color="red.500" boxSize={10} mb={3} />
            <Text fontSize="lg" fontWeight="bold">
              Are you sure you want to delete this reservation?
            </Text>
            <Text fontSize="sm" color="gray.500">
              This action cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => DeleteAppointmentHandler(appointmentId)}
            >
              🚨 Yes, Delete
            </Button>
            <Button colorScheme="blackAlpha" onClick={() => setConfirmOpen(false)}>
              ❌ Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppointmentModal;
