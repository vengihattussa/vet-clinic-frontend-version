import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  UnorderedList,
  ListItem,
  Text,
} from "@chakra-ui/react";

interface IUnOrderedListing {
  value: string;
  options: Array<string>[];
  onClick: () => void;
}
const UnOrderedListing = ({value, options, onClick}: IUnOrderedListing) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Text>{value} </Text>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody height={"120px"} width={"200px"}>
          <UnorderedList spacing={2} styleType={"none"}>
            {options.map(([key, option]) => (
              <ListItem key={key} onClick={onClick}>
                {option}
              </ListItem>
            ))}
          </UnorderedList>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default UnOrderedListing;
