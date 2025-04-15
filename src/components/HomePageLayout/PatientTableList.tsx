import {Box, Button, Center, Text, useDisclosure} from "@chakra-ui/react";
import SectionLayout from "@src/layout/SectionLayout";
import PatientRegistrationForm from "@src/pages/Patient/Registration";
import {IPatientList} from "@src/services/patient/interface";
import {useClientDetailStore} from "@src/store/client/client-detail";
import {useModal, useSelectClientStore} from "@src/store/index";
import {createColumnHelper} from "@tanstack/react-table";
import {ReactNode, useState} from "react";
import CustomModal from "../../common/CustomModal";
import CustomTable from "../../common/CustomTable";
import {useSelectedPatientStore} from "../../store/patient/selectedPatient";
import ChoosePatient from "@src/pages/Patient/ChoosePatient";
//import Test1 from "@src/pages/Attention";
import Notes from "@src/pages/PatientsInformation/Notes";
import AddMedicalHistory from "@src/pages/Diagonistics/MedicalHistory/AddMedicalHistory";

// Updated utility function to handle zero values
export function convertDecimalAge(ageInYears: number): string {
  if (ageInYears === 0) return "";

  const years = Math.floor(ageInYears);
  const remainingMonths = Math.floor((ageInYears - years) * 12);
  const remainingWeeks = Math.floor(((ageInYears - years) * 12 - remainingMonths) * 4.345);
  const remainingDays = Math.floor(
    (((ageInYears - years) * 12 - remainingMonths) * 4.345 - remainingWeeks) * 7
  );

  const ageParts = [];
  if (years > 0) ageParts.push(`${years}y`);
  if (remainingMonths > 0) ageParts.push(`${remainingMonths}m`);
  if (remainingWeeks > 0) ageParts.push(`${remainingWeeks}w`);
  if (remainingDays > 0) ageParts.push(`${remainingDays}d`);

  return ageParts.length > 0 ? ageParts.join(" ") : "";
}

interface Iprops {
  component: ReactNode | null;
  title: string;
  hasSmallerSize?: boolean;
  hasNoFooter?: boolean;
}

const PatientTableList = () => {
  const {id: rowId, setId: setRowId} = useSelectedPatientStore();
  const [isSingle, setIsSingle] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState("");
  const {isTableRowOptionModal, setIsTableRowOptionModal} = useModal();
  const {onOpen, onClose, isOpen} = useDisclosure();
  const {onOpen: onOpenNew, onClose: onCloseNew, isOpen: isOpenNew} = useDisclosure();
  const {id} = useSelectedPatientStore();
  const {details} = useClientDetailStore();
  const [smallSizeComponent, setSmallSizeComponent] = useState<boolean>(false);
  const [hasNoFooter, setHasNoFooter] = useState(false);

  const handleOptionClick = ({title, hasSmallerSize, component, hasNoFooter: bool}: Iprops) => {
    setTitle(title || "");
    setHasNoFooter(bool!);
    setIsTableRowOptionModal(true);
    setSelectedComponent(component);
    setSmallSizeComponent(hasSmallerSize ?? false);
  };

  const handleClosePopup = () => {
    onClose();
    setIsTableRowOptionModal(false);
    setSelectedComponent(null);
    setHasNoFooter(false);
  };

  const getValue = details?.patientList?.find((val) => val.id === id);
  const columnHelper = createColumnHelper<IPatientList>();

  const {clients} = useSelectClientStore();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("species", {
      header: () => "Species",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("sex", {
      header: () => "Sex",
      cell: (info) => {
        return info?.row?.original?.sex;
      },
    }),
    columnHelper.accessor("codes", {
      header: "Codes",
    }),
    columnHelper.accessor("age", {
      header: "Age",
    }),
    columnHelper.accessor("weight", {
      header: "Weight",
      cell: (info) => `${info.getValue()} ${info.row.original.weightUnit || ''}`,
    }),
    
    columnHelper.accessor("rabies", {
      header: "Rabies",
    }),
    columnHelper.accessor("breed", {
      header: "Breed",
    }),
  ];

  const tableRowOption = [
    {
      title: "Clients",
      child: [
        {
          name: "New",
          isClickable: true,
          component: <PatientRegistrationForm />,
          title: "NEW PATIENT",
          hasSmallerSize: true,
        },
        {
          name: "Change",
          isClickable: true,
          component: <PatientRegistrationForm mode="edit" />,
          title: "EDIT PATIENT",
          hasSmallerSize: true,
        },
        {
          name: "Choose",
          isClickable: true,
          component: <ChoosePatient />,
          title: "CHOOSE PATIENT",
        },
        {
          name: "Notes",
          isClickable: true,
          component: <Notes onClose={handleClosePopup} />,
          title: `Notes for ${getValue?.name}`,
          hasSmallerSize: true,
          hasNoFooter: true,
        },
        {
          name: "Post (Create Invoice)",
          isClickable: true,
          component:"",
          title: "NEW CLIENT INFORMATION",
        },
        {
          name: "History",
          isClickable: true,
          component: <AddMedicalHistory onClose={handleClosePopup} />,
          title: "ENTER MEDICAL HISTORY",
          hasNoFooter: true,
        },
      ],
    },
  ];

  return (
    <SectionLayout
      borderColor="border.main"
      headerBackground="primary.300"
      contentBg="primary.100"
      mainTitle={`PATIENT : ${getValue?.name?.toUpperCase() || "No patient"}`}
      rightContent="NO.28851"
    >
      {details?.patientList && details?.patientList?.length > 0 ? (
        <CustomTable
          setRowId={setRowId}
          setIsSingle={setIsSingle}
          handleOptionClick={handleOptionClick}
          onOpen={onOpen}
          rowId={rowId}
          isSingle={isSingle}
          columns={columns}
          data={
            details?.patientList?.map((item) => ({
              ...item,
              age: convertDecimalAge(Number(item.age)),
              weight: Number(item?.weight).toFixed(2),
            })) || []
          }
          tableRowOption={tableRowOption}
          height={"160px"}
        />
      ) : (
        <Box>
          <Center h={"160px"}>
            {!clients.length ? (
              <Text>Add a Client first</Text>
            ) : (
              <Button onClick={onOpenNew}>Add New Patient</Button>
            )}
          </Center>
          <CustomModal
            modalTitle={`NEW PATIENT`}
            isOpen={isOpenNew}
            formId={"NEW PATIENT"}
            onClose={onCloseNew}
            hasFooter={!hasNoFooter}
            size="xl"
          >
            <PatientRegistrationForm />
          </CustomModal>
        </Box>
      )}

      {!isSingle && (
        <CustomModal
          modalTitle={"EDIT PATIENT"}
          formId="EDIT PATIENT"
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
        >
          <PatientRegistrationForm mode="edit" />
        </CustomModal>
      )}

      {isTableRowOptionModal && (
        <CustomModal
          modalTitle={title}
          isOpen={isTableRowOptionModal}
          formId={title}
          onClose={handleClosePopup}
          hasFooter={!hasNoFooter}
          size={smallSizeComponent ? "md" : "xl"}
        >
          {selectedComponent}
        </CustomModal>
      )}
    </SectionLayout>
  );
};
export default PatientTableList;