import {Center} from "@chakra-ui/react";
import {TickIcon} from "@src/assets/svgs";

interface CustomCheckboxProps {
  isChecked: boolean;
  size?: number;
  onChange?: (checked: boolean) => void; // Callback function for state change
}

const CustomCheckbox = ({size = 12, isChecked, onChange}: CustomCheckboxProps) => {
  const baseStyle = {
    borderRadius: "4px",
    border: "1px solid",
    borderColor: isChecked ? "primary.500" : "#E8E8E8",
    bgColor: isChecked ? "primary.500" : "#fff",
    cursor: "pointer",
  };

  return (
    <Center
      {...baseStyle}
      boxSize={`${size}px`}
      onClick={() => onChange?.(!isChecked)}
      sx={{
        svg: {
          width: `${size / 2}px`,
          height: `${size / 2}px`,
        },
      }}
    >
      {isChecked && <TickIcon />}
    </Center>
  );
};

export default CustomCheckbox;
