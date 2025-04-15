import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

interface ISelectedDiagnosesState {
  id: string | number;
  setId: (id: string | number) => void;
  getId: () => string | number;
}

export const useSelectedDiagnosesStore = create<ISelectedDiagnosesState>()(
  persist(
    (set, get) => ({
      id: "1",
      setId: (id) => set({id}),
      getId: () => get().id,
    }),
    {
      name: "selectedDiagnosesId",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
