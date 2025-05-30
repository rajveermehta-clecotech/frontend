// src/components/providers/ToastProvider.jsx
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';

const ToastProvider = ({ children }) => {
  const theme = useTheme();

  const toastOptions = {
    // Default options for all toasts
    duration: 4000,
    style: {
      background: theme.palette.mode === 'dark' 
        ? theme.palette.background.paper 
        : '#363636',
      color: theme.palette.mode === 'dark' 
        ? theme.palette.text.primary 
        : '#fff',
      fontSize: '14px',
      fontWeight: '500',
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 4px 12px rgba(0, 0, 0, 0.3)'
        : '0 4px 12px rgba(0, 0, 0, 0.15)',
      border: theme.palette.mode === 'dark' 
        ? `1px solid ${theme.palette.divider}` 
        : 'none',
    },
    
    // Success toasts
    success: {
      duration: 3000,
      style: {
        background: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        border: 'none',
      },
      iconTheme: {
        primary: theme.palette.success.contrastText,
        secondary: theme.palette.success.main,
      },
    },
    
    // Error toasts
    error: {
      duration: 5000,
      style: {
        background: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        border: 'none',
      },
      iconTheme: {
        primary: theme.palette.error.contrastText,
        secondary: theme.palette.error.main,
      },
    },
    
    // Loading toasts
    loading: {
      style: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: 'none',
      },
      iconTheme: {
        primary: theme.palette.primary.contrastText,
        secondary: theme.palette.primary.main,
      },
    },
    
    // Warning toasts (custom)
    warning: {
      duration: 4000,
      style: {
        background: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        border: 'none',
      },
      iconTheme: {
        primary: theme.palette.warning.contrastText,
        secondary: theme.palette.warning.main,
      },
    },
    
    // Info toasts (custom)
    info: {
      duration: 4000,
      style: {
        background: theme.palette.info.main,
        color: theme.palette.info.contrastText,
        border: 'none',
      },
      iconTheme: {
        primary: theme.palette.info.contrastText,
        secondary: theme.palette.info.main,
      },
    },
  };

  return (
    <>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={toastOptions}
      />
    </>
  );
};

export default ToastProvider;