import {Button, useDisclosure} from "@chakra-ui/react";
import CustomModal from "@src/common/CustomModal";

interface ITestProps {
  id?: string | number;
}
const Test1 = ({id}: ITestProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Click me</Button>
      {id && <h1>My id is {id}</h1>}
      <h1>This is test 1</h1>
      {isOpen && (
        <CustomModal isOpen={isOpen} onClose={onClose} modalTitle="List">
          Test is 2nd step modal
        </CustomModal>
      )}
    </>
  );
};

export default Test1;
