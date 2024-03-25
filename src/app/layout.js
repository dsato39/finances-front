'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  palette: {
    primary: {
      main: '#0288d1',
    },
    background: {
      default: '#F4F5F7',
    },
  },
  typography: {
    h1: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: '40px',
      fontWeight: '500',
      lineHeight: '32px',
      letterSpacing: '0.08em',
      color: '#0288d1'
    },
    h2: {
      fontSize: '24px',
      fontEeight: '700',
      lineHeight: '28px',
      letterSpacing: '0em',
    },
  },
  text: {
    primary: '#000000',
    secondary: '#000000',
  },
});

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
