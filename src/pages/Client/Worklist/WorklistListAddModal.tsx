import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {IWorklistFormValues, worklistDefaultValues} from "@src/@types/worklist";
import ReactDatePickerInput from "@src/common/Form/DatePicker";
import FormInput from "@src/common/Form/Input";
import FormSelect from "@src/common/Form/Select";
import SectionLayout from "@src/layout/SectionLayout";
import {worklistSchema} from "@src/schema/worklistSchema";
import {PatientList} from "@src/services/worklist/interface";
import {
  useAddWorklistMutation,
  useGetPatientListById,
  useUpdateWorklistMutation,
} from "@src/services/worklist/mutation";
import {useGetClientList, useGetWorklistById} from "@src/services/worklist/queries";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

const WorkListAddModal = ({
  rowID,
  mode = "add",
  onCloseModal,
  worklistDropdownValues,
}: {
  rowID?: number | string;
  mode?: "add" | "edit";
  onCloseModal: () => void;
  worklistDropdownValues?: Record<string, string>;
}) => {
  const methods = useForm({
    defaultValues: worklistDefaultValues,
    resolver: zodResolver(worklistSchema),
  });
  const {
    control,
    handleSubmit,
    watch,
    // reset,
    reset,
    // formState: {errors},
  } = methods;
  const {mutate} = useAddWorklistMutation();
  const {mutate: editmutate} = useUpdateWorklistMutation();
  const submit = (data: IWorklistFormValues) => {
    const payload = {...data};
    const editPayload = {...data, id: rowID};

    if (mode === "add") {
      mutate(payload, {
        onSuccess: () => {
          onCloseModal();
        },
      });
    } else {
      editmutate(editPayload, {
        onSuccess: () => {
          onCloseModal();
        },
      });
    }
  };

  const {data: ClientList} = useGetClientList();
  const [clientListValues, setClientListValue] = useState<Record<string, string>>();

  useEffect(() => {
    if (ClientList) {
      const result = ClientList.reduce<Record<string, string>>((acc, item) => {
        const names = [item.firstName, item.lastName];
        acc[item.id.toString()] = names.join(",");
        return acc;
      }, {});
      setClientListValue(result);
    }
  }, [ClientList]);
  const [patientListDropdown, setPatientListDropdown] = useState<Record<string, string>>();

  const {mutate: patientmutate, isPending} = useGetPatientListById();

  useEffect(() => {
    if (watch("clientId") && !isPending) {
      patientmutate(
        {clientId: watch("clientId")},
        {
          onSuccess: (data) => {
            setPatientListDropdown(
              (data?.dataList as PatientList)?.reduce<Record<string, string>>((acc, item) => {
                acc[item.id.toString()] = item.name;
                return acc;
              }, {}),
            );
          },
        },
      );
    }
  }, [watch("clientId")]);

  const statusdropdownValues = {
    "1": "ACTIVE",
    "2": "INACTIVE",
  };
  const {data: worklistById} = useGetWorklistById(rowID as unknown as string);

  useEffect(() => {
    if (worklistById && mode === "edit") {
      reset({
        ...worklistById,
        patientId: worklistById.patientId?.toString(),
        clientId: worklistById.clientId?.toString(),
        workTypeId: worklistById?.workTypeId?.toString(),
        acceptedOnDate: worklistById?.acceptedOnDate
          ? new Date(worklistById.acceptedOnDate)
          : undefined,
        createdOn: worklistById?.createdOn ? new Date(worklistById.createdOn) : undefined,
      });
    }
  }, [worklistById, mode]);

  return (
    <Box p={3}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(submit)}
          id={mode === "add" ? "NEW WORKLIST" : "EDIT WORKLIST"}
        >
          <SectionLayout hasHeader={false} contentBg="primary.100" borderColor="border.main">
            <VStack divider={<StackDivider />} align="normal" p={0} mb={2}>
              <Grid templateColumns="1fr" gap={4} padding={4}>
                <GridItem>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel width="150px" textAlign="left" ml={4}>
                      Worklist
                    </FormLabel>
                    <FormSelect
                      name="workTypeId"
                      control={control}
                      options={worklistDropdownValues as unknown as Record<string, string>}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel width="150px" textAlign="left" ml={4}>
                      Client
                    </FormLabel>
                    <Box display="flex" alignItems="center" width="100%">
                      <FormInput
                        control={control}
                        name="clientId"
                        isReadOnly
                        flex="1"
                        isDisabled={true}
                      />
                      <Box width="8px" />
                      <FormSelect
                        options={clientListValues as unknown as Record<string, string>}
                        control={control}
                        name="clientId"
                      />
                    </Box>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel width="150px" textAlign="left" ml={4}>
                      Patient
                    </FormLabel>
                    <FormSelect
                      name="patientId"
                      control={control}
                      options={(patientListDropdown as unknown as Record<string, string>) ?? []}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel width="150px" textAlign="left" ml={4}>
                      Added On
                    </FormLabel>
                    <ReactDatePickerInput control={control} name="createdOn" />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel width="150px" textAlign="left" ml={4}>
                      Accepted By Id
                    </FormLabel>
                    <FormInput name="acceptedBy" control={control} type={"number"} />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl display="flex" alignItems="center" justifyContent={"center"}>
                    <FormLabel width="150px" textAlign="left" ml={4}>
                      Accepted TOD
                    </FormLabel>
                    <Box display="flex" alignItems="center" width="100%">
                      <ReactDatePickerInput control={control} name="acceptedOnDate" />
                      <Box width="8px" />
                      <FormInput
                        type="time"
                        control={control}
                        name="acceptedOnTime"
                        maxLength={10}
                        flex="1"
                      />
                    </Box>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel width="150px" textAlign="left" ml={4}>
                      Status
                    </FormLabel>
                    <FormSelect name="status" control={control} options={statusdropdownValues} />
                  </FormControl>
                </GridItem>
              </Grid>
            </VStack>
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
    </Box>
  );
};
export default WorkListAddModal;
