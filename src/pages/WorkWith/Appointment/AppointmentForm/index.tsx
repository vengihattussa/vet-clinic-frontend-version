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
  Text,
} from "@chakra-ui/react";
import {AddIcon, EditIcon} from "@src/assets/svgs";
import FormInput from "@src/common/Form/Input";
import {ReadonlyFormInput} from "@src/common/Form/Input/ReadonlyInput";
import FormRadio from "@src/common/Form/Radio";
import FormSelect from "@src/common/Form/Select";
import FormTextArea from "@src/common/Form/TextArea";
import SectionLayout from "@src/layout/SectionLayout";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {addAppointmentSchema} from "@src/schema/appointment";
import {appointmentDefaultValue} from "@src/@types/appointment";
import ContextMenu from "./ContextMenu";
import {useEffect, useState} from "react";
import {useAddAppointment, useUpdateAppointment} from "@src/services/Appointment/mutation";
import dayjs from "dayjs";
import {useClientDetailStore} from "@src/store/client/client-detail";
import ClientRegistration from "@src/pages/Client/ClientRegistration";
import CustomModal from "@src/common/CustomModal";
import {useModal} from "@src/store/index";
import PatientRegistrationForm from "@src/pages/Patient/Registration";
import {
  useAppointmentsClientList,
  useAppointmentsDoctorList,
  // useAppointmentsPatientList,
  useAppointmentsRoomList,
} from "@src/services/Appointment/queries";
import {z} from "zod";
import {useMasterDataPatient} from "@src/hooks/master-data-patient";
import {useGetBreedBySpeciesId} from "@src/services/master-data";
import ReactDatePickerInput from "@src/common/Form/DatePicker";
import {useGetPatient} from "@src/services/patient/queries";
import {useGetPatientListById} from "@src/services/worklist/mutation";
import {PatientList} from "@src/services/worklist/interface";

interface Appointment {
  name: string;
  status: string;
  timeSlot: string;
  doctorId?: string;
}

type AppointmentData = {
  appointmentId: number;
  startDate: string;
  endTime: string;
  doctorName: string;
  duration: number;
  status: number;
  time: string;
  patientId: number;
  clientId: number;
  date: string;
  patientName: string;
  clientName: string;
};

interface AppointmentModalProps {
  appointment?: Appointment | null;
  selectedDate?: dayjs.Dayjs;
  handleClose?: () => void;
  appointmentId?: string;
  mode?: string;
  appointmentData?: AppointmentData | undefined;
  // clientDetails: IClient;
}

export const convertTo24HourFormat = (time12h: string) => {
  const [time, modifier] = time12h.split(/(a|p)/);
  const [hours, minutes] = time.split(":");

  let hours24 = parseInt(hours, 10);
  if (modifier === "p" && hours24 !== 12) hours24 += 12;
  if (modifier === "a" && hours24 === 12) hours24 = 0;

  return `${hours24.toString().padStart(2, "0")}:${minutes}`;
};

type FormData = z.infer<typeof addAppointmentSchema> & {
  patientId: string | null;
};

