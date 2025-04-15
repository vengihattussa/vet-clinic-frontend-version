import {Stack, Text} from "@chakra-ui/react";
import Tabs from "@src/common/Tabs";
import Appointments from "./Appointments";

const Arriving = () => {
  return (
    <Stack>
      <Tabs
        tabs={[
          {tab: "Appointments", tabPanel: <Appointments />},
          {tab: "Boarding", tabPanel: <Text>Boarding</Text>},
        ]}
        variant={"reverse"}
        hasBorderBottom
      />
    </Stack>
  );
};

export default Arriving;
