import {appointmentList} from "@src/constants/Appointment/appointments";
import {time} from "@src/constants/Appointment/time";

export const allAppointmentSlots = appointmentList.map((doctor) => {
  const slots = time.map((slot) => {
    const appointment = doctor.appointments.find((appt) => appt.startTime === slot);

    return appointment
      ? {...appointment}
      : {
          startTime: slot,
          name: null,
          duration: null,
          status: "AVAILABLE",
        };
  });

  return {
    doctorName: doctor.doctorName,
    schedule: slots,
  };
});
