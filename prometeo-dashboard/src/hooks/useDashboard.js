import React, { useState, useEffect } from "react";

const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const clone = (obj) => Object.assign({}, obj);

const renameKey = (object, key, newKey) => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};

const transformData = (firefighters) => {
  let transformedFirefighters = [];

  firefighters.forEach((firefighter) => {
    firefighter = renameKey(firefighter, "firefighter_id", "firefighterId");
    firefighter = renameKey(firefighter, "device_id", "deviceId");
    firefighter = renameKey(firefighter, "timestamp_mins", "timestampMins");
    firefighter = renameKey(firefighter, "carbon_monoxide", "carbonMonoxide");
    firefighter = renameKey(firefighter, "nitrogen_dioxide", "nitrogenDioxide");
    firefighter.firefighterCode = "GRAF7";
    firefighter.firefighterFirst = "Joan";
    firefighter.firefighterLast = "Herrera";
    firefighter.firefighterEmail = "graf7@graf.cat";
    firefighter.increment = "10 min avg";
    transformedFirefighters.push(firefighter);
  });

  return transformedFirefighters;
};

const fetchDashboard = async () => {
  try {
    const data = await client(`/api/v1/dashboard-now`);
    console.log(data);
    //return transformData(data.firefighters);
    return data.firefighters;
  } catch (e) {
    console.log(e);
  }
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
