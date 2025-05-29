// src/components/layout/PublicThemeWrapper.jsx
import React, { useState, useEffect } from 'react';
import { ThemeProvider, IconButton, Box } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import theme from '../../theme';

const PublicThemeWrapper = ({ children }) => {
  // Get initial theme mode from localStorage or system preference
  const getInitialMode = () => {
    const saved = localStorage.getItem('theme-mode');
    if (saved) return saved;
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [mode, setMode] = useState(getInitialMode);

  // Update CSS variables when mode changes
  useEffect(() => {
    const root = document.documentElement;
    const colorScheme = mode === 'dark' ? 'dark' : 'light';
    
    // Set the data attribute for theme switching
    root.setAttribute('data-toolpad-color-scheme', colorScheme);
    
    // Save to localStorage
    localStorage.setItem('theme-mode', mode);
    
    // Update CSS variables
    if (mode === 'dark') {
      root.style.setProperty('--mui-palette-mode', 'dark');
      root.style.setProperty('--mui-palette-background-default', '#121212');
      root.style.setProperty('--mui-palette-background-paper', '#1e1e1e');
      root.style.setProperty('--mui-palette-text-primary', '#ffffff');
      root.style.setProperty('--mui-palette-text-secondary', 'rgba(255, 255, 255, 0.7)');
      root.style.setProperty('--mui-palette-divider', 'rgba(255, 255, 255, 0.12)');
      root.style.setProperty('--mui-palette-primary-main', '#42a5f5');
      root.style.setProperty('--mui-palette-action-hover', 'rgba(255, 255, 255, 0.04)');
    } else {
      root.style.setProperty('--mui-palette-mode', 'light');
      root.style.setProperty('--mui-palette-background-default', '#fafafa');
      root.style.setProperty('--mui-palette-background-paper', '#ffffff');
      root.style.setProperty('--mui-palette-text-primary', '#212121');
      root.style.setProperty('--mui-palette-text-secondary', '#757575');
      root.style.setProperty('--mui-palette-divider', '#eeeeee');
      root.style.setProperty('--mui-palette-primary-main', '#2196f3');
      root.style.setProperty('--mui-palette-action-hover', 'rgba(33, 150, 243, 0.04)');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        {/* Theme Toggle Button */}
        <IconButton
          onClick={toggleMode}
          sx={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 1000,
            backgroundColor: 'var(--mui-palette-background-paper)',
            color: 'var(--mui-palette-text-primary)',
            border: '1px solid var(--mui-palette-divider)',
            '&:hover': {
              backgroundColor: 'var(--mui-palette-action-hover)',
            },
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          {mode === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
        
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default PublicThemeWrapper;