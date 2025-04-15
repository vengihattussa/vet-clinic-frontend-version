import {useState, useEffect, useRef} from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Box,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {useController, type Control, type FieldValues, type Path} from "react-hook-form";
import {CalendarIcon} from "@src/assets/svgs";

// Utility function to format the date in MM/DD/YY
// const formatDateToMMDDYY = (date: Date) => {
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");
//   const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
//   return `${month}/${day}/${year}`;
// };

const formatDateToMMDDYY = (date: Date) => {
  if (isNaN(date.getTime())) return "";
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${month}/${day}/${year}`;
};

interface ReactDatePickerInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  disabled?: boolean;
  labelWidth?: string;
  minDate?: Date; // Minimum date
  maxDate?: Date; // Maximum date
  customWidth?: string;
}

const ReactDatePickerInput = <T extends FieldValues>({
  control,
  name,
  label,
  isRequired,
  labelWidth = "75px",
  minDate = new Date(1900, 0, 1), // Default min date: Jan 1, 1900
  maxDate = new Date(2100, 11, 31), // Default max date: Dec 31, 2100
  disabled = false,
  customWidth,
}: ReactDatePickerInputProps<T>) => {
  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({control, name});

  const [inputValue, setInputValue] = useState(value ? formatDateToMMDDYY(new Date(value)) : "");

  const datepickerRef = useRef<ReactDatePicker | null>(null);

  useEffect(() => {
    if (value && value !== inputValue) {
      setInputValue(formatDateToMMDDYY(new Date(value)));
    }
  }, [value]);

  // const handleDateChange = (date: Date | null) => {
  //   const formattedDate = date ? formatDateToMMDDYY(date) : "";
  //   setInputValue(formattedDate);
  //   onChange(formattedDate);
  // };

  const handleDateChange = (date: Date | null) => {
    if (!date || isNaN(date.getTime())) {
      setInputValue("");
      onChange(null);
      return;
    }
    const formattedDate = formatDateToMMDDYY(date);
    setInputValue(formattedDate);
    onChange(date.toISOString());
  };

  return (
    <FormControl isInvalid={!!error} width={customWidth} alignItems={"center"} as={HStack}>
      {!!label && (
        <FormLabel as="legend" fontWeight="700" fontSize="16" minWidth={labelWidth} m={1}>
          {label}&nbsp;
          {isRequired && (
            <Text as="span" color="red.500">
              *
            </Text>
          )}
        </FormLabel>
      )}
      {!label && isRequired && (
        <Text as="span" color="red.500" alignSelf="center" mr={1}>
          *
        </Text>
      )}
      <VStack alignItems={"stretch"} gap={0} w={"100%"}>
        <Flex
          direction={"column"}
          sx={{
            input: {
              boxShadow: "md",
              h: "42px",
              borderRadius: "6px",
              fontSize: "sm",
              padding: "10px",
              paddingRight: "40px",
              width: customWidth ?? "full",
            },
          }}
        >
          <ReactDatePicker
            ref={(el) => (datepickerRef.current = el)}
            // selected={value ? new Date(value) : null}
            selected={value && !isNaN(new Date(value).getTime()) ? new Date(value) : null}
            onChange={handleDateChange}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={201}
            // Year dropdown range 1900 to 2100
            dateFormat="MM/dd/yyyy"
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            showIcon
            icon={
              <Box
                top="50%"
                right={3}
                transform="translateY(-50%)"
                boxSize="24px"
                sx={{
                  svg: {
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                  },
                }}
                onClick={() => datepickerRef.current?.setFocus()}
              >
                <CalendarIcon />
              </Box>
            }
          />
        </Flex>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </VStack>
    </FormControl>
  );
};

export default ReactDatePickerInput;
