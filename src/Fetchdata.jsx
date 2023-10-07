import React, { useState, useEffect } from 'react';
import { fetchData } from './api'; // Import your API functions here

const FetchData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchData(); // Call your API function
        setData(result);
      } catch (error) {
        console.error(error);
        // Handle error states here
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data Fetching Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchData;
