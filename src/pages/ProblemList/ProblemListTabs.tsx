import Tabs from "@src/common/Tabs";
import SectionLayout from "@src/layout/SectionLayout";
import ProblemListInput from "./ProblemListInput";
import {useMemo} from "react";
import Document from "./Document";
import RemindAs from "./Remind";

const ProblemListTabs = ({
  problemListData,
  mode,
  rowID,
  problemId,
  onClose,
}: {
  problemListData: Record<string, string>;
  mode: string;
  rowID: number | string;
  problemId: number;
  onClose: () => void;
}) => {
  const tabs = useMemo(
    () => [
      {
        tab: "Problem",
        tabPanel: (
          <ProblemListInput
            problemListData={problemListData}
            mode={mode}
            rowID={rowID}
            onClose={onClose}
          />
        ),
      },
      {
        tab: "Document",
        tabPanel: <Document problemId={problemId} />,
      },
      {
        tab: "Remind As",
        tabPanel: <RemindAs />,
      },
    ],
    [],
  );
  return (
    <>
      <SectionLayout hasHeader={false} contentBg="primary.100" borderColor="border.main" margin={2}>
        <Tabs
          tabs={tabs?.map((item) => ({
            tab: item.tab,
            tabPanel: item.tabPanel,
          }))}
          tabListStyle={{borderBottom: "1px solid", borderColor: "border.main"}}
          variant={"reverse"}
        />
      </SectionLayout>
    </>
  );
};

export default ProblemListTabs;
