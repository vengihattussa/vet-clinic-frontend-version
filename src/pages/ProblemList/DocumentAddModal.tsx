import {Button, Grid, GridItem, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {documentDefaultValues, ProblemListDocumentValues} from "@src/@types/problemList";
import FileUpload from "@src/common/FileUpload";
import FormSelect from "@src/common/Form/Select";
import {useMasterDataPatient} from "@src/hooks/master-data-patient";
import SectionLayout from "@src/layout/SectionLayout";
import {documentSchema} from "@src/schema/problemList";
import {useAddDocumentMuation, useUpdateDocumentMutation} from "@src/services/problemLIst/mutation";
import {useGetDocumentById} from "@src/services/problemLIst/queries";
import {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";

const DocumentAddModal = ({
  mode,
  problemId,
  rowID,
  onDocumentClose,
}: {
  mode: string;
  problemId: number;
  rowID: number | string;
  onDocumentClose: () => void;
}) => {
  const methods = useForm({
    defaultValues: documentDefaultValues,
    resolver: zodResolver(documentSchema),
  });

  const {control, handleSubmit, reset} = methods;
  const {species} = useMasterDataPatient();
  const {mutate: addDocument} = useAddDocumentMuation();
  const {mutate: updateDocument} = useUpdateDocumentMutation();
  const submit = (data: ProblemListDocumentValues) => {
    const payload = {...data, problemId: problemId};
    const editPayload = {...data, id: rowID, problemId: problemId};
    if (mode === "Add") {
      addDocument(payload);
      onDocumentClose();
    } else {
      updateDocument(editPayload);
      onDocumentClose();
    }
  };
  const {data: documentById} = useGetDocumentById(rowID as unknown as string);
  useEffect(() => {
    if (!documentById) return;
    if (rowID && mode === "Edit") {
      reset({
        ...documentDefaultValues,
        doc: new File([""], documentById.docsPath || "", {
          type: "image/*",
        }),
      });
    }
  }, [JSON.stringify(documentById), rowID, mode]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        <SectionLayout
          hasHeader={false}
          contentBg="primary.100"
          borderColor="border.main"
          margin={2}
        >
          <Grid templateColumns="repeat(1,1fr)" p={4} gap={4}>
            <GridItem>
              <FormSelect options={species} name="docsDesc" control={control} label="Species" />
            </GridItem>
            <GridItem>
              <FileUpload control={control} name="doc" label="Document" />
            </GridItem>
          </Grid>
          <HStack m={2} justifyContent={"center"}>
            <Button bg="white" textColor={"black"} p={4}>
              Life Line Search
            </Button>
          </HStack>
          <HStack padding={2} justifyContent="center" alignItems={"center"}>
            <Button variant={"outline"} mr={3} borderRadius={"5px"}>
              Cancel{" "}
            </Button>
            <Button type="submit" minW={"100px"} borderRadius={"5px"}>
              {mode === "Edit" ? "Update" : "OK"}
            </Button>
          </HStack>
        </SectionLayout>
      </form>
    </FormProvider>
  );
};
export default DocumentAddModal;
