// import {Box, Button, Grid, HStack} from "@chakra-ui/react";
// import {zodResolver} from "@hookform/resolvers/zod";
// import FormInput from "@src/common/Form/Input";
// import {useEffect, useState} from "react";
// import {FormProvider, useForm} from "react-hook-form";
// import SectionLayout from "@src/layout/SectionLayout";
// import {ZipCodeDefaultValues, ZipCodeTypeFields} from "@src/@types/SystemTable";
// import {ZipCodeSchema} from "@src/schema/SystemTable";
// import {useAddTableMutation, useUpdateTableMutation} from "@src/services/SystemTable/API/mutation";
// import {useGetTableById} from "@src/services/SystemTable/API/queries";
// import {CountrySelect} from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
// import FormSelect from "@src/common/Form/Select";
// import {getCountryOptions} from "@src/utils/getCountryOptions";

// const ZipCodeForm = ({
//   mode = "add",
//   onCloseModal,
//   rowID,
// }: {
//   mode?: "add" | "edit";
//   onCloseModal: () => void;
//   categoryList?: Record<string, string>;
//   rowID?: number | string;
// }) => {
//   const countryOptions = getCountryOptions();

//   console.log(countryOptions);
//   const methods = useForm({
//     defaultValues: ZipCodeDefaultValues,
//     resolver: zodResolver(ZipCodeSchema),
//   });

//   console.log(CountrySelect);
//   const {control, handleSubmit} = methods;
//   const [userId, setUserId] = useState(rowID);
//   const {mutate: addTable} = useAddTableMutation(
//     "/api/vetClinic/zipCode/create",
//     "/api/vetClinic/zipCode/list",
//   );
//   const {mutate: updateTable} = useUpdateTableMutation(
//     "/api/vetClinic/zipCode/update",
//     "/api/vetClinic/zipCode/list",
//   );
//   const {data: TableData} = useGetTableById(String(userId), "/api/vetClinic/zipCode/id");

//   const submit = (data: ZipCodeTypeFields) => {
//     const payload = {
//       ...data,
//     };
//     const editPayload = {
//       ...data,
//       id: rowID?.toString() || "",
//     };
//     if (mode === "add") {
//       addTable(payload, {
//         onSuccess: () => {
//           setUserId("");
//           onCloseModal();
//         },
//       });
//     } else {
//       updateTable(editPayload, {
//         onSuccess: () => {
//           setUserId("");
//           onCloseModal();
//         },
//       });
//     }
//   };

//   useEffect(() => {
//     if (TableData && rowID) {
//       methods.reset({
//         ...TableData,
//       });
//     }
//   }, [TableData]);

//   return (
//     <Box p={3}>
//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(submit)}>
//           <SectionLayout hasHeader={false} contentBg="primary.300">
//             <Grid templateColumns={{base: "1fr", md: "repeat(1, 1fr)"}} gap={4} p={4}>
//               <FormInput
//                 name="table"
//                 labelWidth={"120px"}
//                 disabled
//                 control={control}
//                 label="Table"
//                 value={"Zip Code Table"}
//               />

//               <FormInput name="zipCode" labelWidth={"120px"} control={control} label="Postal" />
//               <FormInput control={control} labelWidth={"120px"} name="city" label="City" />
//               <FormInput name="province" labelWidth={"120px"} control={control} label="Province" />
//               <FormInput name="area" labelWidth={"120px"} control={control} label="Area" />
//               <FormInput
//                 name="taxArea"
//                 labelWidth={"120px"}
//                 control={control}
//                 label="Tax Area Name"
//               />
//               <FormSelect
//                 control={control}
//                 placeholder="Select country"
//                 name="country"
//                 options={countryOptions}
//                 label="Country"
//               />
//             </Grid>
//           </SectionLayout>
//           <HStack padding={2} justifyContent="center" alignItems={"center"}>
//             <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onCloseModal}>
//               Cancel
//             </Button>
//             <Button type="submit" minW={"100px"} borderRadius={"5px"}>
//               {mode === "edit" ? "Update" : "OK"}
//             </Button>
//           </HStack>
//         </form>
//       </FormProvider>
//     </Box>
//   );
// };

// export default ZipCodeForm;

import {Box, Button, Grid, HStack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import FormInput from "@src/common/Form/Input";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import SectionLayout from "@src/layout/SectionLayout";
import {ZipCodeDefaultValues, ZipCodeTypeFields} from "@src/@types/SystemTable";
import {ZipCodeSchema} from "@src/schema/SystemTable";
import {useAddTableMutation, useUpdateTableMutation} from "@src/services/SystemTable/API/mutation";
import {useGetTableById} from "@src/services/SystemTable/API/queries";
import FormSelect from "@src/common/Form/Select";
import {getCountryOptions} from "@src/utils/getCountryOptions";

const ZipCodeForm = ({
  mode = "add",
  onCloseModal,
  rowID,
}: {
  mode?: "add" | "edit";
  onCloseModal: () => void;
  categoryList?: Record<string, string>;
  rowID?: number | string;
}) => {
  const countryOptions = getCountryOptions();

  const methods = useForm({
    defaultValues: ZipCodeDefaultValues,
    resolver: zodResolver(ZipCodeSchema),
  });

  const {control, handleSubmit} = methods;
  const [userId, setUserId] = useState(rowID);
  const {mutate: addTable} = useAddTableMutation(
    "/api/vetClinic/zipCode/create",
    "/api/vetClinic/zipCode/list",
  );
  const {mutate: updateTable} = useUpdateTableMutation(
    "/api/vetClinic/zipCode/update",
    "/api/vetClinic/zipCode/list",
  );
  const {data: TableData} = useGetTableById(String(userId), "/api/vetClinic/zipCode/id");

  const submit = (data: ZipCodeTypeFields) => {
    const payload = {
      ...data,
    };
    const editPayload = {
      ...data,
      id: rowID?.toString() || "",
    };
    if (mode === "add") {
      addTable(payload, {
        onSuccess: () => {
          setUserId("");
          onCloseModal();
        },
      });
    } else {
      updateTable(editPayload, {
        onSuccess: () => {
          setUserId("");
          onCloseModal();
        },
      });
    }
  };

  useEffect(() => {
    if (TableData && rowID) {
      methods.reset({
        ...TableData,
        id: TableData.id?.toString(),
      });
    }
  }, [TableData]);

  return (
    <Box p={3}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          <SectionLayout hasHeader={false} contentBg="primary.300">
            <Grid templateColumns={{base: "1fr", md: "repeat(1, 1fr)"}} gap={4} p={4}>
              <FormInput
                name="table"
                labelWidth={"120px"}
                disabled
                control={control}
                label="Table"
                value={"Zip Code Table"}
              />

              <FormInput name="zipCode" labelWidth={"120px"} control={control} label="Postal" />
              <FormInput control={control} labelWidth={"120px"} name="city" label="City" />
              <FormInput name="province" labelWidth={"120px"} control={control} label="Province" />
              <FormInput name="area" labelWidth={"120px"} control={control} label="Area" />
              <FormInput
                name="taxArea"
                labelWidth={"120px"}
                control={control}
                label="Tax Area Name"
              />
              <FormSelect
                control={control}
                placeholder="Select country"
                name="country"
                options={countryOptions}
                label="Country"
              />
            </Grid>
          </SectionLayout>
          <HStack padding={2} justifyContent="center" alignItems={"center"}>
            <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onCloseModal}>
              Cancel
            </Button>
            <Button type="submit" minW={"100px"} borderRadius={"5px"}>
              {mode === "edit" ? "Update" : "OK"}
            </Button>
          </HStack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default ZipCodeForm;
