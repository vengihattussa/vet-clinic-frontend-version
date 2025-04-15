import React from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import type {InputProps} from "@chakra-ui/react";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {ReactNode} from "react";
import {useController, type Control, type FieldValues, type Path} from "react-hook-form";
import {colors} from "../../../theme/foundations/colors";
import {formatPhoneNumber} from "@src/utils/phoneFormatting";

export interface FormInputProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
  helperText?: string;
  label?: string;
  extendInput?: ReactNode[];
  groupAlignDirection?: InputProps["flexDirection"];
  labelWidth?: InputProps["width"];
  tail?: string;
  disabled?: boolean;
  setvalue?: React.Dispatch<React.SetStateAction<T>>;
  customWidth?: string;
  placeholder?: string;
  display?: string;
}

const defaultProps: InputProps = {
  _focusWithin: {
    boxShadow: `0 0 0 1px ${colors.primary[500]}`,
    borderColor: "primary.500",
  },
};

const FormInput = <T extends FieldValues>({
  control,
  name,
  onChange,
  setvalue,
  onBlur,
  isRequired,
  label,
  size = "sm",
  type = "text",
  extendInput = [],
  groupAlignDirection = "row",
  customWidth,
  labelWidth = "75px",
  disabled = false,
  placeholder = "",
  display = "flex",
  ...rest
}: FormInputProps<T>) => {
  const {
    field,
    fieldState: {error},
  } = useController({control, name});

  const {isOpen: showPassword, onToggle: togglePassword} = useDisclosure();

  const props = Object.assign({}, defaultProps, rest);

  const inputType = type !== "password" ? type : showPassword ? "text" : "password";

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur();
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <FormControl
      isInvalid={!!error}
      display={display}
      flexDirection={groupAlignDirection}
      alignItems={"center"}
      width={customWidth}
    >
      {!!label && (
        <FormLabel as="legend" fontWeight="700" fontSize="16" minWidth={labelWidth} m={1.5}>
          {label}&nbsp;
          {isRequired && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}
        </FormLabel>
      )}

      {/* Added this to show required star even when there's no label */}
      {!label && isRequired && (
        <Text as="span" color="red.500" alignSelf="center" mr={1}>
          *
        </Text>
      )}

      <Flex direction={"column"} flex={1}>
        <Tooltip
          hasArrow
          label={field.value}
          display={props.isReadOnly ? "flex" : "none"}
          fontSize={"xs"}
        >
          <InputGroup flexDirection={groupAlignDirection} gap={2}>
            <Input
              {...field}
              step="60"
              type={inputType}
              size={size}
              background={"white"}
              boxShadow={"md"}
              h={"42px"}
              disabled={disabled}
              borderRadius={"6px"}
              fontSize={"sm"}
              padding={"10px"}
              placeholder={!field.value ? placeholder || "" : ""}
              {...props}
              {...(onChange ? {onChange} : {})}
              {...(type === "tel" && {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(formatPhoneNumber(e.target.value)),
              })}
              {...(type === "text" && {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.value),
              })}
              {...(type === "date" && {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.value),
              })}
              onBlur={handleBlur}
              sx={{
                "&[aria-invalid=true]": {
                  boxShadow: "none",
                },
                "::-webkit-input-placeholder": {
                  color: "gray",
                  fontWeight: "500",
                  fontSize: "14px",
                },
                "::-moz-placeholder": {
                  color: "gray",
                  fontWeight: "500",
                  fontSize: "14px",
                },
                ":-ms-input-placeholder": {
                  color: "gray",
                  fontWeight: "500",
                  fontSize: "14px",
                },
                ":-moz-placeholder": {
                  color: "gray",
                  fontWeight: "500",
                  fontSize: "14px",
                },
              }}
            />
            {extendInput}
            {type === "password" && (
              <InputRightElement h="full" right={1}>
                <IconButton
                  onClick={togglePassword}
                  aria-label="Toggle Password"
                  icon={<Icon as={showPassword ? ViewIcon : ViewOffIcon} />}
                  borderRadius="50%"
                  aspectRatio={1}
                  variant="ghost"
                />
              </InputRightElement>
            )}
          </InputGroup>
        </Tooltip>
        {error && (
          <FormErrorMessage fontSize="xs" mt={0.5} whiteSpace={"nowrap"}>
            {error.message}
          </FormErrorMessage>
        )}
      </Flex>
    </FormControl>
  );
};

export default FormInput;
