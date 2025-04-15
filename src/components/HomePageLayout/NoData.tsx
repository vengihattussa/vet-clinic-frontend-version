import React, { useState } from "react";
import {Box, Flex,  Menu,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure,} from "@chakra-ui/react";
import Tabs from "../../common/Tabs";
import ClientDetail from "./ClientDetail";
import {useSelectClientStore, useSelectedPatientStore} from "../../store";
import {colors} from "@src/theme/foundations/colors";

const Clients = () => {
  const {clients} = useSelectClientStore();
  const {setId, setClientId} = useSelectedPatientStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    onOpen();
  };
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
      <Flex height={"100%"} justify={"center"} align={"center"} fontSize={"md"} width={"100%"} >
        No client Selected.

        <Box w="100vw" h="100vh" onClick={handleClick} position="absolute">
 

      {isOpen && (
        <Portal>
          <Box
            position="absolute"
            top={position.y}
            left={position.x}
            zIndex="popover"
            bg="white"
            boxShadow="md"
            borderRadius="md"
            onMouseLeave={onClose}
          >
            <Menu isOpen>
              <MenuList>
                <MenuItem>Add Alert</MenuItem>
                <MenuItem>Email Client</MenuItem>
                <MenuItem>Enter POA</MenuItem>
                <MenuItem>Age Account</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Portal>
      )}
    </Box>
      </Flex>
    
    </Box>



   
  );
};

export default Clients;
