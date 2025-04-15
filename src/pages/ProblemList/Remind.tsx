import {HStack, Stack, StackDivider, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {AddIcon, EditIcon} from "@src/assets/svgs";
import CustomModal from "@src/common/CustomModal";
import RemindAsAddModal from "./RemindAsModal";

const RemindAs = () => {
  const {isOpen: isRemindAsOpen, onClose: onRemindAsClose, onOpen: onRemindOpen} = useDisclosure();
  return (
    <>
      <Stack m={2}>
        <HStack gap={2}>
          <AddIcon cursor={"pointer"} onClick={onRemindOpen} />
          <EditIcon cursor={"pointer"} />
        </HStack>
        <VStack divider={<StackDivider />} align="normal" p={0} mb={2}></VStack>
        <Text>Table goes here</Text>
        {isRemindAsOpen && (
          <CustomModal
            modalTitle="Add Remind As"
            hasFooter={false}
            isOpen={isRemindAsOpen}
            onClose={onRemindAsClose}
            size="sm"
          >
            <RemindAsAddModal />
          </CustomModal>
        )}
      </Stack>
    </>
  );
};
export default RemindAs;
