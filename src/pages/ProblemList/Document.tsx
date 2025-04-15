import {HStack, Stack, useDisclosure} from "@chakra-ui/react";
import {AddIcon, EditIcon} from "@src/assets/svgs";
import CustomModal from "@src/common/CustomModal";
import DocumentAddModal from "./DocumentAddModal";
import {useState} from "react";
import {ProblemListDocumentColumnHelper} from "@src/@types/problemList";
import {createColumnHelper} from "@tanstack/react-table";
import CustomTable from "@src/common/CustomTable";
import {useGetDocListById} from "@src/services/problemLIst/queries";
import {useMasterDataPatient} from "@src/hooks/master-data-patient";

const Document = ({problemId}: {problemId: number}) => {
  const {
    isOpen: isDocumentOpen,
    onClose: onDocumentClose,
    onOpen: onDocumentOpen,
  } = useDisclosure();
  const columnHelper = createColumnHelper<ProblemListDocumentColumnHelper>();
  const {species} = useMasterDataPatient();

  const columns = [
    columnHelper.accessor("docsDesc", {
      header: "Species",
      cell: (info) => species[info.getValue()] || "Unknown",
    }),
    columnHelper.accessor("docsPath", {
      header: "Document",
    }),
  ];

  const [mode, setMode] = useState("Add");
  const [rowID, setRowID] = useState<number | string>();
  const {data: documentList} = useGetDocListById(problemId as unknown as string);
  return (
    <>
      <Stack p={2}>
        <HStack gap={2}>
          <AddIcon
            cursor={"pointer"}
            onClick={() => {
              onDocumentOpen();
              setMode("Add");
            }}
          />
          <EditIcon
            cursor={"pointer"}
            onClick={() => {
              onDocumentOpen();
              setMode("Edit");
            }}
          />
        </HStack>
        <CustomTable
          rowId={rowID}
          setRowId={setRowID}
          columns={columns}
          data={documentList ?? []}
          bgColor="primary.100"
          height="300px"
          hasBorderBottom
          hasBorderTop
        />
        {isDocumentOpen && (
          <CustomModal
            modalTitle="New Problem Species Entry"
            hasFooter={false}
            isOpen={isDocumentOpen}
            onClose={onDocumentClose}
            size="sm"
          >
            <DocumentAddModal
              problemId={problemId}
              mode={mode}
              rowID={rowID as unknown as string | number}
              onDocumentClose={onDocumentClose}
            />
          </CustomModal>
        )}
      </Stack>
    </>
  );
};
export default Document;
