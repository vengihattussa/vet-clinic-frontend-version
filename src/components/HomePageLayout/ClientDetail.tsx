import {Box, Flex, Grid, GridItem} from "@chakra-ui/react";
import {ReadonlyFormInput} from "@src/common/Form/Input/ReadonlyInput";
import {ReadonlyFormMultiSelect} from "@src/common/Form/Select/ReadonlyMultiSelect";
import {ReadonlyFormSelect} from "@src/common/Form/Select/ReadonlySelect";
import {useMasterData} from "@src/hooks/master-data";
import {getCountryName} from "@src/services/master-data";
import {convertToTitleCase, formatedDate} from "@src/utils/date";
import {countryCodeMap} from "@src/utils/master-data";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import SectionLayout from "../../layout/SectionLayout";
import {useSelectClientStore} from "../../store/client/selectClient";
import {useClientDetailStore} from "@src/store/client/client-detail";
import {useGetClientName} from "@src/services/client/queries";

const defaultValues = {
  lastName: "",
  firstName: "",
  title: "",
  createdAt: "",
  address: "",
  address1: "",
  phoneCode: "",
  cellCode: "",
  phoneNo: "",
  codes: [] as unknown as string[],
  faxNo: 0,
  workPhoneNo: "",
  workPhoneCode: "",
  clientClass: "",
  country: "",
  city: "",
  state: "",
  spousePhoneNo: "",
  balance: "",
  zipCode: "",
  email: "",
  cellNo: "",
  folder: 0,
  co: "",
  referralCategory: "",
  spouseCellCode: "",
  relationshipName: "",
};

