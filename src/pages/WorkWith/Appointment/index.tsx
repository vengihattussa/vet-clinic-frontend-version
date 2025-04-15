import {Flex, Stack} from "@chakra-ui/react";
import AppointmentHeader from "@src/layout/Header/AppointmentHeader";
import SideComponent from "./SideComponent";
import Footer from "./Footer";
import CalendarComponent from "./CalendarComponent";
import dayjs from "dayjs";
import AppointmentContextMenu from "./AppointmentForm/AppointmentContextMenu ";
import {ReactNode, useState} from "react";
import RescheduleBox from "./AppointmentForm/RescheduleAppointmentComponent";

interface Appointment {
  name: string;
  status: string;
  timeSlot: string;
  doctorId?: string;
}

interface Iprops {
  component: ReactNode | null;
  title: string;
  size?: string;
  hasFooter?: boolean;
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

const Appointment = () => {
  // calendar state
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const openModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // const handleConfirm = () => {
  //   closeModal();
  // };

  // Footer
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleTabClick = (newDate: dayjs.Dayjs) => {
    setSelectedDate(newDate);
  };

  const changeMonth = (offset: number) => {
    setSelectedDate((prev) => prev.add(offset, "month"));
  };

  const changeWeek = (offset: number) => {
    setSelectedDate((prev) => prev.add(offset * 7, "day"));
  };

  const startOfWeek = selectedDate.startOf("week").format("DD MMM");
  const endOfWeek = selectedDate.endOf("week").format("DD MMM YYYY");

  // Menu
  const [menuPosition, setMenuPosition] = useState<{x: number; y: number}>({x: 0, y: 0});
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = (
    event: React.MouseEvent,
    doctor: string,
    timeSlot: string,
    doctorId: string,
  ) => {
    event.preventDefault();
    setMenuPosition({x: event.clientX, y: event.clientY});
    setIsOpen(true);
    setSelectedAppointment({
      name: doctor,
      status: "1",
      timeSlot: timeSlot,
      doctorId: doctorId,
    });
  };

  const closeMenu = () => setIsOpen(false);

  // Appointment Form
  const [appointmentId, setAppointmentId] = useState("");
  const [appointmentData, setAppointmentData] = useState<AppointmentData>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("");

  const handleOptionClick = ({component, title, size}: Iprops) => {
    setSelectedComponent(component);
    setTitle(title || "");
    setIsModalOpen(true);
    setSize(size ?? "lg");
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedComponent(null);
    setSize("lg");
  };

  // reschedule appointment
  const [isVisible, setIsVisible] = useState(false);
  const [rescheduleAppointmentId, setRescheduleAppointmentId] = useState("");
  const [appointmentRescheduleData, setAppointmentRescheduleData] =
    useState<AppointmentRescheduleData>();

  return (
    <>
      <Stack gap={0} h={"100vh"} overflowY={"hidden"}>
        <AppointmentHeader handleClose={handleClose} />
        <Flex gap={4} p={6} h={"95%"}>
          <Stack w={{base: "80%", md: "75%"}}>
            <Stack
              bg={"primary.300"}
              minH={"80%"}
              borderRadius={8}
              border={"1px solid"}
              borderColor={"#a5a5a5"}
              overflowY={"auto"}
            >
              <CalendarComponent
                selectedDate={selectedDate}
                setSelectedAppointment={setSelectedAppointment}
                openMenu={openMenu}
                handleClose={handleClose}
                setIsModalOpen={() => setIsCalendarModalOpen(false)}
                setAppointmentId={setAppointmentId}
                setAppointmentData={setAppointmentData}
                setAppointmentRescheduleData={setAppointmentRescheduleData}
              />
            </Stack>
            <RescheduleBox
              appointmentData={appointmentData}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              setRescheduleAppointmentId={setRescheduleAppointmentId}
            />
            <Footer
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              handleTabClick={handleTabClick}
              changeMonth={changeMonth}
              changeWeek={changeWeek}
              startOfWeek={startOfWeek}
              endOfWeek={endOfWeek}
            />
          </Stack>
          <SideComponent
            isModalOpen={isModalOpen}
            isCalendarModalOpen={isCalendarModalOpen}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Flex>
      </Stack>

      <AppointmentContextMenu
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedComponent={selectedComponent}
        handleOptionClick={handleOptionClick}
        handleClose={handleClose}
        menuPosition={menuPosition}
        isOpen={isOpen}
        closeMenu={closeMenu}
        appointment={selectedAppointment}
        selectedDate={selectedDate}
        title={title}
        setTitle={setTitle}
        setSelectedComponent={setSelectedComponent}
        size={size}
        setSize={setSize}
        openModal={openModal}
        closeModal={closeModal}
        isCalendarModalOpen={isCalendarModalOpen}
        setIsCalendarModalOpen={setIsCalendarModalOpen}
        appointmentId={appointmentId}
        appointmentData={appointmentData}
        setIsVisible={setIsVisible}
        appointmentRescheduleData={appointmentRescheduleData}
        rescheduleAppointmentId={rescheduleAppointmentId}
        setRescheduleAppointmentId={setRescheduleAppointmentId}
      />
    </>
  );
};

export default Appointment;
