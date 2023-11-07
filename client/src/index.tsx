import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App'; // Assuming App is now a .tsx file
import store from './app/store'; // The store setup with Redux Toolkit
import './index.css'; // Assuming you have global styles in index.css

// Create a root.
const container = document.getElementById('root');
const root = container ? createRoot(container) : null;

// StrictMode is a tool for highlighting potential problems in an application.
// Like Fragment, StrictMode does not render any visible UI.
// It activates additional checks and warnings for its descendants.

if (root) {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
