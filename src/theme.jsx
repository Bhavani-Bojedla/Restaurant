import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#d32f2f', // Customize secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Customize font
  },
});

export default theme;