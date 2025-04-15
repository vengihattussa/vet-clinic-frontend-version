import {Box, Button, Grid, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import SectionLayout from "@src/layout/SectionLayout";
import {AllergyTablDefaultValues, AllergyTypeFields} from "@src/@types/SystemTable";
import {AllergySchema} from "@src/schema/SystemTable";
import {useAddTableMutation, useUpdateTableMutation} from "@src/services/SystemTable/API/mutation";
import {useGetTableById} from "@src/services/SystemTable/API/queries";

const AllergyForm = ({
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
    defaultValues: AllergyTablDefaultValues,
    resolver: zodResolver(AllergySchema),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = methods;

  useEffect(() => {
    console.log("Form Errors", errors);
  }, [errors]);

  const [userId, setUserId] = useState(rowID);
  const {mutate: addTable} = useAddTableMutation(
    "/api/vet_clinic/allergy/create",
    "/api/vet_clinic/allergy/list",
  );
  const {mutate: updateTable} = useUpdateTableMutation(
    "/api/vet_clinic/allergy/update",
    "/api/vet_clinic/allergy/list",
  );
  const {data: TableData} = useGetTableById(String(userId), "/api/vet_clinic/allergy/id");

  const submit = (data: AllergyTypeFields) => {
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
        table: TableData.table || "",
        name: TableData.name || "",
        description: TableData.description || "",
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
                value={"Allergy Table"}
              />
              <FormInput name="name" labelWidth={"120px"} control={control} label="Code" />
              <FormInput
                name="description"
                labelWidth={"120px"}
                control={control}
                label="Allergy"
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

export default AllergyForm;
