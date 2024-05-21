import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axiosInstance from "../AxiosConfig.js";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();
  const [events, setEvents] = useState([]);

  const handleSelectSlot = ({ start, end }) => {
    const now = moment();
    const selectedStartTime = moment(start);
    const selectedEndTime = moment(end);
    const duration = selectedEndTime.diff(selectedStartTime, "minutes");

    if (
      selectedStartTime.isAfter(now) &&
      selectedStartTime.diff(now, "minutes") >= 60
    ) {
      if (duration <= 60) {
        setEvents([...events, { start, end, title: "Selected Slot" }]);
      } else {
        alert("Please select a maximum of 2 consecutive time slots (1 hour).");
      }
    } else {
      alert(
        "Please select a date and time that is at least 1 hour ahead of the current time."
      );
    }
  };

  const handleConfirmAppointment = async () => {
    if (events.length > 0) {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const response = await axiosInstance.post(
            "/appointments/",
            {
              appointments: events,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Confirmed appointment:", response.data);
        } catch (error) {
          console.error("Error confirming appointment:", error);
        }
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
        events={events}
        defaultView="week"
        step={30}
        timeslots={1}
        min={new Date(new Date().setHours(9, 0, 0, 0))}
        max={new Date(new Date().setHours(17, 0, 0, 0))}
      />
      {events.length > 0 && (
        <div>
          <p>Selected Date: {moment(events[0].start).format("MMMM Do YYYY")}</p>
          {events.map((event, index) => (
            <p key={index}>
              Selected Time: {moment(event.start).format("h:mm A")} -{" "}
              {moment(event.end).format("h:mm A")}
            </p>
          ))}
          <button onClick={handleConfirmAppointment}>
            Confirm Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default BigCalendar;
