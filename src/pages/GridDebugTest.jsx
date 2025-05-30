import React from 'react';
import { Box, Grid, Paper, Typography, Container } from '@mui/material';

const GridDebugTest = () => {
  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh',
      p: 0 // Remove padding that might constrain width
    }}>
      <Container maxWidth={false} sx={{ width: '100%', maxWidth: '100%', px: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Grid Debug Test - Full Width Fix
      </Typography>
      
      {/* Container Width Display */}
      <Box sx={{ 
        mb: 3, 
        p: 2, 
        bgcolor: 'info.light', 
        borderRadius: 1,
        color: 'white'
      }}>
        <Typography variant="body2">
          Container Debug: This blue box should span the full width of your screen/container
        </Typography>
      </Box>
      
      {/* Test 1: Basic Grid with Full Width */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Test 1: Basic 12-column grid (Full Width)
      </Typography>
      <Grid 
        container 
        spacing={2} 
        sx={{ 
          mb: 4,
          width: '100%',
          margin: 0, // Remove default margin
          '& .MuiGrid-item': {
            paddingLeft: '16px', // Ensure consistent spacing
          }
        }}
      >
        {[...Array(12)].map((_, index) => (
          <Grid item xs={1} key={index} sx={{ display: 'flex' }}>
            <Paper 
              sx={{ 
                p: 1, 
                textAlign: 'center', 
                bgcolor: 'primary.light',
                color: 'white',
                minHeight: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%', // Ensure full width within grid item
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}
            >
              {index + 1}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Test 2: Responsive Grid */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Test 2: Responsive grid (xs=12, sm=6, md=4, lg=3)
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                bgcolor: 'secondary.light',
                color: 'white',
                minHeight: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Item {index + 1}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Test 3: Complex Layout */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Test 3: Complex layout (8-4 split)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, minHeight: 200, bgcolor: 'success.light' }}>
            <Typography variant="h6" color="white">
              Main Content Area (8 columns)
            </Typography>
            <Typography color="white">
              This should take 8/12 columns on medium screens and above
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, minHeight: 200, bgcolor: 'warning.light' }}>
            <Typography variant="h6" color="white">
              Sidebar (4 columns)
            </Typography>
            <Typography color="white">
              This should take 4/12 columns on medium screens and above
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Test 4: Nested Grid */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Test 4: Nested grid
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, bgcolor: 'info.light' }}>
            <Typography variant="h6" color="white" sx={{ mb: 2 }}>
              Left Section with Nested Grid
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Paper sx={{ p: 1, bgcolor: 'info.dark', color: 'white', textAlign: 'center' }}>
                  Nested 1
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 1, bgcolor: 'info.dark', color: 'white', textAlign: 'center' }}>
                  Nested 2
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, bgcolor: 'error.light', minHeight: 120 }}>
            <Typography variant="h6" color="white">
              Right Section
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Width Test Bars */}
      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        Width Test: Visual Full-Width Confirmation
      </Typography>
      
      <Box sx={{ mb: 2, height: 30, bgcolor: 'error.main', width: '100%' }}>
        <Typography variant="body2" sx={{ color: 'white', p: 1 }}>
          100% Width Bar - Should span full container
        </Typography>
      </Box>
      
      <Box sx={{ mb: 2, height: 30, bgcolor: 'warning.main', width: '75%' }}>
        <Typography variant="body2" sx={{ color: 'white', p: 1 }}>
          75% Width Bar - For comparison
        </Typography>
      </Box>
      
      <Box sx={{ mb: 4, height: 30, bgcolor: 'success.main', width: '50%' }}>
        <Typography variant="body2" sx={{ color: 'white', p: 1 }}>
          50% Width Bar - For comparison
        </Typography>
      </Box>

      {/* CSS Debug Info */}
      <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Debug Information & Solutions:
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: 'error.main' }}>
          ❌ Problem: Grid items not taking full width
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
          This usually means the Grid container doesn't have full width available
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: 'success.main' }}>
          ✅ Solutions:
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, pl: 2 }}>
          • Add width: '100%' to Grid container sx prop
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, pl: 2 }}>
          • Remove constraining padding from parent containers
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, pl: 2 }}>
          • Use Container with maxWidth={false} for full width
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, pl: 2 }}>
          • Check for CSS that might be constraining flexbox
        </Typography>
        <Typography variant="body2" sx={{ pl: 2 }}>
          • Inspect elements in browser dev tools to find width constraints
        </Typography>
      </Box>
      </Container>
    </Box>
  );
};

export default GridDebugTest;