// BigCalendar.js
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "../axiosConfig";
import { useAuth0 } from "@auth0/auth0-react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ clinicId: clinic_id }) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [appointments, setAppointments] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    // Fetch appointments for the selected clinic
    axios
      .get(`/appointments/${clinic_id}/`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, [clinic_id]);

  const handleSelectSlot = ({ start, end }) => {
    const now = moment();
    const selectedStartTime = moment(start);
    const selectedEndTime = moment(end);

    // Check if the selected slot is in the future and at least 1 hour from now
    if (
      !selectedStartTime.isAfter(now) ||
      selectedStartTime.diff(now, "hours") < 1
    ) {
      alert(
        "Please select a time slot that is at least 1 hour ahead of the current time."
      );
      return;
    }

    // Check if the duration of the selected slot is exactly 30 minutes or 1 hour
    const durationInMinutes = selectedEndTime.diff(
      selectedStartTime,
      "minutes"
    );
    if (durationInMinutes !== 30 && durationInMinutes !== 60) {
      alert(
        "Please select a time slot with a duration of either 30 minutes or 1 hour."
      );
      return;
    }

    setSelectedTimeSlot({ start, end });
  };

  const handleConfirmAppointment = () => {
    if (selectedTimeSlot) {
      if (isAuthenticated) {
        const appointmentData = {
          user_id: user.sub, // Using Auth0 user ID
          clinic_id: clinic_id, // Dynamic clinic ID
          start_time: selectedTimeSlot.start,
          end_time: selectedTimeSlot.end,
        };

        axios
          .post("/appointments/create", appointmentData)
          .then((response) => {
            setAppointments([...appointments, response.data]);
            setSelectedTimeSlot(null);
          })
          .catch((error) =>
            console.error("Error creating appointment:", error)
          );
      } else {
        loginWithRedirect();
      }
    } else {
      alert("Please select a time slot first.");
    }
  };

  return (
    <div className="BigCalendar">
      <Calendar
        localizer={localizer}
        selectable
        onSelectSlot={handleSelectSlot}
        events={appointments.map((app) => ({
          start: new Date(app.start_time),
          end: new Date(app.end_time),
          // title: `Appointment with ${app.user.name}`,
        }))}
        defaultView="week"
        min={new Date(0, 0, 0, 9, 0)} // Start time
        max={new Date(0, 0, 0, 17, 0)} // End time
        step={30} // 30 minutes intervals
        timeslots={1}
      />
      {selectedTimeSlot && (
        <div>
          <p>
            Selected Date:{" "}
            {moment(selectedTimeSlot.start).format("MMMM Do YYYY")}
          </p>
          <p>
            Selected Time: {moment(selectedTimeSlot.start).format("h:mm A")} -{" "}
            {moment(selectedTimeSlot.end).format("h:mm A")}
          </p>
          <button onClick={handleConfirmAppointment}>
            Confirm Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default BigCalendar;
