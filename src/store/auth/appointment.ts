import {create} from "zustand";

interface IAppointmentProps {
  isAppointment: boolean;
  setIsAppointment: (value: boolean) => void;
}

export const useAppointment = create<IAppointmentProps>((set) => ({
  isAppointment: localStorage.getItem("isAppointmentOpen") === "true",
  setIsAppointment: (value) => set({isAppointment: value}),
}));
