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
        p: 2,
        ...sx
      }}
    >
      <CircularProgress
        size={spinner}
        thickness={4}
        sx={{ 
          color: 'primary.main',
          mb: text ? 2 : 0 
        }}
      />
      {text && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ 
            fontSize,
            fontWeight: 500,
            textAlign: 'center'
          }}
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
          right: 0,
          bottom: 0,
          bgcolor: overlay ? 'rgba(255, 255, 255, 0.8)' : 'background.default',
          zIndex: theme.zIndex.modal + 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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