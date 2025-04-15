import {Flex, Text} from "@chakra-ui/react";
import SectionLayout from "../../layout/SectionLayout";
import {useForm} from "react-hook-form";
import FormCheckbox from "@src/common/Form/Checkbox";

const ClientAttachments = () => {
  const {control} = useForm({
    defaultValues: {
      accounting: false,
      moreStuff: false,
      notes: false,
      referrals: false,
    },
  });

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
      <Flex mt={2} direction={"column"} gap={1} height={"325px"}>
        <FormCheckbox control={control} name="accounting" label="Accounting" size={"md"} />
        <FormCheckbox control={control} name="moreStuff" label="More Stuff" size={"md"} />
        <FormCheckbox control={control} name="notes" label="Notes" size={"md"} />
        <FormCheckbox control={control} name="referrals" label="Referrals" size={"md"} />
      </Flex>
    </SectionLayout>
  );
};

export default ClientAttachments;
