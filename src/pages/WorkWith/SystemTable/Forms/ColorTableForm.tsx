import {Box, Button, Grid, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import SectionLayout from "@src/layout/SectionLayout";
import {ColorDefaultValues, ColorTypeFields} from "@src/@types/SystemTable";
import {ColorSchema} from "@src/schema/SystemTable";
import {useAddTableMutation, useUpdateTableMutation} from "@src/services/SystemTable/API/mutation";
import {useGetTableById} from "@src/services/SystemTable/API/queries";
import FormSelect from "@src/common/Form/Select";
import {useMasterDataPatient} from "@src/hooks/master-data-patient";

const ColorTableForm = ({
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
    defaultValues: ColorDefaultValues,
    resolver: zodResolver(ColorSchema),
  });

  const {control, handleSubmit} = methods;
  const [userId, setUserId] = useState(rowID);
  const {mutate: addTable} = useAddTableMutation(
    "/api/vetClinic/color/create",
    "/api/vetClinic/color/list",
  );
  const {mutate: updateTable} = useUpdateTableMutation(
    "/api/vetClinic/color/update",
    "/api/vetClinic/color/list",
  );
  const {data: TableData} = useGetTableById(String(userId), "/api/vetClinic/color/id");

  const submit = (data: ColorTypeFields) => {
    console.log("Clicked");
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
        code: TableData.code || "",
        name: TableData.name || "",
        colorCategory: TableData.colorCategory || "",
        species: Object.entries(species).find(([_, v]) => v === TableData.species)?.[0] || "",
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
                labelWidth={"130px"}
                disabled
                control={control}
                label="Table"
                value={"Color Table"}
              />
              <FormInput name="code" labelWidth={"130px"} control={control} label="Code" />
              <FormInput name="name" labelWidth={"130px"} control={control} label="Color Name" />
              <FormSelect
                name="colorCategory"
                labelWidth={"130px"}
                control={control}
                placeholder="Select Category"
                label="Color Category"
                options={{
                  None: "None",
                  Body: "Body",
                  Eye: "Eye",
                  Hool: "Hool",
                  Mane: "Mane",
                  Sclera: "Sclera",
                  Tail: "Tail",
                }}
              />
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

export default ColorTableForm;
