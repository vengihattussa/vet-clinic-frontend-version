import {Box, Button, Flex, HStack, Stack, useDisclosure} from "@chakra-ui/react";
import SectionLayout from "@src/layout/SectionLayout";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import FormInput from "@src/common/Form/Input";
import {AddIcon, EditIcon} from "@src/assets/svgs";
import SelectedList from "./SelectedList";
import CustomModal from "@src/common/CustomModal";
import ProblemListTabs from "./ProblemListTabs";
import {
  useGetAllProblemCategory,
  useGetProblemListByCategoryId,
} from "@src/services/problemLIst/queries";
import {createColumnHelper} from "@tanstack/react-table";
import {ProblemListColumnHelper, ProblemListTableValues} from "@src/@types/problemList";
import CustomTable from "@src/common/CustomTable";
const defaultValues = {
  find: "",
  species: "",
};

const ProblemList = () => {
  const columnHelper = createColumnHelper<ProblemListColumnHelper>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const methods = useForm({defaultValues});
  const {control} = methods;
  const [rowID, setRowID] = useState<number | string>();

  const {isOpen, onClose, onOpen} = useDisclosure();
  const [problem, setProblem] = useState<string>("Abdominal");
  const [problemId, setProblemId] = useState<number>(1);
  const [problemCategoryDropdown, setProblemCategoryDropdown] = useState<Record<string, string>>();

  const {data: problemListData} = useGetAllProblemCategory();
  const [addEditState, setAddEditState] = useState("Add");
  const [tableData, setTableData] = useState<ProblemListTableValues>();

  useEffect(() => {
    if (problemListData) {
      const result = problemListData.reduce<Record<string, string>>((acc, item) => {
        acc[item.id.toString()] = item.name;
        return acc;
      }, {});
      setProblemCategoryDropdown(result);
    }
  }, [problemListData]);
  const {data: problemsData} = useGetProblemListByCategoryId({
    categoryId: problemId.toString(),
    search: "",
  });

  useEffect(() => {
    if (problemsData) {
      setTableData(problemsData);
    }
  }, [problemsData, problemId]);
  const columns = [
    columnHelper.accessor("code", {header: "Code"}),
    columnHelper.accessor("description", {
      header: "Description",
    }),
  ];

  return (
    <Stack p={2}>
      <Flex gap={2}>
        <Stack>
          <SectionLayout
            borderColor="border.main"
            headerBackground="primary.400"
            contentBg="background.100"
            mainTitle={"CATEGORY"}
            height=""
          >
            {problemListData &&
              problemListData.map((problem, index) => {
                return (
                  <Box key={index}>
                    <Button
                      w={"100%"}
                      h={"30px"}
                      border={"1px solid gray"}
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
                        setProblem(problem.name);
                        setSelectedIndex(index);
                        setProblemId(problem.id);
                      }}
                    >
                      {problem?.name}
                    </Button>
                  </Box>
                );
              })}
          </SectionLayout>
          <FormInput control={control} name="find" label="Find" labelWidth={"20px"} />
          <SelectedList />
        </Stack>
        <Stack flex={1}>
          <SectionLayout
            borderColor="border.main"
            headerBackground="primary.400"
            contentBg="white"
            height="auto"
            mainTitle={`PROBLEMS FOR ${problem}`}
          >
            <HStack gap={2} p={2}>
              <AddIcon
                cursor={"pointer"}
                onClick={() => {
                  setAddEditState("Add");
                  onOpen();
                }}
              />
              <EditIcon
                cursor="pointer"
                onClick={() => {
                  setAddEditState("Edit");
                  onOpen();
                }}
              />
            </HStack>

            {isOpen && (
              <CustomModal
                modalTitle={`Change ${problem}`}
                isOpen={isOpen}
                onClose={onClose}
                hasFooter={false}
                size="md"
              >
                <ProblemListTabs
                  mode={addEditState}
                  problemListData={problemCategoryDropdown || {}}
                  rowID={rowID as unknown as string | number}
                  problemId={problemId}
                  onClose={onClose}
                />
              </CustomModal>
            )}

            <CustomTable
              rowId={rowID}
              setRowId={setRowID}
              columns={columns}
              data={tableData ?? []}
              bgColor="primary.400"
              headerColor="gray"
              height="300px"
            />
          </SectionLayout>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default ProblemList;
