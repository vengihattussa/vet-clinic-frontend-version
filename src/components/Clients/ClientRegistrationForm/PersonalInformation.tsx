import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  StackDivider,
  VStack,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import CustomModal from "@src/common/CustomModal";
import FormCheckbox from "@src/common/Form/Checkbox";
import ReactDatePickerInput from "@src/common/Form/DatePicker";
import FormInput from "@src/common/Form/Input";
// import {ReadonlyFormInput} from "@src/common/Form/Input/ReadonlyInput";
import FormSelect from "@src/common/Form/Select";
import FormMultiSelect from "@src/common/Form/Select/MultiSelect";
import {menuTitles} from "@src/constants/menuTitles";
import {useMasterData} from "@src/hooks/master-data";
import ClientSelection from "@src/pages/Client/ClientSelection";
import {ClientRegistrationType} from "@src/pages/Client/form";
import {useGetClientName} from "@src/services/client/queries";
import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";

const PersonalInformation = () => {
  const methods = useFormContext<ClientRegistrationType>();
  const {onOpen, isOpen, onClose} = useDisclosure();
  const {onOpen: onNextOpen, isOpen: isNextOpen, onClose: onNextClose} = useDisclosure();
  const {control, setValue, getValues, watch, trigger} = methods;

  const [selectedClientDetail, setSelectedClientDetail] = useState({
    id: "",
    name: "",
  });
  const [selectedBusinessReferralDetail, setSelectedBusinessReferralDetail] = useState({
    id: "",
    name: "",
  });

  const {
    relationshipType,
    referralCategory,
    businessReferralCategory,
    codes,
    class: clientClass,
    statementSite,
    preferredDoctor,
  } = useMasterData();
  const [referralType, setReferralType] = useState<"normal" | "business">("normal");
  const [referrals, setReferrals] = useState(referralCategory);
  const [businessReferrals, setBusinessReferrals] = useState(businessReferralCategory);

  const clientReferr = getValues().clientReferral;
  const busReferr = getValues().clientBusinessReferral;

  const {data: clientData} = useGetClientName(clientReferr ?? "");
  const {data: businessData} = useGetClientName(busReferr ?? "");

  // const handleCheckboxChange = () => {
  //   const quantity = getValues("quantity"); // Get current value
  //   if (quantity) {
  //     localStorage.setItem("quantity", quantity.toString()); // Save as string
  //   }
  // };
  // useEffect(() => {
  //   const savedQuantity = localStorage.getItem("quantity");
  //   if (savedQuantity) {
  //     setValue("quantity", Number(savedQuantity)); // Convert to number
  //   }
  // }, []);
  useEffect(() => {
    // if (!selectedClientDetail?.id) return;
    const {id, name} = selectedClientDetail;
    if (referralType === "normal") {
      setValue("clientReferral", selectedClientDetail.id);
      setReferrals({
        ...referralCategory,
        [id]: name,
      });
    }
  }, [selectedClientDetail, referralType]);

  useEffect(() => {
    if (!!clientData && clientReferr) {
      const id = parseInt(clientReferr + "0");
      setReferrals({
        ...referralCategory,
        [id]: clientData,
      });
      setValue("referralCategory", id.toString());
    }
  }, [clientData]);

  useEffect(() => {
    if (!!businessData && busReferr) {
      const id = parseInt(busReferr + "0");
      setBusinessReferrals({
        ...businessReferralCategory,
        [id]: businessData,
      });
      setValue("businessReferral", id?.toString());
    }
  }, [businessData]);

  useEffect(() => {
    if (selectedClientDetail.id) {
      if (referralType === "normal") {
        setValue("referralCategory", selectedClientDetail.id.toString());
      }
    }
  }, [selectedClientDetail, referralType]);

  useEffect(() => {
    const {id, name} = selectedBusinessReferralDetail;
    if (referralType === "business") {
      setValue("clientBusinessReferral", selectedBusinessReferralDetail.id);
      setBusinessReferrals({
        ...businessReferralCategory,
        [id]: name,
      });
    }
  }, [selectedBusinessReferralDetail, referralType]);

  const onChangeReferralClient = () => {
    setValue("clientReferral", undefined);
  };

  const onChangeReferralBusiness = () => {
    setValue("clientBusinessReferral", undefined);
  };

  useEffect(() => {
    if (selectedBusinessReferralDetail.id) {
      if (referralType === "business") {
        setValue("businessReferral", selectedBusinessReferralDetail.id.toString());
      }
    }
  }, [selectedBusinessReferralDetail, referralType]);

  useEffect(() => {
    if (watch("referralCategory")) {
      trigger("referralCategory");
    }
    if (watch("businessReferral")) {
      trigger("businessReferral");
    }
  }, [watch("referralCategory"), watch("businessReferral")]);

  useEffect(() => {
    if (!watch(`referralCategory`)) {
      setValue(`referralCategory`, undefined);
    }
  }, [watch(`referralCategory`)]);

  return (
    <VStack divider={<StackDivider />} align="normal" p={0}>
      <Grid templateColumns="1fr 1fr 2fr" gap={1} padding={"8px 12px"}>
        <GridItem colSpan={2}>
          <FormInput
            control={control}
            name="insuranceName"
            placeholder="Enter Insurance Name"
            label="Insurance Name"
            //isRequired
          />
        </GridItem>
        <FormInput
          labelWidth={"150px"}
          control={control}
          name="insurancePolicyNumber"
          placeholder="Enter Policy No."
          label="Policy No."
        />
        <GridItem colSpan={2} rowSpan={3} display="flex" flexDirection="column" gap={2}>
          <Flex gap={2} alignItems="center">
            <FormInput
              control={control}
              name="employerName"
              placeholder="Enter Name"
              label="Employer Name"
              labelWidth="140px"
              //isRequired
            />
            <FormSelect
              control={control}
              name="relationshipType"
              labelWidth="95px"
              options={relationshipType}
              placeholder="Select Type"
            />
          </Flex>
          <FormInput
            control={control}
            name="relationshipName"
            placeholder="Enter Relationship Name"
            label="Relationship"
            labelWidth="140px"
          />
        </GridItem>
        <ReactDatePickerInput
          labelWidth={"150px"}
          control={control}
          name="dateOfBirth"
          label="Date Of Birth"
          maxDate={new Date()}
          placeholder="Select Date Of Birth"
        />
        <FormSelect
          control={control}
          name="preferredDoctor"
          label="Preferred Doctor"
          options={preferredDoctor}
          placeholder="Select Preferred Doctor"
          labelWidth={"150px"}
        />

        <GridItem colSpan={2} display="flex" gap={2} justifyContent={"end"} alignItems={"center"}>
          <Flex flex={1} alignItems="center" gap={2}>
            <FormSelect
              control={control}
              name="referralCategory"
              label="Referral"
              labelWidth={"140px"}
              options={referrals}
              filterOption={(option) => selectedClientDetail.id != option.value}
              onCustomChange={onChangeReferralClient}
              placeholder="Select Category"
              width="220px"
            />
            <Button
              alignSelf={"start"}
              height={"41px"}
              onClick={() => {
                onOpen();
                setReferralType("normal");
              }}
            >
              Choose
            </Button>
            <CustomModal
              modalTitle={"Client Selection"}
              isOpen={isOpen}
              onClose={onClose}
              formId={menuTitles.selectClient}
            >
              <ClientSelection
                id={menuTitles.selectClient}
                onClose={onClose}
                setSelectedClientDetail={setSelectedClientDetail}
              />
            </CustomModal>
          </Flex>
        </GridItem>
        <GridItem colSpan={1} display="flex" gap={1} justifyContent={"end"} alignItems={"center"}>
          <Flex flex={1} gap={2}>
            <FormSelect
              control={control}
              name="businessReferral"
              label="Business Referral"
              options={businessReferrals}
              onCustomChange={onChangeReferralBusiness}
              labelWidth={"150px"}
              width={"150px"}
              placeholder="Select"
              filterOption={(option) => selectedBusinessReferralDetail.id != option.value}
            />
            <Button
              height={"41px"}
              alignSelf={"start"}
              onClick={() => {
                onNextOpen();
                setReferralType("business");
              }}
            >
              Choose
            </Button>
            <CustomModal
              modalTitle={"Client Selection"}
              isOpen={isNextOpen}
              onClose={onNextClose}
              formId={menuTitles.selectClient}
            >
              <ClientSelection
                onClose={onNextClose}
                setSelectedClientDetail={setSelectedBusinessReferralDetail}
              />
            </CustomModal>
          </Flex>
        </GridItem>

        {/* <GridItem colSpan={2} display={"flex"} alignItems={"center"} gap={2}>
          <FormSelect
            control={control}
            name="businessReferral"
            label="Business Referral"
            options={businessReferrals}
            onCustomChange={onChangeReferralBusiness}
            labelWidth={"145px"}
            width={"250px"}
            placeholder="Select"
            filterOption={(option) => selectedBusinessReferralDetail.id != option.value}
          />
          <Button
            height={"41px"}
            alignSelf={"start"}
            onClick={() => {
              onNextOpen();
              setReferralType("business");
            }}
          >
            Choose
          </Button>
          <CustomModal
            modalTitle={"Client Selection"}
            isOpen={isNextOpen}
            onClose={onNextClose}
            formId={menuTitles.selectClient}
          >
            <ClientSelection
              onClose={onNextClose}
              setSelectedClientDetail={setSelectedBusinessReferralDetail}
            />
          </CustomModal>
        </GridItem> */}
      </Grid>

      {/* <Grid templateColumns={"repeat(4, 1fr)"} padding={"8px 12px"} gap={1}>
        <ReactDatePickerInput control={control} name="createdAt" label="Added" disabled={true} />
        <GridItem>
          <ReadonlyFormInput
            control={control}
            name="createdBy"
            label="Added By"
            labelWidth={"fit-content"}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <HStack alignItems={"center"}>
            <FormMultiSelect
              control={control}
              name="codes"
              options={codes}
              label="Codes"
              placeholder="Select Codes"
              formatValue={(val: string) => val.split("-")[0]}
              maxSelections={8}
            />
            <FormCheckbox
              control={control}
              name="suspendedReminder"
              label="Suspend Reminder"
              // onChange={handleCheckboxChange}
            />
          </HStack>
        </GridItem>
        <GridItem colSpan={4} as={Flex} gap={4}>
          <FormInput
            type="number"
            control={control}
            name="folder"
            label="Folder"
            labelWidth={"40px"}
          />
          <FormInput
            type="number"
            control={control}
            name="co"
            label="Co."
            labelWidth={"fit-content"}
            customWidth="400px"
          />
          <FormInput
            control={control}
            name="contractPriceType"
            label="Contract Price"
            labelWidth={"fit-content"}
            type="number"
          />
          <ReactDatePickerInput
            control={control}
            name="clientSuspendDate"
            label="Suspended Until"
            disabled={watch("suspendedReminder") ? true : false}
          />
        </GridItem>

        <FormSelect
          control={control}
          name="clientClass"
          options={clientClass}
          label="Class"
          labelWidth={"50px"}
          placeholder="Select Class"
        />
        <FormSelect
          control={control}
          name="statementSite"
          options={statementSite}
          placeholder="Select Statement site"
          label="Statement Site"
          // labelWidth={"fit-content"}
          width={"200px"}
        />

        <HStack alignItems={"center"}>
          <FormInput
            type="number"
            control={control}
            name="quantity"
            label="Quality"
            labelWidth={"80px"}
            width={"50px"}
          />

          <FormCheckbox control={control} name="set" label="Set" />
        </HStack>
      </Grid> */}
      <Grid templateColumns={"repeat(3, 1fr)"} padding={"4px 10px"} gap={4}>
        <ReactDatePickerInput
          control={control}
          name="createdAt"
          label="Added"
          disabled={true}
          labelWidth="120px"
          customWidth={"100%"}
        />
        <FormInput
          control={control}
          name="createdBy"
          label="Added By"
          labelWidth="120px"
          width="100%"
        />
        <FormMultiSelect
          control={control}
          name="codes"
          options={codes}
          label="Codes"
          placeholder="Select Codes"
          formatValue={(val: string) => val.split("-")[0]}
          maxSelections={8}
          labelWidth="120px"
        />

        <FormInput
          type="number"
          control={control}
          name="folder"
          label="Folder"
          labelWidth="120px"
          width="100%"
        />
        <FormInput
          type="number"
          control={control}
          name="co"
          label="Co."
          labelWidth="120px"
          width="100%"
        />
        <FormInput
          control={control}
          name="contractPriceType"
          label="Contract Price"
          labelWidth="90px"
          type="number"
          width="100%"
        />
        <FormSelect
          control={control}
          name="clientClass"
          options={clientClass}
          label="Class"
          labelWidth="120px"
          placeholder="Select Class"
          width="100%"
        />

        <FormSelect
          control={control}
          name="statementSite"
          options={statementSite}
          placeholder="Select Statement Site"
          label="Statement Site"
          labelWidth="120px"
        />
        <ReactDatePickerInput
          control={control}
          name="clientSuspendDate"
          label="Suspended Until"
          labelWidth="120px"
          disabled={watch("suspendedReminder")}
        />
        <FormInput
          type="number"
          control={control}
          name="quantity"
          label="Quality"
          labelWidth="120px"
          width="100%"
        />
        <HStack width="100%" justifyContent="space-between">
          <FormCheckbox control={control} name="set" label="Set" />
        </HStack>
        <HStack width="100%" justifyContent="space-between">
          <FormCheckbox
            control={control}
            name="suspendedReminder"
            label="Suspend Reminder"
            justifyContent={"end"}
          />
        </HStack>
      </Grid>

      <Grid templateColumns={"1fr 1fr"} gap={1} padding={"8px 12px"}>
        <GridItem display={"flex"} gap={1}>
          <Box flexBasis={"200px"} flexShrink={1}>
            <FormSelect
              control={control}
              name="spouseCellCode"
              placeholder="code"
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
              label="Spouse Cell"
            />
          </Box>
          <Box flex={1}>
            <FormInput
              type="tel"
              control={control}
              name="spousePhoneNo"
              placeholder="Enter Spouse Cell"
            />
          </Box>
        </GridItem>
        <FormInput
          control={control}
          type="tel"
          name="spouseWorkPhoneNo"
          label="Spouse Work#"
          placeholder="Enter Spouse Work"
        />
      </Grid>
    </VStack>
  );
};

export default PersonalInformation;
