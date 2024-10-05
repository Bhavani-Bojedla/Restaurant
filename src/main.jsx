// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme'; // Import the theme
// import CssBaseline from '@mui/material/CssBaseline'; 

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from "react-redux";
import { store } from './store/index.js';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the custom theme
import CssBaseline from '@mui/material/CssBaseline'; // For consistent global styling

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
      <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
