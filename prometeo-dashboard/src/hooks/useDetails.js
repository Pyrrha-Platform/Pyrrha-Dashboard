import React, { useState, useEffect, useRef } from "react";
import Utils from "../utils/Utils";

const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchDetails = async (firefighterId, increment, type) => {
  try {
    const data = await client(
      `/api/v1/dashboard-details/${firefighterId}/${increment}/${type}`
    );
    console.log(data);
    return data.details;
  } catch (e) {
    console.log(e);
  }
};

const updateDetails = (details, message) => {
  console.log("details", details);
  let newDetails = JSON.parse(JSON.stringify(details));
  console.log("newDetails", newDetails);

  let newMessage = JSON.parse(message);

  console.log(typeof newMessage, newMessage);
  if (typeof newMessage === "object") {
    if (newMessage instanceof Array) {
      // For each item in the newDetails.current array, check to see if
      // there's a replacement in the newMessage array, then replace
      console.log("array", newMessage);
      newDetails.current.forEach((oldReading) => {
        newMessage.forEach((newReading) => {
          if (oldReading.firefighterId == newReading.firefighterId) {
            console.log(
              "Replacing an old reading with a new one in the array",
              newMessage
            );
            newDetails.current = Utils.arrayRemove(
              newDetails.current,
              oldReading
            );
            newDetails.current.push(newReading);
          }
        });
      });
    } else {
      // It's a single firefighterupdate, replace the
      // latest reading for the firefighter, or add it
      console.log("object", newMessage);
      let matchedOldReading = false;
      newDetails.current.forEach((oldReading) => {
        if (oldReading.firefighterId == newMessage.firefighterId) {
          console.log(
            "Replacing a single old reading with a new one",
            newMessage
          );
          newDetails.current = Utils.arrayRemove(
            newDetails.current,
            oldReading
          );
          newDetails.current.push(newMessage);
          matchedOldReading = true;
        }
      });
      if (!matchedOldReading) {
        console.log("Adding a new reading", newMessage);
        newDetails.current.push(newMessage);
      }
      console.log(newDetails);
    }
  }
  return newDetails.current.sort((a, b) =>
    a.firefighterId > b.firefighterId ? 1 : -1
  );
};

const useDetails = (firefighterId, inc, ty) => {
  const [details, setDetails] = useState([]);
  const [message, setMessage] = useState([]);
  const [increment, setIncrement] = useState(inc !== undefined ? inc : "all");
  const [type, setType] = useState(ty !== undefined ? ty : "CO");
  const [loading, setLoading] = useState("Loading from database...");

  const socket = useRef(new WebSocket("ws://localhost:8010"));
  const detailsRef = useRef([]);
  detailsRef.current = details;

  // Onload
  // Get the now reading for one firefighter plus the 10min, 30min,
  // 1hr, 4hr, 8hr readings (two queries/join)

  // On filter by reading (tab bar)
  // Get filter by increment reading for the gauge plus data for the
  // chart for that specific gauge (default to CO)

  // On filter by gauge
  // Refresh chart by specific reading

  // Initial load of latest for all firefighters or change in increment
  useEffect(() => {
    fetchDetails(firefighterId, increment, type).then((details) => {
      setDetails(details);
      console.log("Loaded from database.", details);
      setLoading("Loaded from database.");
    });
  }, [increment, type]);

  // Updates based on new WebSocket messages
  useEffect(() => {
    socket.current.onmessage = (msg) => {
      console.log("detailsRef", detailsRef);
      if (msg.data === "Connection Opened") {
        setLoading("Connection opened.");
      } else {
        console.log("Received update.", msg);
        setLoading("Received update at " + new Date() + ".");
        setDetails(updateDetails(detailsRef, msg.data));
      }
      console.log("details", details);
    };
    socket.current.onclose = (msg) => {
      console.log("Connection closing.", msg);
      setLoading("Connection closing.");
    };
    return () => {
      console.log("Connection closed.");
      setLoading("Connection closed.");
      socket.current.close();
    };
  }, [message]);

  return [
    loading,
    setLoading,
    details,
    setDetails,
    increment,
    setIncrement,
    type,
    setType,
  ];
};

export default useDetails;
