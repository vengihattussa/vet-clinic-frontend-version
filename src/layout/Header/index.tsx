import {Box, Button, HStack, StackDivider, VStack, Grid,Flex, Image,useDisclosure,Textarea, Modal,FormLabel,
  Text,
  Heading,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Container,
  GridItem,
  Td,
  Radio, RadioGroup,
  Stack,
  FormControl,
  Select,
  InputGroup,
  InputRightElement, 
  TableContainer,Tabs, TabList, TabPanels, Tab, TabPanel,NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, useColorModeValue, List,
  ListItem,
  ListIcon,} from "@chakra-ui/react";
  import FormCheckbox from "@src/common/Form/Checkbox";
import CalendarView from "@src/common/CalendarView/CalendarView"
import Logo from "@src/assets/logo.svg";
import CustomModal from "@src/common/CustomModal";
import PopoverModal from "@src/common/OptionPopover";
import {layoutMenu} from "@src/constants/layoutMenu";
import {removeRefreshToken, removeToken} from "@src/hooks/storage";
import {useAppointment} from "@src/store/auth/appointment";
import {useAuth, useModal, useSelectClientStore} from "@src/store/index";
import {useDiagnosticStore} from "@src/store/tabs";
import {ReactNode, useState} from "react";
import {MdOutlineLogout} from "react-icons/md";
import FormInput from "@src/common/Form/Input";
import {useForm} from "react-hook-form";
import {AddIcon, EditIcon} from "@src/assets/svgs";

export interface Iprops {
  component: ReactNode | null;
  title: string;
  size?: string;
  hasFooter?: boolean;
}
const Header = () => {
  const [value, setValue] = useState("1");
  const {setActiveDiagnostic} = useDiagnosticStore();
  const [selectedComponent, setSelectedComponent] = useState<ReactNode | null>(null);
  const [title, setTitle] = useState("");
  const {setIsModalOpen, isModalOpen} = useModal();
  const {setClientId} = useSelectClientStore();
  const {setIsAuth} = useAuth();
  const [, setIsPopoverOpen] = useState(false);

  const [size, setSize] = useState("");

  const [, setHasNoFooter] = useState(false);

  const handleOptionClick = ({component, title, size, hasFooter}: Iprops) => {
    setSelectedComponent(component);
    setTitle(title || "");
    setIsModalOpen(true);
    setSize(size!);
    setHasNoFooter(hasFooter ?? true);
  };

  const handleClose = () => {
    setClientId("");
    setIsModalOpen(false);
    setSelectedComponent(null);
  };

  const handleLogout = () => {
    removeToken();
    removeRefreshToken();
    setIsAuth(false);
  };

  const {setIsAppointment} = useAppointment();
  const modalOne = useDisclosure();
  const modalTwo = useDisclosure();
  const modalThree = useDisclosure();
  const modalFour = useDisclosure();
  const modalFive = useDisclosure();
  const modalDelete = useDisclosure();
  const modalSix = useDisclosure();
  const modalReminder = useDisclosure();
  const modalFollowup = useDisclosure();
  const modalOwnership = useDisclosure();
  const modalAppointment = useDisclosure();
  const modalWhiteBoard = useDisclosure();
  const modalMedicalhistory = useDisclosure();
  const modalChoosePatient = useDisclosure();
  const modalAppopening = useDisclosure();
  const modalRecurringAppointment = useDisclosure();
  const modalRecurPattern = useDisclosure();
  
 
  const methods = useForm({   
    });
    const {control} = methods;
  return (
    <>
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
          {layoutMenu.map((layoutOptions) => {
            return (
              <PopoverModal
                name={layoutOptions.title}
                titleColor={"white"}
                key={layoutOptions.title}
                onClose={() => setIsPopoverOpen(false)}
              >
                {layoutOptions.child.map((child) => {
                  return (
                    <Box
                      key={child.name}
                      cursor={child.isClickable ? "pointer" : ""}
                      _hover={{bg: "primary.100"}}
                      p="5px 10px"
                      borderBottom="1px solid"
                      borderBottomColor={"primary.50"}
                      onClick={() => {
                        if (child.onClick) {
                          setActiveDiagnostic(0);
                          child.onClick();
                          setIsAppointment(true);
                        } else if (child.diagnostic) {
                          setActiveDiagnostic(1);
                          setIsPopoverOpen(true);
                        } else if (child.isClickable) {
                          handleOptionClick({
                            component: child.component,
                            title: child.title ?? "",
                          });
                        }
                      }}
                    >
                      {child.name}
                    </Box>
                  );
                })}
              </PopoverModal>
            );
          })}
        </Flex>
        <Flex ml={"auto"}>
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalRecurringAppointment.onOpen}
          >
         Recurr
           
          </Button> 
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalAppopening.onOpen}
          >
          apt Opg
           
          </Button> 
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalChoosePatient.onOpen}
          >
          Choose patient
           
          </Button>   
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalMedicalhistory.onOpen}
          >
          Mdl Histy
           
          </Button>   
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalWhiteBoard.onOpen}
          >
          WhteBrd
           
          </Button>   
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalAppointment.onOpen}
          >
           Apptment
           
          </Button>   
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalOwnership.onOpen}
          >
           Ownrshp
           
          </Button>   
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalFollowup.onOpen}
          >
           Flw up
           
          </Button>   
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalReminder.onOpen}
          >
           Remder
           
          </Button>  
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalSix.onOpen}
          >
            Mailing
           
          </Button>  
        <Button
            variant={"outline"}
            colorScheme="gray"
            px={2}
            py={4}
            mr={2}
            _hover={{
              background: "primary.500",
            }}
            fontSize={"sm"}
           
            onClick={modalOne.onOpen}
          >
            Attention
           
          </Button>
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
      {isModalOpen && (
        <CustomModal
          modalTitle={title}
          isOpen={isModalOpen}
          onClose={handleClose}
          size={size}
          formId={title}
        >
          {selectedComponent}
        </CustomModal>
      )}
    </Box>

    {/* attention popup */}
<Modal isOpen={modalOne.isOpen} onClose={modalOne.onClose} size={"sm"}>
<ModalOverlay />
<ModalContent>
  <ModalHeader>ATTENTION!</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"0"}}>
  <Grid templateColumns="repeat(1, 1fr)" gap={1} style={{padding:"10px"}}>
<FormInput
 control={control}
//placeholder="Hasen, Jerod"
name="Client"
label="Client"
// isRequired
defaultValue="Hasen, Jerod"   
/>
<h4 className="att-title"><i>Client notices...</i></h4>
<Textarea resize="none" rows={10} defaultValue="07-19-07 11:25a:" className="modaltextarea" />
</Grid>
  </ModalBody>
  <ModalFooter>
    <Button variant={"outline"} mr={3} onClick={modalOne.onClose}>
      Remove
    </Button>
    <Button  onClick={modalTwo.onOpen} minW={"100px"} borderRadius={"5px"}>
              Continue
              </Button>
  </ModalFooter>
</ModalContent>
</Modal>
 {/* CLIENT FILE ATTACHMENTS */}

<Modal isOpen={modalTwo.isOpen} onClose={modalTwo.onClose} size={"md"}>
<ModalOverlay />
<ModalContent>
  <ModalHeader>CLIENT FILE ATTACHMENTS FOR JEROD HANSEN</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"0"}}>

  <Flex direction="column" padding={0}>
     <VStack divider={<StackDivider />} align="normal" p={0}>
           
              <HStack padding={2}>
                {" "}
                <AddIcon  cursor={"pointer"} />
                <EditIcon  cursor="pointer" />
               
              </HStack>
           
          </VStack>

          <TableContainer className="client-table">
  <Table variant='striped' className="clientfile">
 
    <Thead>
      <Tr>
        <Th>Icon</Th>
        <Th>Description</Th>
        <Th>Size</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    
  </Table>
</TableContainer>
          </Flex>
  </ModalBody>
  <ModalFooter>
  
    <Button onClick={modalThree.onOpen} minW={"100px"} borderRadius={"5px"}>
              Done
              </Button>
  </ModalFooter>
</ModalContent>
</Modal>
 {/* Send Email */}
