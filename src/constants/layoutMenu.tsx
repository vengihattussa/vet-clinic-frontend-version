import {menuTitles} from "@src/constants/menuTitles";
import ClientRegistration from "@src/pages/Client/ClientRegistration";
import ClientSelection from "@src/pages/Client/ClientSelection";
import Worklist from "@src/pages/Client/Worklist/Worklist";
import ProblemList from "@src/pages/ProblemList";
import InventoryList from "@src/pages/WorkWith/InventoryList";
import UserAndSecurity from "@src/pages/WorkWith/UserAndSecurity";
import Whiteboard from "@src/pages/WorkWith/Whiteboard";


export const layoutMenu = [
  {
    title: "Clients",
    child: [
      {
        name: "New Client",
        isClickable: true,
        component: <ClientRegistration mode="add" />,
        title: menuTitles.newClient,
      },
      {
        name: "Change Client",
        isClickable: true,
        component: <ClientRegistration mode="edit" />,
        title: menuTitles.changeClient,
      },
      {
        name: "Select Client",
        isClickable: true,
        component: <ClientSelection tabUpdate={true} />,
        title: menuTitles.selectClient,
      },
      {name: "Work List", isClickable: true, component: <Worklist />, title: "WORK LISTS"},
    ],
  },
  {
    title: "Work with",
    child: [
      {
        name: "Appointment",
        isClickable: true,
        component: null,
        onClick: () => {
          localStorage.setItem("isAppointmentOpen", "true");
        },
      },
      {
        name: "Whiteboard",
        isClickable: true,
        component: <Whiteboard />,
        hasFooter: false,
        title: "WHITEBOARD",
        size: "md",
      },
      {
        name: "Change Client",
        isClickable: true,
        component: null,
        title: "NEW CLIENT INFORMATION",
      },
      {
        name: "Diagnostics List",
        isClickable: true,
        component: null,
        title: "DIAGNOSTICS LIST",
        diagnostic: true,
      },
      {name: "Change Client", isClickable: true, component: null, title: "NEW CLIENT INFORMATION"},
      {
        name: "Problem List",
        isClickable: true,
        component: <ProblemList />,
        title: "PROBLEM LIST",
      },
      {
        name: "Inventory List",
        isClickable: true,
        component: <InventoryList />,
        title: "Inventory Lists",
      },
      {
        name: "User and Security",
        isClickable: true,
        component: <UserAndSecurity />,
        title: "USER & SECURITY",
      },
    ],
  },
  {
    title: "Services",
    child: [
      {
        name: "Document Management",
        isClickable: true,
        component: null,
        title: "NEW CLIENT INFORMATION",
      },
      {
        name: "Requisition Management",
        isClickable: true,
        component: null,
        title: "NEW CLIENT INFORMATION",
      },
      {
        name: "Instrument Management",
        isClickable: true,
        component: null,
        title: "NEW CLIENT INFORMATION",
      },
    ],
  },
 
];

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

export const defaultData: Person[] = [
  {
    id: "1",
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    id: "2",
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    id: "3",
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];
