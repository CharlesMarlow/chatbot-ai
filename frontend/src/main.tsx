import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, serif',
    allVariants: {
      color: 'white',
    },
  },
});

axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position='top-right' />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
