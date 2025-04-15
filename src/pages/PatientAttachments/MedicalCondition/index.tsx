import {Box, Button, Grid, HStack, Stack, Text, useDisclosure} from "@chakra-ui/react";
import {IMedicalCondition, IMedicalConditionFields} from "@src/@types/medicalCondition";
import {AddIcon, EditIcon} from "@src/assets/svgs";
import CustomCheckbox from "@src/common/CustomCheckbox";
import CustomModal from "@src/common/CustomModal";
import CustomTable from "@src/common/CustomTable";
import FormInput, {FormInputProps} from "@src/common/Form/Input";
import FormTextArea from "@src/common/Form/TextArea";
import SectionLayout from "@src/layout/SectionLayout";
import {useAddMedicalCondition} from "@src/services/medicalCondition/mutation";
import {createColumnHelper} from "@tanstack/react-table";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import AddOrEditPlan from "./Plan/AddOrEditPlan";
import {useState} from "react";

const TextFieldWithTail = <T extends FieldValues>(props: FormInputProps<T>) => {
  return (
    <HStack>
      <FormInput {...props} />
      <Text variant={"primary_600"}>{props.tail}</Text>
    </HStack>
  );
};

export type GenericColType = {
  id: string;
  [key: string]: string;
};

const arr = [
  {
    label: "General",
    name: "general",
    labelWidth: "140px",
    isChecked: false,
    note: "",
  },
  {
    label: "Musculoskeleton",
    name: "musculoskeleton",
    labelWidth: "140px",
    isChecked: false,
    note: "",
  },
  {
    label: "Eye, Ears, Nose",
    name: "eye",
    labelWidth: "140px",
    isChecked: false,
    note: "",
  },
  {
    label: "Integument",
    name: "integument",
    labelWidth: "140px",
    isChecked: false,
    note: "",
  },
  {
    label: "Oral",
    name: "oral",
    labelWidth: "140px",
    isChecked: false,
    note: "",
  },
  {
    label: "Uro-genital",
    name: "uroGenital",
    isChecked: false,
    labelWidth: "140px",
    note: "",
  },
  {
    label: "Respiratory",
    name: "respiratory",
    isChecked: false,
    labelWidth: "140px",
    note: "",
  },
  {
    label: "Lymphatic",
    name: "lymphatic",
    labelWidth: "140px",
    isChecked: false,
    note: "",
  },
  {
    label: "Cardio Vascular",
    name: "cardioVascular",
    labelWidth: "140px",
    isChecked: false,
    note: "",
  },
  {
    label: "Neurologic",
    name: "neurologic",
    labelWidth: "140px",
    isChecked: false,
    note: "",
  },
  {
    label: "GI/Abdomen",
    name: "giAbdomen",
    labelWidth: "140px",
    isChecked: false,
    note: "",
  },
  {
    label: "Endocrine",
    name: "endocrine",
    labelWidth: "140px",
    isChecked: false,
    note: "",
  },
];

const defaultValues: IMedicalCondition = {
  weight: 0.0,
  temp: 10,
  heartRate: 70.0,
  resp: 16.0,
  crt: 1.0,
  bcs: 5.0,
  bcsOf: 9.0,
  other: 0.0,
  otherOf: 0.0,
  painScale: 0.0,
  presentingProblem: "",
  admittedBy: 0,
  postFor: 0,
  vitalOnly: false,
  subjective: "",
  note: "",
  objective: "",
  clientInstruction: "",
  medicalHistoryId: 0,
  id: 0,
  abnormalityList: arr,
};

