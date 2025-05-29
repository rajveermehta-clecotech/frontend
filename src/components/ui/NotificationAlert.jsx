// src/components/ui/NotificationAlert.jsx
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
  // Map severity to icon
  const severityMap = {
    warning: {
      icon: <Warning />,
    },
    error: {
      icon: <Error />,
    },
    info: {
      icon: <Info />,
    },
    success: {
      icon: <CheckCircle />,
    }
  };
  
  const { icon } = severityMap[type] || severityMap.warning;

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
        borderRadius: 2,
        '& .MuiAlert-icon': {
          color: 'inherit'
        },
        ...sx
      }}
    >
      {title && <AlertTitle sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{title}</AlertTitle>}
      {message}
    </Alert>
  );
};

export default NotificationAlert;