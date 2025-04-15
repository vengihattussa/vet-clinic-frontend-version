import {Box, Button, Flex, Image} from "@chakra-ui/react";
import {useAppointment} from "@src/store/auth/appointment";
import Logo from "@src/assets/logo.svg";
import {ReactNode, useState} from "react";
import {Iprops} from ".";
import {useAuth} from "@src/store/index";
import {MdOutlineLogout} from "react-icons/md";
import {removeRefreshToken, removeToken} from "@src/hooks/storage";
import CustomModal from "@src/common/CustomModal";
import AppointmentForm from "@src/pages/WorkWith/Appointment/AppointmentForm";
import Notes from "@src/pages/PatientsInformation/Notes";

interface AppointmentHeaderProps {
  handleClose: () => void;
}

const AppointmentHeader: React.FC<AppointmentHeaderProps> = ({handleClose}) => {
  const {setIsAppointment} = useAppointment();
  const [selectedComponent, setSelectedComponent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("");
  const {setIsAuth} = useAuth();

  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);

  const handleOptionClick = ({component, title, size}: Iprops) => {
    setSelectedComponent(component);
    setTitle(title || "");
    setIsHeaderModalOpen(true);
    setSize(size ?? "lg" ?? "xl");
  };

  const handleHeaderClose = () => {
    setIsHeaderModalOpen(false);
    setSelectedComponent(null);
    setSize("lg");
    handleClose();
  };

  const handleLogout = () => {
    removeToken();
    removeRefreshToken();
    setIsAuth(false);
  };

  const appointmentLayoutMenu = [
    {
      name: "New",
      isClickable: true,
      component: <AppointmentForm mode="add" handleClose={handleHeaderClose} />,
      title: "NEW APPOINTMENT",
    },
    {
      name: "Change",
      isClickable: true,
      component: <AppointmentForm mode="edit" handleClose={handleHeaderClose} />,
      title: "CHANGE APPOINTMENT",
    },
    {
      name: "Notes",
      isClickable: true,
      component: <Notes />,
      title: "APPOINTMENT NOTES",
      size: "md",
    },
  ];

  return (
    <Box width="100%" top="0">
      <Flex background={"primary.500"} py={1} px={4} alignItems={"center"}>
        <Flex
          h="40px"
          w={"150px"}
          onClick={() => {
            localStorage?.removeItem("isAppointmentOpen");
            setIsAppointment(false);
          }}
        >
          <Image src={Logo} alt="Log" objectFit={"contain"} />
        </Flex>
        <Flex flex={1} gap={5}>
          {appointmentLayoutMenu.map((layoutOptions) => {
            return (
              <Box
                key={layoutOptions.name}
                p="5px 10px"
                color={"white"}
                cursor={"pointer"}
                bg="transparent"
                onClick={() =>
                  handleOptionClick({
                    component: layoutOptions.component,
                    title: layoutOptions.title ?? "",
                    size: layoutOptions.size ?? "xl",
                  })
                }
              >
                {layoutOptions.name}
              </Box>
            );
          })}
        </Flex>
        <Flex ml={"auto"}>
          <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
            rightIcon={<MdOutlineLogout fontSize={16} />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
      {isHeaderModalOpen && (
        <CustomModal
          modalTitle={title}
          isOpen={isHeaderModalOpen}
          onClose={handleHeaderClose}
          formId={title}
          hasFooter={false}
          size={size}
        >
          {selectedComponent}
        </CustomModal>
      )}
    </Box>
  );
};

export default AppointmentHeader;
