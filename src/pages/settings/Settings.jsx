import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Grid,
  Divider,
  Container,
  IconButton,
  useMediaQuery,
  InputAdornment,
  Alert
} from '@mui/material';
import {
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Edit as EditIcon,
  PersonAdd as PersonAddIcon,
  PhotoCamera as PhotoCameraIcon,
  Lock as LockIcon
} from '@mui/icons-material';

const Settings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeSection, setActiveSection] = useState('account');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [profileData, setProfileData] = useState({
    name: 'Monir Ux Designer',
    email: 'monirrzzaman097@gmail.com',
    phone: '+088 01872055538',
    streetNumber: '',
    aptNumber: '',
    city: '',
    state: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field) => (event) => {
    setProfileData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const sidebarItems = [
    {
      id: 'account',
      label: 'Account Information',
      sublabel: 'Change your Account Information',
      icon: PersonIcon
    },
    {
      id: 'password',
      label: 'Password',
      sublabel: 'Change your Password',
      icon: LockIcon
    },
    {
      id: 'invite',
      label: 'Invite Your Friends',
      sublabel: 'Get $2 For each Invitation',
      icon: PersonAddIcon
    }
  ];

  const CircularProgress = ({ value }) => (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        width: 60,
        height: 60
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `conic-gradient(${theme.palette.common.white} 0deg, ${theme.palette.common.white} ${value * 3.6}deg, rgba(255,255,255,0.3) ${value * 3.6}deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `3px solid rgba(255,255,255,0.3)`,
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.common.white,
              fontWeight: 600,
              fontSize: '16px'
            }}
          >
            {value}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderMainContent = () => {
    switch (activeSection) {
      case 'password':
        return (
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600, 
                mb: 4,
                color: theme.palette.text.primary,
                fontSize: { xs: '1.5rem', sm: '1.75rem' }
              }}
            >
              Change Password
            </Typography>

            <Alert 
              severity="info" 
              sx={{ 
                mb: 4,
                backgroundColor: theme.palette.mode === 'dark' ? 
                  'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.05)',
                color: theme.palette.text.primary,
                '& .MuiAlert-icon': {
                  color: theme.palette.info.main
                }
              }}
            >
              For your security, please enter your current password to make changes.
            </Alert>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={showPasswords.current ? 'text' : 'password'}
                  label="Current Password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange('currentPassword')}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility('current')}
                          edge="end"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {showPasswords.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 
                        'rgba(255,255,255,0.05)' : theme.palette.grey[50],
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? 
                          'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                      '&.Mui-focused': {
                        color: theme.palette.primary.main
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={showPasswords.new ? 'text' : 'password'}
                  label="New Password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange('newPassword')}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility('new')}
                          edge="end"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {showPasswords.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 
                        'rgba(255,255,255,0.05)' : theme.palette.grey[50],
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? 
                          'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                      '&.Mui-focused': {
                        color: theme.palette.primary.main
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={showPasswords.confirm ? 'text' : 'password'}
                  label="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange('confirmPassword')}
                  variant="outlined"
                  error={passwordData.confirmPassword !== '' && passwordData.newPassword !== passwordData.confirmPassword}
                  helperText={
                    passwordData.confirmPassword !== '' && passwordData.newPassword !== passwordData.confirmPassword
                      ? 'Passwords do not match'
                      : ''
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility('confirm')}
                          edge="end"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {showPasswords.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 
                        'rgba(255,255,255,0.05)' : theme.palette.grey[50],
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? 
                          'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                      '&.Mui-focused': {
                        color: theme.palette.primary.main
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={
                    !passwordData.currentPassword || 
                    !passwordData.newPassword || 
                    passwordData.newPassword !== passwordData.confirmPassword
                  }
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    py: 2,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                      transform: 'translateY(-1px)',
                      boxShadow: theme.shadows[4]
                    },
                    '&:disabled': {
                      bgcolor: theme.palette.mode === 'dark' ? 
                        'rgba(255,255,255,0.1)' : theme.palette.grey[300],
                      color: theme.palette.mode === 'dark' ? 
                        'rgba(255,255,255,0.3)' : theme.palette.grey[500]
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  Update Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 'invite':
        return (
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600, 
                mb: 4,
                color: theme.palette.text.primary,
                fontSize: { xs: '1.5rem', sm: '1.75rem' }
              }}
            >
              Invite Friends
            </Typography>
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              color: theme.palette.text.secondary
            }}>
              <PersonAddIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Invite System Coming Soon
              </Typography>
              <Typography variant="body2">
                Get $2 for each successful invitation
              </Typography>
            </Box>
          </Box>
        );

      default: // 'account'
        return (
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600, 
                mb: 4,
                color: theme.palette.text.primary,
                fontSize: { xs: '1.5rem', sm: '1.75rem' }
              }}
            >
              Personal Information
            </Typography>

            {/* Profile Section */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 4, 
              gap: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar 
                  sx={{ 
                    width: { xs: 70, sm: 80 }, 
                    height: { xs: 70, sm: 80 },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    fontWeight: 600
                  }}
                >
                  M
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: -8,
                    right: -8,
                    bgcolor: theme.palette.background.paper,
                    border: `2px solid ${theme.palette.background.paper}`,
                    width: 32,
                    height: 32,
                    '&:hover': {
                      bgcolor: theme.palette.action.hover
                    }
                  }}
                >
                  <PhotoCameraIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                </IconButton>
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '1.125rem', sm: '1.25rem' }
                  }}
                >
                  Monir UX Designer
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'flex-start' }
                }}>
                  <Button 
                    variant="contained"
                    size="small"
                    sx={{ 
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      textTransform: 'none',
                      fontWeight: 500,
                      borderRadius: 2,
                      px: 2,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark
                      }
                    }}
                  >
                    Upload New Picture
                  </Button>
                  <Button 
                    variant="text"
                    size="small"
                    sx={{ 
                      color: theme.palette.text.secondary,
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        color: theme.palette.error.main
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
              
              <IconButton sx={{ 
                color: theme.palette.text.secondary,
                '&:hover': { 
                  color: theme.palette.primary.main,
                  bgcolor: theme.palette.action.hover
                }
              }}>
                <EditIcon />
              </IconButton>
            </Box>

            {/* Form Fields */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={profileData.name}
                    onChange={handleInputChange('name')}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === 'dark' ? 
                          'rgba(255,255,255,0.05)' : theme.palette.grey[50],
                        '& fieldset': {
                          borderColor: theme.palette.mode === 'dark' ? 
                            'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                        '&.Mui-focused': {
                          color: theme.palette.primary.main
                        }
                      }
                    }}
                  />
                  <IconButton sx={{ 
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: theme.palette.text.secondary,
                    '&:hover': { color: theme.palette.primary.main }
                  }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={profileData.email}
                    onChange={handleInputChange('email')}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === 'dark' ? 
                          'rgba(255,255,255,0.05)' : theme.palette.grey[50],
                        '& fieldset': {
                          borderColor: theme.palette.mode === 'dark' ? 
                            'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                        '&.Mui-focused': {
                          color: theme.palette.primary.main
                        }
                      }
                    }}
                  />
                  <IconButton sx={{ 
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: theme.palette.text.secondary,
                    '&:hover': { color: theme.palette.primary.main }
                  }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={profileData.phone}
                    onChange={handleInputChange('phone')}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === 'dark' ? 
                          'rgba(255,255,255,0.05)' : theme.palette.grey[50],
                        '& fieldset': {
                          borderColor: theme.palette.mode === 'dark' ? 
                            'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                        '&.Mui-focused': {
                          color: theme.palette.primary.main
                        }
                      }
                    }}
                  />
                  <IconButton sx={{ 
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: theme.palette.text.secondary,
                    '&:hover': { color: theme.palette.primary.main }
                  }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Street Number"
                  placeholder="Street Number"
                  value={profileData.streetNumber}
                  onChange={handleInputChange('streetNumber')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 
                        'rgba(255,255,255,0.05)' : theme.palette.grey[50],
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? 
                          'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                      '&.Mui-focused': {
                        color: theme.palette.primary.main
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apt / House Number"
                  placeholder="Apt / House Number"
                  value={profileData.aptNumber}
                  onChange={handleInputChange('aptNumber')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 
                        'rgba(255,255,255,0.05)' : theme.palette.grey[50],
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? 
                          'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                      '&.Mui-focused': {
                        color: theme.palette.primary.main
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Select
                    value={profileData.city}
                    onChange={handleInputChange('city')}
                    displayEmpty
                    renderValue={(value) => value || 'City'}
                    sx={{
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 
                        'rgba(255,255,255,0.05)' : theme.palette.grey[50],
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? 
                          'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main
                      }
                    }}
                  >
                    <MenuItem value="">City</MenuItem>
                    <MenuItem value="dhaka">Dhaka</MenuItem>
                    <MenuItem value="chittagong">Chittagong</MenuItem>
                    <MenuItem value="sylhet">Sylhet</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Select
                    value={profileData.state}
                    onChange={handleInputChange('state')}
                    displayEmpty
                    renderValue={(value) => value || 'State'}
                    sx={{
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 
                        'rgba(255,255,255,0.05)' : theme.palette.grey[50],
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? 
                          'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main
                      }
                    }}
                  >
                    <MenuItem value="">State</MenuItem>
                    <MenuItem value="dhaka-division">Dhaka Division</MenuItem>
                    <MenuItem value="chittagong-division">Chittagong Division</MenuItem>
                    <MenuItem value="sylhet-division">Sylhet Division</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    py: 2,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                      transform: 'translateY(-1px)',
                      boxShadow: theme.shadows[4]
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  Update Information
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        minHeight: '100vh'
      }}>
        {/* Left Sidebar */}
        <Box sx={{ 
          width: { xs: '100%', md: 320 },
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2
        }}>
          {/* Profile Completion Card */}
          <Card sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: theme.palette.primary.contrastText,
            borderRadius: 3,
            boxShadow: theme.shadows[8]
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                textAlign: { xs: 'center', sm: 'left' },
                gap: 2
              }}>
                <CircularProgress value={64} />
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 0.5,
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    Complete profile
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      opacity: 0.9, 
                      fontSize: '0.75rem',
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    Complete your profile to unlock all features
                  </Typography>
                </Box>
              </Box>
              <Button 
                fullWidth 
                variant="contained"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: theme.palette.primary.contrastText,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)'
                  }
                }}
              >
                Verify Identity
              </Button>
            </CardContent>
          </Card>

          {/* Navigation Menu */}
          <Card sx={{ 
            borderRadius: 3, 
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[2]
          }}>
            <List sx={{ p: 0 }}>
              {sidebarItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem 
                    button 
                    onClick={() => setActiveSection(item.id)}
                    sx={{ 
                      py: 2.5,
                      px: 3,
                      bgcolor: activeSection === item.id ? 
                        theme.palette.action.selected : 'transparent',
                      borderLeft: activeSection === item.id ? 
                        `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                      '&:hover': {
                        bgcolor: theme.palette.action.hover
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <item.icon sx={{ 
                        color: activeSection === item.id ? 
                          theme.palette.primary.main : theme.palette.text.secondary,
                        fontSize: 20
                      }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontWeight: 600,
                            color: activeSection === item.id ? 
                              theme.palette.primary.main : theme.palette.text.primary,
                            fontSize: { xs: '0.875rem', sm: '0.875rem' }
                          }}
                        >
                          {item.label}
                        </Typography>
                      }
                      secondary={
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: theme.palette.text.secondary,
                            fontSize: '0.75rem',
                            display: { xs: 'none', sm: 'block' }
                          }}
                        >
                          {item.sublabel}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < sidebarItems.length - 1 && (
                    <Divider sx={{ mx: 3 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ 
            borderRadius: 3, 
            bgcolor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            height: 'fit-content'
          }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              {renderMainContent()}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Settings;