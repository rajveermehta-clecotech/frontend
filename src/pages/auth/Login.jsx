import React, { useState } from 'react';
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/common';
import PublicThemeWrapper from '../../components/layout/PublicThemeWrapper';

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { login, loginWithGoogle, isAuthenticated, loading, user } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    if (user?.role === 'vendor' && user?.vendorProfile?.profileCompletion < 100) {
      return <Navigate to="/profile-completion" />;
    }
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    setLoginError(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError(null);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        if (user?.role === 'vendor' && user?.vendorProfile?.profileCompletion < 100) {
          navigate('/profile-completion');
        } else {
          navigate('/dashboard');
        }
      } else {
        setLoginError(result.error || 'Invalid email or password');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setLoginError(null);
    try {
      console.log('Google sign-in clicked');
    } catch (error) {
      setLoginError('Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <PublicThemeWrapper>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          bgcolor: 'var(--mui-palette-background-default)',
          color: 'var(--mui-palette-text-primary)',
        }}
      >
        {/* Left Panel - Branding */}
        {!isMobile && (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              px: 6,
              py: 8,
              bgcolor: 'var(--mui-palette-background-paper)',
              borderRight: '1px solid var(--mui-palette-divider)',
            }}
          >
            <Box sx={{ maxWidth: 400 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: 'var(--mui-palette-text-primary)',
                  mb: 2,
                  fontSize: '2rem',
                }}
              >
                Multi-Vendor Marketplace
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--mui-palette-text-secondary)',
                  mb: 4,
                  fontSize: '1rem',
                  lineHeight: 1.5,
                }}
              >
                Connect with verified vendors and buyers in our trusted B2B platform
              </Typography>

              {/* Features List */}
              <Box sx={{ space: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#10B981',
                      mt: 0.75,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'var(--mui-palette-text-primary)',
                        mb: 0.5,
                        fontSize: '1rem',
                      }}
                    >
                      Verified Vendors
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'var(--mui-palette-text-secondary)',
                        fontSize: '0.875rem',
                      }}
                    >
                      All vendors go through our strict verification process
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#3B82F6',
                      mt: 0.75,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'var(--mui-palette-text-primary)',
                        mb: 0.5,
                        fontSize: '1rem',
                      }}
                    >
                      Secure Transactions
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'var(--mui-palette-text-secondary)',
                        fontSize: '0.875rem',
                      }}
                    >
                      Protected communication and secure payment processing
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#8B5CF6',
                      mt: 0.75,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'var(--mui-palette-text-primary)',
                        mb: 0.5,
                        fontSize: '1rem',
                      }}
                    >
                      Global Reach
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'var(--mui-palette-text-secondary)',
                        fontSize: '0.875rem',
                      }}
                    >
                      Connect with suppliers and buyers worldwide
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Right Panel - Login Form */}
        <Box
          sx={{
            flex: isMobile ? 1 : '0 0 55%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: isMobile ? 3 : { lg: 6, xl: 8 },
            py: 6,
            bgcolor: 'var(--mui-palette-background-paper)',
          }}
        >
          <Box sx={{ maxWidth: 420, width: '100%', mx: 'auto' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'var(--mui-palette-text-primary)',
                mb: 1,
                textAlign: 'center',
                fontSize: { xs: '1.5rem', lg: '1.75rem' },
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'var(--mui-palette-text-secondary)',
                mb: 3,
                textAlign: 'center',
                fontSize: '0.875rem',
              }}
            >
              Sign in to your vendor account
            </Typography>

            {/* Error Alert */}
            {loginError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {loginError}
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--mui-palette-text-primary)',
                  mb: 1,
                  fontWeight: 500,
                  fontSize: '0.875rem',
                }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    bgcolor: 'var(--mui-palette-background-paper)',
                    '& fieldset': {
                      borderColor: 'var(--mui-palette-divider)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--mui-palette-primary-main)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--mui-palette-primary-main)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--mui-palette-text-primary)',
                  },
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  color: 'var(--mui-palette-text-primary)',
                  mb: 1,
                  fontWeight: 500,
                  fontSize: '0.875rem',
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        // sx={{ color: 'var(--mui-palette-text-secondary)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    bgcolor: 'var(--mui-palette-background-paper)',
                    '& fieldset': {
                      borderColor: 'var(--mui-palette-divider)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--mui-palette-primary-main)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--mui-palette-primary-main)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--mui-palette-text-primary)',
                  },
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading || googleLoading}
                sx={{
                  py: 1.5,
                  mb: 2,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  bgcolor: 'var(--mui-palette-primary-main)',
                  color: '#ffffff',
                  '&:hover': {
                    bgcolor: 'var(--mui-palette-primary-dark)',
                  },
                  '&:disabled': {
                    bgcolor: 'var(--mui-palette-action-disabled)',
                    color: 'var(--mui-palette-text-disabled)',
                  },
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Divider sx={{ flex: 1, borderColor: 'var(--mui-palette-divider)' }} />
                <Typography
                  variant="caption"
                  sx={{
                    px: 2,
                    color: 'var(--mui-palette-text-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  OR CONTINUE WITH
                </Typography>
                <Divider sx={{ flex: 1, borderColor: 'var(--mui-palette-divider)' }} />
              </Box>

              {/* Google Sign-in Button */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                disabled={googleLoading || isLoading}
                sx={{
                  mb: 3,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderColor: 'var(--mui-palette-divider)',
                  color: 'var(--mui-palette-text-primary)',
                  '&:hover': {
                    borderColor: 'var(--mui-palette-primary-main)',
                    bgcolor: 'var(--mui-palette-action-hover)',
                  },
                }}
              >
                {googleLoading ? 'Signing in...' : 'Continue with Google'}
              </Button>

              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  color: 'var(--mui-palette-text-secondary)',
                  fontSize: '0.875rem',
                }}
              >
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    color: 'var(--mui-palette-primary-main)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </PublicThemeWrapper>
  );
};

export default Login;