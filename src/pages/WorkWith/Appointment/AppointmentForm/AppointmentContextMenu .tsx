// import {useModal} from "@src/store/index";
import ContextMenu from "./ContextMenu";
import {ReactNode} from "react";
import AppointmentForm from ".";
import CustomModal from "@src/common/CustomModal";
import dayjs from "dayjs";
import AppointmentModal from "./ AppointmentModal";
import {useRescheduleAppointment} from "@src/services/Appointment/mutation";

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

interface ContextMenuProps {
  menuPosition: {x: number; y: number};
  closeMenu: () => void;
  isOpen: boolean;
  appointment: Appointment | null;
  selectedDate: dayjs.Dayjs;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedComponent: ReactNode | null;
  setSelectedComponent: (component: ReactNode | null) => void; // ✅ Updated
  handleOptionClick: (props: Iprops) => void;
  handleClose: () => void;
  size: string;
  setSize: (size: string) => void;
  title: string;
  setTitle: (title: string) => void;
  openModal?: (appointment: Appointment) => void;
  closeModal?: () => void;
  // handleConfirm: () => void;
  isCalendarModalOpen: boolean;
  setIsCalendarModalOpen: (open: boolean) => void;
  appointmentId: string;
  appointmentData?: AppointmentData | undefined;
  setIsVisible: (val: boolean) => void;
  appointmentRescheduleData?: AppointmentRescheduleData;
  rescheduleAppointmentId: string;
  setRescheduleAppointmentId: (val: string) => void;
}

const AppointmentContextMenu: React.FC<ContextMenuProps> = ({
  menuPosition,
  closeMenu,
  isOpen,
  appointment,
  selectedDate,
  isModalOpen,
  selectedComponent,
  handleOptionClick,
  handleClose,
  size,
  title,
  isCalendarModalOpen,
  setIsCalendarModalOpen,
  appointmentId,
  appointmentData,
  setIsVisible,
  appointmentRescheduleData,
  rescheduleAppointmentId,
  setRescheduleAppointmentId,
}) => {
  const {mutate: rescheduleAppointment} = useRescheduleAppointment();

  const submitHandler = (
    data: {date: string | undefined; time: string | undefined; doctorId: string | undefined},
    id: string,
  ) => {
    if (rescheduleAppointmentId) {
      rescheduleAppointment(
        {
          data: data as {date: string; time: string; doctorId: string},
          id: id.toString(),
        },
        {
          onSuccess: () => {
            setIsVisible(false);
            setRescheduleAppointmentId("");
          },
          onError: (error) => {
            console.error("Update failed:", error);
          },
        },
      );
    }
  };

  console.log("rescheduleAppointmentId", rescheduleAppointmentId);
  const menuItems = [
    {
      label: "RESCHEDULE",
      shortcut: "F2",
      onClick: () => {
        if (rescheduleAppointmentId) {
          submitHandler(
            {
              date: appointmentRescheduleData?.date,
              time: appointmentRescheduleData?.time,
              doctorId: appointmentRescheduleData?.doctorId,
            },
            rescheduleAppointmentId,
          );
        }
      },
      disabled: rescheduleAppointmentId ? false : true,
    },
    {
      label: "NEW",
      shortcut: "F2",
      onClick: () =>
        handleOptionClick({
          component: (
            <AppointmentForm
              appointment={appointment}
              selectedDate={selectedDate}
              handleClose={handleClose}
              mode="add"
              appointmentId={""}
            />
          ),
          title: "NEW APPOINTMENT",
          size: "xl",
        }),
      disabled: appointmentId ? true : false,
    },
    {
      label: "CHANGE",
      shortcut: "F3",
      onClick: () =>
        handleOptionClick({
          component: (
            <AppointmentForm
              appointment={appointment}
              selectedDate={selectedDate}
              handleClose={handleClose}
              mode="edit"
              appointmentId={appointmentId}
              appointmentData={appointmentData}
            />
          ),
          title: "CHANGE APPOINTMENT",
          size: "xl",
        }),
      disabled: appointmentId ? false : true,
    },
    {label: "CHOOSE", shortcut: "F7", onClick: () => {}},
    {
      label: "REMOVE",
      shortcut: "F4",
      onClick: () => setIsCalendarModalOpen(true),
      disabled: appointmentId ? false : true,
    },
    {
      label: "Reschedule Appointment",
      onClick: () => {
        setIsVisible(true);
        setRescheduleAppointmentId(appointmentId);
      },
      disabled: appointmentId ? false : true,
      shortcut: "F7",
    },
    {label: "Check-in", shortcut: "F8"},
  ];

  return (
    <>
      <ContextMenu
        items={menuItems}
        menuPosition={menuPosition}
        closeMenu={closeMenu}
        isOpen={isOpen}
      />
      {isModalOpen && (
        <CustomModal
          modalTitle={title}
          isOpen={isModalOpen}
          onClose={handleClose}
          formId={title}
          hasFooter={false}
          size={size}
        >
          {selectedComponent}
        </CustomModal>
      )}
      <AppointmentModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        appointment={appointment}
        appointmentId={appointmentId}
      />
    </>
  );
};

export default AppointmentContextMenu;
