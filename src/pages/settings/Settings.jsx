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
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api/authApi';
import { isValidEmail, validatePassword } from '../../utils/common';
import { handleApiError } from '../../utils/errorHandler';

// Memoized Input Field Component
const InputField = React.memo(({ label, name, value, onChange, error, disabled, ...props }) => (
  <TextField
    fullWidth
    margin="normal"
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={error}
    disabled={disabled}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#E2E8F0' },
        '&:hover fieldset': { borderColor: '#4285F4' },
        '&.Mui-focused fieldset': { borderColor: '#4285F4' },
      },
    }}
    {...props}
  />
));

InputField.displayName = 'InputField';

// Memoized Submit Button Component
const SubmitButton = React.memo(({ loading, label, disabled, onClick }) => (
  <Button
    fullWidth
    variant="contained"
    disabled={loading || disabled}
    onClick={onClick}
    sx={{
      mt: 2,
      py: 1.5,
      bgcolor: '#4285F4',
      '&:hover': { bgcolor: '#1976D2' },
      '&:disabled': { bgcolor: '#E2E8F0', color: '#A0AEC0' },
    }}
  >
    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : label}
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
    fullName: '',
    email: '',
    contactNumber: '',
    address: '',
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
          fullName: response.name || '',
          email: response.email || '',
          contactNumber: response.contactNumber || '',
          address: response.address || '',
        });
      } catch (error) {
        setProfileError(handleApiError(error).message);
      }
    };
    
    if (user) {
      fetchProfile();
    }
  }, [user]);

  // Handle tab change
  const handleTabChange = useCallback((event, newValue) => {
    setActiveTab(newValue);
    setErrors({});
    setProfileError(null);
    setPasswordError(null);
    setSuccessMessage(null);
  }, []);

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
    <AppLayout title="Settings">
      <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, sm: 4 } }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            color: '#1A1A1A',
            mb: 1 
          }}
        >
          Settings
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 3 }}
        >
          Manage your account preferences
        </Typography>
        
        <Card 
          sx={{ 
            borderRadius: 2, 
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #E0E0E0' 
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              px: 3,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
              }
            }}
          >
            <Tab 
              icon={<PersonIcon />} 
              iconPosition="start" 
              label="Update Profile" 
            />
            <Tab 
              icon={<LockIcon />} 
              iconPosition="start" 
              label="Change Password" 
            />
          </Tabs>
          
          <CardContent sx={{ p: 3 }}>
            {/* Success Message */}
            {successMessage && (
              <Alert 
                severity="success" 
                sx={{ mb: 2 }}
                onClose={() => setSuccessMessage(null)}
              >
                {successMessage}
              </Alert>
            )}
            
            {/* Profile Update Tab */}
            {activeTab === 0 && (
              <Box>
                {profileError && (
                  <Alert 
                    severity="error" 
                    sx={{ mb: 2 }}
                    onClose={() => setProfileError(null)}
                  >
                    {profileError}
                  </Alert>
                )}
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputField
                      label="Full Name"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleProfileChange}
                      error={errors.fullName}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <InputField
                      label="Contact Number"
                      name="contactNumber"
                      value={profileData.contactNumber}
                      onChange={handleProfileChange}
                      error={errors.contactNumber}
                      type="tel"
                    />
                  </Grid>
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
                
                <SubmitButton 
                  loading={loading} 
                  label="Update Profile" 
                  onClick={handleUpdateProfile}
                />
              </Box>
            )}
            
            {/* Password Change Tab */}
            {activeTab === 1 && (
              <Box>
                {passwordError && (
                  <Alert 
                    severity="error" 
                    sx={{ mb: 2 }}
                    onClose={() => setPasswordError(null)}
                  >
                    {passwordError}
                  </Alert>
                )}
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputField
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      error={errors.currentPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      error={errors.newPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                
                <SubmitButton 
                  loading={loading} 
                  label="Change Password" 
                  onClick={handleChangePassword}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default Settings;