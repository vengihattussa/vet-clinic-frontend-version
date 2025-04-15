import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddMedicalHistoryFormValues, medicalHistoryDefaultValues} from "@src/@types/medicalHistory";
import FileUpload from "@src/common/FileUpload";
import FormCheckbox from "@src/common/Form/Checkbox";
import FormInput from "@src/common/Form/Input";
import FormSelect from "@src/common/Form/Select";
import SectionLayout from "@src/layout/SectionLayout";
import {addMedicalHistorySchema} from "@src/schema/medicalHistory";
import {useGetDoctorList} from "@src/services/doctor/queries";
import {useAddMedicalHistory, useUpdateMedicalHistory} from "@src/services/medicalHistory/mutation";
import {useGetAllProblem} from "@src/services/medicalHistory/problem/queries";
// import {useMedicalHistoryById} from "@src/services/medicalHistory/queries";
import {useGetAllSite} from "@src/services/medicalHistory/allSite/queries";
import {PatientList} from "@src/services/worklist/interface";
import {useGetPatientListById} from "@src/services/worklist/mutation";
import {useClientDetailStore} from "@src/store/client/client-detail";
import {useSelectedDiagnosesStore} from "@src/store/diagnoses/diagnoses";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {usegetAllServiceType} from "@src/services/medicalHistory/serviceType/queries";
// import {useGetMasterData} from "@src/services/master-data";
import ReactDatePickerInput from "@src/common/Form/DatePicker";
import {useMedicalHistoryById} from "@src/services/medicalHistory/queries";

