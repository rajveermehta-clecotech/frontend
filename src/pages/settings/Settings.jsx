import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Tab, 
  Tabs, 
  Grid, 
  useTheme, 
  useMediaQuery,
  Alert,
  CircularProgress,
  Paper,
  Divider,
} from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api/authApi';
import { isValidEmail, validatePassword } from '../../utils/common';
import { handleApiError } from '../../utils/errorHandler';

// Memoized Input Field Component
const InputField = React.memo(({ label, name, value, onChange, error, disabled, helperText, ...props }) => (
  <Box sx={{ mb: 3 }}>
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'primary.main', 
        fontWeight: 500, 
        mb: 1,
        fontSize: '14px'
      }}
    >
      {label}
    </Typography>
    <TextField
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      disabled={disabled}
      variant="outlined"
      size="small"
      sx={{
        bgcolor: 'background.paper',
        '& .MuiOutlinedInput-root': {
          backgroundColor: disabled ? 'action.disabled' : 'background.paper',
          '& fieldset': { 
            borderColor: 'divider',
            borderRadius: '8px'
          },
          '&:hover fieldset': { 
            borderColor: disabled ? 'divider' : 'primary.main' 
          },
          '&.Mui-focused fieldset': { 
            borderColor: 'primary.main',
            borderWidth: '2px'
          },
          '& input': {
            padding: '12px 14px',
            fontSize: '14px',
            color: disabled ? 'text.disabled' : 'text.primary'
          }
        },
        '& .MuiFormHelperText-root': {
          fontSize: '12px',
          color: disabled ? 'primary.main' : 'error.main',
          marginTop: '4px'
        }
      }}
      {...props}
    />
  </Box>
));

InputField.displayName = 'InputField';

// Memoized Submit Button Component
const SubmitButton = React.memo(({ loading, label, disabled, onClick }) => (
  <Button
    variant="contained"
    disabled={loading || disabled}
    onClick={onClick}
    sx={{
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '14px',
      px: 3,
      py: 1.5,
      borderRadius: 2,
      '&:hover': { 
        bgcolor: 'primary.dark' 
      },
      '&:disabled': { 
        bgcolor: 'action.disabled', 
        color: 'text.disabled' 
      },
    }}
  >
    {loading ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : label}
  </Button>
));

SubmitButton.displayName = 'SubmitButton';

