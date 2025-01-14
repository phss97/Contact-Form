// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IntegrationAppProvider } from '@integration-app/react';

import ContactCreationForm from './ContactCreationForm';

function App() {
  const [accessToken, setAccessToken] = useState(null);

  // Fetch the integration token from the backend
  const fetchToken = async () => {
    try {
      const response = await axios.get('http://localhost:8080/integration-token');
      console.log('Token:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  };

  // Fetch the token when the component mounts
  useEffect(() => {
    const getToken = async () => {
      const token = await fetchToken();
      setAccessToken(token);
    };
    getToken();
  }, []);

  // Show loading message while fetching the token
  if (!accessToken) {
    return <p>Loading...</p>;
  }

  // Provide the token to the IntegrationAppProvider
  return (
    <IntegrationAppProvider token={accessToken}>
      <ContactCreationForm />
    </IntegrationAppProvider>
  );
}

export default App;