const MedicalCondition = ({onCloseModal}: {onCloseModal: () => void}) => {
  const methods = useForm({defaultValues});
  const columnHelper = createColumnHelper<GenericColType>();
  const presentingProblemCol = [
    columnHelper.accessor("code", {header: "Code"}),
    columnHelper.accessor("description", {header: "Description"}),
  ];

  const problemHistoryCol = [
    columnHelper.accessor("code", {header: "Code"}),
    columnHelper.accessor("description", {header: "Description"}),
  ];

  const assessmentCol = [
    columnHelper.accessor("code", {header: "Code"}),
    columnHelper.accessor("description", {header: "Description"}),
    columnHelper.accessor("description", {header: "Last Diagonised"}),
    columnHelper.accessor("description", {header: "By"}),
  ];

  const planCol = [
    columnHelper.accessor("code", {header: "Code"}),
    columnHelper.accessor("description", {header: "Description"}),
    columnHelper.accessor("description", {header: "Quantity"}),
    columnHelper.accessor("description", {header: "To-do"}),
    columnHelper.accessor("description", {header: "Last Done"}),
    columnHelper.accessor("description", {header: "At"}),
    columnHelper.accessor("description", {header: "Dr"}),
  ];

  const attachmentCol = [
    columnHelper.accessor("code", {header: "Icon"}),
    columnHelper.accessor("description", {header: "Description"}),
    columnHelper.accessor("description", {header: "Size"}),
    columnHelper.accessor("description", {header: "Type"}),
    columnHelper.accessor("description", {header: "Modified"}),
  ];

  const {control, watch, setValue} = methods;
  const [planRowId, setPlanRowId] = useState<number | string>();
  const {isOpen: isAddPlanOpen, onOpen: onAddPlanOpen, onClose: onAddPlanClose} = useDisclosure();
  const {
    isOpen: isEditPlanOpen,
    onOpen: onEditPlanOpen,
    onClose: onEditPlanClose,
  } = useDisclosure();

  const abnormalityListFields = watch("abnormalityList");

  const {mutate} = useAddMedicalCondition();
  const submit = (data: IMedicalConditionFields) => {
    const abnormalityList = watch("abnormalityList").map((field) => ({
      type: field.name,
      note: field.note,
      isChecked: field.isChecked,
    }));

    const payload = {...data, abnormalityList};
    mutate(payload as unknown as IMedicalConditionFields);
  };

  const isCheckedAll = abnormalityListFields.every((item) => item.isChecked);

  const isPartialChecked = abnormalityListFields.some((item) => item.isChecked);

  return (
    <Stack m={3} mt={"-6px"}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>
          <Stack gap={4}>
            <Stack
              p={4}
              border={"1px solid"}
              borderColor={"border.200"}
              borderRadius={6}
              background={"primary.100"}
              gap={4}
            >
              <HStack gap={6}>
                <TextFieldWithTail
                  control={control}
                  name="weight"
                  label="Weight"
                  tail="lbs"
                  labelWidth={"fit-content"}
                />
                <TextFieldWithTail
                  control={control}
                  name="temp"
                  label="Temp"
                  tail="&deg;F"
                  labelWidth={"fit-content"}
                />
                <TextFieldWithTail
                  control={control}
                  name="heartRate"
                  label="Heart Rate"
                  tail="/min"
                  labelWidth={"fit-content"}
                />
                <TextFieldWithTail
                  control={control}
                  name="resp"
                  label="Resp"
                  tail="/min"
                  labelWidth={"fit-content"}
                />
                <TextFieldWithTail
                  control={control}
                  name="crt"
                  label="CRT"
                  tail="/sec  "
                  labelWidth={"fit-content"}
                />
              </HStack>
              <HStack gap={6}>
                <HStack>
                  <TextFieldWithTail
                    control={control}
                    name="bcs"
                    label="BCS"
                    tail="of"
                    labelWidth={"fit-content"}
                    width={"150px"}
                  />
                  <FormInput control={control} name="bcsOf" width={"150px"} />
                </HStack>
                <HStack>
                  <TextFieldWithTail
                    control={control}
                    name="other"
                    label="Other"
                    tail="of"
                    labelWidth={"fit-content"}
                    width={"150px"}
                  />
                  <FormInput control={control} name="otherOf" width={"150px"} />
                </HStack>
                <HStack flex={1}>
                  <FormInput control={control} name="painScale" label="Pain Scale" type="number" />
                </HStack>
              </HStack>
            </Stack>
            <SectionLayout mainTitle="PROBLEMS">
              <Grid templateColumns={"repeat(2,1fr)"} px={2} pt={2} gap={4}>
                <Stack gap={4}>
                  <FormInput
                    control={control}
                    label="Presenting Problem(s)"
                    name="presentingProblem"
                  />
                  <Box border={"1px solid"} borderColor={"border.main"} borderRadius={8}>
                    <CustomTable
                      columns={presentingProblemCol}
                      data={[]}
                      hasBorderBottom={true}
                      height="245px"
                    />
                  </Box>
                </Stack>
                <Stack py={4} gap={4}>
                  <Text fontSize={16} fontWeight={600}>
                    Problem History
                  </Text>
                  <Stack
                    border={"1px solid"}
                    borderColor={"border.200"}
                    bg={"white"}
                    borderRadius={8}
                    p={2}
                  >
                    <HStack>
                      <AddIcon />
                      <EditIcon />
                    </HStack>

                    <CustomTable
                      height="1802x"
                      columns={problemHistoryCol}
                      data={[]}
                      hasBorderBottom={true}
                    />
                  </Stack>
                </Stack>
              </Grid>
            </SectionLayout>
            <SectionLayout
              mainTitle="SUBJECTIVE"
              headerBackground="primary.400"
              contentBg="primary.50"
            >
              <HStack gap={2} p={2}>
                <FormTextArea control={control} name="subjective" />
                <Stack>
                  <Button
                    variant={"outlineBold"}
                    boxSize={"35px"}
                    fontSize={26}
                    color={"black"}
                    boxShadow={"xl"}
                    borderColor={"border.200"}
                  >
                    +
                  </Button>
                  <Button
                    variant={"outlineBold"}
                    boxSize={"35px"}
                    fontSize={26}
                    color={"black"}
                    boxShadow={"xl"}
                    borderColor={"border.200"}
                  >
                    -
                  </Button>
                </Stack>
              </HStack>
            </SectionLayout>
            <SectionLayout mainTitle="OBJECTIVE">
              <Stack p={2} gap={4}>
                <HStack gap={2}>
                  <FormTextArea control={control} name="objective" />
                  <Stack>
                    <Button
                      variant={"outlineBold"}
                      boxSize={"35px"}
                      fontSize={26}
                      color={"black"}
                      boxShadow={"xl"}
                      borderColor={"border.200"}
                    >
                      +
                    </Button>
                    <Button
                      variant={"outlineBold"}
                      boxSize={"35px"}
                      fontSize={26}
                      color={"black"}
                      boxShadow={"xl"}
                      borderColor={"border.200"}
                    >
                      -
                    </Button>
                  </Stack>
                </HStack>
                <HStack gap={4}>
                  <HStack>
                    <CustomCheckbox
                      isChecked={isCheckedAll}
                      size={16}
                      onChange={() => {
                        setValue(
                          "abnormalityList",
                          abnormalityListFields.map((item) => ({
                            ...item,
                            note: "",
                            isChecked: true,
                          })),
                        );
                      }}
                    />
                    <Text> Check All</Text>
                  </HStack>
                  <HStack>
                    <CustomCheckbox
                      isChecked={!isPartialChecked}
                      size={16}
                      onChange={() => {
                        setValue(
                          "abnormalityList",
                          abnormalityListFields.map((item) => ({
                            ...item,
                            isChecked: false,
                          })),
                        );
                      }}
                    />
                    <Text> Uncheck All</Text>
                  </HStack>
                </HStack>
                <Grid
                  templateColumns={"repeat(2,1fr)"}
                  gap={3}
                  columnGap={6}
                  border={"1px solid"}
                  borderColor={"border.200"}
                  borderRadius={6}
                  p={2}
                  bg={"primary.50"}
                >
                  {abnormalityListFields.map(({name, ...item}, index) => (
                    <HStack key={index}>
                      <CustomCheckbox
                        isChecked={item.isChecked!}
                        size={22}
                        onChange={(isChecked) => {
                          setValue(`abnormalityList.${index}.isChecked`, isChecked);
                        }}
                      />
                      <FormInput
                        control={control}
                        label={item.label}
                        name={`abnormalityList.${index}.note`}
                        isDisabled={item.isChecked}
                      />
                    </HStack>
                  ))}
                </Grid>
                <FormTextArea control={control} name="other" />
              </Stack>
            </SectionLayout>
            <SectionLayout
              mainTitle="ASSESSMENT"
              headerBackground="primary.400"
              contentBg="primary.50"
            >
              <Stack p={2} gap={4}>
                <HStack gap={4}>
                  <HStack>
                    <CustomCheckbox isChecked={true} />
                    <Text>Rule-Out</Text>
                  </HStack>
                  <HStack>
                    <CustomCheckbox isChecked={true} />
                    <Text>Diagonise</Text>
                  </HStack>
                </HStack>
                <Box border={"1px solid"} borderColor={"border.main"} borderRadius={8}>
                  <CustomTable columns={assessmentCol} data={[]} hasBorderBottom={true} />
                </Box>
                <HStack gap={2}>
                  <FormTextArea control={control} name="subjective" />
                  <Stack>
                    <Button
                      variant={"outlineBold"}
                      boxSize={"35px"}
                      fontSize={26}
                      color={"black"}
                      boxShadow={"xl"}
                      borderColor={"border.200"}
                    >
                      +
                    </Button>
                    <Button
                      variant={"outlineBold"}
                      boxSize={"35px"}
                      fontSize={26}
                      color={"black"}
                      boxShadow={"xl"}
                      borderColor={"border.200"}
                    >
                      -
                    </Button>
                  </Stack>
                </HStack>
              </Stack>
            </SectionLayout>

            <SectionLayout mainTitle="PLAN">
              <Stack p={2} gap={4}>
                <CustomModal
                  modalTitle={`Add Plan`}
                  isOpen={isAddPlanOpen}
                  onClose={onAddPlanClose}
                  size="md"
                  hasFooter={false}
                >
                  <AddOrEditPlan onCloseModal={onAddPlanClose} mode={"add"} />
                </CustomModal>
                <CustomModal
                  modalTitle={`Update Plan`}
                  isOpen={isEditPlanOpen}
                  onClose={onEditPlanClose}
                  size="md"
                  hasFooter={false}
                >
                  <AddOrEditPlan onCloseModal={onEditPlanClose} mode={"edit"} rowId={planRowId} />
                </CustomModal>
                <HStack gap={4}>
                  <AddIcon onClick={onAddPlanOpen} />
                  <EditIcon onClick={onEditPlanOpen} />
                  <HStack>
                    <CustomCheckbox isChecked={false} size={24} />
                    <Text variant={"primary_600"}> Diagnostic</Text>
                  </HStack>
                  <HStack>
                    <CustomCheckbox isChecked={false} size={24} />
                    <Text variant={"primary_600"}> Therapeutic</Text>
                  </HStack>
                </HStack>
                <Box border={"1px solid"} borderColor={"border.main"} borderRadius={8}>
                  <CustomTable
                    columns={planCol}
                    data={[]}
                    rowId={planRowId}
                    hasBorderBottom={true}
                    setRowId={setPlanRowId}
                  />
                </Box>
                <HStack gap={2}>
                  <FormTextArea control={control} name="subjective" />
                  <Stack>
                    <Button
                      variant={"outlineBold"}
                      boxSize={"35px"}
                      fontSize={26}
                      color={"black"}
                      boxShadow={"xl"}
                      borderColor={"border.200"}
                    >
                      +
                    </Button>
                    <Button
                      variant={"outlineBold"}
                      boxSize={"35px"}
                      fontSize={26}
                      color={"black"}
                      boxShadow={"xl"}
                      borderColor={"border.200"}
                    >
                      -
                    </Button>
                  </Stack>
                </HStack>
                <Stack>
                  <Text variant={"primary_600"}>Client Instructions</Text>
                  <HStack gap={2}>
                    <FormTextArea control={control} name="subjective" />
                    <Stack>
                      <Button
                        variant={"outlineBold"}
                        boxSize={"35px"}
                        fontSize={26}
                        color={"black"}
                        boxShadow={"xl"}
                        borderColor={"border.200"}
                      >
                        +
                      </Button>
                      <Button
                        variant={"outlineBold"}
                        boxSize={"35px"}
                        fontSize={26}
                        color={"black"}
                        boxShadow={"xl"}
                        borderColor={"border.200"}
                      >
                        -
                      </Button>
                    </Stack>
                  </HStack>
                </Stack>
              </Stack>
            </SectionLayout>
            <SectionLayout
              mainTitle="ATTACHMENTS"
              headerBackground="primary.400"
              contentBg="primary.50"
            >
              <Stack p={2} gap={4}>
                <HStack>
                  <AddIcon />
                  <EditIcon />
                </HStack>
                <Box border={"1px solid"} borderColor={"border.main"} borderRadius={8}>
                  <CustomTable
                    height="1802x"
                    columns={attachmentCol}
                    data={[]}
                    hasBorderBottom={true}
                  />
                </Box>
              </Stack>
            </SectionLayout>
          </Stack>
          <HStack padding={2} justifyContent="center" alignItems={"center"}>
            <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onCloseModal}>
              Cancel{" "}
            </Button>
            <Button type="submit" minW={"100px"} borderRadius={"5px"}>
              Submit
            </Button>
          </HStack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default MedicalCondition;
