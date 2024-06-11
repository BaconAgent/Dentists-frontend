import React, { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import BigCalendar from "./components/BigCalendar";
import Header from "./components/Header";
import "./styles.css";
import { addAccessTokenInterceptor } from "./axiosConfig";
import axios from "./axiosConfig";

function App() {
  const interceptorAdded = useRef(false);
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);

  useEffect(() => {
    if (!interceptorAdded.current && !isLoading) {
      addAccessTokenInterceptor(getAccessTokenSilently);
      interceptorAdded.current = true;
    }
  }, [getAccessTokenSilently, isLoading]);
  useEffect(() => {
    axios
      .get("/clinics/")
      .then((response) => setClinics(response.data))
      .catch((error) => console.error("Error fetching clinics:", error));
  }, []);

  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="App">
      <Header />
      <h1>Select a Clinic</h1>
      <ul>
        {clinics.map((clinic) => (
          <li key={clinic.id} onClick={() => handleClinicSelect(clinic)}>
            {clinic.name} - {clinic.city}, {clinic.address}
          </li>
        ))}
      </ul>
      {selectedClinic && <BigCalendar clinicId={selectedClinic.id} />}
      {/* <BigCalendar /> */}
    </div>
  );
}

export default App;
