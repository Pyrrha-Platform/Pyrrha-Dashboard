import React, { useState, useEffect } from 'react';

const fetchLanguages = (id) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([
        {
          name: 'Device 1',
          handle: 'krook',
          stars: 2125,
          url: 'https://github.com/krook/repo1',
        },
        {
          name: 'Device 2',
          handle: 'krook',
          stars: 2125,
          url: 'https://github.com/krook/repo2',
        },
        {
          name: 'Device 3',
          handle: 'krook',
          stars: 2125,
          url: 'https://github.com/krook/repo3',
        },
      ]);
    }, 2000);
  });
};

const useLanguages = (id) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchLanguages(id).then((languages) => {
      setLanguages(languages);
      setLoading(false);
    });
  }, [id]);

  return [loading, languages];
};

export default useLanguages;
