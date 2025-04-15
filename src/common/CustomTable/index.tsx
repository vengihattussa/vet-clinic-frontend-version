import {Box, Table, TableProps, Tbody, Td, Th, Thead, Tr, useOutsideClick} from "@chakra-ui/react";
import {TableOptions, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {ReactNode, useRef, useState} from "react";
import PopoverModal from "../OptionPopover";
import NoDataAvailable from "./NoDataAvailable";
export interface BaseData {
  id: string | number;
}
interface ISubChild {
  name: string;
  isClickable: boolean;
  component: ReactNode;
  title: string;
  hasSmallerSize?: boolean;
  hasNoFooter?: boolean;
}

export interface IChild {
  name: string;
  isClickable: boolean;
  component: ReactNode;
  title: string;
  hasSmallerSize?: boolean;
  hasNoFooter?: boolean;
  subChild?: ISubChild[];
}
export interface ITableProps<T extends BaseData> extends TableProps {
  setRowId?: (value: string | number) => void;
  setIsSingle?: (value: boolean) => void;
  handleOptionClick?: ({
    component,
    title,
    hasSmallerSize,
    hasNoFooter,
  }: {
    component: ReactNode;
    title: string;
    hasSmallerSize: boolean;
    hasNoFooter?: boolean;
  }) => void;
  isSingle?: boolean;
  rowId?: string | number;
  borderColor?: string;
  bgColor?: string;
  data: T[];
  columns: TableOptions<T>["columns"];
  hasHeader?: boolean;
  showOptions?: boolean;
  height?: string;
  headerColor?: string;
  hasBorderBottom?: boolean;
  hasBorderTop?: boolean;
  onOpen?: (isOpen: boolean) => void;
  tableRowOption?: {
    title: string;
    child: IChild[];
  }[];
}
const CustomTable = <T extends BaseData>(props: ITableProps<T>) => {
  const {
    setRowId,
    setIsSingle,
    handleOptionClick,
    isSingle,
    rowId,
    borderColor = "border.main",
    bgColor = "primary.100",
    data,
    columns,
    hasHeader = true,
    showOptions = true,
    tableRowOption,
    height,
    headerColor,
    hasBorderBottom = false,
    hasBorderTop = false,
    onOpen,
  } = props;
  const [mousePosition, setMousePosition] = useState<{x: number; y: number}>({x: 0, y: 0});
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isPopoverOpenChild, setPopoverOpenChild] = useState(false);

  const [nestedChildOptions, setNestedChildOptions] = useState<ISubChild[] | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
  });
  const handleDoubleClick = (rowId: string | number) => {
    setRowId && setRowId(rowId);
    setIsSingle && setIsSingle(false);
    onOpen && onOpen(true);
  };
  useOutsideClick({
    ref,
    handler: () => {
      setPopoverOpen(false);
      setPopoverOpenChild(false);
      setIsSingle && setIsSingle(false);
      setNestedChildOptions(null);
    },
  });

  const handleChildClick = (
    subChild: ISubChild[],
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setNestedChildOptions([...subChild]);
    setPopoverOpenChild(true);
  };

  const handleSingleClick = (
    rowId: string | number,
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setMousePosition({x: event.clientX, y: event.clientY});
    setRowId && setRowId(rowId);

    if (isSingle && rowId === props.rowId) {
      setIsSingle && setIsSingle(false);
    } else {
      setPopoverOpen(true);
      setIsSingle && setIsSingle(true);
    }
  };

  return (
    <Box width={"100%"} background={"bgColor"} height={height} overflow={"auto"}>
      <Table variant={"unstyled"} whiteSpace={"nowrap"} borderRadius={8}>
        {hasHeader && (
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr
                key={headerGroup.id}
                borderBottom={hasBorderBottom ? "1px solid" : ""}
                borderTop={hasBorderTop ? "1px solid" : ""}
                borderColor={"border.main"}
                borderRadius={8}
              >
                {headerGroup.headers.map((header) => (
                  <Th
                    fontFamily={"poppins"}
                    fontSize={14}
                    p={"10px 10px"}
                    key={header.id}
                    fontWeight="600"
                    textTransform={"capitalize"}
                    whiteSpace={"nowrap"}
                    textAlign={"left"}
                    color={headerColor ?? "#7e7b7a"}
                    sx={{
                      pos: "sticky",
                      top: 0,
                      background: bgColor,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
        )}
        <Tbody mt={5}>
          {table.getRowModel().rows.length === 0 ? (
            <Tr background={"white"}>
              <Td
                colSpan={table.getAllColumns().length}
                textAlign={"center"}
                color="gray.400"
                p={16}
              >
                <NoDataAvailable />
              </Td>
            </Tr>
          ) : (
            table.getRowModel().rows.map((row) => {
              return (
                <Tr
                  key={row.id}
                  onDoubleClick={() => handleDoubleClick(row.original.id)}
                  onClick={(event) => handleSingleClick(row.original.id, event)}
                  outline={"1px solid"}
                  outlineColor={rowId === row.original.id ? "border.100" : borderColor}
                  outlineOffset={-1}
                  // border={rowId === row.original.id ? "none" : "1px solid"}
                  // borderColor={borderColor}
                  // outlineOffset={-1}
                  // border={"1px solid"}
                  // borderWidth={rowId === row.original.id ? "2px" : "2px 0px"}
                  // borderColor={rowId === row.original.id ? "border.100" : borderColor}
                  cursor={"pointer"}
                  background={rowId === row.original.id ? "primary.200" : ""}
                  mt={10}
                  fontSize={"xs"}
                  // p={2}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        fontWeight={rowId === row.original.id ? "semibold" : ""}
                        key={cell.id}
                        p={2}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    );
                  })}
                  {showOptions &&
                    rowId === row.original.id &&
                    isSingle &&
                    tableRowOption &&
                    tableRowOption?.map((layoutOptions) => {
                      return (
                        <Box
                          position="absolute"
                          left={mousePosition.x}
                          borderRadius="md"
                          p="10px"
                          key={layoutOptions.title}
                          ref={ref}
                        >
                          <PopoverModal
                            isOpen={isPopoverOpen}
                            titleColor={"black"}
                            placement="right"
                          >
                            {layoutOptions.child.map((child) => {
                              return (
                                <Box
                                  key={child.name}
                                  cursor={child.isClickable ? "pointer" : ""}
                                  _hover={{bg: "primary.100"}}
                                  p="5px 10px"
                                  borderBottom="1px solid"
                                  borderBottomColor={"primary.50"}
                                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                    if (child.subChild) {
                                      handleChildClick(child.subChild, e);
                                      setPopoverOpenChild(true);
                                      return;
                                    }
                                    setPopoverOpenChild(false);
                                    handleOptionClick?.({
                                      component: child.component,
                                      title: child.title,
                                      hasSmallerSize: child.hasSmallerSize ?? false,
                                      hasNoFooter: child.hasNoFooter,
                                    });
                                  }}
                                >
                                  {child.name}
                                </Box>
                              );
                            })}
                            {isPopoverOpenChild &&
                              nestedChildOptions &&
                              rowId === row.original.id &&
                              nestedChildOptions.length > 0 &&
                              isSingle && (
                                <Box
                                  position="absolute"
                                  marginLeft={"120px"}
                                  marginTop={"-50px"}
                                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                                    e.stopPropagation()
                                  }
                                  ref={ref}
                                >
                                  <PopoverModal
                                    isOpen={true}
                                    titleColor={"black"}
                                    placement="right"
                                  >
                                    {nestedChildOptions.map((child) => {
                                      return (
                                        <Box
                                          key={child.name}
                                          cursor={child.isClickable ? "pointer" : ""}
                                          _hover={{bg: "primary.100"}}
                                          p="5px 10px"
                                          borderBottom=" 1px solid"
                                          borderBottomColor={"primary.50"}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleOptionClick?.({
                                              component: child.component,
                                              title: child.title,
                                              hasSmallerSize: child.hasSmallerSize ?? false,
                                              hasNoFooter: child.hasNoFooter ?? false,
                                            });
                                            setPopoverOpen(false);
                                            setPopoverOpenChild(false);
                                          }}
                                        >
                                          {child.name}
                                        </Box>
                                      );
                                    })}
                                  </PopoverModal>
                                </Box>
                              )}
                          </PopoverModal>
                        </Box>
                      );
                    })}
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
    </Box>
  );
};
export default CustomTable;
