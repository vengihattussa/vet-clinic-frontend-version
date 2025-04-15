import {Flex, Text, useDisclosure, Button, HStack} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import FormCheckbox from "@src/common/Form/Checkbox";
import SectionLayout from "@src/layout/SectionLayout";
import CustomModal from "@src/common/CustomModal";
import {useState} from "react";
import MedicalCondition from "@src/pages/PatientAttachments/MedicalCondition";

const defaultValues = {
  dentalChart: false,
  form: false,
  inventoryUsed: false,
  medicalCondition: false,
  moreStuff: false,
  notes: false,
  photograph: false,
  attachments: false,
  alert: false,
  vaccination: false,
  tests: false,
  radiographs: false,
};
type FormDataType = typeof defaultValues;

const attachmentsList = [
  {
    name: "dentalChart",
    label: "Dental Chart",
  },
  {
    name: "form",
    label: "Form",
  },
  {
    name: "inventoryUsed",
    label: "Inventory Used",
  },
  {
    name: "medicalCondition",
    label: "Medical Condition",
  },
  {
    name: "moreStuff",
    label: "More Stuff",
  },
  {
    name: "notes",
    label: "Notes",
  },
  {
    name: "photograph",
    label: "Photograph",
  },
  {
    name: "attachments",
    label: "Attachments",
  },
  {
    name: "alert",
    label: "Alert",
  },
  {
    name: "vaccination",
    label: "Vaccination",
  },
  {
    name: "tests",
    label: "Tests",
  },
  {
    name: "radiographs",
    label: "Radiographs",
  },
] as const;

const getAttachmentComponent = (onClose: () => void) => ({
  dentalChart: {
    title: "Dental Chart",
    element: <>hello</>,
  },
  form: {
    title: "Form",
    element: <>hello</>,
  },
  inventoryUsed: {
    title: "Inventory Used",
    element: (
      <>
        <Text>No items specified. Choose?</Text>
        <HStack justifyContent={"center"}>
          <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onClose}>
            No
          </Button>
          <Button mr={3} borderRadius={"5px"} type="submit">
            Yes
          </Button>
        </HStack>
      </>
    ),
  },

  medicalCondition: {
    title: "MEDICAL CONDITION",
    element: <MedicalCondition onCloseModal={onClose} />,
  },
  moreStuff: {
    title: "More Stuff",
    element: <>hello</>,
  },
  notes: {
    title: "Notes",
    element: <>hello</>,
  },
  photograph: {
    title: "Photograph",
    element: <>hello</>,
  },
  attachments: {
    title: "Attachments",
    element: <>hello</>,
  },
  alert: {
    title: "Alert",
    element: <>hello</>,
  },
  vaccination: {
    title: "Vaccination",
    element: <>hello</>,
  },
  tests: {
    title: "Tests",
    element: <>hello</>,
  },
  radiographs: {
    title: "Radiographs",
    element: <>hello</>,
  },
});

const PatientAttachments = () => {
  const {control} = useForm({
    defaultValues,
  });

  const {isOpen, onClose, onOpen} = useDisclosure();
  const [selectedAttachment, setSelectedAttachment] = useState<keyof FormDataType | null>(null);

  const handleClick = (name: keyof FormDataType) => {
    onOpen();
    setSelectedAttachment(name);
  };

  const attachmentComponent = getAttachmentComponent(onClose);

  return (
    <SectionLayout
      hasHeader={false}
      borderColor="border.100"
      contentBg="primary.400"
      height="100%"
      contentPadding={2}
    >
      <Text fontWeight="bold" fontSize="lg" color="primary.500">
        Attachments
      </Text>

      <Flex mt={2} direction={"column"} gap={1} maxHeight="170px" overflowY="auto">
        {attachmentsList.map((attachment) => (
          <FormCheckbox
            key={attachment.name}
            control={control}
            name={attachment.name}
            label={attachment.label}
            size={"lg"}
            onClick={() => handleClick(attachment.name)}
          />
        ))}
      </Flex>
      <CustomModal
        modalTitle={selectedAttachment && attachmentComponent[selectedAttachment].title}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        hasFooter={false}
      >
        {selectedAttachment && attachmentComponent[selectedAttachment].element}
      </CustomModal>
    </SectionLayout>
  );
};

export default PatientAttachments;
