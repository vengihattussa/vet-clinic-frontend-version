import {Box, HStack, Stack, Text, useDisclosure} from "@chakra-ui/react";
import {AddIcon, EditIcon} from "@src/assets/svgs";
import CustomCheckbox from "@src/common/CustomCheckbox";
import CustomModal from "@src/common/CustomModal";
import CustomTable from "@src/common/CustomTable";
import FormSelect from "@src/common/Form/Select";
import {GenericColType} from "@src/pages/PatientAttachments/MedicalCondition";
import {createColumnHelper} from "@tanstack/react-table";
import {useForm} from "react-hook-form";
import AddScheduleModal from "./AddScheduleModal";

const Scheduled = () => {
  const columnHelper = createColumnHelper<GenericColType>();

  const column = [
    columnHelper.accessor("client", {header: "Patient"}),
    columnHelper.accessor("client", {header: "Client"}),
    columnHelper.accessor("client", {header: "Start"}),
    columnHelper.accessor("client", {header: "Time"}),
    columnHelper.accessor("client", {header: "Code"}),
    columnHelper.accessor("client", {header: "Description"}),
    columnHelper.accessor("client", {header: "Quantity"}),
    columnHelper.accessor("client", {header: "Use In"}),
  ];

  const methods = useForm();

  const {control} = methods;

  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <Stack p={2}>
      <HStack gap={4} w={"fit-content"}>
        <Box cursor={"pointer"} onClick={onOpen}>
          <AddIcon />
        </Box>
        <Box>
          <EditIcon />
        </Box>
        <FormSelect
          control={control}
          name="user"
          label="User"
          options={{"1": "JDR: J David Reed, DVM"}}
          labelWidth={"40px"}
          width="260px"
        />
        <HStack>
          <CustomCheckbox isChecked size={20} />
          <Text variant="primary_600" whiteSpace={"nowrap"}>
            Show Completed
          </Text>
        </HStack>
        <HStack>
          <CustomCheckbox isChecked size={20} />
          <Text variant="primary_600" whiteSpace={"nowrap"}>
            Today Only
          </Text>
        </HStack>
      </HStack>
      <CustomTable columns={column} data={[]} />

      {isOpen && (
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          modalTitle={"NEW WHITEBOARD ACTIVITY"}
          size="lg"
        >
          <AddScheduleModal />
        </CustomModal>
      )}
    </Stack>
  );
};

export default Scheduled;
