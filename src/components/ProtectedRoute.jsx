// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show a proper loading screen while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#F3F4F6'
        }}
      >
        <CircularProgress size={40} color="primary" sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Authenticating...
        </Typography>
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For vendors with incomplete profiles, redirect to profile completion
  if (user?.role === 'vendor' && 
      user.vendorProfile?.profileCompletion < 100 && 
      location.pathname !== '/profile-completion') {
    return <Navigate to="/profile-completion" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;