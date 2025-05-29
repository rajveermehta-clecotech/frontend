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
  CircularProgress
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
        color: '#1976D2', 
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
        '& .MuiOutlinedInput-root': {
          backgroundColor: disabled ? '#f5f5f5' : 'white',
          '& fieldset': { 
            borderColor: '#e0e0e0',
            borderRadius: '4px'
          },
          '&:hover fieldset': { 
            borderColor: disabled ? '#e0e0e0' : '#1976D2' 
          },
          '&.Mui-focused fieldset': { 
            borderColor: '#1976D2',
            borderWidth: '1px'
          },
          '& input': {
            padding: '12px 14px',
            fontSize: '14px',
            color: disabled ? '#999' : '#333'
          }
        },
        '& .MuiFormHelperText-root': {
          fontSize: '12px',
          color: disabled ? '#1976D2' : '#d32f2f',
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
      bgcolor: '#1a237e',
      color: 'white',
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '14px',
      px: 3,
      py: 1,
      borderRadius: '4px',
      float: 'right',
      '&:hover': { 
        bgcolor: '#0d47a1' 
      },
      '&:disabled': { 
        bgcolor: '#e0e0e0', 
        color: '#999' 
      },
    }}
  >
    {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : label}
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

  // Handle tab change with custom styling
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
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
      <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', p: 0 }}>
        {/* Header */}
        <Box sx={{ 
          backgroundColor: 'white', 
          borderBottom: '1px solid #e0e0e0',
          px: 4,
          py: 3
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 400, 
              color: '#333',
              fontSize: '24px',
              mb: 0.5
            }}
          >
            Settings
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              fontSize: '14px'
            }}
          >
            Manage your account preferences
          </Typography>
        </Box>

        {/* Tab Navigation */}
        <Box sx={{ 
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
          px: 4
        }}>
          <Box sx={{ display: 'flex', gap: 0 }}>
            <Button
              onClick={() => handleTabClick(0)}
              sx={{
                backgroundColor: activeTab === 0 ? '#e3f2fd' : 'transparent',
                color: activeTab === 0 ? '#1976D2' : '#666',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                px: 3,
                py: 2,
                borderRadius: 0,
                borderBottom: activeTab === 0 ? '2px solid #1976D2' : '2px solid transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <PersonIcon sx={{ mr: 1, fontSize: '18px' }} />
              Update Profile
            </Button>
            <Button
              onClick={() => handleTabClick(1)}
              sx={{
                backgroundColor: activeTab === 1 ? '#e3f2fd' : 'transparent',
                color: activeTab === 1 ? '#1976D2' : '#666',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                px: 3,
                py: 2,
                borderRadius: 0,
                borderBottom: activeTab === 1 ? '2px solid #1976D2' : '2px solid transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <LockIcon sx={{ mr: 1, fontSize: '18px' }} />
              Change Password
            </Button>
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ p: 4 }}>
          <Box sx={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            p: 4,
            maxWidth: '800px'
          }}>
            {/* Success Message */}
            {successMessage && (
              <Alert 
                severity="success" 
                sx={{ mb: 3 }}
                onClose={() => setSuccessMessage(null)}
              >
                {successMessage}
              </Alert>
            )}
            
            {/* Profile Update Tab */}
            {activeTab === 0 && (
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 500,
                    color: '#333',
                    fontSize: '18px',
                    mb: 3
                  }}
                >
                  Profile Information
                </Typography>

                {profileError && (
                  <Alert 
                    severity="error" 
                    sx={{ mb: 3 }}
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
                
                <Box sx={{ mt: 4, textAlign: 'right' }}>
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
                  variant="h6" 
                  sx={{ 
                    fontWeight: 500,
                    color: '#333',
                    fontSize: '18px',
                    mb: 3
                  }}
                >
                  Change Password
                </Typography>

                {passwordError && (
                  <Alert 
                    severity="error" 
                    sx={{ mb: 3 }}
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
                
                <Box sx={{ mt: 4, textAlign: 'right' }}>
                  <SubmitButton 
                    loading={loading} 
                    label="Change Password" 
                    onClick={handleChangePassword}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
  );
};

export default Settings;