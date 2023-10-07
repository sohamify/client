// api.js

// Replace 'your-actual-thirdweb-api-key' with your actual ThirdWeb API key
const apiKey = 'your-actual-qpMPi_ObsY4_lTDo9H0HxD-5xRnmRQvFlBghkN1vaSwhIgwtuOOpQte3h3HvnCjmjJ4Cg2E-Tm0TZQfQLxQlTQ-api-key';

// Function to fetch data from an API using the key
export const fetchData = async () => {
  try {
    const response = await fetch('https://api.thirdweb.com/some-endpoint', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
