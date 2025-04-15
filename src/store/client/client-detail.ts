import {IClient} from "@src/services/client/interface";
import {create} from "zustand";

interface IClientDetailProps {
  details: IClient;
  isLoading: boolean;
  setDetails: (data?: IClient) => void;
  setIsLoading: (data: boolean) => void;
}

export const useClientDetailStore = create<IClientDetailProps>((set) => ({
  details: {},
  isLoading: false,
  setDetails: (data?: IClient) => set({details: data}),
  setIsLoading: (data) => set((state) => ({...state, isLoading: data})),
}));
