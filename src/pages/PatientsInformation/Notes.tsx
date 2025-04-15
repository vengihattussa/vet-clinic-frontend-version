import {
  Box,
  Button,
  Grid,
  GridItem,
  // HStack,
  Stack,
  StackDivider,
  // Text,
  VStack,
} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
// import FormCheckbox from "@src/common/Form/Checkbox";
import FormTextArea from "@src/common/Form/TextArea";
import SectionLayout from "@src/layout/SectionLayout";
import {notesSchema} from "@src/schema/notes";
import {ICreateNote} from "@src/services/notes/interface";
import {useAddNotes} from "@src/services/notes/mutation";
import {useGetNotesById} from "@src/services/notes/queries";
import {useModal, useSelectedPatientStore} from "@src/store/index";
import {API_ROUTE} from "@src/services/patientNotes/api";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";

const Notes = ({onClose}: {onClose?: () => void}) => {
  const methods = useForm<ICreateNote>({
    resolver: zodResolver(notesSchema),
  });
  const {control, handleSubmit, reset} = methods;

  const {setIsModalOpen} = useModal();
  const {mutate} = useAddNotes();
  const {id = ""} = useSelectedPatientStore();
  const queryClient = useQueryClient();

  const onSubmit = (data: ICreateNote) => {
    const payload = {...data, patientId: id};
    mutate(payload, {
      onSuccess: () => {
        onClose ? onClose() : setIsModalOpen(false);
        queryClient.invalidateQueries({
          queryKey: [API_ROUTE.GET, id],
        });
      },
    });
  };

  const {data: notesdata} = useGetNotesById(id as unknown as string);
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
                mainTitle="NOTES"
              >
                <VStack divider={<StackDivider />} align="normal" p={0} mb={2}></VStack>
                <Grid templateColumns="repeat(1,1fr)" padding={2}>
                  <GridItem>
                    <FormTextArea control={control} name="notes" label="Notes" isRequired={false} />
                  </GridItem>
                </Grid>
              </SectionLayout>
            </Stack>
            <Stack flex={1} justifyContent={"space-between"}>
              <Stack gap={2}>
                <Button
                  variant={onClose ? "outline" : "outlineBold"}
                  width="100%"
                  borderRadius={"5px"}
                >
                  Help{" "}
                </Button>
                <Button
                  variant={onClose ? "outline" : "outlineBold"}
                  width="100%"
                  borderRadius={"5px"}
                  onClick={() => {
                    onClose ? onClose() : setIsModalOpen(false);
                  }}
                >
                  Cancel{" "}
                </Button>
                <Button
                  variant={onClose ? "solid" : "solidBold"}
                  type="submit"
                  width="100%"
                  borderRadius={"5px"}
                >
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

export default Notes;
