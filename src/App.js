import React, { useState } from 'react';
import Calendar from 'react-calendar';
import * as Hebcal from 'hebcal';
import './App.css';

const monthNames = ['', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול', 
                    'תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'אדר ב']

function App() {

  let year = new Date().getFullYear();
  let holidays = new Hebcal.GregYear(year).holidays;

  const [date, setDate] = useState(new Date());


  const setYear = (newYear) => {
    year = newYear;
    holidays = new Hebcal.GregYear(year).holidays;
  }

  const tileContent = (props) => {
    switch(props.view) {
      case "month":
        const date = new Date(props.date);
        if (year != date.getFullYear()) {
          setYear(date.getFullYear());
        }
        const today = new Hebcal.HDate(date);
        const formattedDate = `${Hebcal.gematriya(today.day)} ${monthNames[today.month]}`
        const holiday = holidays[today.toString()];
        let holidayString = '';
        if (holiday && holiday.length) {
          holidayString = holiday[0].desc[2];
          holidayString = holidayString.replace('(', '');
          holidayString = holidayString.replace(')', '');
        }
        return (
          <div>
            <div className='hebrew-string'>{formattedDate}</div>
            <div className='hebrew-string'>{holidayString}</div>
          </div>
        );
        case "year":
          const startDate = new Date(props.date);
          const startHebrewDate = new Hebcal.HDate(startDate);
          const startHebrewMonth = monthNames[startHebrewDate.month];
          const endDate = new Date(props.date)
          endDate.setMonth(startDate.getMonth() + 1);
          endDate.setDate(endDate.getDate() - 1);
          const endHebrewDate = new Hebcal.HDate(endDate);
          const endHebrewMonth = monthNames[endHebrewDate.month];
          if (startHebrewMonth !== endHebrewMonth) {
            return (
              <div>
                <div className='hebrew-string'>{startHebrewMonth} - {endHebrewMonth}</div>
              </div>
            );
          } else {
            return (
              <div>
                <div className='hebrew-string'>{startHebrewMonth}</div>
              </div>
            );
          }
      }
  }

  return (
    <div>
    <Calendar
      calendarType="Hebrew"
      tileContent={tileContent}
      onChange={setDate}
      maxDetail="month"
      minDetail="decade"
      value={date}
    />
  </div>
);
}

export default App;
