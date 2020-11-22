import React, { useState, useEffect } from "react";

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
