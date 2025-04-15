import {Box, Button, Grid, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import SectionLayout from "@src/layout/SectionLayout";
import {BlockOffTableDefaultValues, BlockOffTableTypeFields} from "@src/@types/SystemTable";
import {BlockOffTableSchema} from "@src/schema/SystemTable";
import {useAddTableMutation, useUpdateTableMutation} from "@src/services/SystemTable/API/mutation";
import {useGetAllCustomColor, useGetTableById} from "@src/services/SystemTable/API/queries";
import FormSelectColorBox from "@src/common/Form/SelectColorBox/FormSelectColorBox";

export type CustomColor = {
  id: number;
  code: string;
};

const BlockOffTableForm = ({
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
    defaultValues: BlockOffTableDefaultValues,
    resolver: zodResolver(BlockOffTableSchema),
  });

  const {control, handleSubmit} = methods;
  const [userId, setUserId] = useState(rowID);
  const {mutate: addTable} = useAddTableMutation(
    "/api/vetClinic/blockOffType/create",
    "/api/vetClinic/blockOffType/list",
  );
  const {mutate: updateTable} = useUpdateTableMutation(
    "/api/vetClinic/blockOffType/update",
    "/api/vetClinic/blockOffType/list",
  );
  const {data: TableData} = useGetTableById(String(userId), "/api/vetClinic/blockOffType/id");
  const {data: customColor = []} = useGetAllCustomColor() as {data: CustomColor[]};

  const submit = (data: BlockOffTableTypeFields) => {
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
          <SectionLayout hasHeader={false} contentPadding={"20px 0px"} contentBg="primary.300">
            <Grid templateColumns={{base: "1fr", md: "repeat(1, 1fr)"}} gap={4} p={4}>
              <FormInput
                name="table"
                labelWidth={"120px"}
                disabled
                control={control}
                label="Table"
                value={"Block Off Table"}
              />
              <FormInput name="code" labelWidth={"120px"} control={control} label="Code" />
              <FormInput
                name="description"
                labelWidth={"120px"}
                control={control}
                label="Description"
              />
              <FormSelectColorBox
                control={control}
                name="color"
                label="Color"
                options={customColor}
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

export default BlockOffTableForm;
