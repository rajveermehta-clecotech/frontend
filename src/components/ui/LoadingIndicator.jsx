import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

const LoadingIndicator = ({
  size = 'medium',
  text = 'Loading...',
  fullScreen = false,
  overlay = false,
  sx = {}
}) => {
  const theme = useTheme();

  // Size mappings
  const sizes = {
    small: {
      spinner: 24,
      fontSize: '0.875rem',
    },
    medium: {
      spinner: 40,
      fontSize: '1rem',
    },
    large: {
      spinner: 60,
      fontSize: '1.25rem',
    }
  };

  const { spinner, fontSize } = sizes[size] || sizes.medium;

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
        backdropFilter: 'blur(10px)', // Blur effect
        borderRadius: '16px', // Rounded corners for modern look
        padding: 3, // Some padding around the content
        border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', // Soft shadow
        ...sx
      }}
    >
      <CircularProgress size={spinner} />
      {text && (
        <Typography 
          variant="body2" 
          sx={{ fontSize, mt: 1, color: 'inherit' }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );

  // Full screen loading
  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent dark background
          backdropFilter: 'blur(8px)', // Blur the background
          zIndex: 9999,
        }}
      >
        {content}
      </Box>
    );
  }

  // Overlay loading (for components)
  if (overlay) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
          backdropFilter: 'blur(6px)', // Blur effect
          zIndex: 1,
        }}
      >
        {content}
      </Box>
    );
  }

  // Regular loading indicator
  return content;
};

export default LoadingIndicator;