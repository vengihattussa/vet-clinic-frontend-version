import {Box, Button, Grid, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import SectionLayout from "@src/layout/SectionLayout";
import {AppointmentTypeDefaultValues, AppointmentTypeTypeFields} from "@src/@types/SystemTable";
import {AppointmentTypeSchema} from "@src/schema/SystemTable";
import {useAddTableMutation, useUpdateTableMutation} from "@src/services/SystemTable/API/mutation";
import {useGetAllCustomColor, useGetTableById} from "@src/services/SystemTable/API/queries";
import {CustomColor} from "./BlockOffTableForm";
import FormSelectColorBox from "@src/common/Form/SelectColorBox/FormSelectColorBox";

const AppointmentTypeForm = ({
  mode = "add",
  onCloseModal,
  rowID,
}: {
  mode?: "add" | "edit";
  onCloseModal: () => void;
  categoryList?: Record<string, string>;
  rowID?: number | string;
}) => {
  const {data: customColor = []} = useGetAllCustomColor() as {data: CustomColor[]};

  const methods = useForm({
    defaultValues: AppointmentTypeDefaultValues,
    resolver: zodResolver(AppointmentTypeSchema),
  });

  const {control, handleSubmit} = methods;
  const [userId, setUserId] = useState(rowID);
  const {mutate: addTable} = useAddTableMutation(
    "/api/vetClinic/appointmentType/create",
    "/api/vetClinic/appointmentType/list",
  );
  const {mutate: updateTable} = useUpdateTableMutation(
    "/api/vetClinic/appointmentType/update",
    "/api/vetClinic/appointmentType/list",
  );
  const {data: TableData} = useGetTableById(String(userId), "/api/vetClinic/appointmentType/id");

  const submit = (data: AppointmentTypeTypeFields) => {
    const payload = {
      ...data,
    };
    const editPayload = {
      ...data,
      id: rowID?.toString() || "",
    };
    if (mode === "add") {
      addTable(payload, {
        onSuccess: () => {
          setUserId("");
          onCloseModal();
        },
      });
    } else {
      updateTable(editPayload, {
        onSuccess: () => {
          setUserId("");
          onCloseModal();
        },
      });
    }
  };

  useEffect(() => {
    if (TableData && rowID) {
      methods.reset({
        ...TableData,
        id: TableData.id?.toString(),
      });
    }
  }, [TableData]);

  return (
    <Box p={3}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          <SectionLayout hasHeader={false} contentBg="primary.300">
            <Grid templateColumns={{base: "1fr", md: "repeat(1, 1fr)"}} gap={4} p={4}>
              <FormInput
                name="table"
                labelWidth={"120px"}
                disabled
                control={control}
                label="Table"
                value={"Appointment Type Table"}
              />
              <FormInput name="code" labelWidth={"120px"} control={control} label="Code" />
              <FormSelectColorBox
                control={control}
                name="color"
                label="Color"
                options={customColor}
              />
              <FormInput
                name="description"
                labelWidth={"120px"}
                control={control}
                label="Description"
              />
              <FormInput
                name="duration"
                type="number"
                labelWidth={"120px"}
                control={control}
                label="Duration"
              />
            </Grid>
          </SectionLayout>
          <HStack padding={2} justifyContent="center" alignItems={"center"}>
            <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onCloseModal}>
              Cancel
            </Button>
            <Button type="submit" minW={"100px"} borderRadius={"5px"}>
              {mode === "edit" ? "Update" : "OK"}
            </Button>
          </HStack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AppointmentTypeForm;
