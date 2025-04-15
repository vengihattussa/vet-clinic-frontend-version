import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {Control, FieldValues, Path, useController} from "react-hook-form";
import Select, {MultiValue, MultiValueProps, components} from "react-select";
import {isEmpty} from "../../../utils/object";

type Option = {label: string; value: string};

export interface FormMultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  multiValueTooltipLabel?: {
    func: (val: string) => string;
    combine: (arr: Array<unknown>) => string;
  };
  placeholder?: string;
  options: Record<string, string>;
  labelWidth?: InputProps["width"];
  isReadonly?: boolean;
  isRequired?: boolean;
  // components?: SelectComponentsConfig<Option, boolean, GroupBase<Option>>;
  formatValue?: (val: string) => string;
  onCustomChange?: (newVal?: Option["value"][]) => void;
  maxSelections?: number;
}

const FormMultiSelect = <T extends FieldValues>({
  name,
  control,
  label = "",
  multiValueTooltipLabel,
  placeholder = "(Select)",
  options = {},
  labelWidth = "75px",
  isReadonly = false,
  formatValue,
  onCustomChange,
  maxSelections,
  isRequired,
}: FormMultiSelectProps<T>) => {
  const formattedOptions = isEmpty(options)
    ? []
    : Object.entries(options).map(([key, value]) => ({
        label: value,
        value: key,
      }));

  const {
    field,
    fieldState: {error},
  } = useController({
    name,
    control,
  });

  return (
    <FormControl isInvalid={!!error} display={"flex"}>
      {!!label && (
        <FormLabel as="legend" fontWeight="700" fontSize="16" width={labelWidth} m={1.5}>
          {label}&nbsp;
          {isRequired && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}
        </FormLabel>
      )}
      <Tooltip
        hasArrow
        display={isReadonly ? "flex" : "none"}
        label={
          multiValueTooltipLabel
            ? multiValueTooltipLabel.combine(
                formattedOptions
                  .filter((option) =>
                    field.value.includes(multiValueTooltipLabel?.func(option.value)),
                  )
                  .map((option) => multiValueTooltipLabel?.func(option.label)),
              )
            : formattedOptions
                .filter((option) => field.value.includes(option.value))
                .map((option) => option.label)
        }
        fontSize={"xs"}
      >
        <Flex direction={"column"} flex={1}>
          <Select
            ref={field.ref}
            name={field.name}
            closeMenuOnSelect={false}
            value={formattedOptions.filter((option) =>
              field.value.includes(
                formatValue ? formatValue(option.value).split("-")[0] : option.value,
              ),
            )}
            // onChange={(newValue) => {
            //   const options = newValue as MultiValue<Option>;
            //   field.onChange(options.map((option) => option?.value));
            //   onCustomChange && onCustomChange(options.map((option) => option?.value));
            // }}

            onChange={(newValue) => {
              const options = newValue as MultiValue<Option>;

              // Enforce selection limit
              if (maxSelections && options.length > maxSelections) {
                return;
              }

              field.onChange(options.map((option) => option?.value));
              onCustomChange && onCustomChange(options.map((option) => option?.value));
            }}
            options={formattedOptions}
            placeholder={
              !isReadonly ? (
                <Text color="gray" fontWeight="500" fontSize="14px">
                  {placeholder}
                </Text>
              ) : (
                ""
              )
            }
            menuPortalTarget={document.body}
            isMulti={true}
            menuPosition="fixed"
            styles={{
              menuPortal: (baseStyles) => ({
                ...baseStyles,
                zIndex: 9999,
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,
                pointerEvents: isReadonly ? "none" : "auto",
                fontSize: "12px",
                boxShadow: state.isFocused ? "0 0 0 1px #60803a" : "inherit",
                border: state.isFocused
                  ? "1px solid #60803a"
                  : error
                    ? "1px solid red"
                    : "1px solid #dfe6d8",
                height: "42px",
                minHeight: "42px",
                "&:hover": {
                  borderColor: "#60803a",
                },
              }),
              dropdownIndicator: (baseStyles) => ({
                ...baseStyles,
                padding: "0 4px",
                display: isReadonly ? "none" : "block",
              }),
              valueContainer: (baseStyles) => ({
                ...baseStyles,
                fontSize: "14px",
                fontWeight: "500",
                maxHeight: "42px",
                display: "flex",
                flexWrap: "nowrap",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }),
              indicatorSeparator: (baseStyles) => ({
                ...baseStyles,
                display: "none",
              }),
              clearIndicator: (baseStyles) => ({
                ...baseStyles,
                display: "none",
              }),
              input: (baseStyles) => ({
                ...baseStyles,
                margin: 0,
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                fontSize: "10px",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                textAlign: "start",
                fontSize: "14px",
                paddingBlock: 4,
                background: state.isSelected ? "#60803a" : state.isFocused ? "#dfe6d8" : "inherit",
                "&:active": {
                  background: "#dfe6d8",
                },
              }),
              menuList: (baseStyles) => ({
                ...baseStyles,
                maxHeight: "120px",
              }),
              ...((formatValue || isReadonly) && {
                multiValue: () => ({
                  maxWidth: "120px",
                  display: "flex",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                  justifyItems: "center",
                  backgroundColor: "lightgray",
                  margin: "0px 4px",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  ":hover": {
                    backgroundColor: "lightgray",
                    color: "red",
                  },
                }),
                multiValueLabel: () => ({
                  padding: "2px 4px",
                  margin: "0px 2px",
                  alignContent: "center",
                  backgroundColor: "lightgray",
                  color: "black",
                }),
                multiValueRemove: () => ({
                  display: "flex",
                }),
              }),
            }}
            components={{
              MultiValue: ({
                children,
                ...props
              }: MultiValueProps<{label: string; value: string}>) => {
                return (
                  <components.MultiValue {...props}>
                    {formatValue && typeof children === "string" ? formatValue(children) : children}
                  </components.MultiValue>
                );
              },
            }}
          />
          {error && (
            <FormErrorMessage fontSize="2xs" mt={0.5}>
              {error.message}
            </FormErrorMessage>
          )}
        </Flex>
      </Tooltip>
    </FormControl>
  );
};

export default FormMultiSelect;
