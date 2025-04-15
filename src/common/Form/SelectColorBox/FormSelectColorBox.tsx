import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {Controller} from "react-hook-form";

type OptionType = {
  id: number | string;
  code: string; // color code
};

type Props = {
  control: any;
  name: string;
  label: string;
  options: OptionType[];
  labelWidth?: string;
};

const FormSelectColorBox = ({control, name, label, options = [], labelWidth = "135px"}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => (
        <FormControl display="flex">
          <FormLabel
            display="flex"
            alignItems="center"
            width={labelWidth}
            pl="5px"
            fontWeight="bold"
            height="100%"
          >
            {label}
          </FormLabel>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              w="full"
              textAlign="left"
              p="20px"
              bg="#fff"
              color="#000"
              borderRadius="5px"
            >
              <Flex align="center" gap="2">
                <Box
                  bg={value || "#000"}
                  w="60px"
                  h="25px"
                  border="1px solid #999"
                  borderRadius="md"
                />
                {value === options[0]?.code && "Custom Color"}
              </Flex>
            </MenuButton>
            <MenuList maxH="150px" minH="100px" overflowY="auto">
              {options.map((opt, i) => (
                <MenuItem key={opt.id} onClick={() => onChange(opt.code)}>
                  <Flex align="center" gap="2">
                    <Box
                      bg={opt.code}
                      w="40px"
                      h="20px"
                      border="1px solid #999"
                      borderRadius="md"
                    />
                    {i === 0 && "Custom Color"}
                  </Flex>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </FormControl>
      )}
    />
  );
};

export default FormSelectColorBox;
