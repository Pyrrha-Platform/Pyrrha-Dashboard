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
    const data = await client(
      `${Constants.API_BASE_URL}/api-main/v1/dashboard-now`,
    );
    // console.log(data);
    if (data.devices) {
      return data.devices.sort((a, b) => (a.device_id < b.device_id ? 1 : -1));
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
};

const updateDashboard = (dashboardRef, message) => {
  console.log('updateDashboard - current dashboard:', dashboardRef.current);
  console.log('updateDashboard - message:', message);

  // Work with the current dashboard state from ref
  let currentDashboard = dashboardRef.current || [];
  let newDashboard = [...currentDashboard]; // Create a copy

  // console.log('currentDashboard', currentDashboard);

  const rawMessage = JSON.parse(message);

  // Handle both single device and array of devices
  let newMessage;

  if (Array.isArray(rawMessage)) {
    // Already an array of devices - normalize each device
    newMessage = rawMessage.map((device) => ({
      device_id: device.device_id,
      device_name: device.device_name,
      device_timestamp:
        device.device_timestamp && device.device_timestamp.includes('+00:00')
          ? device.device_timestamp
          : (device.device_timestamp || '') + '+00:00',
      timestamp_mins:
        device.device_timestamp && device.device_timestamp.includes('+00:00')
          ? device.device_timestamp
          : (device.device_timestamp || '') + '+00:00',
      carbon_monoxide: parseFloat(device.carbon_monoxide) || 0,
      nitrogen_dioxide: parseFloat(device.nitrogen_dioxide) || 0,
      temperature: parseFloat(device.temperature) || 0,
      humidity: parseFloat(device.humidity) || 0,
      // Keep extra fields if they exist
      ...(device.acrolein !== undefined && {
        acrolein: parseFloat(device.acrolein) || 0,
      }),
      ...(device.benzene !== undefined && {
        benzene: parseFloat(device.benzene) || 0,
      }),
      ...(device.formaldehyde !== undefined && {
        formaldehyde: parseFloat(device.formaldehyde) || 0,
      }),
      ...(device.device_battery_level !== undefined && {
        device_battery_level: device.device_battery_level,
      }),
      ...(device.firefighter_id !== undefined && {
        firefighter_id: device.firefighter_id,
      }),
      ...(device.type !== undefined && { type: device.type }),
    }));
  } else {
    // Single device - normalize to single object
    newMessage = {
      device_id: rawMessage.device_id,
      device_name: rawMessage.device_name,
      device_timestamp:
        rawMessage.device_timestamp &&
        rawMessage.device_timestamp.includes('+00:00')
          ? rawMessage.device_timestamp
          : (rawMessage.device_timestamp || '') + '+00:00',
      timestamp_mins:
        rawMessage.device_timestamp &&
        rawMessage.device_timestamp.includes('+00:00')
          ? rawMessage.device_timestamp
          : (rawMessage.device_timestamp || '') + '+00:00',
      carbon_monoxide: parseFloat(rawMessage.carbon_monoxide) || 0,
      nitrogen_dioxide: parseFloat(rawMessage.nitrogen_dioxide) || 0,
      temperature: parseFloat(rawMessage.temperature) || 0,
      humidity: parseFloat(rawMessage.humidity) || 0,
      // Keep extra fields if they exist
      ...(rawMessage.acrolein !== undefined && {
        acrolein: parseFloat(rawMessage.acrolein) || 0,
      }),
      ...(rawMessage.benzene !== undefined && {
        benzene: parseFloat(rawMessage.benzene) || 0,
      }),
      ...(rawMessage.formaldehyde !== undefined && {
        formaldehyde: parseFloat(rawMessage.formaldehyde) || 0,
      }),
      ...(rawMessage.device_battery_level !== undefined && {
        device_battery_level: rawMessage.device_battery_level,
      }),
      ...(rawMessage.firefighter_id !== undefined && {
        firefighter_id: rawMessage.firefighter_id,
      }),
      ...(rawMessage.type !== undefined && { type: rawMessage.type }),
    };
  }

  console.log('Normalized message:', newMessage);

  // console.log(typeof newMessage, newMessage);
  if (typeof newMessage === 'object') {
    if (newMessage instanceof Array) {
      // Multiple device updates - process each device in the array
      console.log('Processing array of', newMessage.length, 'devices');

      newMessage.forEach((deviceUpdate) => {
        console.log(
          'Processing device update for device_id:',
          deviceUpdate.device_id,
        );

        // Find and replace existing device or add new one
        const existingDeviceIndex = newDashboard.findIndex(
          (device) => device.device_id === deviceUpdate.device_id,
        );

        if (existingDeviceIndex !== -1) {
          console.log(
            'Replacing existing device at index:',
            existingDeviceIndex,
          );
          newDashboard[existingDeviceIndex] = deviceUpdate;
        } else {
          console.log('Adding new device');
          newDashboard.push(deviceUpdate);
        }
      });
    } else {
      // It's a single device update, replace the
      // latest reading for the device, or add it
      console.log(
        'Processing single device update for device_id:',
        newMessage.device_id,
      );

      // Find and replace existing device or add new one
      const existingDeviceIndex = newDashboard.findIndex(
        (device) => device.device_id === newMessage.device_id,
      );

      if (existingDeviceIndex !== -1) {
        console.log('Replacing existing device at index:', existingDeviceIndex);
        // Replace the existing device
        newDashboard[existingDeviceIndex] = newMessage;
      } else {
        console.log('Adding new device');
        // Add new device
        newDashboard.push(newMessage);
      }
      // console.log(newDashboard);
    }
  }
  return newDashboard.sort((a, b) => (a.device_id < b.device_id ? 1 : -1));
};

const setRiskLevels = (dashboard, setNormal, setWarning, setDanger) => {
  // console.log('setRiskLevels');
  let tmpNormal =
    dashboard !== undefined && dashboard.length !== 0 ? dashboard.length : 0;
  let tmpWarning = 0;
  let tmpDanger = 0;

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
      // console.log('Loaded from database.', dashboard);
      setLoading('Loaded from database.');
      setRiskLevels(dashboard, setNormal, setWarning, setDanger);
    });
  }, []);

  // Updates based on new messages
  useEffect(() => {
    // console.log('web socket', Constants.WEBSOCKET_URL);
    const socket = new WebSocket(Constants.WEBSOCKET_URL);
    socket.onmessage = (msg) => {
      // console.log('dashboardRef', dashboardRef);
      if (msg.data === 'Connection Opened') {
        setLoading('Connection opened.');
      } else {
        console.log('Received update.', msg.data);
        setLoading('Received update at ' + new Date() + '.');
        const updatedDashboard = updateDashboard(dashboardRef, msg.data);
        console.log('Updated dashboard:', updatedDashboard);
        setDashboard(updatedDashboard);
        setRiskLevels(updatedDashboard, setNormal, setWarning, setDanger);
      }
      // console.log('dashboard', dashboard);
    };
    socket.onclose = (msg) => {
      // console.log('Connection closing.', msg);
      setLoading('Connection closing.');
    };
    return () => {
      // console.log('Connection closed.');
      setLoading('Connection closed.');
      socket.close(1000, 'Dashboard disconnecting.');
    };
  }, []); // Remove message dependency to prevent websocket reconnection on every message

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
