import {Box, Grid, GridItem, StackDivider, VStack, Text} from "@chakra-ui/react";
import FileUpload from "@src/common/FileUpload";
import FormCheckbox from "@src/common/Form/Checkbox";
import ReactDatePickerInput from "@src/common/Form/DatePicker";
import FormInput from "@src/common/Form/Input";
import FormSelect from "@src/common/Form/Select";
import FormMultiSelect from "@src/common/Form/Select/MultiSelect";
import {useMasterDataPatient} from "@src/hooks/master-data-patient";
import {IGeneralInformationFormValues} from "@src/pages/Patient/Registration/form";
import {useGetBreedBySpeciesId} from "@src/services/master-data";
import {calculateAge, calculateNumericalAge, convertDecimalAge} from "@src/utils/date";
import {useEffect} from "react";
import {Controller, useFormContext} from "react-hook-form";

const GeneralForm = () => {
  const {control, watch, setValue, clearErrors, trigger} =
    useFormContext<IGeneralInformationFormValues>();
  const {
    color,
    sex,
    codes,
    class: patientClass,
    wellnessDiscount,
    allergy,
    weightUnit,
  } = useMasterDataPatient();

  const {data, mutate} = useGetBreedBySpeciesId();
  const breeds = data?.data || {};

  useEffect(() => {
    const speciesId = watch("species");
    if (!speciesId) return;
    mutate(speciesId);
  }, [watch("species")]);

  useEffect(() => {
    const dateOfBirth = watch("dateOfBirth");
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const numericalAge = calculateNumericalAge(birthDate);
      setValue("age", numericalAge);
      trigger("age");
    }
  }, [watch("dateOfBirth"), setValue, trigger]);

  useEffect(() => {
    if (watch("isDobUnknown")) {
      clearErrors("dateOfBirth");
      setValue("dateOfBirth", null);
    } else {
      setValue("age", undefined);
    }
  }, [watch("isDobUnknown")]);

  useEffect(() => {
    const selectedCodes = watch("codes") || [];
    const isDeceased = Array.isArray(selectedCodes) && selectedCodes.includes("1");

    if (!isDeceased) {
      setValue("deceasedDate", null);
    }
  }, [watch("codes"), setValue]);
  

  return (
    <Box>
      <VStack divider={<StackDivider />} align="stretch" p={0} mb={2}>
        <Grid
          templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}}
          gap={2}
          padding="8px 12px"
          alignItems="center"
        >
          <FormSelect
            control={control}
            name="breed"
            label="Breed"
            options={breeds}
            labelWidth={"85px"}
            placeholder="Select Breed"
          />
          <FormCheckbox control={control} name="breedMixed" label="Mixed" />

          <FormSelect
            control={control}
            name="color"
            label="Color"
            placeholder="Select Color"
            options={color}
            labelWidth={"85px"}
          />
          <GridItem display="flex" flexDirection={{base: "column", md: "row"}} gap={4}>
            {/* <FormInput
              control={control}
              name="age"
              label="Age"
              isRequired={watch("isDobUnknown")}
            /> */}
            <Controller
              name="age"
              control={control}
              render={({field}) => {
                const dateOfBirth = watch("dateOfBirth");
                const isDobUnknown = watch("isDobUnknown");
                const formattedAge = dateOfBirth ? calculateAge(new Date(dateOfBirth)) : "";
                return (
                  <FormInput
                    control={control}
                    name="age"
                    label="Age"
                    isRequired={watch("isDobUnknown")}
                    value={
                      watch("isDobUnknown")
                        ? field.value && !isNaN(field.value)
                          ? convertDecimalAge(field.value)
                          : field.value
                        : formattedAge
                    }
                    onChange={(e) => {
                      if (isDobUnknown) {
                        field.onChange(e.target.value);
                      }
                    }}
                    disabled={!watch("isDobUnknown")}
                  />
                );
              }}
            />

            <FormSelect
              control={control}
              name="sex"
              label="Sex"
              placeholder="Select Sex"
              options={sex}
              labelWidth="40px"
              isRequired
            />
          </GridItem>
          <GridItem
            display="flex"
            flexDirection={{base: "column", md: "row"}}
            gap={4}
            alignItems={"center"}
          >
            <ReactDatePickerInput
              control={control}
              name="dateOfBirth"
              label="Birthday"
              disabled={watch("isDobUnknown")}
              labelWidth={"90px"}
              maxDate={new Date()}
              isRequired={!watch("isDobUnknown")}
            />
            <FormCheckbox control={control} name="isDobUnknown" label="Unknown" />
          </GridItem>
          <GridItem display="flex" flexDirection={{base: "column", md: "row"}} gap={4}>
            <FormInput control={control} name="weight" label="Weight" placeholder="Enter Weight" />

            <FormSelect
              control={control}
              name="weightUnit"
              placeholder="Select Unit"
              label="In"
              options={weightUnit}
              labelWidth="40px"
              isRequired={!!watch("weight")}

            />
          </GridItem>
          <FormMultiSelect
            control={control}
            name="codes"
            options={codes}
            label="Codes"
            placeholder="Select Codes"
            formatValue={(val) => val.split("-")[0]}
            labelWidth={"85px"}
            maxSelections={5}
          />

          <FormInput
            placeholder="Enter Certificate Number"
            control={control}
            name="certificate"
            label="Certificate"
            labelWidth={"155px"}
          />
          <FormInput
            control={control}
            placeholder="Enter Rabies Id"
            name="rabies"
            label="Rabies"
            labelWidth={"85px"}
          />
          <FormInput
            placeholder="Enter Patient Record Id"
            control={control}
            name="patientRecordId"
            label="ePetRecords ID"
            labelWidth={"155px"}
          />
          <FormInput
            control={control}
            type="number"
            placeholder="Enter Microchip"
            name="microchip"
            label="Microchip"
            labelWidth={"60px"}
          />
          <FormInput
            control={control}
            name="plan"
            placeholder="Enter Plan"
            label="Plan"
            labelWidth={"155px"}
          />
          <GridItem textAlign={"center"}>
            <FileUpload control={control} name="image" label="Photo" labelWidth={"86px"} />
            <Text lineHeight={"1px"} p={1} fontSize={"12px"} fontStyle={"italic"}>
              (** File must be less than 5 MB)
            </Text>
          </GridItem>
          <FormSelect
            control={control}
            placeholder="Select Class"
            name="patientClass"
            label="Class"
            options={patientClass}
            labelWidth={"155px"}
          />
          <FormInput control={control} name="folder" label="Folder" labelWidth={"85px"} />
          <FormSelect
            control={control}
            name="wellnessDiscount"
            label="Wellness Discount"
            placeholder="Select Wellness discount"
            options={wellnessDiscount}
            labelWidth={"85px"}
            //isRequired
          />
          <ReactDatePickerInput
            control={control}
            name="createdDate"
            label="Added"
            disabled
            labelWidth={"88px"}
          />
          <ReactDatePickerInput
            control={control}
            name="reminderDate"
            label="Reminded"
            labelWidth={"153px"}
            minDate={new Date()}
            //isRequired
          />
          <GridItem>
            <FormMultiSelect
              control={control}
              name="allergy"
              options={allergy}
              label="Allergy"
              placeholder="Select Allergy"
              labelWidth={"85px"}
              //isRequired
            />
          </GridItem>
          <ReactDatePickerInput
            control={control}
            name="suspendedDate"
            label="Suspend Until"
            labelWidth={"153px"}
            minDate={new Date()}
            //isRequired
          />
          <Box></Box>
          <Box>
            <ReactDatePickerInput
              control={control}
              name="deceasedDate"
              label="Deceased"
              labelWidth={"153px"}
              disabled={!Array.isArray(watch("codes")) || !watch("codes")?.includes("1")}
              isRequired={Array.isArray(watch("codes")) && watch("codes")?.includes("1")}
            />
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
};

export default GeneralForm;
