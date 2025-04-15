import {createColumnHelper} from "@tanstack/react-table";
import {dummyDiagnosesData, IDiagnosesData} from "@src/constants/chronologicalData";
import CustomTable, {IChild} from "@src/common/CustomTable";
import {useSelectedPatientStore} from "@src/store/index";
import {ReactNode, useEffect, useState} from "react";
import {useDisclosure} from "@chakra-ui/react";
import HelpCustomModal from "@src/common/CustomModal/HelpModal";
import {useListMedicalHistory} from "@src/services/medicalHistory/mutation";
import {useSelectedDiagnosesStore} from "@src/store/diagnoses/diagnoses";
import AddMedicalHistory from "@src/pages/Diagonistics/MedicalHistory/AddMedicalHistory";
import DoctorInstructions from "@src/pages/Diagonistics/MedicalHistory/DoctorInstruction";
import {useClientDetailStore} from "@src/store/client/client-detail";

interface Iprops {
  component: ReactNode | null;
  title: string;
  hasSmallerSize?: boolean;
  hasNoFooter?: boolean;
}

const data = dummyDiagnosesData;
const PublicHistory = () => {
  const columnHelper = createColumnHelper<IDiagnosesData>();
  const {id: patientId} = useSelectedPatientStore();
  const {clientId: clientId} = useSelectedPatientStore();

  const {id: diagnosesId, setId: setDiagnosesId} = useSelectedDiagnosesStore();

  const [isSingle, setIsSingle] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState("");

  const [tableData, setTableData] = useState<IDiagnosesData[]>(data);

  const {onOpen, onClose, isOpen} = useDisclosure();
  const {mutate} = useListMedicalHistory();

  const [smallSizeComponent, setSmallSizeComponent] = useState<boolean>(false);

  const [, setHasNoFooter] = useState(false);

  const handleOptionClick = ({component, title, hasSmallerSize, hasNoFooter: bool}: Iprops) => {
    setHasNoFooter(bool!);
    if (component) {
      onOpen();
    }
    setSelectedComponent(component);
    setTitle(title || "");
    setSmallSizeComponent(hasSmallerSize ?? false);
    return;
  };

  const handleClosePopup = () => {
    onClose();
    setSelectedComponent(null);
    setHasNoFooter(false);
  };

  useEffect(() => {
    if (patientId) {
      mutate(
        {patientId: patientId, clientId: clientId},
        {
          onSuccess: () => {
            // setTableData(data?.dataList as IDiagnosesData[]);
          },
        },
      );
    }
  }, [setTableData]);

  const {details} = useClientDetailStore();

  const getValue = details?.patientList?.find((val) => val.id === patientId);

  const columns = [
    columnHelper.accessor("recordDate", {
      header: "Date",
      // cell: (info) => formatedDate(info.row.original.recordDate),
      cell: (info) => info.row.original.recordDate,
    }),
    columnHelper.accessor("recordTime", {
      header: () => "Time",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor(
      (row) => {
        if (!row.doctorFirstName && !row.doctorLastName) {
          return "N/A";
        }
        return `${row.doctorFirstName || ""} ${row.doctorLastName || ""}`.trim();
      },
      {
        id: "dr",
        header: () => "Dr.",
      },
    ),
    columnHelper.accessor("type", {
      header: "Type",
    }),
    columnHelper.accessor("code", {
      header: "Code",
    }),
    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.accessor("quantity", {
      header: "Qty",
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
    }),
    columnHelper.accessor(
      (row) => {
        if (!row.createdByFirstName && !row.createdByLastName) {
          return "N/A";
        }
        return `${row.createdByFirstName || ""} ${row.createdByLastName || ""}`.trim();
      },
      {
        id: "by",
        header: () => "By",
      },
    ),
    columnHelper.accessor("photo", {
      header: "Photo",
    }),
    columnHelper.accessor("isPublic", {
      header: "Public",
    }),
  ];

  const diagnostictableRowOption: {
    title: string;
    child: IChild[];
  }[] = [
    {
      title: "Diagnostics",
      child: [
        {
          name: "New",
          isClickable: true,
          component: <AddMedicalHistory />,
          title: `ENTER MEDICAL HISTORY: FOR ${getValue?.name?.toUpperCase()} (AGE:${Number(getValue?.age).toFixed(2)}, SEX:${getValue?.sex}, WEIGHT:${getValue?.weight}) `,
        },
        {
          name: "Change",
          isClickable: true,
          component: <AddMedicalHistory mode="edit" />,
          title: `EDIT MEDICAL HISTORY : FOR ${getValue?.name?.toUpperCase()} (AGE:${Number(getValue?.age).toFixed(2)}, SEX:${getValue?.sex}, WEIGHT:${getValue?.weight}) `,
        },
        {
          name: "Choose",
          isClickable: true,
          component: null,
          title: "CHOOSE",
          subChild: [
            {
              name: "Change",
              isClickable: true,
              component: <AddMedicalHistory mode="edit" />,
              title: `MEDICAL HISTORY : FOR ${getValue?.name?.toUpperCase()} (AGE:${Number(getValue?.age).toFixed(2)}, SEX:${getValue?.sex}, WEIGHT:${getValue?.weight}) `,
            },
          ],
        },
        {
          name: "Doctor's Instruction",
          isClickable: true,
          component: <DoctorInstructions onClose={handleClosePopup} />,
          title: `DOCTOR INSTRUCTION : FOR ${getValue?.name?.toUpperCase()} (AGE:${Number(getValue?.age).toFixed(2)}, SEX:${getValue?.sex}, WEIGHT:${getValue?.weight}) `,
          hasSmallerSize: true,
        },
      ],
    },
  ];

  return (
    <>
      {tableData && (
        <CustomTable
          setRowId={setDiagnosesId}
          setIsSingle={setIsSingle}
          handleOptionClick={handleOptionClick}
          rowId={diagnosesId}
          isSingle={isSingle}
          columns={columns}
          data={tableData ?? []}
          tableRowOption={diagnostictableRowOption}
          height="100%"
        />
      )}

      <HelpCustomModal
        modalTitle={title}
        isOpen={isOpen}
        formId={title}
        onClose={handleClosePopup}
        size={smallSizeComponent ? "md" : "xl"}
        hasFooter={false}
      >
        {selectedComponent}
      </HelpCustomModal>
    </>
  );
};
export default PublicHistory;
