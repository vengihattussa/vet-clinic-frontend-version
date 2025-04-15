import {Box, Button, Flex, Stack, useDisclosure} from "@chakra-ui/react";
import SectionLayout from "@src/layout/SectionLayout";
import {createColumnHelper} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import FormInput from "@src/common/Form/Input";
import {SystemTableResponse} from "@src/services/SystemTable/interface";
import {useGetAllAbnormalitiesTable} from "@src/services/SystemTable/queries";
import DisplayTable from "./displaySystemTable/displaySystemTable";
import {useDeleteAbnormalitiesTableMutation} from "@src/services/SystemTable/mutation";
import {CategoryID} from "./displaySystemTable/componentRegistry";
import {AllergyTableValue} from "@src/services/SystemTable/API/interface";
import {useGetAllTableData} from "@src/services/SystemTable/API/queries";
import {useDeleteTableMutation} from "@src/services/SystemTable/API/mutation";

const defaultValues = {
  find: "",
};
const SystemTable = () => {
  const columnHelper = createColumnHelper<any>();
  const [categoryId, setCatgoryId] = useState<number>(1);
  const [userTableData, setUserTableData] = useState<
    SystemTableResponse[] | AllergyTableValue[] | undefined
  >();
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
  const {
    isOpen: isSystemHistoryModalOpen,
    onOpen: onSystemHistoryModalOpen,
    onClose: onSystemHistoryModalClose,
  } = useDisclosure();

  const methods = useForm({defaultValues});
  const {control} = methods;

  const [rowID, setRowID] = useState<number | string>();

  //  Table Data
  const {data: abnormalitiesTableData} = useGetAllAbnormalitiesTable();
  const {data: AllergyTableData} = useGetAllTableData("/api/vet_clinic/allergy/list");
  const {data: ColorTableData} = useGetAllTableData("/api/vetClinic/color/list");
  const {data: BodySubsystemTableData} = useGetAllTableData(
    "/api/vetClinic/bodySubSystemTable/list",
  );
  const {data: CompanyTableData} = useGetAllTableData("/api/vet_clinic/company/getAllCompanies");
  const {data: BreedTableData} = useGetAllTableData("/api/vetClinic/breed/list");
  const {data: ChemistryTableData} = useGetAllTableData(
    "/api/vet_clinic/chemistry/getAllChemistries",
  );
  const {data: AppointmentTypeTableData} = useGetAllTableData(
    "/api/vetClinic/appointmentType/list",
  );
  const {data: WhiteBoardCategoryTableData} = useGetAllTableData(
    "/api/vet_clinic/chemistry/getAllChemistries",
  );
  const {data: ContractPricesTableData} = useGetAllTableData(
    "/api/vet_clinic/ContractPriceType/getAllContractPriceType",
  );
  const {data: InsuranceProviderTableData} = useGetAllTableData(
    "/api/vet_clinic/InsuranceProvider/getAllInsuranceProviders",
  );
  const {data: VaccineTableData} = useGetAllTableData("/api/vet_clinic/Vaccine/getAllVaccines");
  const {data: BlockOffTypeTableData} = useGetAllTableData("/api/vetClinic/blockOffType/list");
  const {data: ZipCodeTableData} = useGetAllTableData("/api/vetClinic/zipCode/list");
  const {data: WorkListTableData} = useGetAllTableData("/api/vetClinic/workList/findAllWorkList");
  const {data: UnitOfMeasuresTableData} = useGetAllTableData(
    "/api/vet_clinic/UnitOfMeasure/getAllUnitOfMeasure",
  );
  const {data: DiscountClassTableData} = useGetAllTableData(
    "/api/vet_clinic/ClientDiscountClasses/getAllClientDiscountClasses",
  );

  // delete api
  const {mutate: deleteAbnormalitiesTableData} = useDeleteAbnormalitiesTableMutation();
  const {mutate: allergyDelete} = useDeleteTableMutation(
    "/api/vet_clinic/allergy/delete",
    "/api/vet_clinic/allergy/list",
  );
  const {mutate: appointmentTypeDelete} = useDeleteTableMutation(
    "/api/vetClinic/appointmentType/delete",
    "/api/vetClinic/appointmentType/list",
  );
  const {mutate: bodySubsystemDelete} = useDeleteTableMutation(
    "/api/vetClinic/bodySubSystemTable/delete",
    "/api/vetClinic/bodySubSystemTable/list",
  );
  const {mutate: breedDelete} = useDeleteTableMutation(
    "/api/vetClinic/breed/delete",
    "/api/vetClinic/breed/list",
  );
  const {mutate: chemistryDelete} = useDeleteTableMutation(
    "/api/vet_clinic/chemistry/deleteChemistryById",
    "/api/vet_clinic/chemistry/getAllChemistries",
  );
  const {mutate: zipCodeDelete} = useDeleteTableMutation(
    "/api/vetClinic/zipCode/delete",
    "/api/vetClinic/zipCode/list",
  );
  const {mutate: colorDelete} = useDeleteTableMutation(
    "/api/vetClinic/color/delete",
    "/api/vetClinic/color/id",
  );
  const {mutate: companyDelete} = useDeleteTableMutation(
    "/api/vet_clinic/company/getCompanyById",
    "/api/vet_clinic/company/getAllCompanies",
  );
  const {mutate: whiteBoardCategoryDelete} = useDeleteTableMutation(
    "/api/vet_clinic/whiteBoardCategory/deleteWhiteBoardCategoryById",
    "/api/vet_clinic/chemistry/getAllChemistries",
  );
  const {mutate: insuranceProviderDelete} = useDeleteTableMutation(
    "/api/vet_clinic/InsuranceProvider/deleteInsuranceProviderById",
    "/api/vet_clinic/InsuranceProvider/getAllInsuranceProviders",
  );
  const {mutate: vaccineDelete} = useDeleteTableMutation(
    "/api/vet_clinic/Vaccine/deleteVaccineById",
    "/api/vet_clinic/Vaccine/getAllVaccines",
  );
  const {mutate: ContractPricesDelete} = useDeleteTableMutation(
    "/api/vet_clinic/ContractPriceType/deleteContractPriceTypeById",
    "/api/vet_clinic/ContractPriceType/getAllContractPriceType",
  );
  const {mutate: BlockOffTypeDelete} = useDeleteTableMutation(
    "/api/vetClinic/blockOffType/delete",
    "/api/vetClinic/blockOffType/list",
  );
  const {mutate: WorkListTypeDelete} = useDeleteTableMutation(
    "/api/vetClinic/workList/deleteWorkListById",
    "/api/vetClinic/workList/findAllWorkList",
  );

  const {mutate: UnitOfMeasuresTypeDelete} = useDeleteTableMutation(
    "/api/vet_clinic/UnitOfMeasure/deleteUnitOfMeasureById",
    "/api/vet_clinic/UnitOfMeasure/getAllUnitOfMeasure",
  );

  const {mutate: DiscountClassTypeDelete} = useDeleteTableMutation(
    "/api/vet_clinic/ClientDiscountClasses/deleteClientDiscountClassesById",
    "/api/vet_clinic/ClientDiscountClasses/getAllClientDiscountClasses",
  );

  const categoryData = [
    {
      id: 1,
      name: "Abnormalities Table",
      endpoint: "abnormalities",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("abnormality", {header: "Abnormality"}),
      ],
      modalTitle: "Abnormalities Table",
      deleteApi: deleteAbnormalitiesTableData,
    },
    // {
    //   id: 2,
    //   name: "Additional Data Fields",
    //   description: "Additional Data Fields",
    //   columns: [
    //     columnHelper.accessor("normal", {header: "normal"}),
    //     columnHelper.accessor("abnormality", {header: "Abnormality"}),
    //   ],
    // },
    // {
    //   id: 3,
    //   name: "Additional Data Tables",
    //   description: "Additional Data Tables",
    //   addApi: (data: any) => addAbnormalities(data),
    //   updateApi: (data: any) => updateAbnormalities(data),
    //   deleteApi: deleteAbnormalitiesTable,
    //   schema: AbnormalitiesTableSchema,
    // },
    {
      id: 4,
      name: "Allergy Table",
      description: "Allergy Table",
      columns: [
        columnHelper.accessor("name", {header: "Code"}),
        columnHelper.accessor("description", {header: "Allergy"}),
      ],
      modalTitle: "Allergy Table",
      deleteApi: allergyDelete,
    },
    {
      id: 5,
      name: "Appointment Type",
      description: "Appointment Type",
      modalTitle: "Appointment Type",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("description", {header: "Description"}),
        columnHelper.accessor("color", {header: "Color"}),
      ],
      deleteApi: appointmentTypeDelete,
    },
    // {
    //   id: 6,
    //   name: "Audit Trail",
    //   description: "Audit Trail",
    //   addApi: (data: any) => addAbnormalities(data),
    //   updateApi: (data: any) => updateAbnormalities(data),
    //   deleteApi: deleteAbnormalitiesTable,
    //   schema: AbnormalitiesTableSchema,
    // },
    // {
    //   id: 7,
    //   name: "OTC/Boarding",
    //   description: "OTC/Boarding",
    //   addApi: (data: any) => addAbnormalities(data),
    //   updateApi: (data: any) => updateAbnormalities(data),
    //   deleteApi: deleteAbnormalitiesTable,
    //   schema: AbnormalitiesTableSchema,
    // },
    {
      id: 8,
      name: "Block-Off Type",
      description: "Block-Off Type",
      modalTitle: "Block-Off Type",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("description", {header: "Description"}),
        columnHelper.accessor("color", {header: "Color"}),
      ],
      deleteApi: BlockOffTypeDelete,
    },
    {
      id: 9,
      name: "Body Subsystems Table",
      description: "Body Subsystems Table",
      modalTitle: "Body Subsystems Table",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("description", {header: "Description"}),
      ],
      deleteApi: bodySubsystemDelete,
    },
    {
      id: 10,
      name: "Breed Table",
      description: "Breed Table",
      modalTitle: "Breed Table",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("name", {header: "Breed"}),
        columnHelper.accessor("type", {header: "Type"}),
        columnHelper.accessor("type", {header: "Antech Breed"}),
        columnHelper.accessor("type", {header: "Idexx Breed"}),
      ],
      deleteApi: breedDelete,
    },
    {
      id: 11,
      name: "Chemistry Table",
      description: "Chemistry Table",
      modalTitle: "Chemistry Table",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("description", {header: "Description"}),
      ],
      deleteApi: chemistryDelete,
    },
    {
      id: 12,
      name: "Client Discount Classes",
      description: "Client Discount Classes",
      modalTitle: "Client Discount Classes",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("discountClass", {header: "Discount Class"}),
      ],
      deleteApi: DiscountClassTypeDelete,
    },
    // {
    //   id: 13,
    //   name: "Client/Patient Relations",
    //   description: "Client/Patient Relations",
    //   addApi: (data: any) => addAbnormalities(data),
    //   updateApi: (data: any) => updateAbnormalities(data),
    //   deleteApi: deleteAbnormalitiesTable,
    //   schema: AbnormalitiesTableSchema,
    // },
    // {
    //   id: 14,
    //   name: "Clock Out Reasons",
    //   description: "Clock Out Reasons",
    //   addApi: (data: any) => addAbnormalities(data),
    //   updateApi: (data: any) => updateAbnormalities(data),
    //   deleteApi: deleteAbnormalitiesTable,
    //   schema: AbnormalitiesTableSchema,
    // },
    {
      id: 15,
      name: "Color Table",
      description: "Color Table",
      modalTitle: "Color Table",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("name", {header: "Color Name"}),
      ],
      deleteApi: colorDelete,
    },
    // {
    //   id: 16,
    //   name: "Commission Class",
    //   description: "Commission Class",
    //   addApi: (data: any) => addAbnormalities(data),
    //   updateApi: (data: any) => updateAbnormalities(data),
    //   deleteApi: deleteAbnormalitiesTable,
    //   schema: AbnormalitiesTableSchema,
    // },
    {
      id: 17,
      name: "Company Table",
      description: "Company Table",
      modalTitle: "Company Table",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("companyName", {header: "Company Name"}),
      ],
      deleteApi: companyDelete,
    },
    {
      id: 18,
      name: "white Board Category",
      description: "white Board Category",
      modalTitle: "white Board Category",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("description", {header: "Description"}),
      ],
      deleteApi: whiteBoardCategoryDelete,
    },
    {
      id: 19,
      name: "Contract Prices",
      description: "Contract Prices",
      modalTitle: "Contract Prices",
      columns: [
        columnHelper.accessor("name", {header: "Code"}),
        columnHelper.accessor("description", {header: "Description"}),
      ],
      deleteApi: ContractPricesDelete,
    },
    {
      id: 20,
      name: "Insurance Provider",
      description: "Insurance Provider",
      modalTitle: "Insurance Provider",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("description", {header: "Description"}),
      ],
      deleteApi: insuranceProviderDelete,
    },
    {
      id: 21,
      name: "Vaccine Table",
      description: "Vaccine Table",
      modalTitle: "Vaccine Table",
      columns: [
        columnHelper.accessor("vaccine", {header: "Vaccine"}),
        columnHelper.accessor("serial", {header: "Serial"}),
        columnHelper.accessor("expiration", {header: "Expiration"}),
        columnHelper.accessor("virus", {header: "Virus"}),
        columnHelper.accessor("manufactured", {header: "Manufactured"}),
        columnHelper.accessor("administered", {header: "Administered"}),
      ],
      deleteApi: vaccineDelete,
    },
    {
      id: 23,
      name: "Work List Table",
      description: "Work List Table",
      modalTitle: "Work List Table",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("description", {header: "Work List"}),
        columnHelper.accessor("listCode", {header: "List Code"}),
      ],
      deleteApi: WorkListTypeDelete,
    },
    {
      id: 24,
      name: "Unit Of Measure Table",
      description: "Unit Of Measure Table",
      modalTitle: "Unit Of Measure Table",
      columns: [
        columnHelper.accessor("code", {header: "Code"}),
        columnHelper.accessor("description", {header: "Description"}),
      ],
      deleteApi: UnitOfMeasuresTypeDelete,
    },
    {
      id: 25,
      name: "Zip Code Table",
      description: "Zip Code Table",
      modalTitle: "Zip Code Table",
      columns: [
        columnHelper.accessor("zipCode", {header: "Postal"}),
        columnHelper.accessor("city", {header: "City"}),
        columnHelper.accessor("province", {header: "Province"}),
        columnHelper.accessor("area", {header: "Area"}),
        columnHelper.accessor("country", {header: "Country"}),
      ],
      deleteApi: zipCodeDelete,
    },
  ];

  const [category, setCategory] = useState<string>();
  const [categoryDropdown, setCategoryDropdown] = useState<Record<string, string>>();

  useEffect(
    () => {
      if (categoryData) {
        const result = categoryData.reduce<Record<string, string>>((acc, item) => {
          acc[item.id.toString()] = item.name;
          return acc;
        }, {});
        setCategoryDropdown(result);
      }
    },
    [],
    // [categoryData, categoryId]
  );

  useEffect(() => {
    switch (categoryId) {
      case 1:
        setUserTableData(abnormalitiesTableData as SystemTableResponse[]);
        break;
      case 4:
        setUserTableData(AllergyTableData as any[]);
        break;
      case 5:
        setUserTableData(AppointmentTypeTableData as any[]);
        break;
      case 8:
        setUserTableData(BlockOffTypeTableData as any[]);
        break;
      case 9:
        setUserTableData(BodySubsystemTableData as any[]);
        break;
      case 10:
        setUserTableData(BreedTableData as any[]);
        break;
      case 11:
        setUserTableData(ChemistryTableData as any[]);
        break;
      case 12:
        setUserTableData(DiscountClassTableData as any[]);
        break;
      case 15:
        setUserTableData(ColorTableData as any[]);
        break;
      case 17:
        setUserTableData(CompanyTableData as any[]);
        break;
      case 18:
        setUserTableData(WhiteBoardCategoryTableData as any[]);
        break;
      case 19:
        setUserTableData(ContractPricesTableData as SystemTableResponse[]);
        break;
      case 20:
        setUserTableData(InsuranceProviderTableData as any[]);
        break;
      case 21:
        setUserTableData(VaccineTableData as SystemTableResponse[]);
        break;
      case 22:
        setUserTableData(ZipCodeTableData as any[]);
        break;
      case 23:
        setUserTableData(WorkListTableData as any[]);
        break;
      case 24:
        setUserTableData(UnitOfMeasuresTableData as any[]);
        break;
      default:
        setUserTableData([]);
    }
  }, [
    categoryId,
    BlockOffTypeTableData,
    abnormalitiesTableData,
    AppointmentTypeTableData,
    BodySubsystemTableData,
    BreedTableData,
    ChemistryTableData,
    ColorTableData,
    CompanyTableData,
    WhiteBoardCategoryTableData,
    ContractPricesTableData,
    InsuranceProviderTableData,
    VaccineTableData,
    ZipCodeTableData,
    AllergyTableData,
    WorkListTableData,
    UnitOfMeasuresTableData,
    onAddModalClose,
    onEditModalOpen,
  ]);

  return (
    <Stack p={2}>
      <Flex gap={2} align="stretch">
        <Stack h="full" minH="400px">
          <SectionLayout
            borderColor="border.main"
            headerBackground="primary.400"
            contentBg="background.100"
            mainTitle={"TABLE"}
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
        <DisplayTable
          rowID={rowID?.toString() || ""}
          setRowID={setRowID}
          category={category?.toString()}
          onAddModalOpen={onAddModalOpen}
          onEditModalOpen={onEditModalOpen}
          isAddModalOpen={isAddModalOpen}
          isEditModalOpen={isEditModalOpen}
          onAddModalClose={onAddModalClose}
          onEditModalClose={onEditModalClose}
          isSystemHistoryModalOpen={isSystemHistoryModalOpen}
          onSystemHistoryModalOpen={onSystemHistoryModalOpen}
          onSystemHistoryModalClose={onSystemHistoryModalClose}
          columns={categoryData[selectedIndex]?.columns ?? []}
          userTableData={userTableData}
          categoryDropdown={categoryDropdown}
          handleDelete={categoryData[selectedIndex]?.deleteApi}
          modalTitle={categoryData[selectedIndex]?.modalTitle || ""}
          categoryDataID={categoryData[selectedIndex]?.id as CategoryID}
        />
      </Flex>
    </Stack>
  );
};

export default SystemTable;
