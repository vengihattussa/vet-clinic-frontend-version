import {
  Box,
  Stack,
  StackDivider,
  Button,
  Grid,
  GridItem,
  VStack,
  // Text,
} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormTextArea from "@src/common/Form/TextArea";
import SectionLayout from "@src/layout/SectionLayout";
// import FormCheckbox from "@src/common/Form/Checkbox
import {notesSchema} from "@src/schema/notes";
import {ICreateMedicalNote} from "@src/services/medicalNotes/interface";
import {useAddMedicalNotes} from "@src/services/medicalNotes/mutation";
import {useGetMedicalNotesById} from "@src/services/medicalNotes/queries";
import {API_ROUTE} from "@src/services/notes/api";
import {useSelectedPatientStore} from "@src/store/index";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";

const DoctorInstructions = ({onClose}: {onClose?: () => void}) => {
  const methods = useForm<ICreateMedicalNote>({
    resolver: zodResolver(notesSchema),
  });
  const {control, handleSubmit, reset} = methods;
  const {mutate} = useAddMedicalNotes();
  const {id = ""} = useSelectedPatientStore();
  const queryClient = useQueryClient();
  const onSubmit = (data: ICreateMedicalNote) => {
    const payload = {...data, patientId: id};
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [API_ROUTE.GET_NOTES, id],
        });
        onClose && onClose();
      },
    });
  };

  const {data: notesdata} = useGetMedicalNotesById(id as unknown as string);
  useEffect(() => {
    if (notesdata && notesdata) {
      reset({...notesdata});
    }
  }, [notesdata]);

  return (
    <Box px={4} pb={4}>
      <FormProvider {...methods}>
        <form id={"Add Notes"} onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDir={"row"}>
            <Stack flex={3}>
              <SectionLayout
                hasHeader={false}
                contentBg="background.100"
                borderColor="border.main"
                mainTitle="Doctor's Instructions"
              >
                <VStack divider={<StackDivider />} align="normal" p={0} mb={2}></VStack>
                <Grid templateColumns="repeat(1,1fr)" padding={2}>
                  <GridItem>
                    <FormTextArea name="notes" control={control} label="Instructions" />
                  </GridItem>
                </Grid>
              </SectionLayout>
            </Stack>
            <Stack flex={1} justifyContent={"space-between"}>
              <Stack gap={2}>
                <Button variant="outline" width="100%" borderRadius={"5px"}>
                  Help{" "}
                </Button>
                <Button variant={"outline"} width="100%" borderRadius={"5px"} onClick={onClose}>
                  Cancel{" "}
                </Button>
                <Button type="submit" width="100%" borderRadius={"5px"}>
                  Done{" "}
                </Button>{" "}
              </Stack>
              {/* <Box bg={"background.100"} p={4} minH={"80px"}>
                  <FormCheckbox control={methods.control} name="public" label="Public" />{" "}
                </Box> */}
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default DoctorInstructions;
