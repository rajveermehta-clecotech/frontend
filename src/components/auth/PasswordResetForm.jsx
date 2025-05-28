import React, { useState } from 'react';
import { Box, Typography, TextField, Button, useMediaQuery, useTheme, Paper, CircularProgress, FormHelperText } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Email } from '@mui/icons-material';
import { isValidEmail } from '../../utils/common';
import { authApi } from '../../services/api/authApi';
import { handleApiError } from '../../utils/errorHandler';

const InputField = ({ label, name, value, onChange, error, ...props }) => (
  <TextField
    fullWidth
    margin="normal"
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={error}
    InputProps={{
      startAdornment: <Email />,
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#E2E8F0' },
        '&:hover fieldset': { borderColor: '#CBD5E0' },
        '&.Mui-focused fieldset': { borderColor: '#5E48E8' },
      },
    }}
    {...props}
  />
);

const SubmitButton = ({ loading, label, disabled }) => (
  <Button
    fullWidth
    variant="contained"
    disabled={loading || disabled}
    sx={{
      mt: 2,
      py: 1.5,
      bgcolor: '#4A5568',
      '&:hover': { bgcolor: '#2D3748' },
      '&:disabled': { bgcolor: '#E2E8F0', color: '#A0AEC0' },
    }}
  >
    {loading ? <CircularProgress size={24} /> : label}
  </Button>
);

const PasswordResetForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await authApi.resetPassword(formData.email); // Assuming authApi has a resetPassword method
      setSuccess('Password reset email sent successfully');
      setError(null);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(handleApiError(error).message);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F3F4F6' }}>
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          p: 4,
          bgcolor: '#5E48E8',
          color: 'white',
          borderRadius: { md: '12px 0 0 12px' },
        }}
      >
        <Typography variant="h4" gutterBottom>Multi-Vendor Marketplace</Typography>
        <Typography variant="body1">Reset your password to regain access</Typography>
      </Box>
      <Box
        component={Paper}
        sx={{
          flex: 1,
          p: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: { md: '0 12px 12px 0' },
        }}
      >
        <Typography variant="h5">Reset Password</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your email to receive a password reset link
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {error && <FormHelperText error sx={{ mb: 2 }}>{error}</FormHelperText>}
          {success && <FormHelperText sx={{ mb: 2, color: 'success.main' }}>{success}</FormHelperText>}
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <SubmitButton loading={loading} label="Send Reset Link" />
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Remember your password? <Link component={RouterLink} to="/login">Sign in</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PasswordResetForm;