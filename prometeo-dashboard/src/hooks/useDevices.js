import React, { useState, useEffect } from "react";

const fetchDevices = (id) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([
        {
          name: "Device 1",
          handle: "krook",
          stars: 2125,
          url: "https://github.com/krook/repo1",
        },
        {
          name: "Device 2",
          handle: "krook",
          stars: 2125,
          url: "https://github.com/krook/repo2",
        },
        {
          name: "Device 3",
          handle: "krook",
          stars: 2125,
          url: "https://github.com/krook/repo3",
        },
      ]);
    }, 2000);
  });
};

const useDevices = (id) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchDevices(id).then((devices) => {
      setDevices(devices);
      setLoading(false);
    });
  }, [id]);

  return [loading, devices];
};

export default useDevices;
