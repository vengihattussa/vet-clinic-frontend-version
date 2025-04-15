import {Flex} from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import ContractInformation from "@src/components/Clients/ClientRegistrationForm/ContractInformation";
import PersonalInformation from "@src/components/Clients/ClientRegistrationForm/PersonalInformation";
import {menuTitles} from "@src/constants/menuTitles";
import {getUsername} from "@src/hooks/storage";
import SectionLayout from "@src/layout/SectionLayout";
import {removeFalsyKeys} from "@src/utils/object";
import {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ClientRegistrationType, defaultValues, schema} from "./form";
import {useModal, useSelectClientStore} from "@src/store/index";
import {usePostRegisterClient, useUpdateClient} from "@src/services/client/mutations";
import {useGetClient} from "@src/services/client/queries";
import {formatDateToISO} from "@src/utils/dateFormatting";
// import {useMasterData} from "@src/hooks/master-data";

const ClientRegistration = ({mode}: {mode: "add" | "edit"}) => {
  const username = getUsername();
  const {add: addClient} = useSelectClientStore();
  const methods = useForm<ClientRegistrationType>({
    defaultValues: {
      ...defaultValues,
      createdBy: username,
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  // const {codes} = useMasterData();
  const {handleSubmit, reset, getValues} = methods;
  const {getSelectedClientId} = useSelectClientStore();
  const clientId = mode === "edit" ? (getSelectedClientId() ?? "") : "";

  const {data: clientData} = useGetClient(clientId);
  // const formattedOptions = isEmpty(codes)
  //   ? []
  //   : Object.entries(codes).map(([key, value]) => ({
  //       label: value,
  //       value: key,
  //     }));

  useEffect(() => {
    if (!clientData) return;
    reset({
      ...defaultValues,
      ...removeFalsyKeys(clientData),
      createdAt: clientData?.createdAt ? new Date(clientData.createdAt) : undefined,
      dateOfBirth: clientData?.dateOfBirth ? new Date(clientData.dateOfBirth) : undefined,
      clientSuspendDate: clientData?.dateOfBirth ? new Date(clientData.dateOfBirth) : undefined,
      zipCode: clientData?.zipCode ?? "",
      faxNo: (clientData?.faxNo as unknown as string) ?? "",
      // codes: formattedOptions.filter((option) =>
      //   clientData.codes.includes(option.value?.split("-")[0]),
      // ),
    });
  }, [JSON.stringify(clientData)]);

  const {setIsModalOpen} = useModal();
  const {mutate: add} = usePostRegisterClient();
  const {mutate: update} = useUpdateClient();

  const onSubmit = handleSubmit((data: ClientRegistrationType) => {
    const dobReg = /^\d{2}\/\d{2}\/\d{2}$/;

    const payload = {
      ...data,
      referralCategory: getValues().clientReferral ? "" : getValues().referralCategory,
      businessReferral: getValues().clientBusinessReferral ? "" : getValues().businessReferral,
    };
    if (mode === "add") {
      add(
        removeFalsyKeys({
          ...payload,
          clientSuspendDate:
            payload?.clientSuspendDate &&
            dobReg.test(payload.clientSuspendDate as unknown as string)
              ? formatDateToISO(payload?.clientSuspendDate as unknown as string)
              : payload.clientSuspendDate,
          dateOfBirth:
            payload?.dateOfBirth && dobReg.test(payload.dateOfBirth as unknown as string)
              ? formatDateToISO(payload?.dateOfBirth as unknown as string)
              : payload.dateOfBirth,
          quantity: +(payload?.quantity ?? "") as unknown as string,
        }),
        {
          onSuccess: (res: {data: string | number}) => {
            addClient({id: res.data, name: data?.lastName || ""});
            setIsModalOpen(false);
          },
        },
      );
    } else if (mode === "edit") {
      update(
        removeFalsyKeys({
          ...payload,
          clientSuspendDate:
            payload?.clientSuspendDate &&
            dobReg.test(payload.clientSuspendDate as unknown as string)
              ? formatDateToISO(payload?.clientSuspendDate as unknown as string)
              : payload.clientSuspendDate,
          dateOfBirth:
            payload?.dateOfBirth && dobReg.test(payload.dateOfBirth as unknown as string)
              ? formatDateToISO(payload?.dateOfBirth as unknown as string)
              : payload.dateOfBirth,
          id: clientId,

          // codes: data.codes.map((opt) => opt.value),
        }),
        {
          onSuccess: () => {
            addClient({id: clientId, name: data?.lastName || ""});
            setIsModalOpen(false);
          },
        },
      );
    } else {
      return;
    }
    // setSelectedClientDetail({id: "", name: ""});
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        id={mode === "add" ? menuTitles.newClient : menuTitles.changeClient}
      >
        <Flex direction="column">
          <SectionLayout
            borderColor="border.main"
            headerBackground="primary.300"
            contentBg="primary.100"
            contentPadding={"8px 12px"}
            mainTitle="Contact Information"
            rightContent="Balance: 0.00"
            margin={3}
          >
            <ContractInformation />
          </SectionLayout>
          <SectionLayout
            borderColor="border.main"
            headerBackground="primary.400"
            contentBg="background.100"
            mainTitle="Personal Information"
            margin={3}
          >
            <PersonalInformation />
          </SectionLayout>
        </Flex>
      </form>
    </FormProvider>
  );
};

export default ClientRegistration;
