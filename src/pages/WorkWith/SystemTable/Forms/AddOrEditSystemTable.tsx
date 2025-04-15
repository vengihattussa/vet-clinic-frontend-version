import {Box, Button, Grid, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import SectionLayout from "@src/layout/SectionLayout";
import {
  useAddAbnormalitiesTableMutation,
  useUpdateAbnormalitiesTableMutation,
} from "@src/services/SystemTable/mutation";
import {useGetAbnormalitiesTableById} from "@src/services/SystemTable/queries";
import {AbnormalitiesTablDefaultValues, AbnormalitiesTablTypeFields} from "@src/@types/SystemTable";
import {AbnormalitiesTableSchema} from "@src/schema/SystemTable";

const AddOrEditSystemTable = ({
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
    defaultValues: AbnormalitiesTablDefaultValues,
    resolver: zodResolver(AbnormalitiesTableSchema),
  });

  const {control, handleSubmit} = methods;
  const [userId, setUserId] = useState(rowID);
  const {mutate} = useAddAbnormalitiesTableMutation();
  const {mutate: updateAbnormalitiesTable} = useUpdateAbnormalitiesTableMutation();
  const {data: AbnormalitiesTableData} = useGetAbnormalitiesTableById(String(userId));

  const submit = (data: AbnormalitiesTablTypeFields) => {
    const payload = {
      ...data,
      id: "",
    };
    const editPayload = {
      ...data,
      id: rowID?.toString() || "",
    };
    if (mode === "add") {
      mutate(payload, {
        onSuccess: () => {
          setUserId("");
          onCloseModal();
        },
      });
    } else {
      updateAbnormalitiesTable(editPayload, {
        onSuccess: () => {
          setUserId("");
          onCloseModal();
        },
      });
    }
  };

  useEffect(() => {
    if (AbnormalitiesTableData && rowID) {
      methods.reset({
        ...AbnormalitiesTableData,
        id: AbnormalitiesTableData.id?.toString(),
        table: AbnormalitiesTableData.table?.toString(),
        code: AbnormalitiesTableData?.code,
        abnormality: AbnormalitiesTableData?.abnormality,
        normal: AbnormalitiesTableData?.normal?.toString(),
        notExamined: AbnormalitiesTableData?.notExamined?.toString(),
      });
    }
  }, [AbnormalitiesTableData]);

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
                value={"Abnormality Table"}
              />
              <FormInput name="code" labelWidth={"120px"} control={control} label="Code" />
              <FormInput
                name="abnormality"
                labelWidth={"120px"}
                control={control}
                label="Abnormality"
              />
              <FormInput name="normal" labelWidth={"120px"} control={control} label="normal" />
              <FormInput
                name="notExamined"
                labelWidth={"120px"}
                control={control}
                label="Not Examined"
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

export default AddOrEditSystemTable;
