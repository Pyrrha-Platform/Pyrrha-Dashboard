import React, { useState, useEffect, useRef } from 'react';
import Utils from '../utils/Utils';
import Constants from '../utils/Constants';

const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchMap = async () => {
  try {
    const data = await client(`${Constants.API_BASE_URL}/api-main/v1/map-now`);
    console.log('fetchMap map', data.map);
    console.log('fetchMap map.devices', data.map.devices);
    if (data.map.devices) {
      data.map.devices = data.map.devices.sort((a, b) =>
        a.device_id < b.device_id ? 1 : -1,
      );
      return data.map;
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
};

const updateMap = (map, message) => {
  console.log('map', map);

  let newMap = { current: [] };
  if (map !== undefined && map.length !== 0 && map.map !== undefined) {
    newMap = JSON.parse(JSON.stringify(map));
  }

  console.log('newMap', newMap);

  const newMessage = JSON.parse(message);
  newMessage.device_timestamp += '+00:00';

  console.log(typeof newMessage, newMessage);
  if (typeof newMessage === 'object') {
    if (newMessage instanceof Array) {
      // For each item in the newMap.current array, check to see if
      // there's a replacement in the newMessage array, then replace
      console.log('array', newMessage);
      newMap.current.forEach((oldReading) => {
        newMessage.forEach((newReading) => {
          if (oldReading.device_id === newReading.device_id) {
            console.log(
              'Replacing an old reading with a new one in the array',
              newMessage,
            );
            // Ensure WebSocket message has proper id field for map table display
            if (newReading.device_name && !newReading.id) {
              newReading.id = newReading.device_name;
            }
            // Format sensor values with units for consistency with API data
            if (typeof newReading.carbon_monoxide === 'number') {
              newReading.carbon_monoxide = `${newReading.carbon_monoxide.toFixed(1)} ppm`;
            }
            if (typeof newReading.nitrogen_dioxide === 'number') {
              newReading.nitrogen_dioxide = `${newReading.nitrogen_dioxide.toFixed(1)} ppm`;
            }
            if (typeof newReading.temperature === 'number') {
              newReading.temperature = `${newReading.temperature.toFixed(1)}°C`;
            }
            if (typeof newReading.humidity === 'number') {
              newReading.humidity = `${newReading.humidity.toFixed(1)}%`;
            }
            newMap.current = Utils.arrayRemove(newMap.current, oldReading);
            newMap.current.push(newReading);
          }
        });
      });
    } else {
      // It's a single device update, replace the
      // latest reading for the device, or add it
      console.log('object', newMessage);
      let matchedOldReading = false;
      newMap.current.forEach((oldReading) => {
        if (oldReading.device_id === newMessage.device_id) {
          console.log(
            'Replacing a single old reading with a new one',
            newMessage,
          );
          // Ensure WebSocket message has proper id field for map table display
          if (newMessage.device_name && !newMessage.id) {
            newMessage.id = newMessage.device_name;
          }
          // Format sensor values with units for consistency with API data
          if (typeof newMessage.carbon_monoxide === 'number') {
            newMessage.carbon_monoxide = `${newMessage.carbon_monoxide.toFixed(1)} ppm`;
          }
          if (typeof newMessage.nitrogen_dioxide === 'number') {
            newMessage.nitrogen_dioxide = `${newMessage.nitrogen_dioxide.toFixed(1)} ppm`;
          }
          if (typeof newMessage.temperature === 'number') {
            newMessage.temperature = `${newMessage.temperature.toFixed(1)}°C`;
          }
          if (typeof newMessage.humidity === 'number') {
            newMessage.humidity = `${newMessage.humidity.toFixed(1)}%`;
          }
          console.log('Merged new and old readings', newMessage);
          newMap.current = Utils.arrayRemove(newMap.current, oldReading);
          newMap.current.push(newMessage);
          matchedOldReading = true;
        }
      });
      if (!matchedOldReading) {
        console.log('Adding a new reading', newMessage);
        // Ensure WebSocket message has proper id field for map table display
        if (newMessage.device_name && !newMessage.id) {
          newMessage.id = newMessage.device_name;
        }
        // Format sensor values with units for consistency with API data
        if (typeof newMessage.carbon_monoxide === 'number') {
          newMessage.carbon_monoxide = `${newMessage.carbon_monoxide.toFixed(1)} ppm`;
        }
        if (typeof newMessage.nitrogen_dioxide === 'number') {
          newMessage.nitrogen_dioxide = `${newMessage.nitrogen_dioxide.toFixed(1)} ppm`;
        }
        if (typeof newMessage.temperature === 'number') {
          newMessage.temperature = `${newMessage.temperature.toFixed(1)}°C`;
        }
        if (typeof newMessage.humidity === 'number') {
          newMessage.humidity = `${newMessage.humidity.toFixed(1)}%`;
        }
        newMap.current.push(newMessage);
      }
      console.log(newMap);
    }
  }
  return newMap.current.sort((a, b) => (a.device_id < b.device_id ? 1 : -1));
};

const setRiskLevels = (devices, setNormal, setWarning, setDanger) => {
  console.log('setRiskLevels');
  let tmpNormal =
    devices !== undefined && devices.length !== 0 ? devices.length : 0;
  let tmpWarning = 0;
  let tmpDanger = 0;

  if (devices !== undefined && devices.length !== 0) {
    devices.forEach((device) => {
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

const useMap = () => {
  const [map, setMap] = useState([]);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState('Loading from database...');
  const [normal, setNormal] = useState(Constants.CHERNOBYL);
  const [warning, setWarning] = useState(Constants.CHERNOBYL);
  const [danger, setDanger] = useState(Constants.CHERNOBYL);

  const mapRef = useRef([]);
  mapRef.current = map;

  // Initial load of latest for all devices
  useEffect(() => {
    fetchMap().then((map) => {
      console.log('Loaded from database.', map);
      setMap(map);
      console.log('Loaded from database.', map);
      setLoading('Loaded from database.');
      setRiskLevels(map.devices, setNormal, setWarning, setDanger);
    });
  }, []);

  // Updates based on new messages
  /*
  useEffect(() => {
    const socket = new WebSocket(Constants.WEBSOCKET_URL);
    socket.onmessage = (msg) => {
      console.log('mapRef', mapRef);
      if (msg.data === 'Connection Opened') {
        setLoading('Connection opened.');
      } else {
        console.log('Received update.', msg);
        setLoading('Received update at ' + new Date() + '.');
        let updatedMap = updateMap(mapRef, msg.data);
        setMap(updatedMap);
        setRiskLevels(updatedMap, setNormal, setWarning, setDanger);
      }
      console.log('map', map);
    };
    socket.onclose = (msg) => {
      console.log('Connection closing.', msg);
      setLoading('Connection closing.');
    };
    return () => {
      console.log('Connection closed.');
      setLoading('Connection closed.');
      socket.close(1000, 'Map disconnecting.');
    };
  }, [message]);
  */

  return [
    // loading,
    // setLoading,
    map,
    // setMap,
    normal,
    // setNormal,
    warning,
    // setWarning,
    danger,
    // setDanger,
  ];
};

export default useMap;
