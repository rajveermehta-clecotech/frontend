// src/pages/auth/Signup.jsx
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { Business } from '@mui/icons-material';
import AuthForm from '../../components/auth/AuthForm';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated, loading, error, user } = useAuth();
  const [signupError, setSignupError] = useState(null);
  const [formRole, setFormRole] = useState('buyer');

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
    if (user?.role === 'vendor' && user?.vendorProfile?.profileCompletion < 100) {
      return <Navigate to="/profile-completion" />;
    }
    return <Navigate to="/dashboard" />;
  }

  // Custom fields for role selection
  const customFields = [
    {
      name: 'role',
      label: 'Account Type',
      icon: <Business />,
      select: true,
      required: true,
      initialValue: 'buyer',
      options: [
        { value: 'buyer', label: 'Buyer' },
        { value: 'vendor', label: 'Vendor' },
      ],
      onChange: (e) => setFormRole(e.target.value),
    },
  ];

  // Add vendor type field if role is vendor
  if (formRole === 'vendor') {
    customFields.push({
      name: 'vendorType',
      label: 'Vendor Type',
      icon: <Business />,
      select: true,
      required: true,
      initialValue: 'manufacturer',
      options: [
        { value: 'manufacturer', label: 'Manufacturer' },
        { value: 'wholesaler', label: 'Wholesaler' },
        { value: 'distributor', label: 'Distributor' },
      ],
    });
  }

  const handleSubmit = async (formData) => {
    setSignupError(null);
    
    // Create user data object
    const userData = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    
    // Add vendor type if role is vendor
    if (formData.role === 'vendor') {
      userData.vendorType = formData.vendorType;
    }
    
    const result = await signup(userData);
    
    if (result.success) {
      // Navigate based on role
      if (userData.role === 'vendor') {
        navigate('/profile-completion');
      } else {
        navigate('/dashboard');
      }
    } else {
      setSignupError(result.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <AuthForm
      type="signup"
      onSubmit={handleSubmit}
      loading={loading}
      error={signupError || error}
      customFields={customFields}
      showSocialLogin={true}
    />
  );
};

export default Signup;