const Settings = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    fullName: 'John Vendor',
    email: 'vendor@example.com',
    contactNumber: '+1 (555) 123-4567',
    address: '123 Business St, Suite 100, City, State 12345',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Load profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authApi.getCurrentUser();
        setProfileData({
          fullName: response.name || 'John Vendor',
          email: response.email || 'vendor@example.com',
          contactNumber: response.contactNumber || '+1 (555) 123-4567',
          address: response.address || '123 Business St, Suite 100, City, State 12345',
        });
      } catch (error) {
        // Keep default values if API fails
      }
    };
    
    if (user) {
      fetchProfile();
    }
  }, [user]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setErrors({});
    setProfileError(null);
    setPasswordError(null);
    setSuccessMessage(null);
  };

  // Handle profile form changes
  const handleProfileChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Handle password form changes
  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Validate profile form
  const validateProfile = useCallback(() => {
    const newErrors = {};
    if (!profileData.fullName) newErrors.fullName = 'Full name is required';
    if (!profileData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(profileData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (profileData.contactNumber && profileData.contactNumber.length < 10) {
      newErrors.contactNumber = 'Invalid phone number';
    }
    if (!profileData.address) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [profileData]);

  // Validate password form
  const validatePasswordForm = useCallback(() => {
    const newErrors = {};
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else {
      const passwordValidation = validatePassword(passwordData.newPassword);
      if (!passwordValidation.isValid) {
        newErrors.newPassword = passwordValidation.errors.join(', ');
      }
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [passwordData]);

  // Handle profile update
  const handleUpdateProfile = useCallback(async () => {
    if (!validateProfile()) return;
    
    setLoading(true);
    setProfileError(null);
    setSuccessMessage(null);
    
    try {
      await authApi.updateProfile(profileData);
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      setProfileError(handleApiError(error).message);
    } finally {
      setLoading(false);
    }
  }, [profileData, validateProfile]);

  // Handle password change
  const handleChangePassword = useCallback(async () => {
    if (!validatePasswordForm()) return;
    
    setLoading(true);
    setPasswordError(null);
    setSuccessMessage(null);
    
    try {
      // Implement password change API call here
      // await authApi.changePassword(passwordData);
      setSuccessMessage('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setPasswordError(handleApiError(error).message);
    } finally {
      setLoading(false);
    }
  }, [passwordData, validatePasswordForm]);

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh', 
      p: 0 
    }}>
      {/* Header */}
      <Paper 
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper', 
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 4,
          py: 3
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600, 
            color: 'text.primary',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            mb: 0.5
          }}
        >
          Settings
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            fontSize: '1rem'
          }}
        >
          Manage your account preferences
        </Typography>
      </Paper>

      {/* Tab Navigation */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: 4
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              minHeight: 60,
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: 3,
            }
          }}
        >
          <Tab
            icon={<PersonIcon sx={{ fontSize: '18px' }} />}
            iconPosition="start"
            label="Update Profile"
            sx={{ px: 3 }}
          />
          <Tab
            icon={<LockIcon sx={{ fontSize: '18px' }} />}
            iconPosition="start"
            label="Change Password"
            sx={{ px: 3 }}
          />
        </Tabs>
      </Paper>

      {/* Content Area */}
      <Box sx={{ p: 4 }}>
        <Card
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: theme.shadows[1],
            maxWidth: '100%'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Success Message */}
            {successMessage && (
              <Alert 
                severity="success" 
                sx={{ mb: 3, borderRadius: 2 }}
                onClose={() => setSuccessMessage(null)}
              >
                {successMessage}
              </Alert>
            )}
            
            {/* Profile Update Tab */}
            {activeTab === 0 && (
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    fontSize: '1.25rem',
                    mb: 1
                  }}
                >
                  Profile Information
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 4
                  }}
                >
                  Update your personal information and contact details
                </Typography>

                {profileError && (
                  <Alert 
                    severity="error" 
                    sx={{ mb: 3, borderRadius: 2 }}
                    onClose={() => setProfileError(null)}
                  >
                    {profileError}
                  </Alert>
                )}
                
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <InputField
                      label="Full Name"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleProfileChange}
                      error={errors.fullName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      label="Email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      error={errors.email}
                      disabled
                      helperText="Email cannot be changed"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      label="Contact Number"
                      name="contactNumber"
                      value={profileData.contactNumber}
                      onChange={handleProfileChange}
                      error={errors.contactNumber}
                      type="tel"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12}>
                    <InputField
                      label="Address"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      error={errors.address}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 4 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <SubmitButton 
                    loading={loading} 
                    label="Update Profile" 
                    onClick={handleUpdateProfile}
                  />
                </Box>
              </Box>
            )}
            
            {/* Password Change Tab */}
            {activeTab === 1 && (
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    fontSize: '1.25rem',
                    mb: 1
                  }}
                >
                  Change Password
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 4
                  }}
                >
                  Update your password to keep your account secure
                </Typography>

                {passwordError && (
                  <Alert 
                    severity="error" 
                    sx={{ mb: 3, borderRadius: 2 }}
                    onClose={() => setPasswordError(null)}
                  >
                    {passwordError}
                  </Alert>
                )}
                
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <InputField
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      error={errors.currentPassword}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      error={errors.newPassword}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      error={errors.confirmPassword}
                    />
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 4 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <SubmitButton 
                    loading={loading} 
                    label="Change Password" 
                    onClick={handleChangePassword}
                  />
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Settings;