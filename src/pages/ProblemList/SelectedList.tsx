import {Box, Stack} from "@chakra-ui/react";
import SectionLayout from "@src/layout/SectionLayout";

const SelectedList = () => {
  const data = ["No Data"];
  return (
    <>
      <Box>
        <SectionLayout
          borderColor="border.main"
          headerBackground="primary.400"
          contentBg="background.100"
          mainTitle={"SELECTED"}
        >
          <Stack height="144px" overflow={"auto"}>
            {data?.map((item, index) => (
              <Box
                key={index}
                fontWeight={"500"}
                pl={2}
                bg={index % 2 === 0 ? "background.200" : "primary.400"}
              >
                {item}
              </Box>
            ))}
          </Stack>
        </SectionLayout>
      </Box>
    </>
  );
};
export default SelectedList;
