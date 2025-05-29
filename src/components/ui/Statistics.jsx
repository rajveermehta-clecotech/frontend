import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { 
  Inventory2Outlined, 
  PeopleAltOutlined, 
  VerifiedUserOutlined,
  TrendingUp 
} from '@mui/icons-material';

const Statistics = () => {
  const statsData = [
    {
      icon: <Inventory2Outlined sx={{ color: '#2196f3', fontSize: 28 }} />,
      title: 'Total Products',
      value: '3',
      subtitle: 'Active listings',
      percentage: '+12%',
      percentageColor: '#4caf50'
    },
    {
      icon: <PeopleAltOutlined sx={{ color: '#9c27b0', fontSize: 28 }} />,
      title: 'Active Enquiries',
      value: '2',
      subtitle: 'Pending responses',
      percentage: '+8%',
      percentageColor: '#4caf50'
    },
    {
      icon: <VerifiedUserOutlined sx={{ color: '#4caf50', fontSize: 28 }} />,
      title: 'Profile Status',
      value: 'Verified',
      subtitle: 'Profile complete',
      percentage: '100%',
      percentageColor: '#4caf50'
    }
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: { xs: 1.5, sm: 2 },
      flexDirection: { xs: 'column', sm: 'column', md: 'row' },
      px: { xs: 1, sm: 0 }
    }}>
      {statsData.map((stat, index) => (
        <Paper 
          key={index}
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            backgroundColor: '#fff', 
            borderRadius: 1,
            border: '1px solid #e3f2fd',
            borderLeft: '4px solid #2196f3',
            flex: 1,
            position: 'relative',
            minWidth: { xs: '100%', md: 'auto' }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            mb: { xs: 1.5, sm: 2 },
            flexDirection: { xs: 'row', sm: 'row' }
          }}>
            <Box>
              {React.cloneElement(stat.icon, { 
                sx: { 
                  ...stat.icon.props.sx, 
                  fontSize: { xs: 24, sm: 26, md: 28 } 
                } 
              })}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUp sx={{ 
                color: stat.percentageColor, 
                fontSize: { xs: 14, sm: 15, md: 16 } 
              }} />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: stat.percentageColor, 
                  fontWeight: 600,
                  fontSize: { xs: '11px', sm: '12px' }
                }}
              >
                {stat.percentage}
              </Typography>
            </Box>
          </Box>

          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666', 
              fontSize: { xs: '13px', sm: '14px' },
              mb: 1,
              fontWeight: 500
            }}
          >
            {stat.title}
          </Typography>

          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: '#333',
              mb: 1,
              fontSize: { xs: '22px', sm: '25px', md: '28px' }
            }}
          >
            {stat.value}
          </Typography>

          <Typography 
            variant="caption" 
            sx={{ 
              color: '#999',
              fontSize: { xs: '11px', sm: '12px' }
            }}
          >
            {stat.subtitle}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Statistics;