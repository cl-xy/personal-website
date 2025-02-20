'use client';
import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none', 
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#3B82F6', 
    },
    secondary: {
      main: '#10B981', 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: inter.style.fontFamily,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: inter.style.fontFamily,
        },
      },
    },
  },
});

export default theme;