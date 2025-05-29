// src/pages/NotFound.jsx - Theme-aware version
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
import PublicThemeWrapper from '../components/layout/PublicThemeWrapper';

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

  // If user is authenticated, show simple error (they're in dashboard)
  if (isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 6 },
              borderRadius: 3,
              bgcolor: 'var(--mui-palette-background-paper)',
              border: '1px solid var(--mui-palette-divider)',
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
                color: 'rgba(33, 150, 243, 0.06)',
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
                  color: 'var(--mui-palette-text-primary)',
                  fontSize: { xs: '2rem', sm: '3rem' },
                  mb: 2
                }}
              >
                Page Not Found
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 5,
                  color: 'var(--mui-palette-text-secondary)',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                The page you're looking for doesn't exist or has been moved.
                Please check the URL or navigate back to the dashboard.
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
                    borderColor: 'var(--mui-palette-divider)',
                    color: 'var(--mui-palette-text-primary)',
                    '&:hover': {
                      borderColor: 'var(--mui-palette-primary-main)',
                      bgcolor: 'var(--mui-palette-action-hover)',
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
                    bgcolor: 'var(--mui-palette-primary-main)',
                    '&:hover': {
                      bgcolor: 'var(--mui-palette-primary-dark)',
                    },
                  }}
                >
                  Go to Dashboard
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  // For non-authenticated users, show full page with theme wrapper
  return (
    <PublicThemeWrapper>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'var(--mui-palette-background-default)',
        }}
      >
        {/* Main content */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 6,
          }}
        >
          <Container maxWidth="md">
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 6 },
                borderRadius: 3,
                bgcolor: 'var(--mui-palette-background-paper)',
                border: '1px solid var(--mui-palette-divider)',
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
                  color: 'rgba(33, 150, 243, 0.06)',
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
                    color: 'var(--mui-palette-text-primary)',
                    fontSize: { xs: '2rem', sm: '3rem' },
                    mb: 2
                  }}
                >
                  Page Not Found
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ 
                    maxWidth: '600px',
                    mx: 'auto',
                    mb: 5,
                    color: 'var(--mui-palette-text-secondary)',
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
                      borderColor: 'var(--mui-palette-divider)',
                      color: 'var(--mui-palette-text-primary)',
                      '&:hover': {
                        borderColor: 'var(--mui-palette-primary-main)',
                        bgcolor: 'var(--mui-palette-action-hover)',
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
                      bgcolor: 'var(--mui-palette-primary-main)',
                      '&:hover': {
                        bgcolor: 'var(--mui-palette-primary-dark)',
                      },
                    }}
                  >
                    Go to Home
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </PublicThemeWrapper>
  );
};

export default NotFound;