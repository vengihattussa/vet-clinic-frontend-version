import SectionLayout from "@src/layout/SectionLayout";
import AppointmentList from "../Patients/Appointment/appointmentList";
import GeneralForm from "../Patients/Registration/General";
import InsuranceForm from "../Patients/Registration/Insurance";

interface ITabContentProps {
  name: string;
  hasHeader?: boolean;
  borderColor?: string;
  contentBg?: string;
  height?: string;
}
const TabContent = ({
  name,
  hasHeader = false,
  borderColor = "border.100",
  contentBg = "primary.400",
  height,
}: ITabContentProps) => {
  return (
    <SectionLayout
      hasHeader={hasHeader}
      borderColor={borderColor}
      contentBg={contentBg}
      height={height}
    >
      {tabContet[name as keyof typeof tabContet]}
    </SectionLayout>
  );
};
export default TabContent;

const tabContet = {
  Reminders: <AppointmentList />,
  General: <GeneralForm />,
  Insurance: <InsuranceForm />,
};

// const tabContet = (
//   selectedPolicyHolder: {id: string; name: string},
//   setSelectedPolicyHolder?: Dispatch<SetStateAction<{id: string; name: string}>>,
// ) => ({
//   Reminders: <AppointmentList />,
//   General: <GeneralForm />,
//   Insurance: (
//     <InsuranceForm
//       selectedPolicyHolder={selectedPolicyHolder}
//       setSelectedPolicyHolder={setSelectedPolicyHolder}
//     />
//   ),
// });
