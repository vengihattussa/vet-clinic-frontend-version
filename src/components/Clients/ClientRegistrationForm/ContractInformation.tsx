import {Box, Flex, Grid, GridItem, HStack} from "@chakra-ui/react";
import FormInput from "@src/common/Form/Input";
import FormSelect from "@src/common/Form/Select";
import {useMasterData} from "@src/hooks/master-data";
import type {ClientRegistrationType} from "@src/pages/Client/form";
import {useGetStateByZip} from "@src/services/client/mutations";
import {getCountryName} from "@src/services/master-data";
import {countryCodeMap} from "@src/utils/master-data";
import {useEffect, useRef, useState} from "react";
import {useFormContext} from "react-hook-form";

const transformData = (data: object) => {
  const transformedData: Record<string, string> = {};
  Object.entries(data).forEach((obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key as keyof typeof data];
    transformedData[key as keyof typeof data] = key;
    transformedData[value] = value;
  });
  return transformedData;
};

const ContractInformation = () => {
  const {control, watch, setValue} = useFormContext<ClientRegistrationType>();
  const contactPref = watch("contactPreference");
  const {country: countries, contactPreference, historyZip, title, state} = useMasterData();
  const historyZipIds = transformData(historyZip);

  const [zip, setZip] = useState("");
  const {data, isSuccess} = useGetStateByZip(zip ?? "");
  const firstRender = useRef(true);

  // const zipTimeoutRef = useRef<NodeJS.Timeout>();
  // useEffect(() => {
  //   zipTimeoutRef.current = setTimeout(() => {
  //     setZip(watch(`zipCode`) ?? "");
  //   }, 500); // Reduced debounce time to 500ms
  //   return () => {
  //     if (zipTimeoutRef.current) {
  //       clearTimeout(zipTimeoutRef.current);
  //     }
  //   };
  // }, [watch(`zipCode`)]);

  useEffect(() => {
    setTimeout(() => setZip(watch(`zipCode`) ?? ""), 2000);
  }, [watch(`zipCode`)]);

  useEffect(() => {
    if (data && watch(`state`) !== data?.id?.toString() && !firstRender.current) {
      setValue(`zipCode`, "");
    } else {
      firstRender.current = false;
    }
  }, [watch(`state`)]);

  useEffect(() => {
    setValue("state", "");
    if (data && isSuccess) {
      setValue(`state`, data?.id?.toString());
    }
  }, [data, isSuccess, setValue]);

  useEffect(() => {
    setValue("state", "");
    setValue("zipCode", "");
    const countryId = watch("country");
    if (!countryId) return;
    const countryName = getCountryName(countryId, countries);
    if (!countryName) return;
    const defaultCountryCode = countryCodeMap(countryName);

    if (!watch("phoneCode")) {
      setValue("phoneCode", defaultCountryCode);
    }
    if (!watch("workPhoneCode")) {
      setValue("workPhoneCode", defaultCountryCode);
    }
    if (!watch("cellCode")) {
      setValue("cellCode", defaultCountryCode);
    }
    if (!watch("spouseWorkPhoneNo")) {
      setValue("spouseWorkPhoneNo", defaultCountryCode);
    }
  }, [watch("country"), countries]);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={1}>
      <FormInput
        control={control}
        placeholder="Enter Last Name"
        name="lastName"
        label="Last"
        isRequired
      />
      <FormInput
        control={control}
        placeholder="Enter First Name"
        name="firstName"
        label="First"
        isRequired
      />
      <GridItem rowSpan={2}>
        <FormSelect
          control={control}
          placeholder="Select Title"
          name="title"
          options={title}
          label="Title"
        />
      </GridItem>

      <GridItem rowSpan={2} display={"flex"} flexDirection={"column"} gap={1}>
        <FormInput control={control} placeholder="Enter Address" name="address" label="Address" />
        <FormInput control={control} placeholder="Enter Address 1" name="address1" label=" " />
      </GridItem>

      <FormInput
        control={control}
        name="zipCode"
        placeholder="Enter Zip Code"
        label="Zip"
        type="number"
      />

      <GridItem display={"flex"} gap={1}>
        <Box flexBasis={"200px"} flexShrink={1}>
          <FormSelect
            control={control}
            name="phoneCode"
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
            label="Phone"
            isRequired
          />
        </Box>
        <Box flex={1}>
          <FormInput type="tel" control={control} placeholder="Enter Number" name="phoneNo" />
        </Box>
      </GridItem>

      <FormInput
        control={control}
        name="faxNo"
        placeholder="Enter Fax Number"
        type="tel"
        label="Fax No."
      />

      <Box flex={2}>
        <GridItem display={"flex"}>
          <FormInput
            control={control}
            name="city"
            placeholder="Enter City"
            label="City"
            width={"full"}
            isRequired
          />

          <FormSelect
            control={control}
            name="state"
            label="State"
            placeholder={
              getCountryName(watch("country") ?? "", countries) !== "United States"
                ? "Select State"
                : "Select State"
            }
            options={state}
            key={watch("country")}
            labelWidth={"fit-content"}
            isDisabled={getCountryName(watch("country") ?? "", countries) !== "United States"}
            isRequired={getCountryName(watch("country") ?? "", countries) === "United States"}
          />
        </GridItem>
      </Box>

      <GridItem display={"flex"} gap={1}>
        <Box flexBasis={"120px"} flexShrink={1}>
          <FormSelect
            control={control}
            name="workPhoneCode"
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
            label="Work Cell"
            width="100px"
          />
        </Box>
        <Box flex={1}>
          <FormInput
            type="tel"
            control={control}
            placeholder="Enter Number"
            name="workPhoneNo"
            isRequired={contactPref === "2"}
          />
        </Box>
      </GridItem>

      <GridItem display={"flex"} gap={1}>
        <Box flexBasis={"200px"} flexShrink={1}>
          <FormSelect
            control={control}
            name="cellCode"
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
            label="Cell"
          />
        </Box>
        <Box flex={1}>
          <FormInput
            type="tel"
            control={control}
            name="cellNo"
            placeholder="Enter Number"
            isRequired={contactPref === "3"}
          />
        </Box>
      </GridItem>

      {/* Country - Now with empty row behavior */}
      <GridItem>
        <FormSelect
          control={control}
          name="country"
          placeholder="Select Country"
          options={countries}
          label="Country"
          isRequired
        />
      </GridItem>

      <GridItem />
      <GridItem />

      <GridItem>
        <FormSelect
          placeholder="Select eClaim Contact Pref"
          control={control}
          name="contactPreference"
          label="eClaim Contact Pref"
          options={contactPreference}
          labelWidth={"2px"}
          width={"310px"}
        />
      </GridItem>
      <FormInput
        control={control}
        placeholder="Enter Email Address"
        name="email"
        label="Email"
        labelWidth={"80px"}
        isRequired={contactPref === "4"}
      />

      <GridItem display={"flex"} as={HStack} mt={1}>
        <Flex>
          <Box flexShrink={1}>
            <FormSelect
              control={control}
              name="spouseWorkPhoneNo"
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
              width="100px"
            />
          </Box>
          <Box>
            <FormInput
              type="tel"
              placeholder="Enter Number"
              control={control}
              name="spousePhoneNo"
            />
          </Box>
        </Flex>
      </GridItem>

      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />

      <GridItem colSpan={2} display={"flex"} gap={2}>
        <FormSelect
          placeholder="Select Country Code"
          control={control}
          name="historyZip"
          label="History-Zip"
          options={historyZipIds}
          labelWidth={"100px"}
        />
        <FormSelect
          placeholder="Select Country"
          control={control}
          name="historyZip"
          labelWidth="fit-content"
          options={historyZip}
        />
      </GridItem>
    </Grid>
  );
};

export default ContractInformation;
