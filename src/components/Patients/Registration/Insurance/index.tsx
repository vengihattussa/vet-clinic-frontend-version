import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  StackDivider,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import CustomModal from "@src/common/CustomModal";
import FormInput from "@src/common/Form/Input";
import FormSelect from "@src/common/Form/Select";
import {menuTitles} from "@src/constants/menuTitles";
import {useMasterDataPatient} from "@src/hooks/master-data-patient";
import ClientSelection from "@src/pages/Client/ClientSelection";
import {IInsuranceFormValues} from "@src/pages/Patient/Registration/form";
import {useSelectClientStore} from "@src/store/index";
import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";

const labelWidth = "120px";

const InsuranceForm = ({}: {}) => {
  const {setSelectedClientDetail} = useSelectClientStore();

  const methods = useFormContext<IInsuranceFormValues>();
  const {onOpen, isOpen, onClose} = useDisclosure();
  const {control, setValue, reset, getValues, watch, trigger} = methods;

  const [selectedPolicyHolder, setSelectedPolicyHolder] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    if (selectedPolicyHolder.id) {
      setSelectedClientDetail(selectedPolicyHolder);
      setValue("policyHolder", selectedPolicyHolder.name?.toString());
      setValue("petOwnerName", selectedPolicyHolder.name?.toString());
    }
  }, [selectedPolicyHolder]);

  const {insuranceProviders} = useMasterDataPatient();

  // useEffect(() => {
  //   if (!petOwner) return;
  //   setValue("clientId", petOwner.name);
  //   setSelectedClientDetail(selectedPolicyHolder.id ? selectedPolicyHolder : petOwner);
  //   setValue("policyHolder", selectedPolicyHolder.name || petOwner.name);
  // }, [petOwner]);

  const handleRemovePolicy = () => {
    reset({
      ...getValues(),
      policyHolder: "",
      policyNumber: "",
      insuranceProvider: "",
    });
  };

  useEffect(() => {
    if (watch("policyHolder")) {
      trigger("policyHolder");
      trigger("policyNumber");
      trigger("insuranceProvider");
    }
  }, [watch("policyHolder")]);

  return (
    <Box>
      <VStack divider={<StackDivider />} align="normal" p={0} mb={2}>
        <Grid gap={1} padding={"8px 12px"} alignItems={"center"}>
          <FormInput
            control={control}
            name="petOwnerName"
            label="Pet Owner"
            labelWidth={labelWidth}
          />
          {/* <FormInput
            control={control}
            name="clientId"
            label="Client Name"
            labelWidth={labelWidth}
          /> */}
          <HStack gap={2} alignItems={"center"} justifyContent={"center"}>
            <GridItem flex={1}>
              <FormInput
                control={control}
                name="policyHolder"
                label="Policy holder"
                labelWidth={labelWidth}
              />
            </GridItem>
            <Button mt={2} onClick={onOpen} height={"30px"} alignSelf={"start"}>
              Choose
            </Button>
          </HStack>
          <FormInput
            control={control}
            name="policyNumber"
            label="Policy Number"
            labelWidth={labelWidth}
          />
          <FormSelect
            control={control}
            name="insuranceProvider"
            options={insuranceProviders}
            label="Insurance Provider"
            labelWidth={labelWidth}
          />
          <Button width={"fit-content"} mt={4} onClick={handleRemovePolicy}>
            Remove Policy
          </Button>
        </Grid>
      </VStack>
      <CustomModal
        modalTitle={"Client Selection"}
        isOpen={isOpen}
        onClose={onClose}
        formId={menuTitles.selectClient}
      >
        <ClientSelection
          id={menuTitles.selectClient}
          onClose={onClose}
          setSelectedClientDetail={setSelectedPolicyHolder}
        />
      </CustomModal>
    </Box>
  );
};

export default InsuranceForm;
