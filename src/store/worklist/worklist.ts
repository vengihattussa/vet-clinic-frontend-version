import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

interface ISelectedWorklist {
  id: string | number;
  setId: (id: string | number) => void;
  getId: () => string | number;
}

export const useSelectedWorklistStore = create<ISelectedWorklist>()(
  persist(
    (set, get) => ({
      id: "1",
      setId: (id) => set({id}),
      getId: () => get().id,
    }),
    {
      name: "selectedPatientId",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
