import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from "react-redux";
import { store } from './store/index.js';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; 
import CssBaseline from '@mui/material/CssBaseline';

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
