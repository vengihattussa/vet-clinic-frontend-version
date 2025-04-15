import {Box, Button, HStack, Stack, Text} from "@chakra-ui/react";
import CustomCheckbox from "@src/common/CustomCheckbox";
import CustomTable from "@src/common/CustomTable";
import FormInput from "@src/common/Form/Input";
import FormSelect from "@src/common/Form/Select";
import {GenericColType} from "@src/pages/PatientAttachments/MedicalCondition";
import {createColumnHelper} from "@tanstack/react-table";
import {FormProvider, useForm} from "react-hook-form";

const Appointments = () => {
  const columnHelper = createColumnHelper<GenericColType>();

  const columns = [
    columnHelper.accessor("client", {header: "Client"}),
    columnHelper.accessor("client", {header: "Patient"}),
    columnHelper.accessor("client", {header: "Date"}),
    columnHelper.accessor("client", {header: "Time"}),
    columnHelper.accessor("client", {header: "Appointment Type"}),
  ];
  const methods = useForm();
  const {control} = methods;
  return (
    <Stack p={2}>
      <FormProvider {...methods}>
        <form>
          <Stack gap={3} w={"100%"}>
            <HStack w={"fit-content"}>
              <FormInput type="date" control={control} name="from" label="From" width={"200px"} />
              <FormInput type="date" control={control} name="to" label="To" width={"200px"} />
              <HStack>
                <CustomCheckbox isChecked size={20} />
                <Text variant={"primary_600"} whiteSpace={"nowrap"}>
                  Show Ghosts
                </Text>
              </HStack>
            </HStack>
            <FormSelect
              control={control}
              name="doctors"
              label="Doctors"
              options={{"1": "Consolidate"}}
              width="300px"
            />
            <Box>
              <CustomTable columns={columns} data={[]} />
            </Box>
            <HStack justifyContent={"center"}>
              <Button type="submit">Done</Button>
            </HStack>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default Appointments;