const AddMedicalHistory = ({
  mode = "add",
  onClose,
}: {
  mode?: "add" | "edit";
  onClose?: () => void;
}) => {
  const {mutate: add} = useAddMedicalHistory(onClose);
  const {mutate: update} = useUpdateMedicalHistory(onClose);
  const {id = ""} = useSelectedDiagnosesStore();
  const {details} = useClientDetailStore();
  const {data: medicalHistoryData} = useMedicalHistoryById(mode === "edit" ? +id : 0);
  const {data: doctorList} = useGetDoctorList();
  const {data: siteList} = useGetAllSite();
  const {data: problemList} = useGetAllProblem();
  const {data: typeList} = usegetAllServiceType();
  // const {data: masterData} = useGetMasterData();
  const {mutate: patientmutate, isPending} = useGetPatientListById();
  const [patientListDropdown, setPatientListDropdown] = useState<Record<string, string>>();

  const methods = useForm({
    defaultValues: {
      ...medicalHistoryDefaultValues,
      patientId: medicalHistoryDefaultValues.patientId.toString() || "",
      formNo: medicalHistoryDefaultValues.formNo || null,
      isPublic: true,
    },
    resolver: zodResolver(addMedicalHistorySchema),
  });

  const {handleSubmit, control, reset} = methods;

  const submit = (data: AddMedicalHistoryFormValues) => {
    const payload = {...data};
    if (mode === "add") {
      add(payload);
    } else {
      update({...payload, id: +id});
    }
  };

  useEffect(() => {
    if (details?.id && !isPending) {
      patientmutate(
        {clientId: details.id as unknown as string},
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
  }, [details?.id, onClose]);

  useEffect(() => {
    if (medicalHistoryData) {
      reset({
        ...medicalHistoryData,
        // photo: new File([""], (medicalHistoryData?.photo as unknown as string) || "", {
        //   type: "image/*",
        // }),
        // formNo: new File([""], (medicalHistoryData?.formNo as unknown as string) || "", {
        //   type: "image/*",
        // }),
        formNo: medicalHistoryData.formNo || null,
        photo: medicalHistoryData.photo || null,
        xlsFilePath: medicalHistoryData.xlsFilePath || null,
        // xlsFilePath: new File([""], (medicalHistoryData?.xlsFilePath as unknown as string) || "", {
        //   type: "image/*",
        // }),
        doctorId: medicalHistoryData?.doctorId?.toString(),
        typeId: medicalHistoryData?.typeId?.toString(),
        problemId: medicalHistoryData?.problemId?.toString(),
       // variance: medicalHistoryData?.variance?.toString(),
        siteId: medicalHistoryData?.siteId?.toString(),
        admittedId: medicalHistoryData?.admittedId?.toString(),
        zipCode: medicalHistoryData?.zipCode?.toString(),
      });
    }
  }, [medicalHistoryData]);

  const transformedDoctorList = doctorList?.reduce((acc: Record<string, string>, doctor) => {
    acc[doctor.id] = `${doctor.firstName} ${doctor.lastName}`;
    return acc;
  }, {});

  const transformedSiteList = siteList?.reduce((acc: Record<string, string>, site) => {
    acc[site.id] = site.siteNo as unknown as string;
    return acc;
  }, {});

  const transformedProblemList = problemList?.reduce((acc: Record<string, string>, problem) => {
    acc[problem.id] = problem.description as unknown as string;
    return acc;
  }, {});

  const transformedTypeList = typeList?.reduce((acc: Record<string, string>, type) => {
    acc[type.id] = type.description as unknown as string;
    return acc;
  }, {});

  return (
    <Box p={2} w="100%">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(submit)}
          id={mode === "add" ? "ENTER MEDICAL HISTORY" : "CHANGE MEDICAL HISTORY"}
        >
          <Stack gap={4} p={2}>
            <SectionLayout
              hasHeader={false}
              contentBg="primary.100"
              borderColor="border.main"
              contentPadding={"10px"}
            >
              <VStack divider={<StackDivider />} align="normal" p={0} mb={2}>
                <Stack gap={2}>
                  <Grid templateColumns={"repeat(4, 1fr)"} gap={3}>
                    <GridItem>
                      <FormControl display="flex" alignItems="center" gap={2}>
                        <FormLabel
                          minWidth="45px"
                          textAlign="left"
                          mb={0}
                          fontWeight="600"
                          fontSize="sm"
                        >
                          Date
                        </FormLabel>
                        <ReactDatePickerInput
                          control={control}
                          name="recordDate"
                          maxDate={new Date()}
                          label=""
                          isRequired
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="60px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Patient
                        </FormLabel>
                        <FormSelect
                          name="patientId"
                          placeholder="select Patient"
                          control={control}
                          options={(patientListDropdown as unknown as Record<string, string>) ?? []}
                          label=""
                          isRequired
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="40px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Code
                        </FormLabel>
                        <FormInput name="code" control={control} label="" isRequired />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="85px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Description
                        </FormLabel>
                        <FormInput name="description" control={control} label="" isRequired />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <Grid templateColumns={"repeat(6, 1fr)"} gap={3}>
                    <GridItem gap={1}>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="65px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Quantity
                        </FormLabel>
                        <FormInput name="quantity" type="number" control={control} label=""  />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="65px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Amount
                        </FormLabel>
                        <FormInput name="amount" type="number" control={control} label="" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="45px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Photo
                        </FormLabel>
                        <FileUpload control={control} name="photo" label="" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="25px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Co
                        </FormLabel>
                        <FormInput
                          name="co"
                          control={control}
                          label=""
                          //isRequired
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="25px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          At
                        </FormLabel>
                        <FormInput
                          type="time"
                          control={control}
                          name="recordTime"
                          label=""
                          //isRequired
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="40px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Type
                        </FormLabel>
                        <FormSelect
                          name="typeId"
                          placeholder="Select Type"
                          control={control}
                          options={transformedTypeList!}
                          label=""
                          //isRequired
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <Grid templateColumns={"repeat(4, 1fr)"} gap={3}>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="40px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Form
                        </FormLabel>
                        <FileUpload control={control} name="formNo" label="" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="30px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Xls
                        </FormLabel>
                        <FileUpload control={control} name="xlsFilePath" label="" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="65px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Problem
                        </FormLabel>
                        <FormSelect
                          name="problemId"
                          placeholder="Select Problem"
                          control={control}
                          options={transformedProblemList!}
                          label=""
                          //isRequired
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <Flex justifyContent={"end"} mr={7}>
                        <FormCheckbox
                          control={control}
                          name="isPublic"
                          label="Public"
                          defaultChecked
                        />
                      </Flex>
                    </GridItem>
                  </Grid>

                  <Grid templateColumns={"repeat(6, 1fr)"} gap={1}>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="70px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Variance
                        </FormLabel>
                        <FormInput name="variance" control={control} label="" width={40} />
                        <FormInput name="variance2" control={control} label="" width={10} ml={4}/>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="25px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          By
                        </FormLabel>
                        <FormInput
                          name="createdBy"
                          type="number"
                          control={control}
                          label=""
                          width="50px"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="30px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Site
                        </FormLabel>
                        <FormSelect
                          width="80px"
                          control={control}
                          name="siteId"
                          placeholder="Select Site"
                          options={transformedSiteList!}
                          label=""
                          //isRequired
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="80px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Journal
                        </FormLabel>

                        <FileUpload control={control} name="journal" label="" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="70px"
                          textAlign="right"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Zip
                        </FormLabel>
                        <FormInput name="zipCode" control={control} label="" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <Flex justifyContent={"end"}>
                        <FormCheckbox
                          control={control}
                          name="isCarePlan"
                          label="Care Plan"
                          fontWeight="500"
                        />
                      </Flex>
                    </GridItem>
                  </Grid>

                  <Grid templateColumns={"repeat(2, 1fr)"} gap={2}>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="55px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Doctor
                        </FormLabel>
                        <FormSelect
                          name="doctorId"
                          placeholder="Select Doctor"
                          control={control}
                          options={transformedDoctorList!}
                          label=""
                          //isRequired
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl display={"flex"} alignItems="center">
                        <FormLabel
                          width="70px"
                          textAlign="left"
                          mb={0}
                          fontWeight="700"
                          fontSize="sm"
                        >
                          Admitted
                        </FormLabel>
                        <FormSelect
                          name="admittedId"
                          placeholder="Select admitted by"
                          control={control}
                          options={transformedDoctorList!}
                          label=""
                          // isRequired
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>
              </VStack>
            </SectionLayout>

            <HStack justifyContent={"center"}>
              <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onClose}>
                Help
              </Button>
              <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onClose}>
                Cancel
              </Button>
              <Button mr={3} borderRadius={"5px"} type="submit">
                Done
              </Button>
            </HStack>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};
export default AddMedicalHistory;
