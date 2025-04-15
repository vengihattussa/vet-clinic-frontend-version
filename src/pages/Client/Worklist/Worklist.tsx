import {Box, Flex, HStack, StackDivider, useDisclosure, VStack} from "@chakra-ui/react";
import FormSelect from "@src/common/Form/Select";
import SectionLayout from "@src/layout/SectionLayout";
import {useForm} from "react-hook-form";
import {AddIcon, EditIcon} from "@src/assets/svgs";
// import {useMasterData} from "@src/hooks/master-data";
import {createColumnHelper} from "@tanstack/react-table";
import CustomTable from "@src/common/CustomTable";

import WorkListAddModal from "./WorklistListAddModal";
import CustomModal from "@src/common/CustomModal";
import {useGetWorklistType} from "@src/services/worklist/queries";
import {useEffect, useState} from "react";
import {useListWorklistDataById} from "@src/services/worklist/mutation";
import {IWorklistTableValues} from "@src/@types/worklist";
import {useSelectedWorklistStore} from "@src/store/worklist/worklist";
import {formatDateToMMDDYY} from "@src/utils/date";

const Worklist = () => {
  const {control, watch} = useForm();
  const {id: rowId, setId: setRowId} = useSelectedWorklistStore();
  const columnHelper = createColumnHelper<IWorklistTableValues>();
  const {
    isOpen: isAddModalOpen,
    onClose: onCloseAddModal,
    onOpen: onOpenAddModal,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onClose: onCloseEditModal,
    onOpen: onOpenEditModal,
  } = useDisclosure();
  const {data: workListDropdownValues} = useGetWorklistType();
  const [workListDropdown, setWorkListDropdown] = useState<Record<string, string>>();
  const [tableData, setTableData] = useState<IWorklistTableValues[]>([]);

  useEffect(() => {
    if (workListDropdownValues) {
      const result = workListDropdownValues.reduce<Record<string, string>>((acc, item) => {
        acc[item.id.toString()] = item.name;
        return acc;
      }, {});
      setWorkListDropdown(result);
    }
  }, [workListDropdownValues]);

  const columns = [
    columnHelper.accessor("id", {header: "S.N"}),
    columnHelper.accessor("clientFirstName", {
      header: "Client",
    }),
    columnHelper.accessor("patientName", {
      header: "Patient",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("createdOn", {
      header: "Added On",
      cell: (info) => formatDateToMMDDYY(info?.row?.original?.createdOn),
      // formatDateToMMDDYY(info?.row?.original?.createdOn),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (info.row?.original?.status === "1" ? "ACTIVE" : "INACTIVE"),
    }),
    columnHelper.accessor("acceptedBy", {
      header: "Accepted By ID",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("acceptedOnDate", {
      header: "Accepted Date",
      cell: (info) => formatDateToMMDDYY(info.row.original.acceptedOnDate),
    }),
    columnHelper.accessor("acceptedOnTime", {
      header: "Accepted TIme",
      cell: (info) => info.renderValue(),
    }),
  ];
  const workTypeId = watch("name");
  const {mutate} = useListWorklistDataById();
  useEffect(() => {
    if (mutate) {
      mutate(
        {workTypeId: workTypeId ?? "1"},
        {
          onSuccess: (data) => {
            setTableData(data?.data as IWorklistTableValues[]);
          },
        },
      );
    }
  }, [mutate, workTypeId]);

  return (
    <Flex direction="column" padding={4}>
      <form>
        <VStack divider={<StackDivider />} align="normal" p={0}>
          <SectionLayout hasHeader={false} contentBg="primary.100" borderColor="border.main">
            <HStack padding={2}>
              {" "}
              <AddIcon onClick={onOpenAddModal} cursor={"pointer"} />
              <EditIcon onClick={onOpenEditModal} cursor="pointer" />
              <Box width="300px">
                <FormSelect
                  control={control}
                  name="name"
                  label="Worklist"
                  options={workListDropdown as unknown as Record<string, string>}
                  labelWidth={"fit-content"}
                />
                {/* <FormSelect
                control={control}
                name="species"
                label="Species"
                options={}
                labelWidth={"fit-content"}
              /> */}
              </Box>
            </HStack>
          </SectionLayout>
        </VStack>
        <SectionLayout hasHeader={false} contentBg="primary.100" borderColor="border.main">
          <CustomTable
            rowId={rowId}
            setRowId={setRowId}
            columns={columns}
            data={tableData ?? tableData ?? []}
            padding={2}
          />
        </SectionLayout>
      </form>

      {isAddModalOpen && (
        <CustomModal
          modalTitle={"ADD WORKLIST"}
          formId="ADD WORKLIST"
          isOpen={isAddModalOpen}
          onClose={onCloseAddModal}
          hasFooter={false}
          size="sm"
        >
          <WorkListAddModal
            mode="add"
            onCloseModal={onCloseAddModal}
            worklistDropdownValues={workListDropdown as unknown as Record<string, string>}
          />
        </CustomModal>
      )}
      {isEditModalOpen && (
        <CustomModal
          modalTitle={"EDIT WORKLIST"}
          formId="EDIT WORKLIST"
          isOpen={isEditModalOpen}
          onClose={onCloseEditModal}
          hasFooter={false}
          size="sm"
        >
          <WorkListAddModal
            worklistDropdownValues={workListDropdown as unknown as Record<string, string>}
            mode="edit"
            onCloseModal={onCloseEditModal}
            rowID={rowId}
          />
        </CustomModal>
      )}
    </Flex>
  );
};
export default Worklist;
