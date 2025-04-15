import {Button, Grid, GridItem, HStack, StackDivider, VStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {problemListDefultValues, ProblemListModalValues} from "@src/@types/problemList";
import FormInput from "@src/common/Form/Input";
import FormSelect from "@src/common/Form/Select";
import {useMasterDataPatient} from "@src/hooks/master-data-patient";
import {problemListSchema} from "@src/schema/problemList";
import {useAddProblemMutation, useUpdateProblemMutation} from "@src/services/problemLIst/mutation";
import {useGetByProblemById} from "@src/services/problemLIst/queries";
import {useEffect} from "react";

import {FormProvider, useForm} from "react-hook-form";
const labelWidth = "120px";

const ProblemListInput = ({
  problemListData,
  mode,
  rowID,
  onClose,
}: {
  problemListData: Record<string, string>;
  mode: string;
  rowID: number | string;
  onClose: () => void;
}) => {
  const methods = useForm({
    defaultValues: problemListDefultValues,
    resolver: zodResolver(problemListSchema),
  });
  const {control, handleSubmit} = methods;

  const {species, codes} = useMasterDataPatient();
  const {mutate: addProblem} = useAddProblemMutation();
  const {mutate: updateProblem} = useUpdateProblemMutation();

  const submit = (data: ProblemListModalValues) => {
    const payload = {...data};
    const updatePayload = {...data, id: rowID};
    if (mode === "Add") {
      addProblem(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      updateProblem(updatePayload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const {data: problemData} = useGetByProblemById(rowID as string);

  useEffect(() => {
    if (problemData && rowID && mode === "Edit") {
      methods.reset({
        ...problemData,
        description: problemData?.description,
        problemCategoryId: problemData.problemCategoryId?.toString(),
        // whiteBoard: problemData?.?.toString(),
        actioncode: problemData?.code?.toString(),
        speciesId: problemData?.speciesId?.toString(),
      });
    }
  }, [problemData, mode]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          <VStack divider={<StackDivider />} align="normal" p={0} mb={2}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} p={2}>
              {/* Category */}
              <GridItem>
                <FormSelect
                  name="problemCategoryId"
                  control={control}
                  label="Category"
                  labelWidth={labelWidth}
                  options={problemListData}
                />
              </GridItem>

              {/* Code */}
              <GridItem rowStart={2}>
                <FormInput name="code" control={control} label="Code" labelWidth={labelWidth} />
              </GridItem>

              {/* Description */}
              <GridItem rowStart={3}>
                <FormInput
                  name="description"
                  control={control}
                  label="Description"
                  labelWidth={labelWidth}
                />
              </GridItem>

              {/* Action Codes */}
              <GridItem rowStart={4}>
                <FormSelect
                  name="actioncode"
                  control={control}
                  label=" Action Code"
                  options={codes}
                  labelWidth={labelWidth}
                />
              </GridItem>

              {/* Species */}
              <GridItem rowStart={5}>
                <FormSelect
                  name="speciesId"
                  control={control}
                  label=" Species"
                  options={species}
                  labelWidth={labelWidth}
                />{" "}
              </GridItem>

              {/* <GridItem rowStart={5} gridColumnStart={2}>
                <FormSelect
                  name="speciesId"
                  control={control}
                  label=" Species"
                  options={species}
                  labelWidth={labelWidth}
                />
              </GridItem> */}

              {/* Whiteboard */}
              <GridItem rowStart={6}>
                <FormInput
                  name="whiteBoard"
                  control={control}
                  label=" Whiteboard"
                  labelWidth={labelWidth}
                />
              </GridItem>

              {/* Company */}
              {/* <GridItem rowStart={7}>
                <FormInput name="name" control={control} label=" Company" labelWidth={labelWidth} />
              </GridItem> */}
            </Grid>
          </VStack>
          <HStack padding={2} justifyContent="center" alignItems={"center"}>
            <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onClose}>
              Cancel{" "}
            </Button>
            <Button type="submit" minW={"100px"} borderRadius={"5px"}>
              {mode === "Edit" ? "Update" : "OK"}
            </Button>
          </HStack>
        </form>
      </FormProvider>
    </>
  );
};
export default ProblemListInput;
