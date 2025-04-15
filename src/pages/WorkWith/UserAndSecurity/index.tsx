import {Box, Button, Flex, HStack, Stack, useDisclosure} from "@chakra-ui/react";
import CustomModal from "@src/common/CustomModal";
import CustomTable from "@src/common/CustomTable";
import SectionLayout from "@src/layout/SectionLayout";
import {createColumnHelper} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import AddOrEditUsers from "./AddOrEditUsers";
import FormInput from "@src/common/Form/Input";
import CustomCheckbox from "@src/common/CustomCheckbox";
import {useGetUserDataByCategoryId} from "@src/services/user/queries";
import {AddIcon, EditIcon} from "@src/assets/svgs";
import PermissionList from "./PermissionList";
import {UserResponse, UserTableValue} from "@src/services/user/interface";
import {useChangeUserStatusMutation} from "@src/services/user/mutation";
const defaultValues = {
  find: "",
};
const UserAndSecurity = () => {
  const columnHelper = createColumnHelper<UserResponse>();
  const [categoryId, setCatgoryId] = useState<number>(1);
  const [userTableData, setUserTableData] = useState<UserTableValue>();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const methods = useForm({defaultValues});
  const {control} = methods;

  const [rowID, setRowID] = useState<number | string>();

  const {mutate} = useChangeUserStatusMutation();

  // const {data: categoryData} = useGetAllCategory();

  const categoryData = [
    {
      id: 1,
      name: "Accounting",
      description: "Accounting",
    },
    {
      id: 2,
      name: "Doctors/Managers",
      description: "Doctors/Managers",
    },
    {
      id: 3,
      name: "Grooming",
      description: "Grooming",
    },
    {
      id: 4,
      name: "Inactive Employees",
      description: "Inactive Employees",
    },
    {
      id: 4,
      name: "Nursing staft",
      description: "Nursing staft",
    },
    {
      id: 6,
      name: "office Assistants",
      description: "office Assistants",
    },
    {
      id: 7,
      name: "OTC/Boarding",
      description: "OTC/Boarding",
    },
    {
      id: 8,
      name: "OTC/Boarding",
      description: "OTC/Boarding",
    },
    {
      id: 9,
      name: "Receptionist",
      description: "Receptionist",
    },
  ];

  const {data: categoryTableData} = useGetUserDataByCategoryId(String(categoryId));

  const columns = [
    columnHelper.accessor("userId", {header: "Code"}),
    columnHelper.accessor("inactive", {
      header: "Status",
      cell: (info) => (
        <CustomCheckbox
          size={18}
          isChecked={info.getValue() === true}
          onChange={() => {
            if (!rowID) return;
            mutate(String(rowID), {
              onSuccess: (response) => {
                setCatgoryId(response?.data?.categoryId as unknown as number);
              },
            });
          }}
        />
      ),
    }),
    columnHelper.accessor("userEmail", {header: "Email"}),
  ];
  const [category, setCategory] = useState<string>();

  const [categoryDropdown, setCategoryDropdown] = useState<Record<string, string>>();

  useEffect(() => {
    if (categoryData) {
      const result = categoryData.reduce<Record<string, string>>((acc, item) => {
        acc[item.id.toString()] = item.name;
        return acc;
      }, {});
      setCategoryDropdown(result);
      setCategory(categoryData && categoryData[0]?.name);
    }
  }, [categoryData]);

  useEffect(() => {
    if (categoryTableData) {
      setUserTableData(categoryTableData);
    }
  }, [categoryId, categoryTableData]);

  return (
    <Stack p={2}>
      <Flex gap={2} align="stretch">
        <Stack h="full" minH="400px">
          <SectionLayout
            borderColor="border.main"
            headerBackground="primary.400"
            contentBg="background.100"
            mainTitle={"CATEGORY"}
          >
            {categoryData &&
              categoryData.map((category, index) => {
                return (
                  <Box key={index}>
                    <Button
                      w={"100%"}
                      h={"30px"}
                      border={selectedIndex === index ? "1px solid gray" : undefined}
                      bg={
                        selectedIndex === index
                          ? "primary.200"
                          : index % 2 === 0
                            ? "background.200"
                            : "primary.400"
                      }
                      color={"black"}
                      justifyContent={"flex-start"}
                      onClick={() => {
                        setCategory(category.name);
                        setSelectedIndex(index);
                        setCatgoryId(category.id);
                        setUserTableData([]);
                      }}
                    >
                      {category.name}
                    </Button>
                  </Box>
                );
              })}
          </SectionLayout>
          <FormInput control={control} name="find" label="Find" labelWidth={"20px"} />
        </Stack>
        <Stack flex={1} h="full" minH="400px">
          <SectionLayout
            borderColor="border.main"
            headerBackground="primary.400"
            contentBg="white"
            height="auto"
            mainTitle={`Users For ${category}`}
          >
            <HStack gap={2} p={2}>
              <AddIcon onClick={onAddModalOpen} cursor={"pointer"} />
              {rowID && <EditIcon onClick={onEditModalOpen} cursor="pointer" />}
            </HStack>
            <CustomModal
              modalTitle={`Add Users`}
              isOpen={isAddModalOpen}
              onClose={onAddModalClose}
              size="md"
              hasFooter={false}
            >
              <AddOrEditUsers
                mode="add"
                categoryList={categoryDropdown}
                onCloseModal={onAddModalClose}
              />
            </CustomModal>

            <CustomModal
              modalTitle={`Edit Users`}
              isOpen={isEditModalOpen}
              hasFooter={false}
              onClose={onEditModalClose}
              size="md"
            >
              <AddOrEditUsers
                categoryList={categoryDropdown}
                onCloseModal={onEditModalClose}
                mode="edit"
                rowID={rowID}
              />
            </CustomModal>

            <CustomTable
              columns={columns}
              rowId={rowID}
              setRowId={setRowID}
              data={userTableData ?? []}
              bgColor="primary.400"
              headerColor="gray"
              height="300px"
            />
          </SectionLayout>
        </Stack>
      </Flex>
      {/* categoryId={categoryId} */}
      <PermissionList />
    </Stack>
  );
};

export default UserAndSecurity;
