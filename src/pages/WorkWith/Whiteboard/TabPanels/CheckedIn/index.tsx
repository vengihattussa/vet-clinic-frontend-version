import {Stack} from "@chakra-ui/react";
import {AddIcon} from "@src/assets/svgs";
import CustomTable from "@src/common/CustomTable";
import {GenericColType} from "@src/pages/PatientAttachments/MedicalCondition";
import {createColumnHelper} from "@tanstack/react-table";

const CheckedIn = () => {
  const columnHelper = createColumnHelper<GenericColType>();

  const column = [
    columnHelper.accessor("client", {header: "Client"}),
    columnHelper.accessor("client", {header: "Patient"}),
    columnHelper.accessor("client", {header: "Unposted"}),
    columnHelper.accessor("client", {header: "In Date"}),
    columnHelper.accessor("client", {header: "In Time"}),
    columnHelper.accessor("client", {header: "Waiting"}),
    columnHelper.accessor("client", {header: "Out Date"}),
    columnHelper.accessor("client", {header: "Out Time"}),
  ];
  return (
    <Stack>
      <AddIcon />
      <CustomTable columns={column} data={[]} />
    </Stack>
  );
};

export default CheckedIn;
