import {useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import CustomTable from "../../../../common/CustomTable";
import {useSelectClientStore} from "../../../../store/client/selectClient";
import {IClientData, IClientTableData} from "../interface";
import {useForm} from "react-hook-form";
import {menuTitles} from "@src/constants/menuTitles";
import {useModal} from "@src/store/index";

const ResultTable = ({
  clientData,
  id,
  onClose,
  tabUpdate = false,
  setSelectedClientDetail,
}: IClientTableData) => {
  const {handleSubmit} = useForm();
  const [isSingle, setIsSingle] = useState(true);
  const {clientId: rowId, add, setClientId} = useSelectClientStore();

  const {setIsModalOpen} = useModal();
  const columnHelper = createColumnHelper<IClientData>();

  const columns = [
    columnHelper.accessor((row) => `${row.firstName}  ${row.lastName}`, {
      header: "Client Name",
    }),
    columnHelper.accessor("relationshipName", {
      header: () => "Spouse",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("address", {
      header: () => "Address",
    }),
    columnHelper.accessor("phoneNo", {
      header: "Phone",
    }),
  ];
  const onSubmit = handleSubmit(() => {
    const getData = clientData.find((x) => x.id === rowId);
    getData &&
      (tabUpdate
        ? add({id: getData.id, name: `${getData.lastName}`})
        : setSelectedClientDetail &&
          setSelectedClientDetail({
            id: getData.id.toString(),
            name: `${getData.firstName} ${getData.lastName}`,
          }));
    onClose ? onClose() : setIsModalOpen(false);
    setClientId("");
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
      }}
      id={id ? id : menuTitles.selectClient}
    >
      <CustomTable
        setRowId={setClientId}
        setIsSingle={setIsSingle}
        rowId={rowId}
        isSingle={isSingle}
        columns={columns}
        data={clientData}
        bgColor="background.100"
        height={"185px"}
      />
    </form>
  );
};
export default ResultTable;
