import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import { StateContextProvider } from './context';
import App from './App';
import './index.css';

// Obtain a reference to the root element in your HTML
const rootElement = document.getElementById('root');

if (rootElement) {
  // Create a root using the root element
  const root = createRoot(rootElement);

  // Render your React app within the root
  root.render(
    <React.StrictMode>
      <ThirdwebProvider
        desiredChainId={ChainId.Goerli}
        activeChain="goerli"
        clientId="c5ffbef65d36f36c9326e43c882bafc4"
      >
        <Router>
          <StateContextProvider>
            <App />
          </StateContextProvider>
        </Router>
      </ThirdwebProvider>
    </React.StrictMode>
  );
} else {
  console.error('The "root" element does not exist in the DOM.');
}
