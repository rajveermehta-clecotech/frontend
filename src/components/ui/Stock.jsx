import React from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import { CheckCircle, Warning, Cancel } from '@mui/icons-material';

const Stock = () => {
  const stockData = [
    {
      icon: <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />,
      title: 'In Stock',
      count: 1,
      percentage: 33.3,
      color: '#4caf50'
    },
    {
      icon: <Warning sx={{ color: '#ff9800', fontSize: 20 }} />,
      title: 'Low Stock',
      count: 1,
      percentage: 33.3,
      color: '#ff9800'
    },
    {
      icon: <Cancel sx={{ color: '#f44336', fontSize: 20 }} />,
      title: 'Out of Stock',
      count: 1,
      percentage: 33.3,
      color: '#f44336'
    }
  ];

  return (
    <Paper elevation={0} sx={{ 
      p: { xs: 2, sm: 2.5, md: 3 }, 
      backgroundColor: '#fff', 
      borderRadius: 1,
      mx: { xs: 1, sm: 0 }
    }}>
      <Typography variant="h6" sx={{ 
        fontWeight: 600, 
        mb: { xs: 2, sm: 2.5, md: 3 }, 
        color: '#333',
        fontSize: { xs: '1.1rem', sm: '1.25rem' }
      }}>
        Stock Overview
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 2, sm: 3, md: 4 },
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        {stockData.map((item, index) => (
          <Box key={index} sx={{ flex: 1, minWidth: { xs: '100%', sm: 'auto' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              {item.icon}
              <Typography variant="body2" sx={{ color: '#666', fontSize: '14px' }}>
                {item.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, ml: 'auto', color: '#333' }}>
                {item.count}
              </Typography>
            </Box>
            
            <LinearProgress
              variant="determinate"
              value={100}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#e0e0e0',
                mb: 1,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: item.color,
                  borderRadius: 4,
                }
              }}
            />
            
            <Typography variant="caption" sx={{ color: '#999', fontSize: '12px' }}>
              {item.percentage}% of total products
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Stock;