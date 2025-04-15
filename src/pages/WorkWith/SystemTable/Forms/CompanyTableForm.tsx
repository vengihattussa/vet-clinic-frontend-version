import {Box, Button, Grid, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import SectionLayout from "@src/layout/SectionLayout";
import {CompanyDefaultValues, CompanyTypeFields} from "@src/@types/SystemTable";
import {CompanySchema} from "@src/schema/SystemTable";
import {useAddTableMutation, useUpdateTableMutation} from "@src/services/SystemTable/API/mutation";
import {useGetAllCustomColor, useGetTableById} from "@src/services/SystemTable/API/queries";
import FormSelectColorBox from "@src/common/Form/SelectColorBox/FormSelectColorBox";
import {CustomColor} from "./BlockOffTableForm";

const CompanyTableForm = ({
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
    defaultValues: CompanyDefaultValues,
    resolver: zodResolver(CompanySchema),
  });

  const {control, handleSubmit} = methods;
  const [userId, setUserId] = useState(rowID);
  const {mutate: addTable} = useAddTableMutation(
    "/api/vetClinic/company/addCompany",
    "/api/vetClinic/company/getAllCompanies",
  );
  const {mutate: updateTable} = useUpdateTableMutation(
    "/api/vetClinic/company/updateCompanyById",
    "/api/vetClinic/company/getAllCompanies",
  );
  const {data: TableData} = useGetTableById(
    String(userId),
    "/api/vetClinic/company/getCompanyById",
  );

  const submit = (data: CompanyTypeFields) => {
    const normalizedColorDto = {id: data.colorDto, code: data.colorDto};
    const payload = {
      ...data,
      colorDto: normalizedColorDto,
    };
    const editPayload = {
      ...data,
      id: rowID?.toString() || "",
      colorDto: normalizedColorDto,
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
        <form onSubmit={handleSubmit(submit, (errors) => console.log("Form Errors:", errors))}>
          <SectionLayout hasHeader={false} contentBg="primary.300">
            <Grid templateColumns={{base: "1fr", md: "repeat(1, 1fr)"}} gap={4} p={4}>
              <FormInput
                name="table"
                labelWidth={"120px"}
                disabled
                control={control}
                label="Table"
                value={"Company Table"}
              />
              <FormInput name="code" labelWidth={"120px"} control={control} label="Code" />
              <FormInput
                name="companyName"
                labelWidth={"120px"}
                control={control}
                label="Company"
              />
              <FormInput name="phone" labelWidth={"120px"} control={control} label="Phone" />
              <FormSelectColorBox
                control={control}
                name="colorDto"
                label="Color"
                options={customColor}
              />
              <FormInput
                name="leftMargin"
                labelWidth={"120px"}
                control={control}
                label="Left Margin"
                type="number"
              />
              <FormInput
                name="topMargin"
                labelWidth={"120px"}
                control={control}
                label="Top Margin"
                type="number"
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

export default CompanyTableForm;
