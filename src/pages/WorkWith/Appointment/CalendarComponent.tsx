import {Center, HStack, Stack, Text} from "@chakra-ui/react";
import {time} from "@src/constants/Appointment/time";
import {useEffect} from "react";
import {useAppointmentsByDoctor} from "@src/services/Appointment/queries";
import dayjs from "dayjs";

const statusColors: Record<string, {bg: string; color: string}> = {
  "0": {bg: "#ffff", color: "black"},
  "1": {bg: "primary.300", color: "black"}, // Confirmed (Green)
  "2": {bg: "#ff9800", color: "black"}, // Left Message (Orange)
  "3": {bg: "#d32f2f", color: "black"}, // Delete Reservation (Dark Red)
  "4": {bg: "red.400", color: "black"}, // Canceled (Gray)
  "5": {bg: "#ff5722", color: "black"}, // No Show (Deep Orange)
  "6": {bg: "#2196f3", color: "black"}, // Kept (Light Blue)
  "7": {bg: "#673ab7", color: "black"}, // Rescheduled (Purple)
  "8": {bg: "#e91e63", color: "black"}, // Late (Pink)
};

const Cell = ({
  name,
  noBorderBottom = false,
  status,
  onClick,
}: {
  name: string;
  noBorderBottom?: boolean;
  status?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  // const style =
  // status === "AVAILABLE"
  //   ? {bg: "#5368fa", color: "white"}
  //   : status === "CANCELLED"
  //     ? {bg: "#fe3f24", color: "white"}
  //     : status === "1"
  //       ? {bg: "white", color: "black"}
  //       : {bg: "primary.300", color: "black"};

  const style = status
    ? statusColors[status] || {bg: "primary.300", color: "black"}
    : {bg: "primary.300", color: "black"};

  return (
    <Center
      borderBottom={noBorderBottom ? "" : "1px solid"}
      borderRight={"1px solid"}
      borderColor={"#a5a5a5"}
      minW={"280px"}
      h={"48px"}
      p={4}
      cursor={"pointer"}
      {...style}
      onClick={onClick}
    >
      <Text fontWeight={700} fontSize={14}>
        {name}
      </Text>
    </Center>
  );
};

interface Appointment {
  name: string;
  status: string;
  timeSlot: string;
  doctorId?: string;
}

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

type AppointmentRescheduleData = {
  // appointmentId: number;
  time: string;
  date: string;
  doctorId: string;
};

interface CalendarComponentProps {
  setSelectedAppointment: (appointment: Appointment | null) => void;
  openMenu: (event: React.MouseEvent, name: string, timeSlot: string, doctorId: string) => void;
  selectedDate?: dayjs.Dayjs;
  handleClose: () => void;
  setIsModalOpen: () => void;
  setAppointmentId: (val: string) => void;
  setAppointmentData: (val: AppointmentData) => void;
  setAppointmentRescheduleData: (val: AppointmentRescheduleData) => void;
}

export const convertTimeTo12HourFormat = (timeStr?: string | null) => {
  if (!timeStr) return "";
  let [hours, minutes] = timeStr.split(":").map(Number);
  const period = hours >= 12 ? "p" : "a";
  hours = hours % 12 || 12;
  const formattedHours = hours.toString().padStart(2, "0");
  return `${formattedHours}:${minutes.toString().padStart(2, "0")}${period}`;
};

function convertTo24Hour(time: string): string {
  let [hour, minute] = time.slice(0, -1).split(":").map(Number);
  let period = time.slice(-1).toLowerCase();

  if (period === "p" && hour !== 12) {
    hour += 12;
  } else if (period === "a" && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  openMenu,
  handleClose,
  selectedDate,
  setAppointmentId,
  setAppointmentData,
  setAppointmentRescheduleData,
}) => {
  const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
  const {data: allAppointmentSlots, refetch} = useAppointmentsByDoctor(formattedDate);

  useEffect(() => {
    refetch();
  }, [handleClose, refetch]);

  interface AppointmentDoctor {
    startDate: string;
    doctorName: string;
    duration: number;
    status: string | null;
    time?: string | null;
  }

  return (
    <>
      <HStack gap={0}>
        <Stack gap={0}>
          <Cell name="Time" />
          {time.map((item, index) => (
            <Cell name={item} key={item} noBorderBottom={index === time.length - 1} />
          ))}
        </Stack>
        {(Array.isArray(allAppointmentSlots) && allAppointmentSlots.length === 0) ||
        allAppointmentSlots == undefined ? (
          <Center
            height="100%"
            display={"flex"}
            alignContent={"start"}
            alignItems={"start"}
            padding={"50px 10px"}
            flex={1}
          >
            <Text fontSize="xl" color="black" fontWeight={500}>
              No appointments booked
            </Text>
          </Center>
        ) : (
          <>
            {Array.isArray(allAppointmentSlots) &&
              allAppointmentSlots.map((doctor) => (
                <Stack gap={0} key={doctor.doctorId}>
                  <Cell name={doctor.doctorName} />
                  {time.map((timeSlot) => {
                    const appointment = doctor.appointments.find((appt: AppointmentDoctor) => {
                      if (!appt.time) return false;
                      return convertTimeTo12HourFormat(appt.time) === timeSlot;
                    });
                    return appointment ? (
                      <Cell
                        key={`${doctor.doctorId}-${timeSlot}`}
                        name={`${appointment.clientName} (Patient Name - ${appointment.patientName})`}
                        status={appointment.status}
                        onClick={(event) => {
                          openMenu(event, doctor.doctorName, timeSlot, doctor.doctorId),
                            setAppointmentId(appointment.appointmentId);
                          setAppointmentData(appointment);
                        }}
                      />
                    ) : (
                      <Cell
                        key={`${doctor.doctorId}-${timeSlot}`}
                        name={""}
                        status="0"
                        onClick={(event) => {
                          openMenu(event, doctor.doctorName, timeSlot, doctor.doctorId);
                          setAppointmentId("");
                          setAppointmentRescheduleData({
                            time: convertTo24Hour(timeSlot),
                            date: dayjs(selectedDate).format("YYYY-MM-DD"),
                            doctorId: doctor.doctorId,
                          });
                        }}
                      />
                    );
                  })}
                </Stack>
              ))}
          </>
        )}
      </HStack>
    </>
  );
};

export default CalendarComponent;
