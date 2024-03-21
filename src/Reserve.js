import { useEffect, useState } from "react"; //why

import axios from "axios";

function Reserve() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/reserve/");
        setData(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 500);
    return () => clearInterval(intervalId);
  }, []);
  return <div className="Hello World">{data}</div>;
}

export default Reserve;
