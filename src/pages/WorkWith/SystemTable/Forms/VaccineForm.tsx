import {Box, Button, Grid, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import SectionLayout from "@src/layout/SectionLayout";
import {VaccineDefaultValues, VaccineTypeFields} from "@src/@types/SystemTable";
import {VaccineSchema} from "@src/schema/SystemTable";
import {useAddTableMutation, useUpdateTableMutation} from "@src/services/SystemTable/API/mutation";
import {useGetTableById} from "@src/services/SystemTable/API/queries";

const VaccineForm = ({
  mode = "add",
  onCloseModal,
  rowID,
}: {
  mode?: "add" | "edit";
  onCloseModal: () => void;
  categoryList?: Record<string, string>;
  rowID?: number | string;
}) => {
  const methods = useForm({
    defaultValues: VaccineDefaultValues,
    resolver: zodResolver(VaccineSchema),
  });

  const {control, handleSubmit} = methods;
  const [userId, setUserId] = useState(rowID);
  const {mutate: addTable} = useAddTableMutation(
    "/api/vet_clinic/Vaccine/addVaccine",
    "/api/vet_clinic/Vaccine/getAllVaccines",
  );
  const {mutate: updateTable} = useUpdateTableMutation(
    "/api/vet_clinic/Vaccine/updateVaccine",
    "/api/vet_clinic/Vaccine/getAllVaccines",
  );
  const {data: TableData} = useGetTableById(
    String(userId),
    "/api/vet_clinic/Vaccine/getVaccineById",
  );

  const submit = (data: VaccineTypeFields) => {
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
                value={"Vaccine Table"}
              />
              <FormInput name="vaccine" labelWidth={"120px"} control={control} label="Vaccine" />
              <FormInput name="serial" labelWidth={"120px"} control={control} label="Serial" />
              <FormInput name="serial" labelWidth={"120px"} control={control} label="Serial" />
              <FormInput
                name="expiration"
                labelWidth={"120px"}
                control={control}
                label="expiration"
              />
              <FormInput
                name="manufacturer"
                labelWidth={"120px"}
                control={control}
                label="manufacturer"
              />
              <FormInput name="virus" labelWidth={"120px"} control={control} label="virus" />
              <FormInput
                name="administered"
                labelWidth={"120px"}
                control={control}
                label="administered"
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

export default VaccineForm;
