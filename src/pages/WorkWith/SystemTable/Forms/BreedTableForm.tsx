import {Box, Button, Grid, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import SectionLayout from "@src/layout/SectionLayout";
import {BreedDefaultValues, BreedTypeFields} from "@src/@types/SystemTable";
import {BreedSchema} from "@src/schema/SystemTable";
import {useAddTableMutation, useUpdateTableMutation} from "@src/services/SystemTable/API/mutation";
import {useGetTableById} from "@src/services/SystemTable/API/queries";
import FormSelect from "@src/common/Form/Select";
import {useMasterDataPatient} from "@src/hooks/master-data-patient";

const BreedTableForm = ({
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
    defaultValues: BreedDefaultValues,
    resolver: zodResolver(BreedSchema),
  });

  const {control, handleSubmit} = methods;
  const [userId, setUserId] = useState(rowID);
  const {mutate: addTable} = useAddTableMutation(
    "/api/vetClinic/breed/create",
    "/api/vetClinic/breed/list",
  );
  const {mutate: updateTable} = useUpdateTableMutation(
    "/api/vetClinic/breed/update",
    "/api/vetClinic/breed/list",
  );
  const {data: TableData} = useGetTableById(String(userId), "/api/vetClinic/breed/id");

  const submit = (data: BreedTypeFields) => {
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
  const {species} = useMasterDataPatient();

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
                value={"Breed Table"}
              />
              <FormInput name="code" labelWidth={"120px"} control={control} label="Code" />
              <FormInput name="name" labelWidth={"120px"} control={control} label="Breed" />
              <FormInput name="type" labelWidth={"120px"} control={control} label="Type" />
              <FormSelect
                control={control}
                placeholder="Select Species"
                labelWidth={"130px"}
                name="species"
                options={species}
                label="Species"
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

export default BreedTableForm;
