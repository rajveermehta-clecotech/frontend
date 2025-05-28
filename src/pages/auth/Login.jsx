// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import AuthForm from '../../components/auth/AuthForm';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error, user } = useAuth();
  const [loginError, setLoginError] = useState(null);

  // If still checking authentication, show loading
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress size={40} color="primary" />
      </Box>
    );
  }

  // Redirect if already authenticated
  if (isAuthenticated) {
    // For vendors with incomplete profile, redirect to profile completion
    if (user?.role === 'vendor' && user?.vendorProfile?.profileCompletion < 100) {
      return <Navigate to="/profile-completion" />;
    }
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (formData) => {
    const { email, password } = formData;
    
    setLoginError(null);
    
    const result = await login(email, password);
    
    if (result.success) {
      // Navigate based on user role and profile completion
      if (user?.role === 'vendor' && user?.vendorProfile?.profileCompletion < 100) {
        navigate('/profile-completion');
      } else {
        navigate('/dashboard');
      }
    } else {
      setLoginError(result.error || 'Invalid email or password');
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleSubmit}
      loading={loading}
      error={loginError || error}
      showSocialLogin={true}
    />
  );
};

export default Login;