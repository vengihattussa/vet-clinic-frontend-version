import {Button, Grid, HStack, Stack} from "@chakra-ui/react";
import FormInput from "@src/common/Form/Input";
import SectionLayout from "@src/layout/SectionLayout";
import {IMedicalConditionPlan} from "@src/services/medicalCondition/plan/interface";
import {useAddPlanMutation} from "@src/services/medicalCondition/plan/mutation";
import {FormProvider, useForm} from "react-hook-form";

const defaultValues = {
  code: "",
  description: "",
  quantity: 0,
  repeat: 0,
  price: 0,
  type: "DIAGNOSTICS",
};

const AddOrEditPlan = ({
  mode = "add",
  onCloseModal,
  rowId,
}: {
  mode?: "add" | "edit";
  onCloseModal: () => void;
  categoryList?: Record<string, string>;
  rowId?: number | string;
}) => {
  const methods = useForm({
    defaultValues,
  });
  const {control, handleSubmit} = methods;
  const {mutate: addPlan} = useAddPlanMutation();
  const {mutate: updatePlan} = useAddPlanMutation();

  const onSubmit = (data: IMedicalConditionPlan) => {
    const payload = {...data};
    const editPayload = {...data, id: rowId};
    if (mode === "add") {
      addPlan(payload);
      onCloseModal();
    } else {
      updatePlan(editPayload);
      onCloseModal();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionLayout hasHeader={false} contentBg="transparent" contentPadding={2} margin={4}>
          <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={4} p={4}>
            <Stack>
              <FormInput name="code" control={control} label="Code" />
              <FormInput name="description" control={control} label="Description" />
            </Stack>
            <Stack>
              <FormInput name="quantity" control={control} label="Quality" />
              <FormInput name="repeat" control={control} label="Repeat No." />
            </Stack>
            <Stack gap={2}>
              <FormInput name="price" control={control} label="Price" type="number" />
              <FormInput name="type" control={control} label="Type" />
            </Stack>
          </Grid>
        </SectionLayout>
        <HStack padding={2} justifyContent="center" alignItems={"center"}>
          <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onCloseModal}>
            Cancel{" "}
          </Button>
          <Button type="submit" minW={"100px"} borderRadius={"5px"}>
            {mode === "edit" ? "Update" : "OK"}
          </Button>
        </HStack>
      </form>
    </FormProvider>
  );
};

export default AddOrEditPlan;