<Modal isOpen={modalThree.isOpen} onClose={modalThree.onClose} size={"sm"}>
<ModalOverlay />
<ModalContent className="fullheight-chakra">
  <ModalHeader>SEND EMAIL</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"0"}}>
  <Grid templateColumns="repeat(1, 1fr)" gap={1} style={{padding:"10px"}} className="sizereize">
    <div className="bg-class">
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="sendto"
    label="Sent To"
    // isRequired
    defaultValue="Support@avimark.net"   
    />
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="CC"
    label="CC"
    // isRequired
    defaultValue=""   
    />
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="Subject"
    label="Subject"
    // isRequired
    defaultValue=""   
    />
  <InputGroup>
  
      <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="Attachment"
    label="Attachment"
    // isRequired
    defaultValue=""   
    />
      <InputRightElement pointerEvents="none">
        ...
      </InputRightElement>
    </InputGroup>

    <FormControl className="optionselect">
      <legend>Reply To</legend>
      <div className="selectoption">
      <Select placeholder=" ">
        <option value="option1">option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>

    <FormCheckbox
                control={control}
                name="suspendedReminder"
                label="Post copy to medical history"
                justifyContent={"start"}
              />

<FormControl className="optionselect">
      <legend>Patient</legend>
      <div className="selectoption">
      <Select placeholder="Lucy" >
        <option value="option1">Lucy</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>   
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        <Radio value="1">Send in plain text</Radio>
        <Radio value="2">Send as HTML content</Radio> 
      </Stack>
    </RadioGroup> 
    </div>   
    
    <Textarea resize="none" rows={10} defaultValue="07-19-07 11:25a:" className="modaltextarea" style={{marginTop:"5px"}} />
    <FormControl className="optionselect">
      <div className="selectoption">
      <Select placeholder="">
        <option value="option1">Brother FAX-4100</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>
    </Grid>

  </ModalBody>
  <ModalFooter>
  <Button variant={"outline"} mr={3} onClick={modalThree.onClose}>
      Quit
    </Button>
    <Button type="button" onClick={modalFour.onOpen} minW={"100px"}  mr={3}  borderRadius={"5px"}>
              Send
              </Button>
              <Button type="button" minW={"100px"} borderRadius={"5px"}>
              Print
              </Button>
  </ModalFooter>
</ModalContent>
</Modal>
 {/* CHANGE MAKER */}
<Modal isOpen={modalFour.isOpen} onClose={modalFour.onClose} size={"sm"}>
<ModalOverlay />
<ModalContent className="changemaker">
  <ModalHeader>CHANGE MAKER</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"0"}}>
  <Grid templateColumns="repeat(1, 1fr)" gap={1} style={{padding:"10px"}} className="sizereize">
    <div className="bg-class">
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="Amount"
    label="Amount Tendered"
    // isRequired
    defaultValue="50.00"   
    />
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="Balance"
    label="Appy to Balance"
    // isRequired
    defaultValue="44.68"   
    />
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="change"
    label="Their Change"
    // isRequired
    defaultValue="5.32"   
    />
    </div>   
    </Grid>
  </ModalBody>
  <ModalFooter>
  <Button variant={"outline"} mr={3} onClick={modalFour.onClose}>
      Cancel
    </Button>
    <Button type="button" minW={"100px"}  mr={3}  borderRadius={"5px"} onClick={modalFive.onOpen}>
              Continue
              </Button>
              <Button variant={"outline"}  minW={"100px"} borderRadius={"5px"}>
              Help
              </Button>
  </ModalFooter>
</ModalContent>
</Modal>
{/* Undelete Accounting */}
<Modal isOpen={modalFive.isOpen} onClose={modalFive.onClose} size={"lg"}>
<ModalOverlay />
<ModalContent>
  <ModalHeader>UNDELETE ACCOUNTING</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"0"}}>
  <Grid templateColumns="repeat(1, 1fr)" gap={1} style={{padding:"10px"}} className="sizereize">
    <div className="bg-class1">
    <FormInput
    className="w-6"
    control={control}
    //placeholder="Hasen, Jerod"
    name="Amount"
    label="Undelete Accounting For"
    // isRequired
    defaultValue="#1617 Hasen, Jerod"   
    />    
<TableContainer className="client-table">
  <Table variant="simple" className="clientfile">
    <Thead>
      <Tr>
        <Th>Date</Th>
        <Th>Patient</Th>
        <Th>Code</Th>
        <Th>Description</Th>
        <Th>Tax</Th>
        <Th>Amount</Th>
        <Th>Balance</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr  
      _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr  
      _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr 
       _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
    </Tbody>
    
  </Table>
</TableContainer>
    
    </div>   
    </Grid>

  </ModalBody>
  <ModalFooter>
  <Button variant={"outline"} minW={"100px"} mr={3} onClick={modalFive.onClose}>
      Cancel
    </Button>
    <Button type="button" minW={"100px"}  mr={3}  borderRadius={"5px"} onClick={modalDelete.onOpen}>
      Undelete 
     </Button>
              
  </ModalFooter>
</ModalContent>
</Modal>
{/* delete Confirm */}

<Modal isOpen={modalDelete.isOpen} onClose={modalDelete.onClose} size={"sm"}>
<ModalOverlay />
<ModalContent className="deletemessage">
  <ModalHeader>Confirm</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{paddingTop:"20px"}}>
    <p style={{color:"#000"}}> Search for deleted accounting?</p>
  </ModalBody>
  <ModalFooter>
  <Button variant={"outline"} minW={"100px"} mr={3} onClick={modalDelete.onClose}>
      No
    </Button>
    <Button type="button" minW={"100px"}  mr={3}  borderRadius={"5px"}>
      Yes
     </Button>
             
  </ModalFooter>
</ModalContent>
</Modal>

{/* Print Mailing Label*/}

<Modal isOpen={modalSix.isOpen} onClose={modalSix.onClose} size={"sm"}>
<ModalOverlay />
<ModalContent className="PrintMailing ">
  <ModalHeader>Print Mailing Label</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
    <div className="bg-class">
    <Grid templateColumns="repeat(1, 1fr)" gap={1}  className="sizereize">
    <FormControl className="optionselect">
      <legend>Print To</legend>
      <div className="selectoption">
      <Select placeholder="">
        <option value="option1">Dynamo label Printer</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>
    </Grid>
 
    <Grid templateColumns="repeat(1, 1fr 2fr )" gap={1}  className="sizereize"> 
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="Copies"
    label="Copies"
    // isRequired
    defaultValue="1"   
    />
     <FormControl className="optionselect">
      <legend>Quality</legend>
      <div className="selectoption">
      <Select placeholder="">
        <option value="option1">label Printer</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>
    </Grid>

    <Grid templateColumns="repeat(1, 1fr 2fr )" gap={1}  className="sizereize"> 
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="Position"
    label="Position"
    // isRequired
    defaultValue="1"   
    /> 
      <FormControl className="optionselect">
      <legend>Style</legend>
      <div className="selectoption">
      <Select placeholder="">
        <option value="option1">One Up, Label print</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl> 
    </Grid>
    </div>
    
   
  </ModalBody>
  <ModalFooter>
  <Button variant={"outline"} minW={"100px"} mr={3} onClick={modalSix.onClose}>
      Cancel
    </Button>
    <Button type="button" minW={"100px"}  mr={3}  borderRadius={"5px"}>
      Print
     </Button>
     <Button variant={"outline"} minW={"100px"} mr={3}>
      Help
    </Button>           
  </ModalFooter>
</ModalContent>
</Modal>
{/* Reminder Template*/}
<Modal isOpen={modalReminder.isOpen} onClose={modalReminder.onClose} size={"lg"}>
<ModalOverlay />
<ModalContent className="PrintMailing ">
  <ModalHeader>Reminder Template</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
    <div className="bg-class" style={{padding:0}}>
    <h4 className="title-rem">Reminder</h4>  
    <Grid templateColumns="repeat(1, 250px 1fr)" gap={1}  className="sizereize p10" > 
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="Code"
    label="Code"
    // isRequired
    defaultValue="436"   
    />
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="Description"
    label="Description"
    // isRequired
    defaultValue="Rabies Vaccination"   
    />
    </Grid>
    <Grid templateColumns="repeat(1, 250px 250px 1fr)" gap={1}  className="sizereize p10" style={{alignItems:"center"}}> 
    <FormControl className="optionselect">
      <legend>Species</legend>
      <div className="selectoption">
      <Select placeholder="">
        <option value="option1">Carnine</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>
     <FormControl className="optionselect">
      <legend>And</legend>
      <div className="selectoption">
      <Select placeholder=" ">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>

    <FormCheckbox
                control={control}
                name="VaccineHistory"
                label="Show in Vaccine History"
                justifyContent={"start"}
              />
    </Grid> 
    </div>
    <Box my={2} p={0} className="bg-class">
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Controls</Tab>
          <Tab>Advances</Tab>
          <Tab>Reminded By</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          <Grid templateColumns="repeat(1, 200px 200px 1fr)" gap={1}  className="sizereize" style={{alignItems:"center",padding:"10px",borderBottom: "1px solid #e8e3e4"}}> 
          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="Remind Every"
              label="Remind Every"
              // isRequired
              defaultValue="1"   
              />
            <FormControl className="optionselect">
               <legend>Species</legend>
              <div className="selectoption">
              <Select placeholder="Years">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>
            <FormCheckbox
                        control={control}
                        name="nevertreated"
                        label="Remind if never treated"
                        justifyContent={"start"}
                      />
            </Grid>
            <Grid templateColumns="repeat(1, 300px 100px 200px)" gap={1}  className="sizereize p10" mt={"2"} style={{alignItems:"center",}}> 
            <FormControl className="optionselect">
            <legend>Start reminding</legend>
              <div className="selectoption">
              <Select placeholder="At Age">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>
          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="noweeks"
              label=""
              // isRequired
              defaultValue="16"   
              />
            <FormControl className="optionselect">
              
              <div className="selectoption">
              <Select placeholder="Weeks">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>
