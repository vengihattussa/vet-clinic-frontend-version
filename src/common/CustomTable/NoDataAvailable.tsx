import {Box, Text} from "@chakra-ui/react";

const NoDataAvailable = () => {
  return (
    <Box bg={"white"} width={"100%"}>
      <Text variant={"primary_600"} color={"black"}>
        No Data Available
      </Text>
    </Box>
  );
};
export default NoDataAvailable;
