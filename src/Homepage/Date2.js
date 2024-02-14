import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './home.css';

const localizer = momentLocalizer(moment)

const events = [
  {
    title: 'Event 1',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    title: 'Event 1',
  },
  {
    title: 'Event 2',
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  }
];

const MyCalendar = ({height}) => {
    const handleDateChange = (date) => {
        // Format the selected date
      
            alert(`Selected date: ${JSON.stringify(date)}`);
        
        
      };
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const maxWidth = 850; // Max width value

  const width = windowWidth <= maxWidth ? '80vw' : '300px';
  return (
    <div>
      <Calendar
       localizer={localizer}
       events={events}
       startAccessor="start"
       endAccessor="end"
       onSelectEvent={handleDateChange}
       className='date-calendar'
       style={{height:height,}}
      />
    </div>
  );
};

export default MyCalendar;
