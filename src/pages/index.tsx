import {Box, Grid, GridItem, Stack} from "@chakra-ui/react";
import PatientAppointments from "@src/components/HomePageLayout/Appointment";
import ClientAttachments from "@src/components/HomePageLayout/Attachments";
import PatientDiagnostics from "@src/components/HomePageLayout/Diagnostics";
import Clients from "@src/components/HomePageLayout/NoData";
import PatientTableList from "@src/components/HomePageLayout/PatientTableList";
import Header from "@src/layout/Header";
import {useSelectClientStore} from "../store";
import {useGetClient} from "@src/services/client/queries";
import {useClientDetailStore} from "@src/store/client/client-detail";
import {useEffect} from "react";

const HomePage = () => {
  const {getSelectedClientId} = useSelectClientStore();
  const clientId = getSelectedClientId() ?? "";
  const {data, isLoading} = useGetClient(clientId);
  const {setDetails, setIsLoading} = useClientDetailStore();
  useEffect(() => {
    setDetails(data);
  }, [data]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  return (
    <Stack gap={0} height={"100vh"}>
      <Box flex={1}>
        <Header />
      </Box>
      <Grid templateColumns={"repeat(5, 1fr)"} gap={4} m={4} h={"full"}>
        <GridItem colSpan={4}>
          <Clients />
        </GridItem>
        <GridItem colSpan={1}>
          <ClientAttachments />
        </GridItem>
        <GridItem colSpan={3}>
          <PatientTableList />
        </GridItem>
        <GridItem colSpan={2}>
          <PatientAppointments />
        </GridItem>
        <GridItem colSpan={5}>
          <PatientDiagnostics />
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default HomePage;
