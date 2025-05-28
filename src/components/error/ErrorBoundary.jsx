// src/components/error/ErrorBoundary.jsx
import React, { Component } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Error as ErrorIcon, Home, Refresh } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// ErrorFallback without navigation dependency
const ErrorFallback = ({ error, resetErrorBoundary, onNavigateHome }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const goToHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    }
    resetErrorBoundary();
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        bgcolor: '#F3F4F6',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
          }}
        >
          {/* Rest of the component stays the same */}
          <ErrorIcon 
            color="error" 
            sx={{ 
              fontSize: { xs: 64, sm: 80 },
              mb: 2
            }} 
          />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Something went wrong
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ 
              maxWidth: '600px',
              mx: 'auto',
              mb: 4,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            We're sorry, but there was an unexpected error. Our team has been
            notified and is working to fix the issue. Please try refreshing the
            page or return to the home page.
          </Typography>
          
          {/* Only show error details in development */}
          {process.env.NODE_ENV === 'development' && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 4,
                bgcolor: 'rgba(239, 68, 68, 0.05)',
                borderColor: 'error.light',
                textAlign: 'left',
                overflow: 'auto',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: 600, color: 'error.main' }}
              >
                Error Details (visible in development only):
              </Typography>
              <Typography
                variant="body2"
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: 'error.dark',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {error.toString()}
                {'\n'}
                {error.stack}
              </Typography>
            </Paper>
          )}
          
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              size={isMobile ? "medium" : "large"}
              startIcon={<Home />}
              onClick={goToHome}
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
              Go to Home
            </Button>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              startIcon={<Refresh />}
              onClick={resetErrorBoundary}
              sx={{
                borderRadius: 8,
                px: 3,
                py: { xs: 1, sm: 1.5 },
              }}
            >
              Try Again
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

// Wrapper component that provides navigation context
const ErrorBoundaryWithNavigation = (props) => {
  const navigate = useNavigate();
  
  return (
    <ErrorBoundary 
      {...props} 
      onNavigateHome={() => navigate('/')} 
    />
  );
};

// Error Boundary Class Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In a production app, you would send this to your error tracking service
    // Examples: Sentry, LogRocket, etc.
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
          onNavigateHome={this.props.onNavigateHome}
        />
      );
    }

    return this.props.children;
  }
}

// Export both versions - use ErrorBoundaryWithNavigation when you need navigation
export { ErrorBoundaryWithNavigation };
export default ErrorBoundary;