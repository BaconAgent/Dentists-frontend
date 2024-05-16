import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const BigCalendar = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedDate(start);
    setSelectedTimeSlot({ start, end });
  };

  const handleConfirmAppointment = () => {
    if (selectedTimeSlot) {
      if (isAuthenticated) {
        // You can perform any action here, like sending a request to confirm the appointment
        console.log("Confirmed appointment:", selectedTimeSlot);
      } else {
        loginWithRedirect();
      }
    } else {
      console.log("Please select a time slot first.");
    }
  };

  return (
    <div className="BigCalendar">
      <Calendar
        localizer={localizer}
        selectable
        onSelectSlot={handleSelectSlot}
        events={[]}
        defaultView="week"
        min={new Date(0, 0, 0, 9, 0)} // Start time
        max={new Date(0, 0, 0, 17, 0)} // End time
        step={30} // 30 minutes intervals
        timeslots={1}
      />
      {selectedDate && (
        <div>
          <p>Selected Date: {moment(selectedDate).format("MMMM Do YYYY")}</p>
          {selectedTimeSlot && (
            <p>
              Selected Time: {moment(selectedTimeSlot.start).format("h:mm A")} -{" "}
              {moment(selectedTimeSlot.end).format("h:mm A")}
            </p>
          )}
          <button onClick={handleConfirmAppointment}>
            Confirm Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default BigCalendar;
