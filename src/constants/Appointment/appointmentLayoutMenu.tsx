import Notes from "@src/pages/PatientsInformation/Notes";
import AppointmentForm from "@src/pages/WorkWith/Appointment/AppointmentForm";

export const appointmentLayoutMenu = [
  {
    name: "New",
    isClickable: true,
    component: <AppointmentForm />,
    title: "NEW APPOINTMENT",
  },
  {
    name: "Change",
    isClickable: true,
    component: <AppointmentForm />,
    title: "CHANGE APPOINTMENT",
  },
  {
    name: "Notes",
    isClickable: true,
    component: <Notes />,
    title: "APPOINTMENT NOTES",
    size: "md",
  },
];
