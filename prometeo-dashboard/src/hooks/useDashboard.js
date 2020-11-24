import React, { useState, useEffect, useRef } from "react";

const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchDashboard = async () => {
  try {
    const data = await client(`/api/v1/dashboard-now`);
    console.log(data);
    return data.firefighters;
  } catch (e) {
    console.log(e);
  }
};

const updateDashboard = (dashboard, message) => {
  // Clone the existing dashboard array
  console.log("dashboard", dashboard);
  let newDashboard = JSON.parse(JSON.stringify(dashboard));
  console.log("newDashboard", newDashboard);

  // Fetch the new message
  let newMessage = JSON.parse(message);

  console.log(typeof newMessage, newMessage);
  if (typeof newMessage === "object") {
    if (newMessage instanceof Array) {
      console.log("array", newMessage);
      // Merge array, replacing existing members with the same id
      // TODO, for now just replacing
      newDashboard.current = newMessage;
    } else {
      console.log("object", newMessage);
      // Replace or add a member with this object
      // TODO pull out the individual object
      console.log(newDashboard);
      newDashboard.current.push(newMessage);
    }
  }
  return newDashboard.current;
};

const useDashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState("Loading from database...");

  const socket = useRef(new WebSocket("ws://localhost:8010"));
  const dashboardRef = useRef([]);
  dashboardRef.current = dashboard;

  // Initial load of latest for all firefighters
  useEffect(() => {
    fetchDashboard().then((dashboard) => {
      setDashboard(dashboard);
      console.log("Loaded from database.", dashboard);
      setLoading("Loaded from database.");
    });
  }, []);

  // Updates based on new messages
  useEffect(() => {
    socket.current.onmessage = (msg) => {
      console.log("dashboardRef", dashboardRef);
      if (msg.data === "Connection Opened") {
        setLoading("Connection opened.");
      } else {
        console.log("Received update.", msg);
        setLoading("Received update at " + new Date() + ".");
        setDashboard(updateDashboard(dashboardRef, msg.data));
      }
      console.log("dashboard", dashboard);
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

  return [loading, setLoading, dashboard, setDashboard];
};

export default useDashboard;
