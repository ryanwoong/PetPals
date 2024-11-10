import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  /** Put your mantine theme override here */
});
root.render(
  <MantineProvider theme={theme}>
      <App />
  </MantineProvider>
);