const ClientForm = () => {
  const {control, reset} = useForm({
    defaultValues,
  });

  const {
    country: countries,
    codes,
    class: clientClass,
    referralCategory,
    title,
    state,
  } = useMasterData();

  const {details} = useClientDetailStore();
  const {data: clientData} = useGetClientName(details?.clientReferral ?? "");
  useEffect(() => {
    if (!details) return;
    const countryName = details?.country && getCountryName(details.country, countries);
    if (!countryName) return;
    const countryCode = countryCodeMap(countryName);

    reset({
      ...details,
      // phoneCode: countryCode ?? "phoneCode",
      // spouseCellCode: countryCode ?? "spouseCellCode",
      // workPhoneCode: details?.workPhoneCode ? details.workPhoneCode : (countryCode ?? ""),
      // cellCode: countryCode ?? "",

      phoneCode: details?.phoneCode || countryCode || "",
      spouseCellCode: details?.spouseCellCode || countryCode || "",
      workPhoneCode: details?.workPhoneCode || countryCode || "",
      cellCode: details?.cellCode || countryCode || "",
      email: details?.email ?? "",
      title: details?.title ?? "",
      address: details.address ?? "",
      createdAt: details?.createdAt ? formatedDate(details.createdAt) : "",
      referralCategory: details?.clientReferral ? clientData : (details?.referralCategory ?? ""),
      zipCode: details?.zipCode ?? "",
      state: details.state ?? "",
      city: details?.city ?? "",
      workPhoneNo: details?.workPhoneNo ?? "",
      faxNo: details?.faxNo ?? ("" as unknown as number),
      cellNo: details?.cellNo ?? "",
      address1: details?.address1 ?? "",
      co: details?.co ?? "",
      spousePhoneNo: details.spousePhoneNo ?? "",
    });
  }, [JSON.stringify(details), clientData]);

  return (
    <Grid templateColumns={"1.5fr 1fr 0.7fr 0.8fr"} gap={1}>
      <ReadonlyFormInput control={control} name="lastName" label="Last" />
      <ReadonlyFormInput control={control} name="firstName" label="First" />
      <ReadonlyFormSelect control={control} name="title" label="Title" options={title} />
      <ReadonlyFormInput control={control} name="createdAt" label="Added" />
      <GridItem rowSpan={2} display={"flex"} flexDirection={"column"} gap={1}>
        <ReadonlyFormInput control={control} name="address" label="Address" />
        <ReadonlyFormInput control={control} name="address1" label=" " />
      </GridItem>
      <GridItem display={"flex"} gap={1}>
        <Box flexBasis={"140px"} flexShrink={1}>
          <ReadonlyFormInput control={control} name="phoneCode" label="Phone" />
        </Box>
        <Box flex={1}>
          <ReadonlyFormInput control={control} name="phoneNo" minWidth={"70px"} />
        </Box>
      </GridItem>
      <ReadonlyFormMultiSelect
        control={control}
        name="codes"
        label="Codes"
        options={codes}
        multiValueTooltipLabel={{
          func: (value) => value.split("-")[0],
          combine: (arr) => arr.join(""),
        }}
        formatValue={(val) => val.split("-")[0]}
      />
      <ReadonlyFormInput control={control} name="faxNo" label="Fax No." />
      <GridItem display={"flex"} gap={1}>
        <Box flexBasis={"140px"} flexShrink={1}>
          <ReadonlyFormInput control={control} name="workPhoneCode" label="Work" />
        </Box>
        <Box flex={1}>
          <ReadonlyFormInput control={control} name="workPhoneNo" minWidth={"70px"} />
        </Box>
      </GridItem>
      <ReadonlyFormSelect
        control={control}
        name="clientClass"
        label="Class"
        options={clientClass}
      />
      <GridItem rowSpan={2}>
        <ReadonlyFormSelect control={control} name="country" label="Country" options={countries} />
      </GridItem>
      <GridItem display={"flex"}>
        <ReadonlyFormInput control={control} name="city" label="City" width={"full"} />
        <ReadonlyFormSelect
          control={control}
          name="state"
          label="State"
          labelWidth={"fit-content"}
          options={state}
        />
      </GridItem>
      {details?.relationshipType ? (
        <ReadonlyFormInput
          control={control}
          name="relationshipName"
          label={convertToTitleCase(details?.relationshipType)}
        />
      ) : (
        <Box></Box>
      )}
      <ReadonlyFormInput control={control} name="balance" label="Balance" />
      <GridItem display={"flex"}>
        <Box minWidth={"180px"}>
          <ReadonlyFormInput control={control} name="zipCode" label="Zip Code" />
        </Box>
        <ReadonlyFormInput
          control={control}
          name="email"
          label="Email"
          labelWidth={"fit-content"}
        />
      </GridItem>
      <GridItem display={"flex"} gap={1}>
        <Box flexBasis={"140px"} flexShrink={1}>
          <ReadonlyFormInput control={control} name="cellCode" label="Cell" />
        </Box>
        <Box flex={1}>
          <ReadonlyFormInput control={control} name="cellNo" minWidth={"70px"} />
        </Box>
      </GridItem>
      <ReadonlyFormInput control={control} name="folder" label="Folder" />
      <GridItem>
        <Flex basis={"100px"}>
          <ReadonlyFormInput
            control={control}
            name="co"
            label="Co."
            labelWidth={"fit-content"}
            width={"40px"}
          />
        </Flex>
        <Flex flex={1} />
      </GridItem>
      {details?.clientReferral ? (
        <ReadonlyFormInput
          control={control}
          name="referralCategory"
          label="Referral."
          labelWidth={"75px"}
          // width={"40px"}
        />
      ) : (
        <ReadonlyFormSelect
          control={control}
          name="referralCategory"
          label="Referral"
          options={referralCategory}
        />
      )}
      <GridItem display={"flex"} gap={1}>
        <Box flexBasis={"160px"} flexShrink={1}>
          <ReadonlyFormInput control={control} name="spouseCellCode" label="Spouse Cell" />
        </Box>
        <Box flex={1}>
          <ReadonlyFormInput control={control} name="spousePhoneNo" />
        </Box>
      </GridItem>
    </Grid>
  );
};

const ClientDetail = ({id}: {id: string | number}) => {
  const {clients, getOne} = useSelectClientStore();

  return (
    <SectionLayout
      borderColor="border.main"
      headerBackground="primary.300"
      contentBg="primary.100"
      contentPadding={"8px 12px"}
      mainTitle={`CLIENT: ${getOne(id)?.name?.toUpperCase()} (${clients.length})`}
      rightContent={`NO.${getOne(id)?.id}`}
    >
      <ClientForm />
    </SectionLayout>
  );
};

export default ClientDetail;
