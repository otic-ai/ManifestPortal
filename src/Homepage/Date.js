import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { color } from '@mui/system';

export default function DateCalendarFormProps() {
  const handleDateChange = (date) => {
    // Format the selected date
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    // Display the popup here when a date is selected
    if (formattedDate=='2022-04-17'){
        alert(`Selected date: ${formattedDate}`);
    }
    
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>
        <DemoItem label="Events">
          <DateCalendar
            sx={{
              '& .MuiPickersDay-root': {
                backgroundColor: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'orange',
                  '&:hover': {
                    backgroundColor: '#FFA500',
                  },
                },
              },
            }}
           
            value={dayjs('2022-04-17')}
            
            onChange={handleDateChange} // Call handleDateChange when a date is selected
     
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
