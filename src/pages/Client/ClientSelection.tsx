import {Flex, Grid} from "@chakra-ui/react";
import FormInput from "@src/common/Form/Input";
import ResultTable from "@src/components/Clients/ClientSelectionForm/ResultTable";
import SectionLayout from "@src/layout/SectionLayout";
import {ISearchCriteriaProps} from "@src/services/client/interface";
import {useSearchRegisteredClient} from "@src/services/client/queries";
import {removeFalsyKeys} from "@src/utils/object";
import {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {useForm} from "react-hook-form";

const defaultValues = {
  client: "",
  phoneNo: "",
  folder: "",
  account_no: "",
  patientName: "",
  tag: "",
  microchip: "",
  patientId: "",
  patient_record: "",
};

interface ISearchInputProps {
  firstName: string;
  lastName: string;
  client: string;
  phoneNo: string;
  folder: string;
  account_no: string;
  patientName: string;
  tag: string;
  microchip: string;
  patientId: string;
  patient_record: string;
}

interface ISearchInput {
  onClose?: () => void;
  id?: string;
  tabUpdate?: boolean;
  setSelectedClientDetail?: Dispatch<SetStateAction<{id: string; name: string}>>;
}
const ClientSelection = ({onClose, id, tabUpdate, setSelectedClientDetail}: ISearchInput) => {
  const {control, getValues} = useForm<ISearchInputProps>({
    defaultValues,
  });
  const [payloadData, setPayloadData] = useState<ISearchCriteriaProps>();
  const previousValuesRef = useRef<ISearchInputProps | null>(null);
  const {data, refetch} = useSearchRegisteredClient(payloadData);

  const handleBlur = () => {
    const values = getValues();
    const getName = values?.client.split(" ");
    const val = {...values, firstName: getName[0], lastName: getName[1]};
    const payload = {
      searchCriteria: removeFalsyKeys(val),
      pageSize: 20,
    };
    if (JSON.stringify(previousValuesRef.current) !== JSON.stringify(values) && payload) {
      previousValuesRef.current = values;
      setPayloadData(payload);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };
  useEffect(() => {
    if (payloadData) {
      refetch();
    }
  }, [payloadData, refetch]);
  const finalData = useMemo(() => data?.dataList, [data]);
  return (
    <>
      <Grid templateColumns={"repeat(2, 1fr)"} gap={3} m={3}>
        <SectionLayout hasHeader={false} contentPadding={2} contentBg="primary.100">
          <Flex flexDirection={"column"} gap={3}>
            <FormInput
              control={control}
              name="client"
              label="Client"
              labelWidth={"40px"}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
            <FormInput
              control={control}
              name="phoneNo"
              label="Phone Number"
              labelWidth={"90px"}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
            <FormInput
              control={control}
              name="folder"
              label="Folder Number"
              labelWidth={"90px"}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
            <FormInput
              control={control}
              name="account_no"
              label="Account Number"
              labelWidth={"100px"}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
          </Flex>
        </SectionLayout>
        <SectionLayout hasHeader={false} contentPadding={2} contentBg="primary.100">
          <Flex flexDirection={"column"} gap={3}>
            <FormInput
              control={control}
              name="patientName"
              label="Patient"
              labelWidth={"50px"}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
            <FormInput
              control={control}
              name="tag"
              label="Tag No."
              labelWidth={"50px"}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
            <FormInput
              control={control}
              name="microchip"
              label="Microchip ID"
              labelWidth={"80px"}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
            <FormInput
              control={control}
              name="patientId"
              label="Patient ID"
              labelWidth={"80px"}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
            <FormInput
              control={control}
              name="patient_record"
              label="Patient Record Number"
              labelWidth={"140px"}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
          </Flex>
        </SectionLayout>
      </Grid>
      <SectionLayout
        margin={3}
        mainTitle="Results"
        headerBackground="primary.400"
        contentBg="background.100"
      >
        <ResultTable
          clientData={finalData || []}
          onClose={onClose}
          id={id}
          tabUpdate={tabUpdate}
          setSelectedClientDetail={setSelectedClientDetail}
        />
      </SectionLayout>
    </>
  );
};
export default ClientSelection;
