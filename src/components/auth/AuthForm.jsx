import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  Paper,
  CircularProgress,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Container,
} from '@mui/material';
import { Visibility, VisibilityOff, Google as GoogleIcon, Email, Person, Lock } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { isValidEmail, validatePassword } from '../../utils/common';

const InputField = ({ label, name, type, value, onChange, error, showPassword, toggleShowPassword, ...props }) => (
  <TextField
    fullWidth
    margin="normal"
    label={label}
    name={name}
    type={showPassword ? 'text' : type}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={error}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          {name === 'email' ? <Email /> : name === 'name' ? <Person /> : <Lock />}
        </InputAdornment>
      ),
      endAdornment: type === 'password' && (
        <InputAdornment position="end">
          <IconButton onClick={toggleShowPassword} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
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
    type="submit"
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

const AuthForm = ({
  type = 'login',
  onSubmit,
  loading = false,
  error = null,
  showSocialLogin = true,
  customFields = [],
}) => {
  const { clearError, loginWithGoogle } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'vendor',
    ...customFields.reduce((acc, field) => ({ ...acc, [field.name]: field.initialValue || '' }), {}),
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setErrors({});
      googleProvider.setCustomParameters({ prompt: 'select_account', access_type: 'offline' });
      if (auth.currentUser) await auth.signOut();
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken(true);
      const role = type === 'signup' ? formData.role : 'buyer';
      const authResponse = await loginWithGoogle(idToken, role);
      if (!authResponse.success) {
        setErrors({ google: authResponse.error || 'Google authentication failed' });
      }
    } catch (error) {
      setErrors({ google: getErrorMessage(error) });
    } finally {
      setGoogleLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (type === 'signup') {
      if (!formData.name) newErrors.name = 'Full name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors.join(', ');
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <Container maxWidth="lg">
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
          <Typography variant="body1">Connect with verified vendors and buyers in our trusted B2B platform</Typography>
          {/* Placeholder for additional branding content */}
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
          <Typography variant="h5">{type === 'login' ? 'Welcome Back' : 'Create Account'}</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            {type === 'login' ? 'Sign in to your vendor account' : 'Join our marketplace platform'}
          </Typography>
          {showSocialLogin && (
            <>
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading}
                sx={{
                  py: 1.5,
                  mb: 2,
                  borderColor: '#E2E8F0',
                  color: '#4A5568',
                  '&:hover': { borderColor: '#CBD5E0', bgcolor: '#F7FAFC' },
                }}
              >
                Continue with Google
              </Button>
              {errors.google && <FormHelperText error>{errors.google}</FormHelperText>}
              <Divider sx={{ my: 2 }}>OR CONTINUE WITH</Divider>
            </>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            {error && <FormHelperText error sx={{ mb: 2 }}>{error}</FormHelperText>}
            {type === 'signup' && (
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
            )}
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {type === 'signup' && (
              <FormControl component="fieldset" sx={{ mt: 2, mb: 1 }}>
                <Typography variant="subtitle2">Account Type</Typography>
                <RadioGroup name="role" value={formData.role} onChange={handleChange}>
                  <FormControlLabel value="vendor" control={<Radio />} label="Vendor (Sell products)" />
                  <FormControlLabel value="buyer" control={<Radio />} label="Buyer (Purchase products)" />
                </RadioGroup>
              </FormControl>
            )}
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            {type === 'signup' && (
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                showPassword={showConfirmPassword}
                toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
            {type === 'login' && (
              <Link component={RouterLink} to="/forgot-password" sx={{ display: 'block', mt: 1, mb: 2 }}>
                Forgot your password?
              </Link>
            )}
            <SubmitButton loading={loading} label={type === 'login' ? 'Sign In' : 'Create Account'} />
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
              {type === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <Link component={RouterLink} to={type === 'login' ? '/signup' : '/login'}>
                {type === 'login' ? 'Sign up' : 'Sign in'}
              </Link>
            </Typography>
            {type === 'login' && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="caption">Demo Credentials:</Typography>
                <Typography variant="caption" display="block">Vendor: vendor@example.com</Typography>
                <Typography variant="caption" display="block">Buyer: buyer@example.com</Typography>
                <Typography variant="caption" display="block">Password: any password</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;