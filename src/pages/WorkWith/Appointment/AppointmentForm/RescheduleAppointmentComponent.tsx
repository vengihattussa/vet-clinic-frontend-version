import {Box, Button, Text} from "@chakra-ui/react";

type AppointmentData = {
  appointmentId: number;
  startDate: string;
  endTime: string;
  doctorName: string;
  duration: number;
  status: number;
  time: string;
  patientId: number;
  clientId: number;
  date: string;
  patientName: string;
  clientName: string;
};

const RescheduleBox = ({
  isVisible,
  setIsVisible,
  appointmentData,
  setRescheduleAppointmentId,
}: {
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  appointmentData: AppointmentData | undefined;
  setRescheduleAppointmentId: (val: string) => void;
}) => {
  return (
    <>
      {isVisible && (
        <Box
          borderWidth={1}
          position={"absolute"}
          p={4}
          borderRadius="md"
          maxW="sm"
          boxShadow="md"
          bg="white"
          mt={4}
          bottom={"100"}
        >
          <Text fontSize={"14px"}>
            {appointmentData?.appointmentId
              ? `Rescheduling appointment for client: ${appointmentData.clientName} and patient: ${appointmentData.patientName}`
              : "not found"}
          </Text>
          <Button
            colorScheme="blue"
            flex={"display"}
            justifyContent={"end"}
            alignContent={"end"}
            mt={4}
            onClick={() => {
              setIsVisible(false);
              setRescheduleAppointmentId("");
            }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </>
  );
};

export default RescheduleBox;
