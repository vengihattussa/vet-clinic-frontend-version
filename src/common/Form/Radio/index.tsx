import {HStack, Radio, RadioGroup, Text} from "@chakra-ui/react";
import {Option} from "../Select";
import {Control, FieldValues, Path, useController} from "react-hook-form";

interface IFormRadioProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  size?: string;
  gap?: number;
}

const FormRadio = <T extends FieldValues>({
  options,
  size,
  name,
  control,
  gap,
}: IFormRadioProps<T>) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController({name, control});

  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <RadioGroup onChange={handleChange} value={value}>
      <HStack spacing={gap ?? 16}>
        {options?.map((item, index) => (
          <Radio value={item.value} size={size ?? "lg"} colorScheme="green" key={index}>
            <Text fontSize={17} fontWeight={600}>
              {item.label}
            </Text>
          </Radio>
        ))}
      </HStack>
      {error && (
        <Text fontSize="2xs" mt={0.5} color="red.500">
          {error.message}
        </Text>
      )}
    </RadioGroup>
  );
};

export default FormRadio;
