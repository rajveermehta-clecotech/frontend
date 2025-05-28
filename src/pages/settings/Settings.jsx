import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Tab, Tabs, Grid, useTheme, useMediaQuery } from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api/authApi';
import { isValidEmail, validatePassword } from '../../utils/common';
import { handleApiError } from '../../utils/errorHandler';

const InputField = ({ label, name, value, onChange, error, disabled, ...props }) => (
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
    {loading ? 'Submitting...' : label}
  </Button>
);

const Settings = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
    fetchProfile();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setErrors({});
    setProfileError(null);
    setPasswordError(null);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!profileData.fullName) newErrors.fullName = 'Full name is required';
    if (!profileData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(profileData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (profileData.contactNumber && !isValidPhoneNumber(profileData.contactNumber)) {
      newErrors.contactNumber = 'Invalid phone number';
    }
    if (!profileData.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = 'Current password is required';
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
  };

  const handleUpdateProfile = async () => {
    if (!validateProfile()) return;
    setLoading(true);
    try {
      await authApi.updateProfile(profileData);
      setProfileError(null);
    } catch (error) {
      setProfileError(handleApiError(error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;
    setLoading(true);
    try {
      // Implement password change API call here
      setPasswordError(null);
    } catch (error) {
      setPasswordError(handleApiError(error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Settings">
      <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, sm: 4 } }}>
        <Typography variant="h5" gutterBottom>Settings</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Manage your account preferences
        </Typography>
        <Card sx={{ borderRadius: 12, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}
          >
            <Tab icon={<PersonIcon />} iconPosition="start" label="Update Profile" />
            <Tab icon={<LockIcon />} iconPosition="start" label="Change Password" />
          </Tabs>
          <CardContent>
            {activeTab === 0 && (
              <Box>
                {profileError && <Typography color="error">{profileError}</Typography>}
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      label="Contact Number"
                      name="contactNumber"
                      value={profileData.contactNumber}
                      onChange={handleProfileChange}
                      error={errors.contactNumber}
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
                <SubmitButton loading={loading} label="Update Profile" />
              </Box>
            )}
            {activeTab === 1 && (
              <Box>
                {passwordError && <Typography color="error">{passwordError}</Typography>}
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
                <SubmitButton loading={loading} label="Change Password" />
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default Settings;