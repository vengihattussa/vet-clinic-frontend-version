import Tabs from "@src/common/Tabs";
import {useDiagnosticStore} from "@src/store/tabs";

export const FooterTabs = () => {
  const {diagnostics, setActiveDiagnostic} = useDiagnosticStore();

  const handleTabChange = (index: number) => {
    setActiveDiagnostic(index);
  };

  return (
    <Tabs
      height="100%"
      tabs={diagnostics.map((item) => ({
        tab: item.name!,
        tabPanel: "",
      }))}
      variant={"capsule"}
      tabChange={true}
      onChange={handleTabChange}
    />
  );
};
