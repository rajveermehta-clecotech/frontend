import React from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import { Reply } from '@mui/icons-material';

const Enquiry = () => {
  const enquiries = [
    {
      name: 'Alice Johnson',
      message: "Hi, I'm interested in bulk purchasing of your Industrial Laptop Pro. Can you provide pricing for 50+ units?",
      date: '20/01/2024',
      isNew: true,
      isResponded: false
    },
    {
      name: 'Bob Smith',
      message: 'Does the Smart Sensor Module support LoRaWAN connectivity? We need it for our IoT infrastructure.',
      date: '19/01/2024',
      isNew: true,
      isResponded: false
    },
    {
      name: 'Carol Davis',
      message: 'When will the Cable Management System be back in stock? We have an urgent project coming up.',
      date: '18/01/2024',
      isNew: false,
      isResponded: true
    }
  ];

  return (
    <Paper elevation={0} sx={{ 
      p: { xs: 2, sm: 2.5, md: 3 }, 
      backgroundColor: '#fff', 
      borderRadius: 1,
      mx: { xs: 1, sm: 0 }
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: { xs: 2, sm: 2.5, md: 3 },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 0 }
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          color: '#333',
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}>
          Recent Enquiries
        </Typography>
        <Chip 
          label="2 New" 
          size="small" 
          sx={{ 
            backgroundColor: '#e3f2fd', 
            color: '#1976d2', 
            fontWeight: 500,
            fontSize: '12px'
          }} 
        />
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
        {enquiries.map((enquiry, index) => (
          <Box key={index} sx={{ 
            pb: { xs: 1.5, sm: 2 }, 
            borderBottom: index < enquiries.length - 1 ? '1px solid #f0f0f0' : 'none' 
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start', 
              mb: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                flexWrap: 'wrap'
              }}>
                <Typography variant="subtitle2" sx={{ 
                  fontWeight: 600, 
                  color: '#333',
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}>
                  {enquiry.name}
                </Typography>
                {enquiry.isNew && (
                  <Chip 
                    label="new" 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#333', 
                      color: '#fff', 
                      height: '20px',
                      fontSize: '10px',
                      fontWeight: 500,
                      '& .MuiChip-label': {
                        px: 1
                      }
                    }} 
                  />
                )}
                {enquiry.isResponded && (
                  <Chip 
                    label="responded" 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#e8f5e8', 
                      color: '#2e7d32', 
                      height: '20px',
                      fontSize: '10px',
                      fontWeight: 500,
                      '& .MuiChip-label': {
                        px: 1
                      }
                    }} 
                  />
                )}
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Reply sx={{ fontSize: '16px !important' }} />}
                sx={{
                  textTransform: 'none',
                  fontSize: { xs: '11px', sm: '12px' },
                  minWidth: 'auto',
                  px: { xs: 1.5, sm: 2 },
                  py: 0.5,
                  borderColor: '#ddd',
                  color: '#666',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                Reply
              </Button>
            </Box>
            
            <Typography variant="body2" sx={{ 
              color: '#666', 
              mb: 1, 
              lineHeight: 1.4,
              fontSize: { xs: '0.85rem', sm: '0.875rem' }
            }}>
              {enquiry.message}
            </Typography>
            
            <Typography variant="caption" sx={{ color: '#999', fontSize: '12px' }}>
              {enquiry.date}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Enquiry;