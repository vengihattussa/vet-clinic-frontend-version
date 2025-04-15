import {Control, useController, type FieldValues, type Path} from "react-hook-form";
import {Box, Checkbox, Text, type CheckboxProps as ChakraCheckboxProps} from "@chakra-ui/react";

interface CheckboxProps<T extends FieldValues> extends ChakraCheckboxProps {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  margin?: string;
}

const FormCheckbox = <T extends FieldValues>({
  name,
  control,
  label = "",
  margin,
  ...rest
}: CheckboxProps<T>) => {
  const {field} = useController({
    name,
    control,
  });

  return (
    <Box alignItems={"center"} justifyContent={"center"}>
      <Checkbox marginBottom={margin} isChecked={field.value} onChange={field.onChange} {...rest}>
        <Text fontSize={"16"} fontWeight={"700"} onClick={rest.onClick} whiteSpace={"nowrap"}>
          {label}
        </Text>
      </Checkbox>
    </Box>
  );
};

export default FormCheckbox;
