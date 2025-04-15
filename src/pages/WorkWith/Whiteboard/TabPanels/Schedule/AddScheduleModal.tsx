import {Box, HStack, Stack, Text} from "@chakra-ui/react";
import CustomCheckbox from "@src/common/CustomCheckbox";
import FormInput from "@src/common/Form/Input";
import FormSelect from "@src/common/Form/Select";
import {FormProvider, useForm} from "react-hook-form";

const AddScheduleModal = () => {
  const methods = useForm();
  const {control} = methods;
  return (
    <Box
      mx={4}
      bg={"primary.200"}
      border={"1px solid"}
      borderColor={"border.200"}
      borderRadius={8}
      p={2}
    >
      <FormProvider {...methods}>
        <form>
          <HStack>
            <Stack flex={2}>
              <FormInput control={control} name="code" label="Code" />
              <HStack>
                <FormInput
                  type="number"
                  control={control}
                  name="repeat"
                  label="Repeat"
                  labelWidth={"80px"}
                />
                <FormInput
                  type="number"
                  control={control}
                  name="frequency"
                  label="Frequency"
                  labelWidth={"80px"}
                />
              </HStack>
              <HStack>
                <FormInput
                  type="number"
                  control={control}
                  name="quantity"
                  label="Quantity"
                  labelWidth={"80px"}
                />
                <FormInput
                  type="number"
                  control={control}
                  name="rate"
                  label="Rate"
                  labelWidth={"80px"}
                />
              </HStack>
              <FormSelect
                control={control}
                name="user"
                label="User"
                options={{"1": "Consolidate"}}
                labelWidth={"80px"}
              />
              <FormSelect
                control={control}
                name="category"
                label="Category"
                options={{}}
                labelWidth={"80px"}
              />
              <FormSelect
                control={control}
                name="patient"
                label="Patient"
                options={{}}
                labelWidth={"80px"}
              />
            </Stack>
            <Stack flex={3}>
              <FormInput control={control} name="description" label="Description" />
              <FormSelect
                control={control}
                name="timesPerDay"
                placeholder="Times per Day"
                width="200px"
                options={{}}
              />
              <HStack w={"fit-content"}>
                <FormSelect control={control} name="timesPerDay" width="200px" options={{}} />
                <FormSelect
                  control={control}
                  label="Route"
                  name="route"
                  width="200px"
                  options={{}}
                />
                <HStack>
                  <CustomCheckbox isChecked size={20} />
                  <Text variant={"primary_600"}>Completed</Text>
                </HStack>
              </HStack>
              <HStack w={"fit-content"}>
                <FormInput
                  type="date"
                  control={control}
                  name="start"
                  label="Start"
                  labelWidth={"93px"}
                />
                <FormInput
                  type="time"
                  control={control}
                  label="Time"
                  name="time"
                  labelWidth="93px"
                />
                <HStack>
                  <CustomCheckbox isChecked size={20} />
                  <Text variant={"primary_600"} whiteSpace={"nowrap"}>
                    Post on Checkout
                  </Text>
                </HStack>
              </HStack>
              <HStack w={"fit-content"}>
                <FormInput
                  type="number"
                  control={control}
                  name="amount"
                  label="Amount"
                  labelWidth={"93px"}
                />

                <HStack>
                  <CustomCheckbox isChecked size={20} />
                  <Text variant={"primary_600"} whiteSpace={"nowrap"}>
                    Use Current Price
                  </Text>
                </HStack>
              </HStack>
              <FormInput control={control} label="Client" name="client" />
            </Stack>
          </HStack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddScheduleModal;
