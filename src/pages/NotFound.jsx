import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Home as HomeIcon, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';

const NotFound = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goHome = () => {
    navigate(isAuthenticated ? '/dashboard' : '/');
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Show PublicNavbar for non-authenticated users */}
      {!isAuthenticated && <PublicNavbar />}
      
      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#F3F4F6',
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 6 },
              borderRadius: 3,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Large 404 background text */}
            <Typography
              variant="h1"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: { xs: '150px', sm: '240px' },
                fontWeight: 800,
                color: 'rgba(94, 72, 232, 0.06)',
                whiteSpace: 'nowrap',
                zIndex: 0,
              }}
            >
              404
            </Typography>
            
            {/* Content */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  color: 'text.primary',
                  fontSize: { xs: '2rem', sm: '3rem' },
                  mb: 2
                }}
              >
                Page Not Found
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ 
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 5,
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                The page you're looking for doesn't exist or has been moved.
                Please check the URL or navigate back to the homepage.
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={goBack}
                  sx={{
                    borderRadius: 8,
                    px: 3,
                    py: { xs: 1, sm: 1.5 },
                    borderColor: 'divider',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  startIcon={<HomeIcon />}
                  onClick={goHome}
                  sx={{
                    borderRadius: 8,
                    px: 3,
                    py: { xs: 1, sm: 1.5 },
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Go to Home'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      
      {/* Show Footer for non-authenticated users */}
      {!isAuthenticated && <Footer />}
    </Box>
  );
};

export default NotFound;