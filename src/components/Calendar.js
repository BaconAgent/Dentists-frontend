import { useState } from "react";

function Calendar() {
  const [date, changeDate] = useState(new Date());

  return (
    <div>
      <Calendar onChange={changeDate} value={date} />
      <p>Selected date is {date.toLocaleDateString()}</p>
    </div>
  );
}
export default Calendar;
