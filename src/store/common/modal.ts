import {create} from "zustand";

interface IModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  isTableRowOptionModal: boolean;
  setIsTableRowOptionModal: (value: boolean) => void;
}

export const useModal = create<IModalProps>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (value) => set({isModalOpen: value}),
  isTableRowOptionModal: false,
  setIsTableRowOptionModal: (value) => set({isTableRowOptionModal: value}),
}));
