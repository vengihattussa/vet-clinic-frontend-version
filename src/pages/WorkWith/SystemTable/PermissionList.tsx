import {Box} from "@chakra-ui/react";
import SectionLayout from "@src/layout/SectionLayout";
// import {useGetPermissionById} from "@src/services/user/queries";

const PermissionList = () => {
  // {categoryId}: {categoryId: number}
  // const { data } = useGetPermissionById(String(categoryId));

  const data = [
    "Accept Work List Entries",
    "Access Rapport Media Center",
    "Access Rapport Media Center and Administration",
    "Add Client Alert",
    "Add Client More Stuff",
    "Add Client Referrals",
  ];
  return (
    <>
      <Box>
        <SectionLayout
          borderColor="border.main"
          headerBackground="primary.400"
          contentBg="background.100"
          mainTitle={"AUTHORIZED FUNCTIONS"}
        >
          {data?.map((item, index) => (
            <Box
              key={index}
              fontWeight={"500"}
              pl={2}
              py={2}
              bg={index % 2 === 0 ? "background.200" : "primary.400"}
            >
              {item}
            </Box>
          ))}
        </SectionLayout>
      </Box>
    </>
  );
};
export default PermissionList;
