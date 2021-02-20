import React, { useState, useEffect, useRef } from 'react';
import Utils from '../utils/Utils';
import Constants from '../utils/Constants';

const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchDetails = async (firefighter_id, increment, type) => {
  try {
    const data = await client(
      `/api-main/v1/dashboard-details/${firefighter_id}/${increment}/${type}`
    );
    console.log(data);
    return data.details;
  } catch (e) {
    console.log(e);
  }
};

const fetchChartDetails = async (firefighter_id, increment, type) => {
  try {
    const data = await client(
      `/api-main/v1/dashboard-chart-details/${firefighter_id}/${increment}/${type}`
    );
    console.log(data);
    return data.chart;
  } catch (e) {
    console.log(e);
  }
};

const updateDetails = (details, message) => {
  console.log('details', details);
  let newDetails = JSON.parse(JSON.stringify(details));
  console.log('newDetails', newDetails);

  let newMessage = JSON.parse(message);

  console.log(typeof newMessage, newMessage);
  if (typeof newMessage === 'object') {
    if (newMessage instanceof Array) {
      // For each item in the newDetails.current array, check to see if
      // there's a replacement in the newMessage array, then replace
      console.log('array', newMessage);
      newDetails.current.forEach((oldReading) => {
        newMessage.forEach((newReading) => {
          if (oldReading.firefighter_id == newReading.firefighter_id) {
            console.log(
              'Replacing an old reading with a new one in the array',
              newMessage
            );

          // TODO: Should just be smarter about replacing just changed fields, not add/deleting
          newMessage.firefighter_first = oldReading.firefighter_first;
          newMessage.firefighter_last = oldReading.firefighter_last;
          newMessage.firefighter_email = oldReading.firefighter_email;
          newMessage.firefighter_code = oldReading.firefighter_id;

          newMessage.carbon_monoxide_gauge_10min = oldReading.carbon_monoxide_gauge_10min;
          newMessage.carbon_monoxide_gauge_30min = oldReading.carbon_monoxide_gauge_30min;
          newMessage.carbon_monoxide_gauge_60min = oldReading.carbon_monoxide_gauge_60min;
          newMessage.carbon_monoxide_gauge_240min = oldReading.carbon_monoxide_gauge_240min;
          newMessage.carbon_monoxide_gauge_480min = oldReading.carbon_monoxide_gauge_480min;

          newMessage.carbon_monoxide_twa_10min = oldReading.carbon_monoxide_twa_10min;
          newMessage.carbon_monoxide_twa_30min = oldReading.carbon_monoxide_twa_30min;
          newMessage.carbon_monoxide_twa_60min = oldReading.carbon_monoxide_twa_60min;
          newMessage.carbon_monoxide_twa_240min = oldReading.carbon_monoxide_twa_240min;
          newMessage.carbon_monoxide_twa_480min = oldReading.carbon_monoxide_twa_480min;

          newMessage.nitrogen_dioxide_gauge_10min = oldReading.nitrogen_dioxide_gauge_10min;
          newMessage.nitrogen_dioxide_gauge_30min = oldReading.nitrogen_dioxide_gauge_30min;
          newMessage.nitrogen_dioxide_gauge_60min = oldReading.nitrogen_dioxide_gauge_60min;
          newMessage.nitrogen_dioxide_gauge_240min = oldReading.nitrogen_dioxide_gauge_240min;
          newMessage.nitrogen_dioxide_gauge_480min = oldReading.nitrogen_dioxide_gauge_480min;

          newMessage.nitrogen_dioxide_twa_10min = oldReading.nitrogen_dioxide_twa_10min;
          newMessage.nitrogen_dioxide_twa_30min = oldReading.nitrogen_dioxide_twa_30min;
          newMessage.nitrogen_dioxide_twa_60min = oldReading.nitrogen_dioxide_twa_60min;
          newMessage.nitrogen_dioxide_twa_240min = oldReading.nitrogen_dioxide_twa_240min;
          newMessage.nitrogen_dioxide_twa_480min = oldReading.nitrogen_dioxide_twa_480min;
            
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
      
      console.log('object', newMessage);
      let matchedOldReading = false;
      newDetails.current.forEach((oldReading) => {
        if (oldReading.firefighter_id == newMessage.firefighter_id) {
          console.log(
            'Replacing a single old reading with a new one',
            newMessage
          );

          // TODO: Should just be smarter about replacing just changed fields, not add/deleting
          newMessage.firefighter_first = oldReading.firefighter_first;
          newMessage.firefighter_last = oldReading.firefighter_last;
          newMessage.firefighter_email = oldReading.firefighter_email;
          newMessage.firefighter_code = oldReading.firefighter_id;

          newMessage.carbon_monoxide_gauge_10min = oldReading.carbon_monoxide_gauge_10min;
          newMessage.carbon_monoxide_gauge_30min = oldReading.carbon_monoxide_gauge_30min;
          newMessage.carbon_monoxide_gauge_60min = oldReading.carbon_monoxide_gauge_60min;
          newMessage.carbon_monoxide_gauge_240min = oldReading.carbon_monoxide_gauge_240min;
          newMessage.carbon_monoxide_gauge_480min = oldReading.carbon_monoxide_gauge_480min;

          newMessage.carbon_monoxide_twa_10min = oldReading.carbon_monoxide_twa_10min;
          newMessage.carbon_monoxide_twa_30min = oldReading.carbon_monoxide_twa_30min;
          newMessage.carbon_monoxide_twa_60min = oldReading.carbon_monoxide_twa_60min;
          newMessage.carbon_monoxide_twa_240min = oldReading.carbon_monoxide_twa_240min;
          newMessage.carbon_monoxide_twa_480min = oldReading.carbon_monoxide_twa_480min;

          newMessage.nitrogen_dioxide_gauge_10min = oldReading.nitrogen_dioxide_gauge_10min;
          newMessage.nitrogen_dioxide_gauge_30min = oldReading.nitrogen_dioxide_gauge_30min;
          newMessage.nitrogen_dioxide_gauge_60min = oldReading.nitrogen_dioxide_gauge_60min;
          newMessage.nitrogen_dioxide_gauge_240min = oldReading.nitrogen_dioxide_gauge_240min;
          newMessage.nitrogen_dioxide_gauge_480min = oldReading.nitrogen_dioxide_gauge_480min;

          newMessage.nitrogen_dioxide_twa_10min = oldReading.nitrogen_dioxide_twa_10min;
          newMessage.nitrogen_dioxide_twa_30min = oldReading.nitrogen_dioxide_twa_30min;
          newMessage.nitrogen_dioxide_twa_60min = oldReading.nitrogen_dioxide_twa_60min;
          newMessage.nitrogen_dioxide_twa_240min = oldReading.nitrogen_dioxide_twa_240min;
          newMessage.nitrogen_dioxide_twa_480min = oldReading.nitrogen_dioxide_twa_480min;

          newDetails.current = Utils.arrayRemove(
            newDetails.current,
            oldReading
          );
          newDetails.current.push(newMessage);
          matchedOldReading = true;
        }
      });
      if (!matchedOldReading) {
        console.log('Adding a new reading', newMessage);
        newDetails.current.push(newMessage);
      }
      console.log(newDetails);
    }
  }
  return newDetails.current.sort((a, b) =>
    a.firefighter_id > b.firefighter_id ? 1 : -1
  );
};

const useDetails = (firefighter_id, inc, ty) => {
  const [details, setDetails] = useState([]);
  const [chart, setChart] = useState([]);
  const [message, setMessage] = useState([]);
  const [increment, setIncrement] = useState(inc !== undefined ? inc : 'all');
  const [type, setType] = useState(ty !== undefined ? ty : 'CO');
  const [loading, setLoading] = useState('Loading from database...');

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

  // Initial load of latest for firefighter or change in increment
  useEffect(() => {
    fetchDetails(firefighter_id, increment, type).then((details) => {
      setDetails(details);
      console.log('Loaded details from database.', details);
      setLoading('Loaded details from database.');
    });
  }, [increment, type]);

  // Initial load of latest for firefighter or change in increment
  useEffect(() => {
    fetchChartDetails(firefighter_id, increment, type).then((chart) => {
      setChart(chart);
      console.log('Loaded chart from database.', chart);
      setLoading('Loaded chart from database.');
    });
  }, [increment, type]);

  // Updates based on new WebSocket messages
  useEffect(() => {
    const socket = new WebSocket(Constants.WEBSOCKET_URL);
    socket.onmessage = (msg) => {
      console.log('detailsRef', detailsRef);
      if (msg.data === 'Connection Opened') {
        setLoading('Connection opened.');
      } else {
        console.log('Received update.', msg);
        setLoading('Received update at ' + new Date() + '.');
        setDetails(updateDetails(detailsRef, msg.data));
      }
      console.log('details', details);
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

  return [
    loading,
    setLoading,
    details,
    setDetails,
    chart,
    setChart,
    increment,
    setIncrement,
    type,
    setType,
  ];
};

export default useDetails;
