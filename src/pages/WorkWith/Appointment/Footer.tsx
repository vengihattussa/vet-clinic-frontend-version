import {HStack, IconButton, Text} from "@chakra-ui/react";
import Tabs from "@src/common/Tabs";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const FooterTabs = ({
  startDate,
  onTabClick,
  setSelectedDate,
  selectedDate,
}: {
  startDate: dayjs.Dayjs;
  onTabClick: (date: dayjs.Dayjs) => void;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  selectedDate: dayjs.Dayjs;
}) => {
  const weekDays = Array.from({length: 7}, (_, i) => {
    const date = startDate.add(i, "day");
    return {name: date.format("ddd DD"), date: date};
  });

  const activeTabIndex = weekDays.findIndex((day) => day.date.isSame(selectedDate, "day"));

  return (
    <Tabs
      height="100%"
      tabs={weekDays.map((day) => ({
        tab: day.name,
        onClick: () => {
          onTabClick(day.date);
          setSelectedDate(day.date);
        },
      }))}
      variant="capsule"
      customHeight="40px"
      index={activeTabIndex}
    />
  );
};

const FooterButton = ({
  children,
  onPrev,
  onNext,
}: {
  children: React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
}) => {
  return (
    <HStack width={"240px"}>
      <IconButton
        aria-label="previous"
        boxSize={"35px"}
        bg={"transparent"}
        border={"1px solid"}
        borderColor={"#60803a"}
        borderRadius={6}
        p={1}
        onClick={onPrev}
      >
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path
            d="M11.62 3.81 7.43 8l4.19 4.19-1.53 1.52L4.38 8l5.71-5.71 1.53 1.52z"
            fill="#60803a"
          />
        </svg>
      </IconButton>
      <Text fontSize={14} fontWeight={800}>
        {children}
      </Text>
      <IconButton
        aria-label="next"
        boxSize={"35px"}
        bg={"transparent"}
        border={"1px solid"}
        borderColor={"#60803a"}
        borderRadius={6}
        p={1}
        onClick={onNext}
      >
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path
            d="M4.38 12.19 8.57 8 4.38 3.81l1.53-1.52L11.62 8l-5.71 5.71-1.53-1.52z"
            fill="#60803a"
          />
        </svg>
      </IconButton>
    </HStack>
  );
};

interface FooterProps {
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  handleTabClick: (newDate: dayjs.Dayjs) => void;
  changeMonth: (offset: number) => void;
  changeWeek: (offset: number) => void;
  startOfWeek: string;
  endOfWeek: string;
}

const Footer: React.FC<FooterProps> = ({
  selectedDate,
  setSelectedDate,
  handleTabClick,
  changeMonth,
  changeWeek,
  startOfWeek,
  endOfWeek,
}) => {
  return (
    <HStack w={"100%"} justifyContent={"space-between"} h={"50px"}>
      <FooterTabs
        selectedDate={selectedDate}
        startDate={selectedDate.startOf("week")}
        onTabClick={(e) => handleTabClick(e)}
        setSelectedDate={setSelectedDate}
      />

      <HStack gap={2}>
        <FooterButton
          onNext={() => changeWeek(1)}
          onPrev={() => changeWeek(-1)}
        >{`${startOfWeek} - ${endOfWeek}`}</FooterButton>
        <FooterButton onNext={() => changeMonth(1)} onPrev={() => changeMonth(-1)}>
          {selectedDate.format("MMMM YYYY")}
        </FooterButton>
      </HStack>
    </HStack>
  );
};

export default Footer;
