import {Box} from "@chakra-ui/react";
import {createColumnHelper} from "@tanstack/react-table";
import SectionLayout from "@src/layout/SectionLayout";
import CustomTable from "@src/common/CustomTable";
import {IAppointmentData, appointmentData} from "@src/constants/appointment";

const AppointmentList = () => {
  const columnHelper = createColumnHelper<IAppointmentData>();

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: "",
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: "",
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: "",
    }),
  ];
  return (
    <Box>
      <SectionLayout hasHeader={false}>
        <CustomTable
          columns={columns}
          data={appointmentData}
          hasHeader={false}
          showOptions={false}
          bgColor="primary.400"
          height="149px"
        />
      </SectionLayout>
    </Box>
  );
};
export default AppointmentList;
