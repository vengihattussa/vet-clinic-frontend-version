// import {create} from "zustand";
// import {persist, createJSONStorage} from "zustand/middleware";

// interface ISelectedPatientState {
//   id: string | number;
//   clientId: string | number;
//   setId: (id: string | number) => void;
//   getId: () => string | number;
// }

// export const useSelectedPatientStore = create<ISelectedPatientState>()(
//   persist(
//     (set, get) => ({
//       id: "1",
//       clientId: "1",
//       setId: (id) => set({id}),
//       getId: () => get().id,
//     }),
//     {
//       name: "selectedPatientId",
//       storage: createJSONStorage(() => localStorage),
//     },
//   ),
// );

import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

interface ISelectedPatientState {
  id: string | number;
  clientId: string | number;
  setId: (id: string | number) => void;
  getId: () => string | number;
  setClientId: (clientId: string | number) => void;
  getClientId: () => string | number;
}

export const useSelectedPatientStore = create<ISelectedPatientState>()(
  persist(
    (set, get) => ({
      id: "1",
      clientId: "1",
      setId: (id) => set({id}),
      getId: () => get().id,
      setClientId: (clientId) => set({clientId}),
      getClientId: () => get().clientId,
    }),
    {
      name: "selectedPatientId",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
