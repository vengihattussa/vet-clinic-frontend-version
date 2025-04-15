import {CloseIcon} from "@chakra-ui/icons";
import {
  Tabs as ChakraTabs,
  IconButton,
  Tab,
  TabList,
  TabListProps,
  TabPanel,
  TabPanels,
  type TabsProps as ChakraTabsProps,
} from "@chakra-ui/react";
import {type ReactNode, useState, type PropsWithChildren} from "react";
import {useSelectClientStore} from "../../store/client/selectClient";
import {useDiagnosticStore} from "@src/store/tabs";

interface TabsProps extends PropsWithChildren {
  tabs: {tab: string; tabPanel?: ReactNode; onClick?: () => void}[];
  tabsStyle?: Omit<ChakraTabsProps, "children">;
  tabListStyle?: Omit<TabListProps, "children">;
  variant?: ChakraTabsProps["variant"];
  isSearchedData?: boolean;
  height?: string;
  customHeight?: string;
  setId?: (id: number) => void;
  hasBorderBottom?: boolean;
  onChange?: (index: number) => void;
  tabChange?: boolean;
  index?: number;
}

const Tabs = ({
  tabs,
  tabsStyle,
  height,
  tabListStyle,
  variant = "primary",
  customHeight,
  isSearchedData = false,
  hasBorderBottom = false,
  setId,
  onChange,
  tabChange = false,
  index: externalIndex,
}: TabsProps) => {
  const {remove, tab, setTab} = useSelectClientStore();
  const [tabIndex, setTabIndex] = useState(isSearchedData ? tab : 0);
  const {activeDiagnostic} = useDiagnosticStore();

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    isSearchedData && setTab(index);
    setId?.(0);
    onChange?.(index);
  };

  return (
    <ChakraTabs
      height={customHeight ? "" : (height ?? "")}
      defaultIndex={tabIndex}
      tabIndex={tabIndex}
      index={externalIndex !== undefined ? externalIndex : tabChange ? activeDiagnostic : tabIndex}
      onChange={handleTabChange}
      variant={variant}
      {...tabsStyle}
    >
      <TabList
        {...tabListStyle}
        h={"100%"}
        borderBottom={"1px solid"}
        borderColor={hasBorderBottom ? "border.200" : ""}
      >
        {tabs.map((item, index) => (
          <Tab
            as="div"
            key={index}
            position={"relative"}
            _focus={{
              boxShadow: "none",
            }}
            cursor="pointer"
            gap={4}
            height={customHeight ?? ""}
            onClick={item.onClick}
          >
            {item.tab}
            {isSearchedData && (
              <IconButton
                aria-label="remove"
                variant="with_icon"
                icon={<CloseIcon fontSize="8px" />}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setTabIndex(remove(index));
                  if (tabs.length > 1 && index === tabs.length - 1) {
                    setTabIndex(tabs.length - 2);
                  }
                }}
                minWidth={0}
                height="fit-content"
                cursor="pointer"
              />
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels h={height ?? ""}>
        {tabs.map((item, index) => (
          <TabPanel key={index} h={height ? height : ""}>
            {item.tabPanel}
          </TabPanel>
        ))}
      </TabPanels>
    </ChakraTabs>
  );
};

export default Tabs;