</Grid>
<Grid templateColumns="repeat(1, 300px 100px 200px)" gap={1}  className="sizereize p10" mb={"2"} style={{alignItems:"center",borderBottom: "1px solid #e8e3e4"}}> 
            <FormControl className="optionselect">
            <legend>Stop reminding</legend>
              <div className="selectoption">
              <Select placeholder="At Age">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>
          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="stpweeks"
              label=""
              // isRequired
              defaultValue=" "   
              />
            <FormControl className="optionselect">
              
              <div className="selectoption">
              <Select placeholder="(none)">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>   
            </Grid>
            <Grid templateColumns="repeat(2, 2fr)" gap={1}  className="sizereize" style={{alignItems:"center",padding:"10px",borderBottom: "1px solid #e8e3e4"}}> 
               <div>                     
            <Grid templateColumns="repeat(1, 350px 2fr)" gap={1}  className="sizereize p10 patient-treat" mt={"2"} style={{alignItems:"center",}}> 
        
          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="patient-treated"
              label="Patient to be treated"
              // isRequired
              defaultValue=" "   
              />
            <FormControl className="optionselect">
            <legend style={{textAlign:"right"}}>times</legend>
            </FormControl>
            </Grid>
            <Grid templateColumns="repeat(1, 250fr)" gap={1}  className="sizereize p10 patient-treat" mt={"2"} style={{alignItems:"center",}}> 

            <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="series"
              label="Series Name"
              // isRequired
              defaultValue=" "   
              />
            
</Grid></div>
               <div>
               <NumberInput  min={0} max={100} step={100}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
               </div>
            
            </Grid>
          </TabPanel>
          <TabPanel>
          <Grid templateColumns="repeat(1, 200px 200px 1fr)" gap={1}  className="sizereize" style={{alignItems:"center",padding:"10px",borderBottom: "1px solid #e8e3e4"}}> 
          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="Remind Every"
              label="Remind Every"
              // isRequired
              defaultValue="1"   
              />
            <FormControl className="optionselect">
               <legend>Species</legend>
              <div className="selectoption">
              <Select placeholder="Years">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>

            <FormCheckbox
                        control={control}
                        name="nevertreated"
                        label="Remind if never treated"
                        justifyContent={"start"}
                      />
            </Grid>
            <Grid templateColumns="repeat(1, 300px 100px 200px)" gap={1}  className="sizereize p10" mt={"2"} style={{alignItems:"center",}}> 
            <FormControl className="optionselect">
            <legend>Start reminding</legend>
              <div className="selectoption">
              <Select placeholder="At Age">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>

          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="noweeks"
              label=""
              // isRequired
              defaultValue="16"   
              />
            <FormControl className="optionselect">
              
              <div className="selectoption">
              <Select placeholder="Weeks">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>
</Grid>
<Grid templateColumns="repeat(1, 300px 100px 200px)" gap={1}  className="sizereize p10" mb={"2"} style={{alignItems:"center",borderBottom: "1px solid #e8e3e4"}}> 
            <FormControl className="optionselect">
            <legend>Stop reminding</legend>
              <div className="selectoption">
              <Select placeholder="At Age">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>
          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="stpweeks"
              label=""
              // isRequired
              defaultValue=" "   
              />
            <FormControl className="optionselect">
              <div className="selectoption">
              <Select placeholder="(none)">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>   
            </Grid>
            <Grid templateColumns="repeat(2, 2fr)" gap={1}  className="sizereize" style={{alignItems:"center",padding:"10px",borderBottom: "1px solid #e8e3e4"}}> 
               <div>        
                
            <Grid templateColumns="repeat(1, 350px 2fr)" gap={1}  className="sizereize p10 patient-treat" mt={"2"} style={{alignItems:"center",}}> 
        
          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="patient-treated"
              label="Patient to be treated"
              // isRequired
              defaultValue=" "   
              />
            <FormControl className="optionselect">
            <legend style={{textAlign:"right"}}>times</legend>
            </FormControl>
            </Grid>
            <Grid templateColumns="repeat(1, 250fr)" gap={1}  className="sizereize p10 patient-treat" mt={"2"} style={{alignItems:"center",}}> 

            <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="series"
              label="Series Name"
              // isRequired
              defaultValue=" "   
              />
            </Grid></div>
               <div>
               <NumberInput  min={0} max={100} step={100}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

               </div>
            
            </Grid>
            
          </TabPanel>
          <TabPanel>
          <Grid templateColumns="repeat(1, 200px 200px 1fr)" gap={1}  className="sizereize" style={{alignItems:"center",padding:"10px",borderBottom: "1px solid #e8e3e4"}}> 
          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="Remind Every"
              label="Remind Every"
              // isRequired
              defaultValue="1"   
              />
            <FormControl className="optionselect">
               <legend>Species</legend>
              <div className="selectoption">
              <Select placeholder="Years">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>

            <FormCheckbox
                        control={control}
                        name="nevertreated"
                        label="Remind if never treated"
                        justifyContent={"start"}
                      />
            </Grid>
            <Grid templateColumns="repeat(1, 300px 100px 200px)" gap={1}  className="sizereize p10" mt={"2"} style={{alignItems:"center",}}> 
            <FormControl className="optionselect">
            <legend>Start reminding</legend>
              <div className="selectoption">
              <Select placeholder="At Age">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>

          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="noweeks"
              label=""
              // isRequired
              defaultValue="16"   
              />
            <FormControl className="optionselect">
              
              <div className="selectoption">
              <Select placeholder="Weeks">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>
</Grid>
<Grid templateColumns="repeat(1, 300px 100px 200px)" gap={1}  className="sizereize p10" mb={"2"} style={{alignItems:"center",borderBottom: "1px solid #e8e3e4"}}> 

            <FormControl className="optionselect">
            <legend>Stop reminding</legend>
              <div className="selectoption">
              <Select placeholder="At Age">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>

          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="stpweeks"
              label=""
              // isRequired
              defaultValue=" "   
              />
            <FormControl className="optionselect">
              
              <div className="selectoption">
              <Select placeholder="(none)">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              </div>
            </FormControl>   
            </Grid>
            <Grid templateColumns="repeat(2, 2fr)" gap={1}  className="sizereize" style={{alignItems:"center",padding:"10px",borderBottom: "1px solid #e8e3e4"}}> 
               <div>        
                
            <Grid templateColumns="repeat(1, 350px 2fr)" gap={1}  className="sizereize p10 patient-treat" mt={"2"} style={{alignItems:"center",}}> 
        
          <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="patient-treated"
              label="Patient to be treated"
              // isRequired
              defaultValue=" "   
              />
            <FormControl className="optionselect">
            <legend style={{textAlign:"right"}}>times</legend>
            </FormControl>
            </Grid>
            <Grid templateColumns="repeat(1, 250fr)" gap={1}  className="sizereize p10 patient-treat" mt={"2"} style={{alignItems:"center",}}> 

            <FormInput
              control={control}
              //placeholder="Hasen, Jerod"
              name="series"
              label="Series Name"
              // isRequired
              defaultValue=" "   
              />
            
</Grid></div>
               <div>
               <NumberInput  min={0} max={100} step={100}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

               </div>
            
            </Grid>
           
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    
   
  </ModalBody>
  <ModalFooter style={{justifyContent:"space-between"}}>
    <div><Button type="button" minW={"100px"} mr={3} borderRadius={"2px"}>
      Wizard
    </Button>
    <Button type="button" minW={"100px"}  mr={3}  borderRadius={"2px"}>
              Apply
     </Button>

             </div>
             <div>
     <Button variant={"outline"} minW={"100px"} mr={3} onClick={modalReminder.onClose} borderRadius={"2px"}>
      Cancel
    </Button>
    <Button type="button" minW={"100px"}  mr={3}  borderRadius={"2px"}>
              Done
     </Button>
     <Button variant={"outline"} minW={"100px"} mr={0} borderRadius={"2px"}>
      Help
    </Button>
    </div> 
  </ModalFooter>
