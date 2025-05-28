// src/components/NotificationAlert.jsx
import React from 'react';
import { Alert, AlertTitle, IconButton, Box } from '@mui/material';
import { Warning, Error, Info, CheckCircle, ArrowForward } from '@mui/icons-material';

const NotificationAlert = ({ 
  type = 'warning', 
  title,
  message, 
  onAction,
  showActionButton = true,
  actionIcon = <ArrowForward />,
  sx = {}
}) => {
  // Map severity to icon and color
  const severityMap = {
    warning: {
      icon: <Warning />,
      bgColor: '#FACC15', // Amber from theme
      textColor: '#202020',
    },
    error: {
      icon: <Error />,
      bgColor: '#EF4444', // Error from theme
      textColor: '#FFFFFF',
    },
    info: {
      icon: <Info />,
      bgColor: '#7B61FF', // Primary from theme
      textColor: '#FFFFFF',
    },
    success: {
      icon: <CheckCircle />,
      bgColor: '#22C55E', // Success from theme
      textColor: '#FFFFFF',
    }
  };
  
  const { icon, bgColor, textColor } = severityMap[type] || severityMap.warning;

  return (
    <Alert 
      severity={type}
      variant="filled"
      icon={icon}
      action={
        showActionButton && (
          <IconButton
            color="inherit"
            size="small"
            onClick={onAction}
          >
            {actionIcon}
          </IconButton>
        )
      }
      onClick={showActionButton ? onAction : undefined}
      sx={{ 
        mb: 4, 
        cursor: showActionButton ? 'pointer' : 'default',
        bgcolor: bgColor,
        color: textColor,
        '& .MuiAlert-icon': {
          color: textColor
        },
        borderRadius: 2,
        ...sx
      }}
    >
      {title && <AlertTitle sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{title}</AlertTitle>}
      {message}
    </Alert>
  );
};

export default NotificationAlert;