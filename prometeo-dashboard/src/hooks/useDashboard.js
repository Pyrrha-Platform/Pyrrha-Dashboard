import React, { useState, useEffect, useRef } from 'react';
import Utils from '../utils/Utils';
import Constants from '../utils/Constants';

const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchDashboard = async () => {
  try {
    const data = await client(`/api-main/v1/dashboard-now`);
    console.log(data);
    return data.devices.sort((a, b) => (a.device_id < b.device_id ? 1 : -1));
  } catch (e) {
    console.log(e);
  }
};

const updateDashboard = (dashboard, message) => {
  console.log('dashboard', dashboard);
  let newDashboard = JSON.parse(JSON.stringify(dashboard));
  console.log('newDashboard', newDashboard);

  let newMessage = JSON.parse(message);

  console.log(typeof newMessage, newMessage);
  if (typeof newMessage === 'object') {
    if (newMessage instanceof Array) {
      // For each item in the newDashboard.current array, check to see if
      // there's a replacement in the newMessage array, then replace
      console.log('array', newMessage);
      newDashboard.current.forEach((oldReading) => {
        newMessage.forEach((newReading) => {
          if (oldReading.device_id === newReading.device_id) {
            console.log(
              'Replacing an old reading with a new one in the array',
              newMessage
            );
            newDashboard.current = Utils.arrayRemove(
              newDashboard.current,
              oldReading
            );
            newDashboard.current.push(newReading);
          }
        });
      });
    } else {
      // It's a single device update, replace the
      // latest reading for the device, or add it
      console.log('object', newMessage);
      let matchedOldReading = false;
      newDashboard.current.forEach((oldReading) => {
        if (oldReading.device_id === newMessage.device_id) {
          console.log(
            'Replacing a single old reading with a new one',
            newMessage
          );
          console.log('Merged new and old readings', newMessage);
          newDashboard.current = Utils.arrayRemove(
            newDashboard.current,
            oldReading
          );
          newDashboard.current.push(newMessage);
          matchedOldReading = true;
        }
      });
      if (!matchedOldReading) {
        console.log('Adding a new reading', newMessage);
        newDashboard.current.push(newMessage);
      }
      console.log(newDashboard);
    }
  }
  return newDashboard.current.sort((a, b) =>
    a.device_id < b.device_id ? 1 : -1
  );
};

const useDashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState('Loading from database...');

  const dashboardRef = useRef([]);
  dashboardRef.current = dashboard;

  // Initial load of latest for all devices
  useEffect(() => {
    fetchDashboard().then((dashboard) => {
      setDashboard(dashboard);
      console.log('Loaded from database.', dashboard);
      setLoading('Loaded from database.');
    });
  }, []);

  // Updates based on new messages
  useEffect(() => {
    const socket = new WebSocket(Constants.WEBSOCKET_URL);
    socket.onmessage = (msg) => {
      console.log('dashboardRef', dashboardRef);
      if (msg.data === 'Connection Opened') {
        setLoading('Connection opened.');
      } else {
        console.log('Received update.', msg);
        setLoading('Received update at ' + new Date() + '.');
        setDashboard(updateDashboard(dashboardRef, msg.data));
      }
      console.log('dashboard', dashboard);
    };
    socket.onclose = (msg) => {
      console.log('Connection closing.', msg);
      setLoading('Connection closing.');
    };
    return () => {
      console.log('Connection closed.');
      setLoading('Connection closed.');
      socket.close();
    };
  }, [message]);

  return [loading, setLoading, dashboard, setDashboard];
};

export default useDashboard;