</ModalContent>
</Modal>
{/* New Follow Up */}
<Modal isOpen={modalFollowup.isOpen} onClose={modalFollowup.onClose} size={"md"}>
<ModalOverlay />
<ModalContent className="newfollowup ">
  <ModalHeader>New Follow Up</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
  
    <div className="bg-class" style={{padding:"0px"}}>
    
    <Grid templateColumns="repeat(1, 1fr)" gap={1}  className="sizereize p10" > 
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="Subject"
    label="Subject"
    // isRequired
    defaultValue="" 
    style={{ width:"65%"}}  
    />
   
    </Grid>
    <Grid templateColumns="repeat(1, 300px 1fr)" gap={1}  className="sizereize p10" style={{alignItems:"center",borderBottom: "1px solid #e8e3e4"}}> 
    <FormControl className="optionselect">
      <legend>Doctor</legend>
      <div className="selectoption">
      <Select placeholder=" ">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>
    <FormCheckbox
                control={control}
                name="Critical"
                label="Critical"
                justifyContent={"start"}
              />
    </Grid>
    <Grid templateColumns="repeat(1, 2fr 2fr 1fr)" gap={1}  className="sizereize p10" mt={"2"}> 
    <FormControl className="optionselect">
      <legend>Due Date</legend>
      <div className="selectoption">
      <Select placeholder="">
        <option value="option1">07-19-07</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>
    <FormControl className="optionselect">
      <legend>or in</legend>
      <NumberInput defaultValue={0} min={1} max={10} >
        <NumberInputField  style={{height:"37px"}}/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
    <FormControl className="optionselect">
      <legend>days</legend>
    </FormControl>
    </Grid> 
    <Grid templateColumns="repeat(1, 2fr 2fr 1fr)" gap={1}  className="sizereize p10"> 
    <FormControl className="optionselect">
      <legend>Repeat Every</legend>
      <div className="selectoption">
      <Select placeholder="">
        <option value="option1">07-19-07</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>
    <FormControl className="optionselect">
      <legend>Days for</legend>
      <NumberInput defaultValue={0} min={1} max={10} >
        <NumberInputField  style={{height:"37px"}}/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
    <FormControl className="optionselect">
      <legend>times</legend>

    </FormControl>
    </Grid> 
    <Grid templateColumns="repeat(1, 1fr)" gap={1}  className="sizereize p10"> 
    <Textarea resize="none" rows={5} defaultValue="" className="modaltextarea" style={{background:"#fff"}} />
    </Grid> 
    <Grid templateColumns="repeat(1, 1fr)" gap={1}  className="sizereize p10" mt={"2"}> 
    <FormControl className="optionselect" style={{width:"45%"}}>
     
      <div className="selectoption" >
      <Select placeholder="" >
        <option value="option1">Not Confirmed</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>
    </Grid>
    </div>
    </ModalBody>
  <ModalFooter style={{justifyContent:"space-between"}}>
    <div><Button type="button" minW={"100px"} mr={3} borderRadius={"2px"} style={{ opacity:"0.5"}}>
      Prior
    </Button>
    <Button type="button" minW={"100px"}  mr={3}  borderRadius={"2px"} style={{ opacity:"0.5"}}>
              Next
     </Button>

             </div>
             <div>
     <Button variant={"outline"} minW={"100px"} mr={3} onClick={modalFollowup.onClose} borderRadius={"2px"}>
      Cancel
    </Button>
    <Button type="button" minW={"100px"} borderRadius={"2px"}>
              Ok
     </Button>
     
    </div> 
  </ModalFooter>
</ModalContent>
</Modal>
{/* New Ownership */}
<Modal isOpen={modalOwnership.isOpen} onClose={modalOwnership.onClose} size={"md"}>
<ModalOverlay />
<ModalContent className="newfollowup ">
  <ModalHeader>New Ownership</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
    <div className="bg-class" style={{padding:"0px"}}>  
    <Grid templateColumns="repeat(1, 4fr 2fr 1fr)" gap={1}  className="sizereize p10" mt={"2"} style={{alignItems:"center",}}> 
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="ClientNo"
    label="Client No"
    // isRequired
    defaultValue="" 
   
    />
     <FormControl className="optionselect">
      <legend>Percent</legend>
      <NumberInput defaultValue={100} min={1} max={1000} >
        <NumberInputField  style={{height:"37px"}}/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
    <FormCheckbox
                control={control}
                name="Public"
                label="Public"
                justifyContent={"start"}
              />
    </Grid>
    <Grid templateColumns="repeat(1, 1fr)" gap={1}  className="sizereize p10" style={{borderBottom: "1px solid #e8e3e4"}}> 
    <FormInput
    control={control}
    //placeholder="Hasen, Jerod"
    name="Name"
    label="Name"
    // isRequired
    defaultValue="Kostial, Jeff" 
    />
    
    </Grid>
    <Grid templateColumns="repeat(1, 2fr 2fr )" gap={1}  className="sizereize p10" mt={"2"}> 
    <FormControl className="optionselect">
      <legend>Start Date</legend>
      <div className="selectoption">
      <Select placeholder="">
        <option value="option1">06-06-08</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>
    <FormControl className="optionselect">
      <legend>End Date</legend>
      <div className="selectoption">
      <Select placeholder="">
        <option value="option1"></option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      </div>
    </FormControl>
    </Grid> 
    <Grid templateColumns="repeat(1, 1fr 3fr )" gap={1}  className="sizereize p10" my={"2"}> 
    <FormCheckbox
                control={control}
                name="Previous"
                label="Previous Owner"
                justifyContent={"start"}
              />
              <FormCheckbox
                control={control}
                name="Authority"
                label="Has Ultimate Authority"
                justifyContent={"start"}
              />

    </Grid> 
    <Grid templateColumns="repeat(1, 1fr)" gap={1}  className="sizereize p10" mb={"2"}> 
    <Textarea resize="none" rows={5} defaultValue="" className="modaltextarea" style={{background:"#fff"}} />
    </Grid> 
    
    </div>
    </ModalBody>
  <ModalFooter style={{justifyContent:"space-between"}}>
    <div><Button type="button" minW={"100px"} mr={3} borderRadius={"2px"} style={{ opacity:"0.5"}}>
      Prior
    </Button>
    <Button type="button" minW={"100px"}  mr={3}  borderRadius={"2px"} style={{ opacity:"0.5"}}>
              Next
     </Button>

             </div>
             <div>
     <Button variant={"outline"} minW={"100px"} mr={3} onClick={modalOwnership.onClose} borderRadius={"2px"}>
      Cancel
    </Button>
    <Button type="button" minW={"100px"}    borderRadius={"2px"}>
              Ok
     </Button>
     
    </div> 
  </ModalFooter>
</ModalContent>
</Modal>

