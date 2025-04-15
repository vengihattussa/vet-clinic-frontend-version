import Tabs from "../../common/Tabs";
import {appointmentTabs} from "../../constants/patientAppointment";
import TabContent from "../TabContent";

const PatientAppointments = () => {
  return (
    <Tabs
      tabs={appointmentTabs.map((item) => ({
        tab: item.name,
        tabPanel: <TabContent name={item.name} height="150px" />,
      }))}
      tabListStyle={{border: "1px solid", borderColor: "border.100"}}
    />
  );
};

export default PatientAppointments;
