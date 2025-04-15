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
import Select, {GroupBase, SelectComponentsConfig, SingleValue} from "react-select";
import {isEmpty} from "../../../utils/object";

export type Option = {label: string; value: string};

export interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  width?: string;
  defaultValue?: string;
  multiValueTooltipLabel?: {
    func: (val: string) => string;
    combine: (arr: Array<unknown>) => string;
  };
  placeholder?: string;
  options: Record<string, string>;
  labelWidth?: InputProps["width"];
  isReadonly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  components?: SelectComponentsConfig<string | Option, boolean, GroupBase<Option>>;
  filterOption?: ((option: Option, inputValue: string) => boolean) | null | undefined;
  onCustomChange?: (newVal?: Option["value"]) => void;
}

const FormSelect = <T extends FieldValues>({
  name,
  control,
  label = "",
  placeholder = "(Select)",
  options = {},
  labelWidth = "75px",
  isRequired,
  isReadonly = false,
  isMulti = false,
  components,
  filterOption,
  onCustomChange,
  width,
  isDisabled,
  defaultValue,
}: FormSelectProps<T>) => {
  const formattedOptions = isEmpty(options)
    ? []
    : Object.entries(options).map(([key, value]) => {
        const regex = /["|'][0-9]+["/']/;
        return {
          label: value,
          // value: regex.test("key") ? key : key.replace(/["']/g, ""),
          value: regex.test(key) ? key : key.replace(/["']/g, ""),
        };
      });

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

      <Tooltip
        hasArrow
        display={isReadonly ? "flex" : "none"}
        label={formattedOptions.find((option) => option.value === field.value)?.label}
      >
        <Flex direction={"column"} flex={1}>
          <Select
            isDisabled={isDisabled}
            ref={field.ref}
            name={field.name}
            filterOption={filterOption}
            closeMenuOnSelect={isMulti ? false : true}
            closeMenuOnScroll={(e) => {
              const target = e.target as HTMLElement;
              if (target && target.className === "chakra-modal__content css-14790lb") {
                return true;
              } else {
                return false;
              }
            }}
            // {...(!isMulti && {
            //   value: formattedOptions.find((option) => option.value === field.value),
            // })}
            defaultValue={defaultValue}
            value={formattedOptions.find((option) => option.value == field.value) || undefined}
            onChange={(newValue) => {
              const option = newValue as SingleValue<Option>;
              field.onChange(option?.value || "");
              onCustomChange && onCustomChange(option?.value);
            }}
            options={formattedOptions}
            placeholder={
              !isReadonly && !field.value ? (
                <Text color="gray" fontWeight="500" fontSize="14px">
                  {placeholder}
                </Text>
              ) : null
            }
            menuPortalTarget={document.body}
            isClearable={true}
            isMulti={isMulti}
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
                width: width ?? "",
                minHeight: "40px",
                "&:hover": {
                  borderColor: "#60803a",
                },
              }),
              dropdownIndicator: (baseStyles) => ({
                ...baseStyles,
                padding: "2px 2px",
                display: isReadonly ? "none" : "block",
                color: "#363636",
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
              // clearIndicator: (baseStyles) => ({
              //   ...baseStyles,
              //   display: "none",
              // }),
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
                fontWeight: "500",
                paddingBlock: 4,
                background: state.isSelected ? "#60803a" : state.isFocused ? "#dfe6d8" : "inherit",
                "&:active": {
                  background: "#dfe6d8",
                },
              }),
              menuList: (baseStyles) => ({
                ...baseStyles,
                maxHeight: "140px",
              }),
              singleValue: () => ({
                marginInline: 0,
              }),
            }}
            components={components}
          />
          {error && (
            <FormErrorMessage fontSize="sm" mt={0.5}>
              {error.message}
            </FormErrorMessage>
          )}
        </Flex>
      </Tooltip>
    </FormControl>
  );
};

export default FormSelect;