{/* New Appointment */}
<Modal isOpen={modalAppointment.isOpen} onClose={modalAppointment.onClose} size={"lg"}>
<ModalOverlay />
<ModalContent className="Appointment">
  <ModalHeader>New Appointment</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
  <Container maxW="container.xl"  className="bg-Appointment" style={{padding:"10px"}}>
      <Grid templateColumns="repeat(12, 1fr)" gap={2}>
        <GridItem colSpan={[12, 8]}>
          <Box  p={0}>
          <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={1.5}>
          <GridItem colSpan={[12, 3]}>
          <FormControl className="optionselect">
          <legend>Date</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">02/23/10</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
          </GridItem>
          <GridItem colSpan={[12, 3]}>
                <FormControl className="optionselect">
            <legend>Time</legend>
            <NumberInput defaultValue="12:00p" min={1} max={1000} >
              <NumberInputField  style={{height:"37px"}}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
       
          </GridItem>
          <GridItem colSpan={[12, 6]}>
          <FormInput
            control={control}
            //placeholder="Hasen, Jerod"
            name="Created"
            label="Created"
            // isRequired
            defaultValue="02/23/10" 
            />
          </GridItem>
          </Grid>
          <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={1.5}>
          <GridItem colSpan={[12, 6]}>
          <FormControl className="optionselect">
          <legend>Doctor</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">(All)</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
          </GridItem>
       
          <GridItem colSpan={[12, 6]}>
          <FormInput
            control={control}
            //placeholder="Hasen, Jerod"
            name="By"
            label="By"
            // isRequired
            defaultValue=" " 
            />
          </GridItem>
          </Grid>
          <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={1.5}>
          <GridItem colSpan={[12, 6]}>
          <FormControl className="optionselect">
          <legend>Room</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">Surgery 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
          </GridItem>
       
          <GridItem colSpan={[12, 6]}>
          <FormControl className="optionselect">
            <legend>Minutes</legend>
            <NumberInput defaultValue="20" min={1} max={1000}  style={{width:"100%"}}>
              <NumberInputField  style={{height:"37px"}}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
       
          </GridItem>
          </Grid>
          <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={1.5}>
          <GridItem colSpan={[12, 6]}>
          <FormInput
            control={control}
            placeholder="Hasen, Jerod"
            name="Client"
            label="Client"
            // isRequired
            defaultValue="" 
            />
          </GridItem>
       
          <GridItem colSpan={[12, 6]} className="phone-style">
          <FormInput
            control={control}
            placeholder="573"
            name="Phone"
            label="Phone"
            // isRequired
            defaultValue="" 
            />
            <FormInput
            control={control}
            placeholder="555-8746"
            name="Phone"
            label=""
            // isRequired
            defaultValue="" 
            />
          </GridItem>
          </Grid>
          <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 6]}>
          <FormInput
            control={control}
            placeholder="Jeb"
            name="Patient"
            label="Patient"
            // isRequired
            defaultValue=" " 
            />
          </GridItem>
          <GridItem colSpan={[12, 6]}>
          <FormControl className="optionselect">
          <legend>Species</legend>
          <div className="selectoption">
          <Select placeholder="Canine">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
          </GridItem>
       
     
          </Grid>
          <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 6]}>
          <FormInput
            control={control}
            placeholder="Australian Cattle Dog"
            name="Breed"
            label="Breed"
            // isRequired
            defaultValue=" " 
            />
          </GridItem> 
          <GridItem colSpan={[12, 6]}>
          <FormControl className="optionselect">
          <legend>Weight</legend>
          <div className="selectoption">
          <Select placeholder="32.05 lbs">
            <option value="option1">(All)</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
          </GridItem>
          </Grid>
          <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 12]}>
      <Box p="1.5" className="card-section">
        <Stack >
          <Heading fontSize="xl">NOTES</Heading>
          <Text>
           
          </Text>
         
        </Stack>
      </Box>
    
    </GridItem>
    </Grid>
          </Box>
        </GridItem>
        <GridItem colSpan={[12, 4]}>
          <Box  p={0}>
          <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 12]}>
           <Box p="1.5" className="card-section resize-height">
           <Stack>
          <Heading fontSize="xl">TX, ITEMS, DX & PROBLEMS</Heading>
          <Text>
          </Text>
         </Stack>
          </Box>
          </GridItem>
          </Grid>
          <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 12]}>
          <FormControl className="optionselect">
          <legend>Types</legend>
          <div className="selectoption onelinesection">
          <Select placeholder="">
            <option value="option1">(None)</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <VStack divider={<StackDivider />} align="normal" p={0}>
           
           <HStack padding={2}>
             {" "}
             <AddIcon  cursor={"pointer"}  style={{width:"25px",height:"25px"}}/>
             <EditIcon  cursor="pointer" style={{width:"25px",height:"25px"}}/>
           </HStack>
       </VStack>
          </div>
        </FormControl>
          </GridItem>
          </Grid>
          <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 12]}>
           <Box p="1.5" className="card-section">
           <Stack>
          <Heading fontSize="xl">REMINDERS</Heading>
          <List spacing={3} className="app-list">
        <ListItem> 
          <Text>02/11/13</Text>
          Rabies Canine1 3yrs
        </ListItem>
        <ListItem>
        <Text>02/22/11</Text>
        Parvovirus Booster
        </ListItem>
        <ListItem>
          
        <Text>02/22/11</Text>
        Bordetella Booster
        </ListItem>
   
      </List>
         </Stack>
          </Box>
          </GridItem>
          </Grid>
          </Box>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 12]}>
      <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        <Radio value="1">Unconfirmed</Radio>
        <Radio value="2">Confirmed</Radio>
        <Radio value="3">Left Message</Radio>
      </Stack>
    </RadioGroup> 
    </GridItem>
    </Grid>
    </Container>
  
  </ModalBody>
  <ModalFooter style={{justifyContent:"space-between"}}>
    <div><Button variant={"outline"} minW={"100px"} mr={3} onClick={modalAppointment.onClose} borderRadius={"2px"}>
      New Client
    </Button>
    <Button variant={"outline"} minW={"100px"} mr={3} onClick={modalAppointment.onClose} borderRadius={"2px"}>
      New patient
    </Button>
    <Button variant={"outline"} minW={"100px"}  onClick={modalAppointment.onClose} borderRadius={"2px"}>
      Next patient
    </Button>
      </div>
      <div>
     <Button variant={"outline"} minW={"100px"} mr={3} onClick={modalAppointment.onClose} borderRadius={"2px"}>
      Cancel
    </Button>
    <Button variant={"outline"} minW={"100px"} mr={3}  borderRadius={"2px"}>
      Remove
    </Button>
    <Button type="button" minW={"100px"}   mr={3}  borderRadius={"2px"}>
      Done
     </Button>
     <Button variant={"outline"} minW={"100px"}   borderRadius={"2px"}>
      Help
    </Button>
    </div> 
  </ModalFooter>
</ModalContent>
</Modal>

{/* WhiteBoard */}

