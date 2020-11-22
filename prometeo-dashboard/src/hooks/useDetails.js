import React, { useState, useEffect } from "react";

const client = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchDetails = (firefighter) => {
  /*
  try {
    const data = await client(`/api/v1/details-now`);
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
          increment: "Now",
        },
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
          increment: "10 min avg",
        },
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
          increment: "30 min avg",
        },
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
          increment: "1 hr avg",
        },
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
          increment: "4 hr avg",
        },
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
          increment: "8 hr avg",
        },
      ]);
    }, 2000);
  });
};

const useDetails = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchDetails().then((details) => {
      setDetails(details);
      setLoading(false);
    });
  }, []);

  return [loading, details];
};

export default useDetails;
