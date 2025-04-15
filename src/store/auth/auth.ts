import {create} from "zustand";

interface IAuthProps {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const useAuth = create<IAuthProps>((set) => ({
  isAuth: false,
  setIsAuth: (value) => set({isAuth: value}),
}));
