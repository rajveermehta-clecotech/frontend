import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

const StatsCard = ({
  title,
  value,
  icon,
  change,
  changeText,
  avatarColor = 'primary.light',
  onClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const isPositive = change >= 0;
  
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 3,
        boxShadow: 'none',
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
          borderColor: 'transparent',
        } : {},
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3,
          }}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {title}
          </Typography>
          <Avatar
            sx={{ 
              bgcolor: avatarColor, 
              width: { xs: 36, sm: 40 }, 
              height: { xs: 36, sm: 40 } 
            }}
          >
            {icon}
          </Avatar>
        </Box>
        
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          {value}
        </Typography>
        
        {(change !== undefined || changeText) && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {change !== undefined && (
              <>
                {isPositive ? (
                  <TrendingUp
                    fontSize="small"
                    sx={{ color: 'success.main', mr: 0.5 }}
                  />
                ) : (
                  <TrendingDown
                    fontSize="small"
                    sx={{ color: 'error.main', mr: 0.5 }}
                  />
                )}
                <Typography
                  variant="body2"
                  color={isPositive ? 'success.main' : 'error.main'}
                  fontWeight={500}
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  {isPositive ? '+' : ''}{change}%
                </Typography>
              </>
            )}
            
            {changeText && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ 
                  ml: change !== undefined ? 1 : 0,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                {changeText}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;