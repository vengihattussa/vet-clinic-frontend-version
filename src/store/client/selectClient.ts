import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

interface Client {
  id: string | number;
  name: string;
}

// TODO need to refator this store (cleanup)

interface SelectClientState {
  tab: number;
  clientId: string | number;
  setClientId: (id: string | number) => void;
  getSelectedClientId: () => string | number;
  getClientId: () => string | number;
  setTab: (index: number) => void;
  getCurrentClientId: () => number | string;
  clients: Client[];
  getOne: (id: string | number) => Client | undefined;
  add: (client: Client) => void;
  remove: (index: number) => number;
  setSelectedClientDetail: ({id, name}: Client) => void;
  getSelectedClientDetail: Client;
}

export const useSelectClientStore = create<SelectClientState>()(
  persist(
    (set, get) => ({
      tab: 0,
      setTab: (index) => set({tab: index}),
      getCurrentClientId: () => get()?.clients[get()?.tab]?.id,
      getSelectedClientId: () => get()?.clients[get()?.tab]?.id,
      clients: [],
      getOne: (id) => {
        const client = get()?.clients.find((item) => item.id === id);
        return client;
      },
      getSelectedClientDetail: {
        id: get()?.getSelectedClientDetail?.id,
        name: get()?.getSelectedClientDetail?.name,
      },
      setSelectedClientDetail: ({id, name}) => set({getSelectedClientDetail: {id, name}}),
      add: (client) => {
        const tempClients = get()?.clients || [];
        const clientIndex = tempClients.findIndex((x) => x.id === client.id);

        if (clientIndex !== -1) {
          if (tempClients[clientIndex].name !== client.name) {
            tempClients[clientIndex].name = client.name;
          }
        } else {
          if (tempClients.length >= 10) {
            tempClients.pop();
          }
          tempClients.unshift(client);
        }

        set({clients: tempClients});
      },
      remove: (index) => {
        const tempClients = get()?.clients;
        tempClients.splice(index, 1);
        const tabIndex = index === 0 ? 0 : index - 1;
        set({clients: tempClients, tab: tabIndex});
        return tabIndex;
      },
      clientId: "",
      setClientId: (clientId) => set({clientId}),
      getClientId: () => get().clientId,
    }),

    {
      name: "select-client", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
