import {Box, Flex, HStack, Stack, Text, Tooltip} from "@chakra-ui/react";
import {useSideComponentAppointment} from "@src/services/Appointment/mutation";
import {generateDaysForCurrentMonth} from "@src/utils/generateDaysFromCalender";
import dayjs from "dayjs";
import {useEffect} from "react";

interface IAppointment {
  appointmentTime: string;
  doctorName: string;
  clientName: string;
  appointmentStatus: string;
  patientName: string;
}

interface IAppointmentsData {
  [key: string]: IAppointment[];
}
// const parseAppointmentTime = (timeStr: string): number | null => {
//   const matches = timeStr.match(/(\d+)\.(\d+)(am|pm)/);
//   if (!matches) return null;
//   let hours = parseInt(matches[1], 10);
//   const minutes = parseInt(matches[2], 10);
//   const period = matches[3];

//   if (period === "pm" && hours !== 12) hours += 12;
//   if (period === "am" && hours === 12) hours = 0;

//   return hours * 60 + minutes;
// };

const parseAppointmentTime = (timeStr: string): number | null => {
  // Match the new format (e.g., "08:30 AM" or "8:45 PM")
  const matches = timeStr.match(/^(\d{1,2}):(\d{2})\s+(am|pm)$/i);
  if (!matches) return null;

  let hours = parseInt(matches[1], 10);
  const minutes = parseInt(matches[2], 10);
  const period = matches[3].toLowerCase(); // Ensure lowercase for consistent checks

  // Convert 12-hour format to 24-hour
  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "cancelled":
      return "red.500";
    case "No Show":
      return "orange.500";
    case "Kept":
      return "green.500";
    case "Reschedule":
      return "blue.500";
    case "late":
      return "yellow.500";
    case "confirmed":
      return "blue.500";
    default:
      return "red.500";
  }
};

const SideComponent = ({
  selectedDate,
  isModalOpen,
  isCalendarModalOpen,
  setSelectedDate,
}: {
  selectedDate: dayjs.Dayjs;
  isModalOpen: boolean;
  isCalendarModalOpen: boolean;
  setSelectedDate: (date: dayjs.Dayjs) => void;
}) => {
  const daysArray = generateDaysForCurrentMonth();
  const formattedYear = dayjs(selectedDate).format("YYYY");
  const formattedMonth = dayjs(selectedDate).format("MM").replace(/^0/, "");
  const {data: appointmentsDataD, refetch} = useSideComponentAppointment(
    formattedYear,
    formattedMonth,
  );

  const appointmentsData = (appointmentsDataD as IAppointmentsData | undefined) || {};

  useEffect(() => {
    refetch();
  }, [selectedDate, isModalOpen, isCalendarModalOpen]);

  return (
    <Stack
      bg={"primary.400"}
      flex={2}
      border={"1px solid"}
      borderRadius={8}
      alignItems={"flex-end"}
      p={6}
      overflowY={"auto"}
      gap={4}
      maxW={"300px"}
      minW={"300px"}
    >
      {daysArray?.map((item) => {
        const dateKey = item.date.replace(/^0/, "").replace(/-/g, "/");
        const dayAppointments = appointmentsData?.[dateKey] || [];
        return (
          <HStack
            onClick={() => setSelectedDate(dayjs(item.fullDate))}
            key={item.date}
            gap={4}
            justifyContent={"space-between"}
            cursor={"pointer"}
          >
            <Text fontSize={"14px"} fontWeight={700}>
              {item.day}
            </Text>
            <Flex gap={2}>
              <Text fontSize={"14px"} fontWeight={700}>
                {item.date}
              </Text>
              <Box w={"160px"} borderRadius={4} border={"1px solid"} position="relative" h="24px">
                {dayAppointments.map((appointment: any, index: number) => {
                  const totalMinutes = parseAppointmentTime(appointment.appointmentTime);
                  if (totalMinutes === null || totalMinutes < 480 || totalMinutes >= 1080)
                    return null;

                  const minutesSince8am = totalMinutes - 480;
                  const leftPosition = (minutesSince8am / 600) * 160;

                  return (
                    <Tooltip
                      key={index}
                      label={
                        <Box>
                          <Text fontSize="12px" fontWeight="bold">
                            {appointment.appointmentTime}
                          </Text>
                          <Text fontSize="12px">Doctor: {appointment.doctorName}</Text>
                          <Text fontSize="12px">Client: {appointment.clientName}</Text>
                          <Text fontSize="12px">Patient: {appointment.patientName}</Text>
                        </Box>
                      }
                      hasArrow
                      bg="gray.700"
                      color="white"
                      placement="top"
                    >
                      <Box
                        position="absolute"
                        left={`${leftPosition}px`}
                        top={0}
                        bottom={0}
                        w="2px"
                        bg={getStatusColor(appointment.appointmentStatus)}
                        zIndex={1}
                        cursor="pointer"
                      />
                    </Tooltip>
                  );
                })}
              </Box>
            </Flex>
          </HStack>
        );
      })}
    </Stack>
  );
};

export default SideComponent;
