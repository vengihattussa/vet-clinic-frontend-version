import {Grid, GridItem, HStack, Box} from "@chakra-ui/react";
import Tabs from "../../common/Tabs";
import SectionLayout from "../../layout/SectionLayout";
// import ChronologicalHistory from "../Patients/MedicalHistory/chronological";
import PatientAttachments from "../Patients/Attachment/patientAttachment";
// import DiagonisticHistory from "@src/pages/Diagonistics/diagonistics";
import {useDiagnosticStore} from "@src/store/tabs";
// import MedicalHistoryTableList from "./MedicalHistoryTableList";
import ChronologicalHistory from "../Patients/MedicalHistory/chronological";
import DiagnosisHistory from "../Patients/MedicalHistory/diagnosis";
import DietHistory from "../Patients/MedicalHistory/diet";
import InjectionHistory from "../Patients/MedicalHistory/injections";
import LabHistory from "../Patients/MedicalHistory/lab";
import PriscriptionsHistory from "../Patients/MedicalHistory/priscriptions";
import ReminderHistory from "../Patients/MedicalHistory/reminder";
import SurgeryHistory from "../Patients/MedicalHistory/surgery";
import VaacsHistory from "../Patients/MedicalHistory/vaacs";
import XrayHistory from "../Patients/MedicalHistory/xray";
import SoapHistory from "../Patients/MedicalHistory/soap";
import NotesHistory from "../Patients/MedicalHistory/notes";
import PublicHistory from "../Patients/MedicalHistory/public";
import AttachmentsHistory from "../Patients/MedicalHistory/Attachments";
import RequisitionsHistory from "../Patients/MedicalHistory/requisitions";
import PlanHistory from "../Patients/MedicalHistory/plan";

const PatientDiagnostic = ({name}: {name: string}) => {
  const {activeDiagnostic} = useDiagnosticStore();

  const renderContent = () => {
    switch (activeDiagnostic) {
      case 0:
        return <ChronologicalHistory />;
      // return <MedicalHistoryTableList />;
      case 1:
        return <DiagnosisHistory />;
      case 2:
        return <DietHistory />;
      case 3:
        return <InjectionHistory />;
      case 4:
        return <LabHistory />;
      case 5:
        return <PriscriptionsHistory />;
      case 6:
        return <ReminderHistory />;
      case 7:
        return <SurgeryHistory />;
      case 8:
        return <VaacsHistory />;
      case 9:
        return <SoapHistory />;
      case 10:
        return <XrayHistory />;
      case 11:
        return <NotesHistory />;
      case 12:
        return <PublicHistory />;
      case 13:
        return <AttachmentsHistory />;
      case 14:
        return <RequisitionsHistory />;
      case 15:
        return <PlanHistory />;
      default:
        return null;
    }
  };

  return (
    <HStack gap={4} h={"100%"} alignItems={"start"}>
      <Grid templateColumns="repeat(5,1fr)" flex={4} gap={4} h={"50%"}>
        <GridItem colSpan={4} >
          <SectionLayout
            borderColor="border.main"
            headerBackground="white"
            contentBg="primary.100"
            height={{md: "", xl: "245px", "2xl": "180px"}}
            mainTitle={name === "Chronological" ? "Medical History" : name}
          >
            <Box
              className="content-scroll-wrapper"
              maxHeight="calc(100% - 40px)" // Adjust based on your header height
              overflowY="auto"
             // position="relative"
            >
              {renderContent()}
            </Box>
          </SectionLayout>
        </GridItem>
        <GridItem colSpan={1}>
          <PatientAttachments />
        </GridItem>
      </Grid>
    </HStack>
  );
};

const PatientDiagnostics = () => {
  const {diagnostics, setActiveDiagnostic} = useDiagnosticStore();

  const handleTabChange = (index: number) => {
    setActiveDiagnostic(index);
  };

  return (
    <>
      {diagnostics && (
        <Tabs
          height="100%"
          tabs={diagnostics.map((item) => ({
            tab: item.name!,
            tabPanel: <PatientDiagnostic name={item.name!} />,
          }))}
          variant={"capsule"}
          tabChange={true}
          onChange={handleTabChange}
        />
      )}
    </>
  );
};

export default PatientDiagnostics;
