import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';

const ContentCard = ({
  title,
  actionText,
  onAction,
  children,
  minHeight,
  fullHeight = false,
  sx = {}
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
        height: fullHeight ? '100%' : 'auto',
        minHeight: minHeight,
        display: 'flex',
        flexDirection: 'column',
        ...sx
      }}
    >
      <CardContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: { xs: 2, sm: 3 },
            borderBottom: actionText ? '1px solid' : 'none',
            borderColor: 'divider',
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {title}
          </Typography>
          
          {actionText && (
            <Button
              variant="outlined"
              size="small"
              onClick={onAction}
              sx={{
                textTransform: 'none',
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'transparent',
                },
                px: { xs: 1.5, sm: 2 },
                py: { xs: 0.5, sm: 0.5 },
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              {actionText}
            </Button>
          )}
        </Box>
        
        <Box 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 },
            pt: actionText ? { xs: 2, sm: 3 } : 0
          }}
        >
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContentCard;