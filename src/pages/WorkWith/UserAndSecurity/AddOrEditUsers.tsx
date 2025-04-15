import {Box, Button, Flex, Grid, GridItem, HStack, Stack} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {userDefaultValues, UserTypeFields} from "@src/@types/users";
import FormCheckbox from "@src/common/Form/Checkbox";
import FormInput from "@src/common/Form/Input";
import FormSelect from "@src/common/Form/Select";
import FormMultiSelect from "@src/common/Form/Select/MultiSelect";
import {useMasterData} from "@src/hooks/master-data";
import SectionLayout from "@src/layout/SectionLayout";
import {userSchema} from "@src/schema/users";
import {useAddUserMutation, useUpdateUserMutation} from "@src/services/user/mutation";
import {useGetUsersById} from "@src/services/user/queries";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

const AddOrEditUsers = ({
  mode = "add",
  onCloseModal,
  categoryList,
  rowID,
}: {
  mode?: "add" | "edit";
  onCloseModal: () => void;
  categoryList?: Record<string, string>;
  rowID?: number | string;
}) => {
  const methods = useForm({
    defaultValues: userDefaultValues,
    resolver: zodResolver(userSchema),
  });

  const {control, handleSubmit} = methods;
  const [userId, setUserId] = useState(rowID);

  const {mutate} = useAddUserMutation();
  const {mutate: updateUser} = useUpdateUserMutation();
  const {data: userData} = useGetUsersById(String(userId));

  const {historyZip} = useMasterData();

  const submit = (data: UserTypeFields) => {
    const payload = {
      ...data,
      userId: data?.code,
      id: "",
      typeId: 0,
      report: "",
      commissionGroupId: 0,
      dea: "",
      deaExpire: "",
      license: "",
      licenseState: "",
      licenseExpiry: "",
      nbap: "",
      npi: "",
      nan: "",
      employeeId: "",
      clockIn: false,
      periodStart: "",
      trackOvertimeByDay: false,
      dailyHours: 0.0,
      accountId: 0,
      accessTypeId: 0,
    };
    const editPayload = {
      ...data,
      id: rowID,
      userId: data?.code,
      typeId: 0,
      report: "",
      commissionGroupId: 0,
      dea: "",
      deaExpire: "",
      license: "",
      licenseState: "",
      licenseExpiry: "",
      nbap: "",
      npi: "",
      nan: "",
      employeeId: "",
      clockIn: false,
      periodStart: "",
      trackOvertimeByDay: false,
      dailyHours: 0.0,
      accountId: 0,
      accessTypeId: 0,
    };
    if (mode === "add") {
      mutate(payload, {
        onSuccess: (response) => {
          setUserId(response?.data?.categoryId);
          onCloseModal();
        },
      });
    } else {
      updateUser(editPayload, {
        onSuccess: (response) => {
          setUserId(response?.data?.categoryId);
          onCloseModal();
        },
      });
    }
  };

  useEffect(() => {
    if (userData && rowID) {
      methods.reset({
        ...userData,
        code: userData?.userId,
        categoryId: userData.categoryId?.toString(),
        username: userData?.username,
        address: userData?.address?.toString(),
      });
    }
  }, [userData]);

  return (
    <Box p={3}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          <SectionLayout hasHeader={false} contentBg="transparent">
            <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={4} p={4}>
              <Stack>
                <FormInput name="code" control={control} label="Code" />
                <FormInput name="fullName" control={control} label="Full Name" />
              </Stack>
              <Stack>
                <FormInput name="cellPhone" type="tel" control={control} label="Contact Number" />
                <FormInput name="userEmail" control={control} label="Email Address" />
              </Stack>
              <Stack gap={2}>
                <FormSelect
                  name="address"
                  control={control}
                  label="Address"
                  options={historyZip}
                  placeholder="Select Address"
                />
                <FormMultiSelect
                  name="locations"
                  control={control}
                  label="Location"
                  options={historyZip}
                />
              </Stack>
              <GridItem>
                <Stack gap={2}>
                  <FormInput name="username" control={control} label="User Name" />
                  <FormInput name="password" control={control} type="password" label="Password" />
                </Stack>
              </GridItem>
              <GridItem gap={2}>
                <FormSelect
                  options={categoryList as unknown as Record<string, string>}
                  name="categoryId"
                  label="Category"
                  control={control}
                />
              </GridItem>
              <Flex alignItems="center" justifyContent={"center"} gap={4}>
                <FormCheckbox name="doctor" control={control} label="Is Doctor" />
                <FormCheckbox name="inactive" control={control} label="Status" />
              </Flex>
            </Grid>
          </SectionLayout>
          <HStack padding={2} justifyContent="center" alignItems={"center"}>
            <Button variant={"outline"} mr={3} borderRadius={"5px"} onClick={onCloseModal}>
              Cancel{" "}
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
export default AddOrEditUsers;
