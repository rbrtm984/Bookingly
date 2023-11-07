import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App'; // Assuming App is now a .tsx file
import store from './app/store'; // The store setup with Redux Toolkit
import './style.css'; // Assuming you have global styles in index.css
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// Create a root.
const container = document.getElementById('root');
const root = container ? createRoot(container) : null;


// create browswer router tree, app only has one root at present
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //loader: rootLoader,
    children: [],
  },
]);


// StrictMode is a tool for highlighting potential problems in an application.
// Like Fragment, StrictMode does not render any visible UI.
// It activates additional checks and warnings for its descendants.

if (root) {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
