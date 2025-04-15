import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import {useController, type Control, type FieldValues, type Path} from "react-hook-form";

export interface FormTextAreaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  helperText?: string;
  label?: string;
  isRequired?: boolean;
  labelWidth?: string;
  height?: string;
}

const FormTextArea = <T extends FieldValues>({
  control,
  name,
  label,
  isRequired,
  labelWidth = "75px",
  ...rest
}: FormTextAreaProps<T>) => {
  const {
    field,
    fieldState: {error},
  } = useController({control, name});

  return (
    <FormControl isInvalid={!!error} display="flex" flexDirection="column">
      {!!label && (
        <FormLabel
          as="legend"
          fontWeight="600"
          fontSize="16"
          minWidth={labelWidth}
          m={1.5}
          textAlign="start"
        >
          {label}&nbsp;
          {isRequired && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}
        </FormLabel>
      )}
      <Flex direction="column" flex={1}>
        <Tooltip hasArrow label={field.value} fontSize="xs">
          <Textarea
            background="white"
            boxShadow="sm"
            fontSize="xs"
            padding="10px"
            {...field}
            {...rest}
            sx={{
              "&[aria-invalid=true]": {
                boxShadow: "none",
              },
            }}
            resize={"none"}
          />
        </Tooltip>
        {error && (
          <FormErrorMessage fontSize="2xs" mt={0.5}>
            {error.message}
          </FormErrorMessage>
        )}
      </Flex>
    </FormControl>
  );
};

export default FormTextArea;
