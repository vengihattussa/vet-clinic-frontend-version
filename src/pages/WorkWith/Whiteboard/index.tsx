import {Stack} from "@chakra-ui/react";
import Tabs from "@src/common/Tabs";
import Arriving from "./TabPanels/Arriving";
import CheckedIn from "./TabPanels/CheckedIn";
import Scheduled from "./TabPanels/Schedule";

const primaryTabs = [
  {tab: "Arriving", tabPanel: <Arriving />},
  {tab: "Checked-in", tabPanel: <CheckedIn />},
  {tab: "Schedule", tabPanel: <Scheduled />},
];

const Whiteboard = () => {
  return (
    <Stack m={2} border={"1px solid"} borderColor={"border.200"} borderRadius={8}>
      <Tabs tabs={primaryTabs} variant={"reverse"} hasBorderBottom />
    </Stack>
  );
};

export default Whiteboard;
