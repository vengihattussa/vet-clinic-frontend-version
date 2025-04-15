import {Box} from "@chakra-ui/react";
import {useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import {useModal, useSelectedPatientStore} from "@src/store/index";
import {IPatientData} from "@src/constants/patientData";
import SectionLayout from "@src/layout/SectionLayout";
import CustomTable from "@src/common/CustomTable";
import {useClientDetailStore} from "@src/store/client/client-detail";

const ChoosePatient = () => {
  const {id: rowId, setId: setRowId} = useSelectedPatientStore();
  const [isSingle, setIsSingle] = useState(true);
  const {details} = useClientDetailStore();
  const columnHelper = createColumnHelper<IPatientData>();
  const {setIsTableRowOptionModal} = useModal();
  const columns = [
    columnHelper.accessor((row) => `${row.name} - ${row.species} - ${row.age} - ${row.sex}`, {
      id: "fullName",
      header: "",
    }),
  ];

  return (
    <Box m={3}>
      <SectionLayout hasHeader={false} borderColor="border.100" contentBg="primary.500">
        <form onSubmit={() => setIsTableRowOptionModal(false)} id={"CHOOSE PATIENT"}>
          <CustomTable
            setRowId={setRowId}
            setIsSingle={setIsSingle}
            rowId={rowId}
            isSingle={isSingle}
            columns={columns}
            data={details.patientList || []}
            hasHeader={false}
            showOptions={false}
          />
        </form>
      </SectionLayout>
    </Box>
  );
};
export default ChoosePatient;
