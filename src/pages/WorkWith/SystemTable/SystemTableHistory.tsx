import {Box} from "@chakra-ui/react";
import CustomTable from "@src/common/CustomTable";
import {createColumnHelper} from "@tanstack/react-table";
import {useState} from "react";

const SystemTableHistory = () => {
  const columnHelper = createColumnHelper<any>();
  const [rowID, setRowID] = useState<number | string>();
  // const [userTableData, setUserTableData] = useState<[] | undefined>();

  const columns = [
    columnHelper.accessor("dateAndTime", {header: "Date Time"}),
    columnHelper.accessor("user", {header: "User"}),
    columnHelper.accessor("description", {header: "description"}),
  ];
  return (
    <Box p={3}>
      <CustomTable
        columns={columns}
        rowId={rowID}
        setRowId={setRowID}
        data={[]}
        bgColor="primary.400"
        headerColor="gray"
        height="300px"
      />
    </Box>
  );
};
export default SystemTableHistory;