<Modal isOpen={modalWhiteBoard.isOpen} onClose={modalWhiteBoard.onClose} size={"lg"}>
<ModalOverlay />
<ModalContent className="PrintMailing ">
  <ModalHeader>WhiteBoard</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
  
    <Box  p={0} className="bg-class">
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Arriving</Tab>
          <Tab>Checked-In</Tab>
          <Tab>Schedule</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          <Grid templateColumns="repeat(1, 200px 200px 1fr)" gap={1}  className="sizereize" style={{alignItems:"center",padding:"0px 10px",borderBottom: "1px solid #e8e3e4",borderTop: "1px solid #e8e3e4"}}> 
          <VStack divider={<StackDivider />} align="normal" p={0}>
           
           <HStack padding={2}>
             {" "}
             <AddIcon  cursor={"pointer"}  style={{width:"25px",height:"25px"}}/>
           </HStack>
       </VStack>
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 12]}>
            <TableContainer className="whiteboardtable">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Client</Th>
            <Th>Patient</Th>
            <Th>Unposted</Th>
            <Th>In Date</Th>
            <Th>In Time</Th>
            <Th>Waiting</Th>
            <Th>Out Date</Th>
            <Th>Out Time</Th>
          </Tr>
        </Thead>
        <Tbody>
            <Tr
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Wang, Jijie</Td>
              <Td>Ludwig</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>04:23p</Td>
              <Td>06:32</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Aljammaz, Rehaf</Td>
              <Td>Loki</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>05:17p</Td>
              <Td>00:00</Td>
              <Td>12/12/23</Td>
              <Td>12:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Rearte, Leslie</Td>
              <Td>Sierra</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:57a</Td>
              <Td>60:58</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Wang, Jijie</Td>
              <Td>Ludwig</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>04:23p</Td>
              <Td>06:32</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Aljammaz, Rehaf</Td>
              <Td>Loki</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>05:17p</Td>
              <Td>00:00</Td>
              <Td>12/12/23</Td>
              <Td>12:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Rearte, Leslie</Td>
              <Td>Sierra</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:57a</Td>
              <Td>60:58</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
        </Tbody>
      </Table>
    </TableContainer>
    </GridItem>
    </Grid>
          </TabPanel>
          <TabPanel>
          <Grid templateColumns="repeat(1, 200px 200px 1fr)" gap={1}  className="sizereize" style={{alignItems:"center",padding:"0px 10px",borderBottom: "1px solid #e8e3e4",borderTop: "1px solid #e8e3e4"}}> 
          <VStack divider={<StackDivider />} align="normal" p={0}>
           
           <HStack padding={2}>
             {" "}
             <AddIcon  cursor={"pointer"}  style={{width:"25px",height:"25px"}}/>
             
           </HStack>
       </VStack>
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 12]}>
            <TableContainer className="whiteboardtable">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Client</Th>
            <Th>Patient</Th>
            <Th>Unposted</Th>
            <Th>In Date</Th>
            <Th>In Time</Th>
            <Th>Waiting</Th>
            <Th>Out Date</Th>
            <Th>Out Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Wang, Jijie</Td>
              <Td>Ludwig</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>04:23p</Td>
              <Td>06:32</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Aljammaz, Rehaf</Td>
              <Td>Loki</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>05:17p</Td>
              <Td>00:00</Td>
              <Td>12/12/23</Td>
              <Td>12:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Rearte, Leslie</Td>
              <Td>Sierra</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:57a</Td>
              <Td>60:58</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Wang, Jijie</Td>
              <Td>Ludwig</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>04:23p</Td>
              <Td>06:32</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Aljammaz, Rehaf</Td>
              <Td>Loki</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>05:17p</Td>
              <Td>00:00</Td>
              <Td>12/12/23</Td>
              <Td>12:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Rearte, Leslie</Td>
              <Td>Sierra</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:57a</Td>
              <Td>60:58</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
        </Tbody>
      </Table>
    </TableContainer>
    </GridItem>
    </Grid>
          </TabPanel>
          <TabPanel>

          <Grid templateColumns="repeat(1, 200px 200px 1fr)" gap={1}  className="sizereize" style={{alignItems:"center",padding:"0px 10px",borderBottom: "1px solid #e8e3e4",borderTop: "1px solid #e8e3e4"}}> 
          <VStack divider={<StackDivider />} align="normal" p={0}>
           
           <HStack padding={2}>
             {" "}
             <AddIcon  cursor={"pointer"}  style={{width:"25px",height:"25px"}}/>
             
           </HStack>
       </VStack>
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 12]}>
            <TableContainer className="whiteboardtable">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Client</Th>
            <Th>Patient</Th>
            <Th>Unposted</Th>
            <Th>In Date</Th>
            <Th>In Time</Th>
            <Th>Waiting</Th>
            <Th>Out Date</Th>
            <Th>Out Time</Th>
          </Tr>
        </Thead>
        <Tbody>
            <Tr
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Wang, Jijie</Td>
              <Td>Ludwig</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>04:23p</Td>
              <Td>06:32</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Aljammaz, Rehaf</Td>
              <Td>Loki</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>05:17p</Td>
              <Td>00:00</Td>
              <Td>12/12/23</Td>
              <Td>12:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Rearte, Leslie</Td>
              <Td>Sierra</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:57a</Td>
              <Td>60:58</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Wang, Jijie</Td>
              <Td>Ludwig</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>04:23p</Td>
              <Td>06:32</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Aljammaz, Rehaf</Td>
              <Td>Loki</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>05:17p</Td>
              <Td>00:00</Td>
              <Td>12/12/23</Td>
              <Td>12:00p</Td>
            </Tr>
            <Tr
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Rearte, Leslie</Td>
              <Td>Sierra</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:57a</Td>
              <Td>60:58</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
            <Tr
            _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>Vellchko, Nate</Td>
              <Td>Rohen</Td>
              <Td></Td>
              <Td>12/12/23</Td>
              <Td>09:42a</Td>
              <Td>13:13</Td>
              <Td>12/12/23</Td>
              <Td>02:00p</Td>
            </Tr>
        </Tbody>
      </Table>
    </TableContainer>
    </GridItem>
    </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </ModalBody>
  <ModalFooter style={{justifyContent:"center"}}>
    <Button type="button" minW={"100px"}  mr={3}  borderRadius={"2px"}>
              Done
     </Button>
  </ModalFooter>
</ModalContent>
</Modal>
{/* Medical history */}
<Modal isOpen={modalMedicalhistory.isOpen} onClose={modalMedicalhistory.onClose} size={"xl"}>
<ModalOverlay />
<ModalContent className="Medicalhistory">
  <ModalHeader>Enter Medical History - For DUKE (Sex:M, Age:3Y,Weight:105.4LBS)</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
  <Container maxW="container.xl"  className="bg-Appointment" style={{padding:"10px"}}>
      <Grid templateColumns="repeat(12, 1fr)" gap={2}>
        <GridItem colSpan={[12, 12]}>
          <Box  p={0}>
          <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={1.5}>
          <GridItem colSpan={[12, 3]}>
          <FormControl className="optionselect">
          <legend>Date</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">02/23/10</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
          </GridItem>
          <GridItem colSpan={[12, 3]}>
          <FormControl className="optionselect">
          <legend>Patient</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">Duke</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
          </GridItem>
          <GridItem colSpan={[12, 3]}>
          <FormInput
            control={control}
            placeholder=""
            name="Code"
            label="Code"
            // isRequired
            defaultValue=" " 
            />
          </GridItem>
          <GridItem colSpan={[12, 3]}>
          <FormInput
            control={control}
            placeholder=""
            name="Description"
            label="Description"
            // isRequired
            defaultValue="Heat" 
            />
          </GridItem>
          </Grid>
          </Box>
          </GridItem>
          <GridItem colSpan={[12, 12]}>
          <Box  p={0}>
          <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={1.5}>
          <GridItem colSpan={[12, 3]}>
          <div className="phone-style">  
          <FormInput
            control={control}
            placeholder=""
            name="Quantity"
            label="Quantity"
            // isRequired
            defaultValue="1" 
            />
          
          <legend style={{minWidth:"auto"}}>ea</legend>
  
           </div>
          </GridItem>
        
          <GridItem colSpan={[12, 6]}>
          <div className="phone-style input-sizechange">  
          <FormInput
            control={control}
            placeholder=""
            name="Amount"
            label="Amount"
            // isRequired
            defaultValue="0.00" 
            style={{width:"75px"}}
            />
          <FormInput
            control={control}
            placeholder=""
            name="Photo"
            label="Photo"
            // isRequired
            defaultValue="" 
            style={{width:"100px"}}
            
            />
            <FormInput
            control={control}
            placeholder=""
            name="Co"
            label="Co"
            // isRequired
            defaultValue="01" 
            style={{width:"75px"}}
            
            />
            <FormInput
            control={control}
            placeholder=""
            name="At"
            label="At"
            // isRequired
            defaultValue="01.23 p" 
            style={{width:"85px"}}
            
            />
            </div>
          </GridItem>
          <GridItem colSpan={[12, 3]}>
          <FormControl className="optionselect">
          <legend>Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">Other</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
          </GridItem>
          </Grid>
          </Box>
          </GridItem>
          <GridItem colSpan={[12, 12]}>
          <Box  p={0}>
          <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={1.5}>
          <GridItem colSpan={[12, 3]}>
          <FormInput
            control={control}
            placeholder=""
            name="Form"
            label="Form"
            // isRequired
            defaultValue=" " 
            />
          </GridItem>
          <GridItem colSpan={[12, 3]}>
          <FormInput
            control={control}
            placeholder=""
            name="Xls"
            label="Xls"
            // isRequired
            defaultValue=" " 
            />
          </GridItem>
          <GridItem colSpan={[12, 3]}>
          <FormControl className="optionselect">
          <legend>Problem</legend>
          <div className="selectoption">
          <Select placeholder=" ">
            <option value="option1">02/23/10</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
          </GridItem>
          <GridItem colSpan={[12, 1]}></GridItem>
          <GridItem colSpan={[12, 2]} className="checkbox-style">
          <FormCheckbox
                control={control}
                name="Pubic"
                label="Pubic"
                justifyContent={"End"}
              />
          </GridItem>
          </Grid>
          </Box>
          </GridItem>
          <GridItem colSpan={[12, 12]}>
          <Box  p={0}>
          <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={1.5}>
          <GridItem colSpan={[12, 3]}>
          <div className="phone-style">  
          <FormInput
            control={control}
            placeholder=""
            name="Variance"
            label="Variance"
            // isRequired
            defaultValue="0" 
            />
          
          <FormInput
            control={control}
            placeholder=""
            name=""
            label=""
            // isRequired
            defaultValue="" 
            />
  
           </div>
          </GridItem>
        
          <GridItem colSpan={[12, 3]}>
          <div className="phone-style input-sizechange">  
          <FormInput
            control={control}
            placeholder=""
            name="By"
            label="By"
            // isRequired
            defaultValue="" 
            style={{width:"75px"}}
            />
         <FormControl className="optionselect">
          <legend>Site</legend>
          <div className="selectoption" style={{width:"75px"}}>
          <Select placeholder="" >
            <option value="option1">0</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
      
        </FormControl>
        </div>
        </GridItem>
        <GridItem colSpan={[12, 4]}>
        <div className="phone-style input-sizechange">  
            <FormInput
            control={control}
            placeholder=""
            name="Journal"
            label="Journal"
            // isRequired
            defaultValue="" 
            style={{width:"120px"}}
            
            />
            <FormInput
            control={control}
            placeholder=""
            name="Zip"
            label="Zip"
            // isRequired
            defaultValue=" " 
            style={{width:"85px"}}
            
            />
            </div>
          </GridItem>
          <GridItem colSpan={[12, 2]} className="checkbox-style">
          <FormCheckbox
                control={control}
                name="Care Plan"
                label="Care Plan"
                justifyContent={"end"}
              />
          </GridItem>
          </Grid>
          </Box>
          </GridItem>

          <GridItem colSpan={[12, 12]}>
          <Box  p={0}>
          <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={0}>
          <GridItem colSpan={[12, 6]}>
          <FormControl className="optionselect">
          <legend>Doctor</legend>
          <div className="selectoption" style={{width:"75px"}}>
          <Select placeholder="" >
            <option value="option1">0</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl> 
          </GridItem>
          <GridItem colSpan={[12, 6]}>
         <FormControl className="optionselect">
          <legend>Admitted</legend>
          <div className="selectoption" style={{width:"75px"}}>
          <Select placeholder="" >
            <option value="option1">0</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
        </GridItem>
          </Grid>
          </Box>
          </GridItem>
          </Grid>
          </Container>

        <Container maxW="container.xl"   style={{padding:"0px"}} mt={2}>
        <Grid templateColumns="repeat(12, 1fr)" gap={2}>
        <GridItem colSpan={[12, 4]} className="bg-Appointment">
          <Box  p={0}>
          <Stack>
          <Heading fontSize="xl">TREATMENTS</Heading>
          <List spacing={3} className="history-list">
          
          <ListItem 
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Heartworm Ab Feline (15)
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
            Heartworm Ab/Ag Feline (17)
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Heartworm Test
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Heartworm Test Mod Knotts
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Heartworm Test Occult
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
            Heartworm Treatment
            <span className="treatment-price">400.00</span>
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Zz Heartworm Sw Lab 3050
          </ListItem>
         
      
      </List>
         </Stack>
          </Box>
          </GridItem>
          <GridItem colSpan={[12, 4]} className="bg-Appointment">
          <Box  p={0}>
          <Stack>
          <Heading fontSize="xl">INVENTORY ITEMS</Heading>
          <List spacing={3} className="history-list">
          
          <ListItem 
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Cite Snap Heartworm Test
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
            Heartgard 1 Blue 68 mcg
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
            Heartgard 1 Brown 272 mcg
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
          Heartgard 1 Green 136 mcg
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Heartgard Chew 01-25 lb 6pack
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Cite Snap Heartworm Test
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Heartgard 1 Blue 68 mcg
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
          Heartgard 1 Brown 272 mcg
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Heartgard 1 Green 136 mcg
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
            Heartgard 1 Green 136 mcg
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Heartgard 1 Green 136 mcg
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Heartgard 1 Green 136 mcg
          </ListItem>
          <ListItem
            p={2}
            borderRadius="md"
            _hover={{
              backgroundColor: "#FFFEEE",
              cursor: "pointer",
              border: "1px solid #41009380",
            }}
          >
           Heartgard 1 Green 136 mcg
          </ListItem>
      
      </List>
         </Stack>
          </Box>
          </GridItem>
          <GridItem colSpan={[12, 4]} className="bg-Appointment">
          <Box  p={0}>
          <Stack spacing={0}>
          <Heading fontSize="xl">DIAGNOSES</Heading>
          <List spacing={3} className="history-list">
          
        <ListItem 
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
          Congenital Heart Defect
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
          Heart
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
          Heart Block, First Degree
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
         Heart Block, Second Degree
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
         Heart Block, Third Degree
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
          Heart Disease
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
         Heart Failure, Congestive
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
         Heart Failure, Left Side
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
         Heart Failure, Right Side
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
          Heart Disease
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
         Heart Failure, Congestive
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
         Heart Failure, Left Side
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
          }}
        >
         Heart Failure, Right Side
        </ListItem>
    
    </List>
         </Stack>
          </Box>
          </GridItem>

          </Grid>
          </Container>    

  </ModalBody>
  <ModalFooter style={{justifyContent:"center"}}>
  <Button variant={"outline"} minW={"100px"}  mr={3}  borderRadius={"2px"}>
      Help
    </Button>
    <Button variant={"outline"} minW={"100px"} mr={3}  borderRadius={"2px"}>
      Cancel
    </Button>
    <Button type="button" minW={"100px"}    borderRadius={"2px"}>
      Done
     </Button>
    
  </ModalFooter>
