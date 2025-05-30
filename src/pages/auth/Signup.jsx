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
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  useMediaQuery,
  useTheme,
  Card,
  Container,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  VerifiedUser,
  Security,
  TrendingUp,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail, validatePassword } from '../../utils/common';
import PublicThemeWrapper from '../../components/layout/PublicThemeWrapper';

const Signup = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const { signup, loginWithGoogle, isAuthenticated, user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'vendor',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState(null);
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
    setSignupError(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors.join(', ');
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSignupError(null);

    try {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const result = await signup(userData);
      if (result.success) {
        if (formData.role === 'vendor') {
          navigate('/profile-completion');
        } else {
          navigate('/dashboard');
        }
      } else {
        setSignupError(result.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setSignupError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setSignupError(null);
    try {
      console.log('Google sign-in clicked');
    } catch (error) {
      setSignupError('Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <PublicThemeWrapper>
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: `
            linear-gradient(135deg, 
              rgba(59, 130, 246, 0.1) 0%, 
              rgba(139, 92, 246, 0.1) 50%, 
              rgba(16, 185, 129, 0.1) 100%
            ),
            var(--mui-palette-background-paper)
          `,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          },
        }}
      >
        {/* Floating Geometric Shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '15%',
            width: { xs: 80, md: 120 },
            height: { xs: 80, md: 120 },
            background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-20px) rotate(180deg)' },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: { xs: 60, md: 80 },
            height: { xs: 60, md: 80 },
            background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))',
            borderRadius: '50%',
            animation: 'pulse 4s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)', opacity: 0.7 },
              '50%': { transform: 'scale(1.1)', opacity: 1 },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '5%',
            width: { xs: 40, md: 60 },
            height: { xs: 40, md: 60 },
            background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.1))',
            borderRadius: '20% 80% 80% 20% / 20% 20% 80% 80%',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, height: '100vh' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              py: 4,
              gap: { lg: 2, xl: 3 },
            }}
          >
            {/* Left Content - Hidden on mobile */}
            {!isMobile && (
              <Box
                sx={{
                  flex: 1,
                  maxWidth: isTablet ? 380 : 450,
                  pr: { lg: 2, xl: 3 },
                }}
              >
                {/* Header with Gradient Text */}
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      fontSize: { lg: '2rem', xl: '2.5rem' },
                      lineHeight: 1.2,
                      mb: 2,
                      background: 'linear-gradient(135deg, var(--mui-palette-primary-main) 0%, #8B5CF6 50%, #10B981 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Multi-Vendor
                    <br />
                    Marketplace
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'var(--mui-palette-text-secondary)',
                      fontSize: { lg: '1rem', xl: '1.1rem' },
                      lineHeight: 1.6,
                      maxWidth: 380,
                    }}
                  >
                    Transform your business with our cutting-edge B2B platform that connects verified vendors and buyers worldwide
                  </Typography>
                </Box>

                {/* Glassmorphism Feature Cards */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {[
                    {
                      icon: <VerifiedUser sx={{ fontSize: { lg: 20, xl: 24 } }} />,
                      title: 'Verified Ecosystem',
                      description: 'AI-powered verification ensures 99% authentic vendor network',
                      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                      iconColor: '#10B981',
                    },
                    {
                      icon: <Security sx={{ fontSize: { lg: 20, xl: 24 } }} />,
                      title: 'Bank-Grade Security',
                      description: 'End-to-end encryption with blockchain transaction logging',
                      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))',
                      iconColor: '#3B82F6',
                    },
                    {
                      icon: <TrendingUp sx={{ fontSize: { lg: 20, xl: 24 } }} />,
                      title: 'Smart Analytics',
                      description: 'Real-time insights and predictive market intelligence',
                      gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))',
                      iconColor: '#8B5CF6',
                    },
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'relative',
                        background: feature.gradient,
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 2.5,
                        p: { lg: 2.5, xl: 3 },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                          background: feature.gradient.replace('0.1)', '0.15)').replace('0.05)', '0.08)'),
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { lg: 40, xl: 48 },
                            height: { lg: 40, xl: 48 },
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${feature.iconColor}20, ${feature.iconColor}10)`,
                            color: feature.iconColor,
                            flexShrink: 0,
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: 'var(--mui-palette-text-primary)',
                              mb: 0.5,
                              fontSize: { lg: '1rem', xl: '1.1rem' },
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'var(--mui-palette-text-secondary)',
                              fontSize: { lg: '0.8rem', xl: '0.9rem' },
                              lineHeight: 1.5,
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Stats Section */}
                <Box
                  sx={{
                    mt: 4,
                    p: { lg: 3, xl: 4 },
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2.5,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {[
                      { number: '50K+', label: 'Active Vendors' },
                      { number: '99.9%', label: 'Uptime' },
                      { number: '$2.5B+', label: 'Processed' },
                    ].map((stat, index) => (
                      <Box key={index} sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 800,
                            fontSize: { lg: '1.25rem', xl: '1.5rem' },
                            color: 'var(--mui-palette-primary-main)',
                            mb: 0.5,
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'var(--mui-palette-text-secondary)',
                            fontSize: '0.65rem',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            {/* Right Panel - Floating Form Card */}
            <Box
              sx={{
                flex: isMobile ? 1 : 'none',
                width: isMobile ? '100%' : { lg: 440, xl: 480 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Card
                elevation={0}
                sx={{
                  width: '100%',
                  maxWidth: 440,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 2,
                  p: { xs: 3, md: 4 },
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'var(--mui-palette-background-paper)',
                    opacity: 0.9,
                    borderRadius: 4,
                    zIndex: -1,
                  },
                }}
              >
                {/* Mobile Header */}
                {isMobile && (
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, var(--mui-palette-primary-main) 0%, #8B5CF6 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                      }}
                    >
                      Multi-Vendor Marketplace
                    </Typography>
                  </Box>
                )}

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'var(--mui-palette-text-primary)',
                    mb: 1,
                    textAlign: 'center',
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                  }}
                >
                  Create Account
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
                  Join our marketplace platform
                </Typography>

                {/* Error Alert */}
                {signupError && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {signupError}
                  </Alert>
                )}

                {/* Signup Form */}
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    sx={{ mb: 2.5 }}
                  />

                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mb: 2.5 }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--mui-palette-text-primary)',
                      mb: 1.5,
                      fontWeight: 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    Account Type
                  </Typography>
                  <FormControl sx={{ mb: 2.5 }}>
                    <RadioGroup
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      row={!isMobile}
                      sx={{ gap: 2 }}
                    >
                      <FormControlLabel
                        value="vendor"
                        control={
                          <Radio 
                            size="small" 
                            sx={{
                              color: 'var(--mui-palette-text-secondary)',
                              '&.Mui-checked': {
                                color: 'var(--mui-palette-primary-main)',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: '0.875rem', color: 'var(--mui-palette-text-primary)' }}>
                            Vendor (Sell products)
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="buyer"
                        control={
                          <Radio 
                            size="small" 
                            sx={{
                              color: 'var(--mui-palette-text-secondary)',
                              '&.Mui-checked': {
                                color: 'var(--mui-palette-primary-main)',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: '0.875rem', color: 'var(--mui-palette-text-primary)' }}>
                            Buyer (Purchase products)
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>

                  <TextField
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Create a password"
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
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2.5 }}
                  />

                  <TextField
                    fullWidth
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            size="small"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading || googleLoading}
                    sx={{
                      py: 1.5,
                      mb: 2.5,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-dark) 100%)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, var(--mui-palette-primary-dark) 0%, var(--mui-palette-primary-main) 100%)',
                        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                  </Button>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                    <Divider sx={{ flex: 1 }} />
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
                    <Divider sx={{ flex: 1 }} />
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleSignIn}
                    disabled={googleLoading || isLoading}
                    sx={{
                      mb: 3,
                      py: 1.5,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      borderRadius: 2,
                      borderColor: 'var(--mui-palette-divider)',
                      '&:hover': {
                        borderColor: 'var(--mui-palette-primary-main)',
                        bgcolor: 'var(--mui-palette-action-hover)',
                      },
                    }}
                  >
                    {googleLoading ? 'Signing up...' : 'Continue with Google'}
                  </Button>

                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: 'center',
                      color: 'var(--mui-palette-text-secondary)',
                      fontSize: '0.875rem',
                    }}
                  >
                    Already have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      sx={{
                        color: 'var(--mui-palette-primary-main)',
                        textDecoration: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
    </PublicThemeWrapper>
  );
};

export default Signup;