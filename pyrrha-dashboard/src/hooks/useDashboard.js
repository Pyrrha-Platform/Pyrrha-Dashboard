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
    if (data.devices) {
      return data.devices.sort((a, b) => (a.device_id < b.device_id ? 1 : -1));
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
};

const updateDashboard = (dashboard, message) => {
  console.log('dashboard', dashboard);

  let newDashboard = { current: [] };
  if (
    dashboard !== undefined &&
    dashboard.current !== undefined &&
    dashboard.current !== null &&
    dashboard.current.length !== 0
  ) {
    newDashboard = JSON.parse(JSON.stringify(dashboard));
  }

  console.log('newDashboard', newDashboard);

  let newMessage = JSON.parse(message);
  newMessage.device_timestamp += '+00:00';

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

const setRiskLevels = (dashboard, setNormal, setWarning, setDanger) => {
  console.log('setRiskLevels');
  var tmpNormal =
    dashboard !== undefined && dashboard.length !== 0 ? dashboard.length : 0;
  var tmpWarning = 0;
  var tmpDanger = 0;

  if (dashboard !== undefined && dashboard.length !== 0) {
    dashboard.forEach((device) => {
      if (
        device.carbon_monoxide > Constants.CO_RED ||
        device.carbon_monoxide === Constants.CHERNOBYL
      ) {
        tmpDanger++;
        tmpNormal--;
      } else if (device.carbon_monoxide > Constants.CO_YELLOW) {
        tmpWarning++;
        tmpNormal--;
      }
      if (
        device.nitrogen_dioxide > Constants.NO2_RED ||
        device.nitrogen_dioxide === Constants.CHERNOBYL
      ) {
        tmpDanger++;
        tmpNormal--;
      } else if (device.nitrogen_dioxide > Constants.NO2_YELLOW) {
        tmpWarning++;
        tmpNormal--;
      }
    });
  }
  setNormal(tmpNormal);
  setWarning(tmpWarning);
  setDanger(tmpDanger);
};

const useDashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState('Loading from database...');
  const [normal, setNormal] = useState(Constants.CHERNOBYL);
  const [warning, setWarning] = useState(Constants.CHERNOBYL);
  const [danger, setDanger] = useState(Constants.CHERNOBYL);

  const dashboardRef = useRef([]);
  dashboardRef.current = dashboard;

  // Initial load of latest for all devices
  useEffect(() => {
    fetchDashboard().then((dashboard) => {
      setDashboard(dashboard);
      console.log('Loaded from database.', dashboard);
      setLoading('Loaded from database.');
      setRiskLevels(dashboard, setNormal, setWarning, setDanger);
    });
  }, []);

  // Updates based on new messages
  useEffect(() => {
    console.log('web socket', Constants.WEBSOCKET_URL);
    const socket = new WebSocket(Constants.WEBSOCKET_URL);
    socket.onmessage = (msg) => {
      console.log('dashboardRef', dashboardRef);
      if (msg.data === 'Connection Opened') {
        setLoading('Connection opened.');
      } else {
        console.log('Received update.', msg);
        setLoading('Received update at ' + new Date() + '.');
        let updatedDashboard = updateDashboard(dashboardRef, msg.data);
        setDashboard(updatedDashboard);
        setRiskLevels(updatedDashboard, setNormal, setWarning, setDanger);
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
      socket.close(1000, 'Dashboard disconnecting.');
    };
  }, [message]);

  return [
    // loading,
    // setLoading,
    dashboard,
    // setDashboard,
    normal,
    // setNormal,
    warning,
    // setWarning,
    danger,
    // setDanger,
  ];
};

export default useDashboard;