</ModalContent>
</Modal>
{/* Choose patient */}
<Modal isOpen={modalChoosePatient.isOpen} onClose={modalChoosePatient.onClose} size={"sm"}>
<ModalOverlay />
<ModalContent className="choosepatient ">
  <ModalHeader>Choose Patient</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
  <Container maxW="container.xl"   style={{padding:"0px"}} mt={0}>
  <Grid templateColumns="repeat(12, 1fr)" gap={2}>
  <GridItem colSpan={[12, 12]} className="bg-Appointment" style={{background: "rgb(65 0 147 / 3%)",
    borderColor: "rgb(65 0 147 / 3%)",border: "1px solid rgb(65 0 147 / 3%)"}}>
          <Box  p={0}>
          <Stack spacing={0}>
         
          <List spacing={3} className="history-list">
          
        <ListItem 
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
            color:"#000",
          }}
        >
          Baelfyre - Canine - 3y - M
        </ListItem>
        <ListItem
          p={2}
          borderRadius="md"
          _hover={{
            backgroundColor: "#FFFEEE",
            cursor: "pointer",
            border: "1px solid #41009380",
            color:"#000",
          }}
        >
         Blaze - Canine - 14y - M
        </ListItem>
       
    </List>
         </Stack>
          </Box>
          </GridItem>

          </Grid>
          </Container>
   
  </ModalBody>
  <ModalFooter justifyContent={"space-between"}>
  <FormControl className="optionselect filteroption">
          <legend>Sort By</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">Name</option>
            <option value="option2">Date</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
    <Button type="button" minW={"100px"}  mr={0}  borderRadius={"5px"}>
      Done
     </Button>
              
  </ModalFooter>
</ModalContent>
</Modal>

