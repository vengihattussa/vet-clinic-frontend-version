import {Dispatch, SetStateAction} from "react";

export type IClientData = {
  id: string | number;
  firstName: string;
  lastName: string;
  relationshipName: string;
  address: string;
  phoneNo: string;
};

export type IClientTableData = {
  clientData: IClientData[];
  id?: string;
  onClose?: () => void;
  tabUpdate?: boolean;
  setSelectedClientDetail?: Dispatch<SetStateAction<{id: string; name: string}>>;
};
