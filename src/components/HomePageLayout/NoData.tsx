import {Box, Flex} from "@chakra-ui/react";
import Tabs from "../../common/Tabs";
import ClientDetail from "./ClientDetail";
import {useSelectClientStore, useSelectedPatientStore} from "../../store";
import {colors} from "@src/theme/foundations/colors";

const Clients = () => {
  const {clients} = useSelectClientStore();
  const {setId, setClientId} = useSelectedPatientStore();

  return clients.length > 0 ? (
    <Tabs
      tabs={clients.map((client) => ({
        tab: client.name,
        tabPanel: <ClientDetail id={client.id} />,
        onClick: () => setClientId(client.id),
      }))}
      variant="arrow"
      isSearchedData
      setId={setId}
    />
  ) : (
    <Box bgColor={colors.primary[100]} h="100%">
      <Flex height={"100%"} justify={"center"} align={"center"} fontSize={"md"} width={"100%"}>
        No client Selected.
      </Flex>
    </Box>
  );
};

export default Clients;
