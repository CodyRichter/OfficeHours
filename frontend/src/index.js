import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import './index.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';


const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications position="top-center" zIndex={2077} />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
