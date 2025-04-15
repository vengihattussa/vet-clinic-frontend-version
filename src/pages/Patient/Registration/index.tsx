import {Grid, GridItem, StackDivider, VStack, useToast} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import FormSelect from "@src/common/Form/Select";
import Tabs from "@src/common/Tabs";
import TabContent from "@src/components/TabContent";
import {useMasterDataPatient} from "@src/hooks/master-data-patient";
import SectionLayout from "@src/layout/SectionLayout";
import {useRegisterPatient, useUpdatePatient} from "@src/services/patient/mutation";
import {useModal, useSelectClientStore, useSelectedPatientStore} from "@src/store/index";
import {FormProvider, useForm} from "react-hook-form";
import {defaultValues, schema} from "./form";
import {useGetPatient} from "@src/services/patient/queries";
import {useEffect} from "react";
import {removeFalsyKeys} from "@src/utils/object";
import {useGetClientName} from "@src/services/client/queries";
import {formatDateToISO} from "@src/utils/dateFormatting";

export const registrationTabs = [{name: "General"}, {name: "Insurance"}];

const PatientRegistrationForm = ({mode = "add"}: {mode?: "add" | "edit"}) => {
  const methods = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = methods;
  const toast = useToast();

  useEffect(() => {
    if (!errors) return;
    if (
      ["policyHolder", "policyNumber", "insuranceProvider"].some((name) =>
        Object.keys(errors).includes(name),
      )
    ) {
      toast({
        status: "error",
        description: "Please fill insurance details",
      });
    }
  }, [errors]);

  const {mutate: add} = useRegisterPatient();
  const {mutate: update} = useUpdatePatient();

  const {id = ""} = useSelectedPatientStore();
  const patientId = mode === "edit" ? (id ?? "") : "";
  const {data: patientData} = useGetPatient(patientId?.toString());
  const {setSelectedClientDetail} = useSelectClientStore();

  const {data: petOwnerName} = useGetClientName(patientData?.clientId ?? "");
  // const {data: policyHolderName} = useGetClientName(patientData?.policyHolder ?? "");
  // const selectedClient = useSelectClientStore.getState().getSelectedClientDetail;
  const policyHolderName = patientData?.policyHolder ?? "";

  useEffect(() => {
    if (!patientData) return;
    reset({
      ...defaultValues,

      //@ts-ignore
      microchip: defaultValues?.microchip,
      //@ts-ignore
      ...removeFalsyKeys(patientData),
      image: patientData.photo ? new File([""], patientData.photo, {type: "image/*"}) : undefined,
    });
  }, [JSON.stringify(patientData)]);

  useEffect(() => {
    if (petOwnerName) {
      // setValue("petOwnerName", petOwnerName);
    }
    if (policyHolderName) {
      setValue("policyHolder", policyHolderName);
    }
  }, [petOwnerName]);

  const {species} = useMasterDataPatient();

  const {setIsTableRowOptionModal} = useModal();

  const {getCurrentClientId, getOne} = useSelectClientStore();
  // getSelectedClientDetail
  const petOwner = getOne(getCurrentClientId());

  const onSubmit = handleSubmit((data) => {
    const dobReg = /^\d{2}\/\d{2}\/\d{2}$/;

    const formattedData: typeof data = {
      ...data,
      clientId: petOwner?.id?.toString() || "",
      // petOwnerName: petOwner?.name?.toString() || "",
      // policyHolder: getSelectedClientDetail?.name?.toString(),
      policyHolder: data.policyHolder,
      dateOfBirth:
        data?.dateOfBirth && dobReg.test(data.dateOfBirth as unknown as string)
          ? formatDateToISO(data?.dateOfBirth as unknown as string)
          : data.dateOfBirth,
      reminderDate:
        data?.reminderDate && dobReg.test(data.reminderDate as unknown as string)
          ? formatDateToISO(data?.reminderDate as unknown as string)
          : data.reminderDate,
      deceasedDate:
        data?.deceasedDate && dobReg.test(data.deceasedDate as unknown as string)
          ? formatDateToISO(data?.deceasedDate as unknown as string)
          : data.deceasedDate,
      suspendedDate:
        data?.suspendedDate && dobReg.test(data.suspendedDate as unknown as string)
          ? formatDateToISO(data?.suspendedDate as unknown as string)
          : data.suspendedDate,
    };
    if (mode === "add") {
      //@ts-ignore
      add(formattedData, {
        onSuccess: () => {
          setIsTableRowOptionModal(false);
          setSelectedClientDetail({id: "", name: ""});
        },
      });
    } else if (mode === "edit") {
      update(
        //@ts-ignore
        removeFalsyKeys({
          ...formattedData,
          id: patientId,
        }),
        {
          onSuccess: () => {
            setIsTableRowOptionModal(false);
            setSelectedClientDetail({id: "", name: ""});
          },
        },
      );
    }
  });

  return (
    <SectionLayout hasHeader={false} contentBg="primary.100" borderColor="border.main" width="full">
      <form id={mode === "add" ? "NEW PATIENT" : "EDIT PATIENT"} onSubmit={onSubmit}>
        <VStack divider={<StackDivider />} align="normal" p={0} mb={2}>
          <Grid templateColumns="2fr 1fr 2fr" gap={1} padding={"8px 12px"}>
            <GridItem colSpan={2}>
              <FormInput
                control={control}
                name="name"
                label="Name"
                labelWidth={"fit-content"}
                isRequired
              />
            </GridItem>
            <FormSelect
              control={control}
              name="species"
              label="Species"
              options={species}
              labelWidth={"fit-content"}
              isRequired
            />
          </Grid>
        </VStack>
        <Tabs
          tabs={registrationTabs.map((item) => ({
            tab: item.name,
            tabPanel: (
              <FormProvider {...methods}>
                <TabContent name={item.name} borderColor="transparent" contentBg="primary.100" />
              </FormProvider>
            ),
          }))}
          tabListStyle={{borderBottom: "1px solid", borderColor: "border.main"}}
          variant={"reverse"}
        />
      </form>
    </SectionLayout>
  );
};

export default PatientRegistrationForm;
