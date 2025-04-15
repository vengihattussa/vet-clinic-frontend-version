import {Box, Button, Grid, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import SectionLayout from "@src/layout/SectionLayout";
import {InsuranceProviderDefaultValues, InsuranceProviderTypeFields} from "@src/@types/SystemTable";
import {InsuranceProviderSchema} from "@src/schema/SystemTable";
import {useAddTableMutation, useUpdateTableMutation} from "@src/services/SystemTable/API/mutation";
import {useGetTableById} from "@src/services/SystemTable/API/queries";

const InsuranceProviderForm = ({
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
    defaultValues: InsuranceProviderDefaultValues,
    resolver: zodResolver(InsuranceProviderSchema),
  });

  const {control, handleSubmit} = methods;
  const [userId, setUserId] = useState(rowID);
  const {mutate: addTable} = useAddTableMutation(
    "/api/vet_clinic/InsuranceProvider/addInsuranceProvider",
    "/api/vet_clinic/InsuranceProvider/getAllInsuranceProvider",
  );
  const {mutate: updateTable} = useUpdateTableMutation(
    "/api/vet_clinic/InsuranceProvider/updateInsuranceProviderById",
    "/api/vet_clinic/InsuranceProvider/addInsuranceProvider",
  );
  const {data: TableData} = useGetTableById(
    String(userId),
    "/api/vet_clinic/InsuranceProvider/getInsuranceProviderById",
  );

  const submit = (data: InsuranceProviderTypeFields) => {
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
        name: TableData.name,
        description: TableData?.description,
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
                value={"Insurance Provider Table"}
              />
              <FormInput name="code" labelWidth={"120px"} control={control} label="code" />
              <FormInput name="name" labelWidth={"120px"} control={control} label="Provider Name" />
              <FormInput name="phone" labelWidth={"120px"} control={control} label="phone" />
              <FormInput name="website" labelWidth={"120px"} control={control} label="website" />
              <FormInput name="name" labelWidth={"120px"} control={control} label="name" />
              <FormInput
                name="vetEnvoyId"
                labelWidth={"120px"}
                control={control}
                label="vetEnvoy Id"
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

export default InsuranceProviderForm;
