import React, { useState, useEffect } from "react";

const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchDashboard = () => {
  /*
  try {
    const data = await client(`/api/v1/dashboard-now`);
    console.log(data);
    setRawData(data.firefighters);
    setTransformedData(transformData(data.firefighters));
  } catch (e) {
    console.log(e);
  }
  */

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          firefighterId: 1,
          firefighterCode: "GRAF1",
          firefighterFirst: "Joan",
          firefighterLast: "Herrera",
          firefighterEmail: "graf1@graf.cat",
          deviceId: 1,
          timestampMins: "2020-01-01T10:41:00.000Z",
          temperature: 38,
          humidity: 72,
          carbonMonoxide: 30,
          nitrogenDioxide: 20,
        },
        {
          firefighterId: 2,
          firefighterCode: "GRAF2",
          firefighterFirst: "Daniel",
          firefighterLast: "Krook",
          firefighterEmail: "graf2@graf.cat",
          deviceId: 2,
          timestampMins: "2020-01-01T10:41:00.000Z",
          temperature: 38,
          humidity: 72,
          carbonMonoxide: 30,
          nitrogenDioxide: 20,
        },
        {
          firefighterId: 3,
          firefighterCode: "GRAF3",
          firefighterFirst: "Upkar",
          firefighterLast: "Lidder",
          firefighterEmail: "graf3@graf.cat",
          deviceId: 3,
          timestampMins: "2020-01-01T10:41:00.000Z",
          temperature: 38,
          humidity: 72,
          carbonMonoxide: 30,
          nitrogenDioxide: 20,
        },
        {
          firefighterId: 4,
          firefighterCode: "GRAF4",
          firefighterFirst: "Marco",
          firefighterLast: "Rodriguez",
          firefighterEmail: "graf4@graf.cat",
          deviceId: 4,
          timestampMins: "2020-01-01T10:41:00.000Z",
          temperature: 38,
          humidity: 72,
          carbonMonoxide: 30,
          nitrogenDioxide: 20,
        },
      ]);
    }, 2000);
  });
};

const useDashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchDashboard().then((dashboard) => {
      setDashboard(dashboard);
      setLoading(false);
    });
  }, []);

  return [loading, dashboard];
};

export default useDashboard;
