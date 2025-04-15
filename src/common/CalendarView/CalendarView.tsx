import React, { useState } from "react";
import { ChakraProvider, Box, Button, Grid, Text, HStack } from "@chakra-ui/react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isToday, isSameDay, addWeeks } from "date-fns";

const CalendarView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week'>('month'); // 'month' or 'week' view

  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
  };

  const handlePrevMonth = (): void => {
    setCurrentMonth((prev) => addDays(startOfMonth(prev), -1));
  };

  const handleNextMonth = (): void => {
    setCurrentMonth((prev) => addDays(endOfMonth(prev), 1));
  };

  const handlePrevWeek = (): void => {
    setCurrentWeek((prev) => addWeeks(prev, -1));
  };

  const handleNextWeek = (): void => {
    setCurrentWeek((prev) => addWeeks(prev, 1));
  };

  const renderDaysOfWeek = (): JSX.Element[] => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek.map((day) => (
      <Box key={day} textAlign="center" fontWeight="bold" className="weeklyname">{day}</Box>
    ));
  };

  const renderMonthViewDates = (): JSX.Element[] => {
    const startOfCurrentMonth = startOfMonth(currentMonth);
    const endOfCurrentMonth = endOfMonth(currentMonth);

    const startOfCurrentWeek = startOfWeek(startOfCurrentMonth);
    const endOfCurrentWeek = endOfWeek(endOfCurrentMonth);

    let days: Date[] = [];
    let dateIterator = startOfCurrentWeek;

    while (dateIterator <= endOfCurrentWeek) {
      days.push(dateIterator);
      dateIterator = addDays(dateIterator, 1);
    }

    return days.map((date) => (
      <Box key={date.toString()} p={3} textAlign="center" cursor="pointer" 
           bg={isSameDay(date, selectedDate) ? '#60803A' : isToday(date) ? '#60803A' : 'transparent'}
           color={isSameDay(date, selectedDate) ? 'white' : 'black'}
           borderRadius="md"
           onClick={() => handleDateClick(date)} className="month-part">
        {format(date, "d")}
      </Box>
    ));
  };

  const renderWeekViewDates = (): JSX.Element[] => {
    const startOfCurrentWeek = startOfWeek(currentWeek);
    const daysOfCurrentWeek: Date[] = [];
    let dateIterator = startOfCurrentWeek;

    for (let i = 0; i < 7; i++) {
      daysOfCurrentWeek.push(dateIterator);
      dateIterator = addDays(dateIterator, 1);
    }

    return daysOfCurrentWeek.map((date) => (
      <Box key={date.toString()} p={3} textAlign="center" cursor="pointer" 
           bg={isSameDay(date, selectedDate) ? 'blue.500' : isToday(date) ? 'green.200' : 'transparent'}
           color={isSameDay(date, selectedDate) ? 'white' : 'black'}
           borderRadius="md"
           onClick={() => handleDateClick(date)} className="week-part">
        {format(date, "d")}
      </Box>
    ));
  };

  return (
    <ChakraProvider>
      <Box p={0} maxWidth="600px" margin="auto">
      
        {/* Display Selected Date */}
        <Box textAlign="center">
          <Text fontSize="xl" className="date-title">
          {format(selectedDate, "MM/dd/yyyy")}
          </Text>
        </Box>




        {/* Month View */}
        {view === 'month' && (
          <Box className="month-title">
            {/* <Text textAlign="center" fontSize="2xl">
              {format(currentMonth, "MMMM yyyy")}
            </Text> */}

            <Grid templateColumns="repeat(7, 1fr)" gap={2} mt={4}>
              {renderDaysOfWeek()}
            </Grid>

            <Grid templateColumns="repeat(7, 1fr)" gap={2} mt={2}>
              {renderMonthViewDates()}
            </Grid>
          </Box>
        )}

        {/* Week View */}
        {view === 'week' && (
          <Box>
            {/* <Text textAlign="center" fontSize="2xl">
              {`Week of ${format(currentWeek, "MMMM d, yyyy")}`}
            </Text> */}

            <Grid templateColumns="repeat(7, 1fr)" gap={2} mt={4}>
              {renderDaysOfWeek()}
            </Grid>

            <Grid templateColumns="repeat(7, 1fr)" gap={2} mt={2}>
              {renderWeekViewDates()}
            </Grid>
          </Box>
        )}
                {/* View Toggle Buttons with Navigation */}
                <HStack spacing={4} justify="center" mb={4} className="main-arrow">
    

          {/* Week View Button and Navigation */}
          <HStack spacing={2} >
           
            <Button onClick={handlePrevWeek} colorScheme="blue" className="leftarrow-style">
            &#8249;
            </Button>
            <Button onClick={() => setView('week')} colorScheme={view === 'week' ? 'blue' : 'gray'} className="middle-style">
              Week 
            </Button>
            <Button onClick={handleNextWeek} colorScheme="blue" className="rightarrow-style">
            &#8250;
            </Button>
          </HStack>
                 {/* Month View Button and Navigation */}
                 <HStack spacing={2}>
            
            <Button onClick={handlePrevMonth} colorScheme="blue" className="leftarrow-style">
            &#8249;
            </Button>
            <Button onClick={() => setView('month')} colorScheme={view === 'month' ? 'blue' : 'gray'} className="middle-style1">
              Month 
            </Button>
            <Button onClick={handleNextMonth} colorScheme="blue" className="rightarrow-style">
            &#8250;
            </Button>
          </HStack>
        </HStack>
       
      </Box>
    </ChakraProvider>
  );
};

export default CalendarView;
