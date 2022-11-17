import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Loader, MantineProvider } from '@mantine/core';
import "./static/global.scss";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withCSSVariables>
      <App />
    </MantineProvider>
  </React.StrictMode>
);

export interface Video {
  title: string,
  thumbnail: string,
  id: string | number
}