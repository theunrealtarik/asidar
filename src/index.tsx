import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Loader, MantineProvider } from '@mantine/core';
import Error from './components/Error';
import "./static/global.scss";

const ffmpeg = window.require("ffmpeg-static")
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withCSSVariables>
      {
        typeof ffmpeg == "string" ? (<App />) : <Error />
      }
    </MantineProvider>
  </React.StrictMode>
);
