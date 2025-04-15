import {HStack, Stack} from "@chakra-ui/react";
import CustomModal from "@src/common/CustomModal";
import SectionLayout from "@src/layout/SectionLayout";
import SystemTableHistory from "../SystemTableHistory";
import CustomTable from "@src/common/CustomTable";
import {Dispatch, SetStateAction, useState} from "react";
import ContextMenu from "../../Appointment/AppointmentForm/ContextMenu";
import {AccessorKeyColumnDef} from "@tanstack/react-table";
import {AddIcon, EditIcon} from "@src/assets/svgs";
import {UseMutateFunction} from "@tanstack/react-query";
import {ApiResponse} from "@src/services/httpClient";
import {CategoryID} from "./componentRegistry";
import {resolveComponent} from "./componentResolver";

export default function DisplayTable({
  categoryDataID,
  rowID,
  setRowID,
  category,
  onAddModalOpen,
  onEditModalOpen,
  isAddModalOpen,
  isEditModalOpen,
  onAddModalClose,
  onEditModalClose,
  isSystemHistoryModalOpen,
  onSystemHistoryModalOpen,
  onSystemHistoryModalClose,
  columns,
  userTableData,
  categoryDropdown,
  handleDelete,
  modalTitle,
}: {
  categoryDataID: CategoryID;
  rowID: string;
  setRowID: Dispatch<SetStateAction<string | number | undefined>>;
  category: string | undefined;
  onAddModalOpen: () => void;
  onEditModalOpen: () => void;
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  onAddModalClose: () => void;
  onEditModalClose: () => void;
  isSystemHistoryModalOpen: boolean;
  onSystemHistoryModalOpen: () => void;
  onSystemHistoryModalClose: () => void;
  columns: AccessorKeyColumnDef<any, string>[];
  userTableData: any[] | undefined;
  categoryDropdown: Record<string, string> | undefined;
  handleDelete: UseMutateFunction<ApiResponse<any>, unknown, {id: string}, unknown> | undefined;
  modalTitle: string;
}) {
  // menu option
  const [menuPosition, setMenuPosition] = useState<{x: number; y: number}>({x: 0, y: 0});
  const [isOpen, setIsOpen] = useState(false);
  const DynamicComponent = resolveComponent(categoryDataID);

  // api integration
  const onClickDelete = () => {
    handleDelete &&
      handleDelete(
        {id: rowID?.toString() || ""},
        {
          onSuccess: () => {},
        },
      );
  };

  const menuItems = [
    {
      label: "NEW",
      shortcut: "F2",
      onClick: () => onAddModalOpen(),
    },
    {
      label: "CHANGE",
      shortcut: "F3",
      onClick: () => onEditModalOpen(),
    },
    {label: "CHOOSE", shortcut: "F7", onClick: () => {}},
    {
      label: "REMOVE",
      shortcut: "F4",
      onClick: () => {
        onClickDelete();
      },
    },
    {
      label: "EDIT",
      shortcut: "F8",
      onClick: () => onEditModalOpen(),
    },
    {
      label: "VIEW",
      shortcut: "F5",
      onClick: () => onSystemHistoryModalOpen(),
    },
    {
      label: "NOTES",
      shortcut: "F6",
    },
  ];

  return (
    <>
      <ContextMenu
        items={menuItems}
        menuPosition={menuPosition}
        closeMenu={() => {}}
        isOpen={isOpen}
      />
      <Stack flex={1} h="full" minH="400px">
        <SectionLayout
          borderColor="border.main"
          headerBackground="primary.400"
          contentBg="white"
          height="auto"
          mainTitle={`Entries For ${category}`}
        >
          <HStack gap={2} p={2}>
            <AddIcon onClick={onAddModalOpen} cursor={"pointer"} />
            {rowID && <EditIcon onClick={onEditModalOpen} cursor="pointer" />}
          </HStack>
          <CustomModal
            modalTitle={`New ${modalTitle}`}
            isOpen={isAddModalOpen}
            onClose={onAddModalClose}
            size="md"
            hasFooter={false}
          >
            <DynamicComponent
              mode="add"
              categoryList={categoryDropdown}
              onCloseModal={onAddModalClose}
            />
            {/* <AddOrEditSystemTable
              mode="add"
              categoryList={categoryDropdown}
              onCloseModal={onAddModalClose}
            /> */}
          </CustomModal>
          <CustomModal
            modalTitle={`Edit ${modalTitle}`}
            isOpen={isEditModalOpen}
            hasFooter={false}
            onClose={onEditModalClose}
            size="md"
          >
            <DynamicComponent
              mode="edit"
              categoryList={categoryDropdown}
              onCloseModal={onEditModalClose}
              rowID={rowID}
            />
            {/* <AddOrEditSystemTable
              categoryList={categoryDropdown}
              onCloseModal={onEditModalClose}
              mode="edit"
              rowID={rowID}
            /> */}
          </CustomModal>
          <CustomModal
            modalTitle={`ENTRY History`}
            isOpen={isSystemHistoryModalOpen}
            onClose={onSystemHistoryModalClose}
            size="md"
            hasFooter={true}
          >
            <SystemTableHistory />
          </CustomModal>

          <CustomTable
            columns={columns}
            rowId={rowID}
            setRowId={setRowID}
            data={userTableData ?? []}
            bgColor="primary.400"
            headerColor="gray"
            height="300px"
            customOpen={(e) => setIsOpen(e)}
            setMenuPosition={setMenuPosition}
          />
        </SectionLayout>
      </Stack>
    </>
  );
}