const AppointmentForm: React.FC<AppointmentModalProps> = ({
  appointment,
  selectedDate,
  handleClose,
  appointmentId,
  mode,
  appointmentData,
}) => {
  // API
  const {details} = useClientDetailStore();
  const {data: doctorList = []} = useAppointmentsDoctorList();
  const {data: roomList = []} = useAppointmentsRoomList();
  const {data: clientList = []} = useAppointmentsClientList();
  const {data, mutate} = useGetBreedBySpeciesId();
  const breeds = data?.data || {};

  const methods = useForm({
    defaultValues: appointment
      ? {
          ...appointmentDefaultValue,
          ...appointment,
          clientId: appointmentData?.clientId?.toString() || details?.id?.toString() || "",
          phoneNo: details?.phoneNo ?? "",
          patientId:
            (appointmentData?.patientId?.toString() || details?.patientList?.[0]?.id) ?? "",
          time: appointment.timeSlot ? convertTo24HourFormat(appointment.timeSlot) : "",
          date: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : "",
          speciesId: details?.patientList?.[0]?.species ?? "",
          breedId: details?.patientList?.[0]?.breed ?? "",
          weight:
            `${details?.patientList?.[0]?.weight || ""} ${details?.patientList?.[0]?.weightUnit || ""}` ||
            "",
          createdBy: details?.createdBy ?? "admin",
          status: "1",
          minutes: 0,
        }
      : {
          ...appointmentDefaultValue,
          clientId: details?.id?.toString() || "",
          phoneNo: details?.phoneNo ?? "",
          date: dayjs(Date.now()).format("YYYY-MM-DD") || "",
          createdBy: details?.createdBy ?? "admin",
          patientId: details?.patientList?.[0]?.id ?? "",
          speciesId: details?.patientList?.[0]?.species ?? "",
          breedId: details?.patientList?.[0]?.breed ?? "",
          weight:
            `${details?.patientList?.[0]?.weight || ""} ${details?.patientList?.[0]?.weightUnit || ""}` ||
            "",
          status: "1",
          minutes: 0,
        },
    resolver: zodResolver(addAppointmentSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const {control, watch, handleSubmit} = methods;
  const {mutate: addAppointment} = useAddAppointment();
  const {mutate: updateAppointment} = useUpdateAppointment();
  const clientIdD = watch("clientId");
  const {mutate: patientmutate, isPending} = useGetPatientListById();
  const [patientListDropdown, setPatientListDropdown] = useState<Record<string, string>>();

  useEffect(() => {
    if (clientIdD && !isPending) {
      patientmutate(
        {clientId: clientIdD as unknown as string},
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
  }, [clientIdD]);

  useEffect(() => {
    const speciesId = watch("speciesId");
    if (!speciesId) return;
    mutate(speciesId);
  }, [watch("speciesId")]);

  // menu states
  const menuItems = [
    {
      label: "CHOOSE",
      shortcut: "F7",
      onClick: () => alert("Choose Option"),
      children: [
        {label: "Treatment", onClick: () => console.log("Reschedule clicked")},
        {label: "Inventory", onClick: () => console.log("Modify clicked")},
        {label: "Diagnosis", onClick: () => console.log("Reschedule clicked")},
        {label: "Problem", onClick: () => console.log("Modify clicked")},
      ],
    },
    {label: "REMOVE", shortcut: "F4", onClick: () => alert("Remove Appointment")},
  ];
  const [menuPosition, setMenuPosition] = useState<{x: number; y: number}>({x: 0, y: 0});
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuPosition({x: event.clientX - 300, y: event.clientY - 100});
    setIsOpen(true);
  };

  const closeMenu = () => setIsOpen(false);

  // petient state
  const patientId = watch("patientId");
  const {data: patientData} = useGetPatient(patientId?.toString());

  useEffect(() => {
    if (patientData) {
      const weightUnit =
        patientData?.weightUnit === "1" ? "LBS" : patientData?.weightUnit === "2" ? "KG" : "";
      const speciesNumber = patientData.species || "";
      const breedNumber = patientData.breed || "";
      methods.setValue("speciesId", speciesNumber);
      methods.setValue("breedId", breedNumber);
      methods.setValue(
        "weight",
        patientData.weight
          ? `${Math.floor(Number(patientData.weight)).toString()} ${weightUnit} `
          : "",
      );
    } else {
      methods.setValue("patientId", "");
      methods.setValue("speciesId", "");
      methods.setValue("breedId", "");
      methods.setValue("weight", "");
    }
  }, [patientId, methods, patientData]);

  useEffect(() => {
    if (!clientIdD) {
      methods.setValue("patientId", "");
      methods.setValue("speciesId", "");
      methods.setValue("breedId", "");
      methods.setValue("weight", "");
    }
  }, [watch("clientId")]);

  const {setIsModalOpen, isModalOpen} = useModal();
  const handleCloseClient = () => {
    setIsModalOpen(false);
  };

  // patient modal state
  const {isTableRowOptionModal, setIsTableRowOptionModal} = useModal();
  const {species: speciesList} = useMasterDataPatient();

  // submit handler
  const submitHandler = (data: FormData) => {
    if (mode === "add") {
      addAppointment(data, {
        onSuccess: () => {
          if (handleClose) {
            handleClose();
          }
        },
        onError: (error: any) => {
          console.error("Failed to add appointment:", error);
        },
      });
    } else {
      if (appointmentId) {
        updateAppointment(
          {data, id: appointmentId},
          {
            onSuccess: () => {
              if (handleClose) handleClose();
            },
            onError: (error) => {
              console.error("Update failed:", error);
            },
          },
        );
      }
    }
  };

  const timeRegex = /^(?:[01]?[0-9]|2[0-3]):(00|30)$/;
  const {clearErrors} = methods;
  useEffect(() => {
    const time = watch("time");
    if (timeRegex.test(time)) {
      clearErrors("time");
    }
  }, [watch("time")]);

  return (
    <>
      <ContextMenu
        items={menuItems}
        menuPosition={menuPosition}
        closeMenu={closeMenu}
        isOpen={isOpen}
      />
      <Stack m={3} mt={"-6px"}>
        <form id={"Add Appointment"} onSubmit={handleSubmit(submitHandler)}>
          <FormProvider {...methods}>
            <Stack gap={4}>
              <Grid
                templateColumns={"repeat(6,1fr)"}
                columnGap={6}
                p={4}
                border={"1px solid"}
                borderColor={"border.200"}
                borderRadius={6}
                background={"primary.200"}
              >
                <GridItem colSpan={4} as={Stack} gap={4}>
                  <Grid templateColumns={"repeat(2,1fr)"} columnGap={1} rowGap={2}>
                    <HStack>
                      <FormControl display="flex" paddingRight={10} alignItems="center" gap={2}>
                        <FormLabel
                          minWidth="45px"
                          textAlign="left"
                          mb={0}
                          fontWeight="600"
                          fontSize="md"
                        >
                          Date
                        </FormLabel>
                        <ReactDatePickerInput
                          control={control}
                          name="date"
                          minDate={new Date()}
                          isRequired
                          customWidth="150px"
                        />
                      </FormControl>
                      <FormInput
                        type="time"
                        name="time"
                        label="Time"
                        control={control}
                        labelWidth={"76px"}
                        isRequired
                      />
                    </HStack>
                    <ReadonlyFormInput
                      label="Created"
                      control={control}
                      name="createdAt"
                      labelWidth={"76px"}
                    />
                    <FormSelect
                      control={control}
                      label="Doctor"
                      name="doctorId"
                      options={{
                        ...Object.fromEntries(
                          doctorList.map((doctor) => [
                            doctor?.id,
                            `${doctor?.firstName} ${doctor?.lastName}`,
                          ]),
                        ),
                      }}
                      isRequired
                      placeholder="Select Doctor"
                    />
                    <FormInput name="createdBy" label="By" control={control} labelWidth={"76px"} />

                    <FormSelect
                      control={control}
                      label="Room"
                      name="roomId"
                      options={{
                        ...Object.fromEntries(roomList.map((room) => [room?.id, `${room?.name}`])),
                      }}
                      placeholder="Select Room"
                    />
                    <FormInput
                      type="number"
                      name="minutes"
                      label="Minutes"
                      control={control}
                      labelWidth={"76px"}
                    />
                    <FormSelect
                      control={control}
                      label="Client"
                      name="clientId"
                      options={{
                        ...Object.fromEntries(
                          clientList.map((client) => [
                            client?.id,
                            `${client?.firstName} ${client?.lastName}`,
                          ]),
                        ),
                      }}
                      placeholder="Select Client"
                    />

                    <HStack gap={4}>
                      <Text fontSize={16} fontWeight={700}>
                        Patient
                      </Text>
                      <FormSelect
                        control={control}
                        name="patientId"
                        // defaultValue={Object.keys(patientList)?.[0] ?? ""}
                        // options={Object.fromEntries(
                        //   Object.entries(patientList).map(([id, name]) => [id, String(name)]),
                        // )}
                        options={(patientListDropdown as unknown as Record<string, string>) ?? []}
                        placeholder="Select Patient"
                      />
                    </HStack>

                    <Flex gap={2}>
                      <Box flexBasis={"220px"} flexShrink={1}>
                        <FormSelect
                          control={control}
                          name="phoneCode"
                          placeholder="Select Code"
                          options={{
                            "+1": "+1",
                            "+52": "+52",
                            "+55": "+55",
                            "+44": "+44",
                            "+49": "+49",
                            "+33": "+33",
                            "+39": "+39",
                            "+81": "+81",
                            "+61": "+61",
                          }}
                          label="Phone"
                        />
                      </Box>
                      <Box flex={1}>
                        <FormInput type="tel" control={control} name="phoneNo" />
                      </Box>
                    </Flex>

                    <FormSelect
                      control={control}
                      name="speciesId"
                      options={speciesList}
                      placeholder="Select Species"
                      label="Species"
                      isDisabled={true}
                    />
                    <FormSelect
                      control={control}
                      name="breedId"
                      options={breeds}
                      placeholder="Select Breed"
                      label="Breed"
                      isDisabled={true}
                    />
                    <FormInput
                      name="weight"
                      label="Weight"
                      control={control}
                      labelWidth={"76px"}
                      disabled={true}
                    />
                  </Grid>
                  <SectionLayout mainTitle="Notes" height="120px">
                    <FormTextArea control={control} name="notes" height="120px" />
                  </SectionLayout>
                  <FormRadio
                    options={[
                      {label: "Confirmed", value: "1"},
                      {label: "Unconfirmed", value: "2"},
                      {label: "Left Message", value: "3"},
                    ]}
                    control={control}
                    name="status"
                  />
                </GridItem>
                <GridItem colSpan={2} as={Stack} gap={2}>
                  <SectionLayout mainTitle="TX, ITEMS, DX & PROBLEMS">
                    <Box
                      onClick={(event) => openMenu(event)}
                      style={{height: "140px", overflow: "hidden"}}
                    ></Box>
                  </SectionLayout>
                  <HStack gap={4}>
                    <Text fontSize={16} fontWeight={700}>
                      Type
                    </Text>
                    <FormSelect
                      control={control}
                      name="type"
                      options={{
                        "1": "(None)",
                        "2": "Converted Appointment",
                        "3": "Drop Off",
                        "4": "Exams",
                        "5": "Surgery",
                        "6": "Dentistry",
                        "7": "Boarding",
                        "8": "Ultrasound",
                      }}
                      width="200px"
                      placeholder="Select Type"
                    />
                    <AddIcon />
                    <EditIcon />
                  </HStack>
                  <HStack justifyContent={"start"}>
                    <Text fontSize={14} textAlign={"start"} fontWeight={700}>
                      VIRTUAL VISIT
                    </Text>
                    <HStack>
                      <Button size={"xs"} variant={"solidBold"}>
                        Create Link
                      </Button>
                      <Button size={"xs"} variant={"outlineBold"}>
                        Copy Link
                      </Button>
                    </HStack>
                  </HStack>
                  <SectionLayout mainTitle="REMINDER">
                    <FormTextArea control={control} name="reminder" height="140px" />
                  </SectionLayout>
                  <SectionLayout mainTitle="PATIENT NAME">
                    <FormTextArea control={control} name="patientNames" height="140px" />
                  </SectionLayout>
                </GridItem>
              </Grid>
              <HStack justifyContent={"space-between"}>
                <HStack gap={4}>
                  <Button
                    variant={"outlineBold"}
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    New Client
                  </Button>
                  <Button variant={"outlineBold"} onClick={() => setIsTableRowOptionModal(true)}>
                    New Patient
                  </Button>
                </HStack>
                <HStack gap={4}>
                  <Button
                    variant={"outlineBold"}
                    onClick={() => {
                      if (handleClose) {
                        handleClose();
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant={"outlineBold"}> Remove</Button>
                  <Button variant={"solidBold"} type="submit">
                    Done
                  </Button>
                </HStack>
              </HStack>
            </Stack>
          </FormProvider>
        </form>
      </Stack>
      {isModalOpen && (
        <CustomModal
          modalTitle={"NEW CLIENT INFORMATION"}
          isOpen={isModalOpen}
          onClose={handleCloseClient}
          formId={"NEW CLIENT INFORMATION"}
          size={"xl"}
        >
          <ClientRegistration mode="add" />
        </CustomModal>
      )}
      <CustomModal
        modalTitle={`NEW PATIENT`}
        isOpen={isTableRowOptionModal}
        formId={"NEW PATIENT"}
        onClose={() => setIsTableRowOptionModal(false)}
        hasFooter={true}
        size="xl"
      >
        <PatientRegistrationForm />
      </CustomModal>
    </>
  );
};

export default AppointmentForm;