{/* Appointment Openings */}
<Modal isOpen={modalAppopening.isOpen} onClose={modalAppopening.onClose} size={"md"}>
<ModalOverlay />
<ModalContent className="app-opening ">
  <ModalHeader>Appointment Openings</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
  <Container maxW="container.xl"   style={{padding:"0px", border: "1px solid #eae9ee",borderRadius: "4px", background: "#f6f1f2"}} mt={0}>
        <Grid templateColumns="repeat(12, 1fr)" gap={2} p={1.5}>
          <GridItem colSpan={[12, 6]} >
           <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={2}>
           <GridItem colSpan={[12, 6]}>
           <FormControl className="optionselect">
          <legend>From</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">02/23/2007</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
        </GridItem>
        <GridItem colSpan={[12, 6]} className="bg-Appointment1">
        <FormControl className="optionselect">
          <legend>To</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">02/23/2007</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
        </GridItem>
        </Grid>
        <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={2}> 
           <GridItem colSpan={[12, 12]}>
           <FormControl className="optionselect">
          <legend>Doctors</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">DLM Douglas L Mckee, VMD</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
        </GridItem>

        </Grid>
        <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={2}>
           <GridItem colSpan={[12, 6]}>
           <FormControl className="optionselect">
          <legend>Room</legend>
          <div className="selectoption">
          <Select placeholder="">
            <option value="option1">(All)</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
        </GridItem>
        <GridItem colSpan={[12, 6]} className="bg-Appointment1">
          <div className="phone-style">
        <FormControl className="optionselect">
      <legend>Min.dur</legend>
      <NumberInput defaultValue={45} min={1} max={10}  style={{width:"75px"}}>
        <NumberInputField  style={{height:"37px"}}/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
    <FormControl className="optionselect">
      <legend style={{ minWidth: "25px"}}>Min</legend>
    </FormControl>
    </div>
        </GridItem>
        </Grid>
          </GridItem>
          </Grid>
 
   <Grid templateColumns="repeat(12, 1fr)" gap={2}  mb={1.5}>
          <GridItem colSpan={[12, 12]}>
            <TableContainer className="aptopeningtable">
      <Table variant="simple" >
        <Thead position="sticky" top={0} zIndex="docked">
          <Tr>
            <Th>Date</Th>
            <Th>Day</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th>Duration</Th>
           
          </Tr>
        </Thead>
        <Tbody>
            <Tr
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>07/19/07</Td>
              <Td>Thusday</Td>
              <Td>08:00a</Td>
              <Td>10:00p</Td>
              <Td>120</Td>
              
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>07/19/07</Td>
              <Td>Thusday</Td>
              <Td>12:00p</Td>
              <Td>06:00p</Td>
              <Td>360</Td>
              
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
             <Td>07/20/07</Td>
              <Td>Friday</Td>
              <Td>08:00a</Td>
              <Td>02:15p</Td>
              <Td>375</Td>
              
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>07/21/07</Td>
              <Td>Saturday</Td>
              <Td>12:00p</Td>
              <Td>06:00p</Td>
              <Td>600</Td>
              
            </Tr>
            <Tr
              
              _hover={{
                border: '2px  solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>07/21/07</Td>
              <Td>Saturday</Td>
              <Td>12:00p</Td>
              <Td>06:00p</Td>
              <Td>600</Td>
             
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
                 <Td>07/19/07</Td>
              <Td>Thusday</Td>
              <Td>12:00p</Td>
              <Td>06:00p</Td>
              <Td>360</Td>
              
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>07/19/07</Td>
              <Td>Thusday</Td>
              <Td>12:00p</Td>
              <Td>06:00p</Td>
              <Td>360</Td>
             
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>07/19/07</Td>
              <Td>Thusday</Td>
              <Td>12:00p</Td>
              <Td>06:00p</Td>
              <Td>360</Td>
             
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>07/19/07</Td>
              <Td>Thusday</Td>
              <Td>12:00p</Td>
              <Td>06:00p</Td>
              <Td>360</Td>
              
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
             <Td>07/19/07</Td>
              <Td>Thusday</Td>
              <Td>12:00p</Td>
              <Td>06:00p</Td>
              <Td>360</Td>
            
            </Tr>
            <Tr
              
              _hover={{
                border: '2px solid #41009380',
                borderRadius: 'md',
                cursor: 'pointer',
                bg: '#FFFEEE',
              }}
            >
              <Td>07/19/07</Td>
              <Td>Thusday</Td>
              <Td>12:00p</Td>
              <Td>06:00p</Td>
              <Td>360</Td>
            </Tr>
        </Tbody>
      </Table>
    </TableContainer>
    </GridItem>
    
    </Grid>
          </Container>
   
  </ModalBody>
  <ModalFooter >
  <Button variant={"outline"} minW={"100px"} mr={3}  borderRadius={"2px"}>
      Cancel
    </Button>
    <Button type="button" minW={"100px"}  mr={0}  borderRadius={"5px"}>
      Done
     </Button>
              
  </ModalFooter>
</ModalContent>
</Modal>
{/* recurring Appointment */}
<Modal isOpen={modalRecurringAppointment.isOpen} onClose={modalRecurringAppointment.onClose} size={"md"}>
<ModalOverlay />
<ModalContent className="choosepatient ">
  <ModalHeader>recurring Appointment </ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
  <Container maxW="container.xl"   style={{padding:"0px"}} mt={0}>
  <Grid templateColumns="repeat(12, 1fr)" gap={2}>
  <GridItem colSpan={[12, 12]} className="bg-Appointment" style={{background: "rgb(65 0 147 / 3%)",
    borderColor: "rgb(65 0 147 / 3%)",border: "1px solid rgb(65 0 147 / 3%)"}}>
       <Grid templateColumns="repeat(12, 1fr)" gap={0}>
       <GridItem colSpan={[12, 6]}>
       <Box mx="auto" className="recurringcalender">
        <CalendarView/>
      </Box>
      </GridItem>
      <GridItem colSpan={[12, 6]}>
      <h3 className="pro-title">Propagate to these dates...</h3>
         <Box className="pro-patten">
          
         <Button type="button" minW={"100px"}  mr={0}  borderRadius={"5px"} className="patten-btn" onClick={modalRecurPattern.onOpen}>
         Pattern...
     </Button>
         </Box>
        
      </GridItem>
      </Grid>
      </GridItem>
          </Grid>
          </Container>
   
  </ModalBody>
  <ModalFooter>
  <Button variant={"outline"} minW={"100px"} mr={3}  borderRadius={"2px"}>
      Cancel
    </Button>
    <Button type="button" minW={"100px"}  mr={0}  borderRadius={"5px"}>
      Done
     </Button>
              
  </ModalFooter>
</ModalContent>
</Modal>

{/* recurring pattern */}
<Modal isOpen={modalRecurPattern.isOpen} onClose={modalRecurPattern.onClose} size={"sm"}>
<ModalOverlay />
<ModalContent className="choosepatient ">
  <ModalHeader>RECURRENCE PATTERN</ModalHeader>
  <ModalCloseButton />
  <ModalBody className="" style={{padding:"10px"}}>
  <Container maxW="container.xl"   style={{padding:"0px"}} mt={0}>
  <Grid templateColumns="repeat(12, 1fr)" gap={2}>
  <GridItem colSpan={[12, 12]} className="bg-Appointment" style={{background: "transparent",
    borderColor: "rgb(65 0 147 / 3%)",border: "0px solid rgb(65 0 147 / 3%)"}}>
       <Grid templateColumns="repeat(12, 1fr)" gap={0}>
       <GridItem colSpan={[12, 12]} className="bg-Appointment">
          <Box  p={0} pb={2}>
          <Stack>
          <Heading fontSize="xl">RECURRENCE PATTERN</Heading>
          <RadioGroup onChange={setValue} value={value} px={2}>
        <Stack direction="row">
        <Radio value="1">Daily</Radio>
        <Radio value="2">Weekly</Radio>
        <Radio value="3">Monthly</Radio>
        <Radio value="4">Yearly</Radio>
      </Stack>
    </RadioGroup> 
    <RadioGroup onChange={setValue} value={value} px={2}>
        <Stack direction="row">
        <Radio value="1">Every</Radio>
        <FormControl className="optionselect">
     
     <div className="selectoption" style={{flexDirection:"row",alignItems:"center"}}>
     <NumberInput defaultValue={0} min={1} max={10}  style={{width:"100px"}}>
        <NumberInputField  style={{height:"37px"}}/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
     <legend style={{paddingLeft: "5px"}}>day(s)</legend>
     </div>
   </FormControl>
      </Stack>
    </RadioGroup> 
    <RadioGroup onChange={setValue} value={value} px={2}>
        <Stack direction="row">
        <Radio value="1">Every Weekday.</Radio>
      
      </Stack>
    </RadioGroup> 
         </Stack>
          </Box>
          </GridItem>
      <GridItem colSpan={[12, 12]} mt={2}>
      <Box  p={0}>
          <Stack>
          <Heading fontSize="xl">RANGE OF RECURRENCE</Heading>
          <FormControl className="optionselect" style={{width:"200px"}} px={2}>
          <legend>Start</legend>
          <div className="selectoption" style={{width:"200px"}}>
          <Select placeholder="" style={{width:"200px"}}>
            <option value="option1">05/01/2008</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
          <RadioGroup onChange={setValue} value={value} px={2}>
        <Stack direction="row">
        <Radio value="1"><span style={{whiteSpace:"nowrap",fontWeight:"500"}}>End After</span></Radio>
        <FormControl className="optionselect">
     
     <div className="selectoption" style={{flexDirection:"row",alignItems:"center"}}>
     <NumberInput defaultValue={0} min={1} max={10}  style={{width:"100px"}}>
        <NumberInputField  style={{height:"37px"}}/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
     <legend style={{paddingLeft: "5px"}}>Occurances</legend>
     </div>
   </FormControl>
      </Stack>
    </RadioGroup>
    <RadioGroup onChange={setValue} value={value} px={2}>
        <Stack direction="row">
        <Radio value="1"><span style={{whiteSpace:"nowrap",fontWeight:"500"}}>End By</span></Radio>
        <FormControl className="optionselect" style={{width:"200px"}}>
          
          <div className="selectoption" style={{width:"200px"}}>
          <Select placeholder=" " style={{width:"200px"}}>
            <option value="option1"></option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          </div>
        </FormControl>
      </Stack>
    </RadioGroup>
         </Stack>
          </Box>
      </GridItem>
      
      </Grid>
      </GridItem>
          </Grid>
          </Container>
   
  </ModalBody>
  <ModalFooter>
  <Button variant={"outline"} minW={"100px"} mr={3}  borderRadius={"2px"}>
      Cancel
    </Button>
    <Button type="button" minW={"100px"}  mr={0}  borderRadius={"5px"}>
      ok
     </Button>
              
  </ModalFooter>
</ModalContent>
</Modal>

</>
  );
};

export default Header;
