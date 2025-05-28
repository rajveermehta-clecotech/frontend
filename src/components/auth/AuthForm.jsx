import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Email,
  Person,
  Lock,
  CheckCircle,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

// Firebase imports
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";

const AuthForm = ({
  type = "login", // 'login' or 'signup'
  onSubmit,
  loading = false,
  error = null,
  showSocialLogin = true,
  customFields = [],
}) => {
  const { clearError, loginWithGoogle } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [googleLoading, setGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "vendor", // Default to vendor
    ...customFields.reduce((acc, field) => {
      acc[field.name] = field.initialValue || "";
      return acc;
    }, {}),
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setErrors({});
      
      googleProvider.setCustomParameters({
        prompt: 'select_account',
        access_type: 'offline'
      });
      
      if (auth.currentUser) {
        await auth.signOut();
      }
      
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken(true);
      const role = type === "signup" ? formData.role || "buyer" : "buyer"; 
      
      const authResponse = await loginWithGoogle(idToken, role);
      
      if (!authResponse.success) {
        setErrors({
          ...errors,
          google: authResponse.error || "Google authentication failed"
        });
      }
    } catch (error) {
      setErrors({
        ...errors,
        google: "Google sign-in failed: " + (error.message || "Unknown error")
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  // Form validation
  const validate = () => {
    const newErrors = {};

    if (type === "signup") {
      if (!formData.name) {
        newErrors.name = "Full name is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#E8E6F7", // Light purple background like in the image
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            bgcolor: "white",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
            minHeight: "600px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Side - Branding */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "#F8F9FF",
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#2D3748",
                mb: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Multi-Vendor Marketplace
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#718096",
                mb: 4,
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              Connect with verified vendors and buyers in our trusted B2B
              platform
            </Typography>

            <Box sx={{ space: 3 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#3B82F6",
                    mt: 1,
                    mr: 2,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#2D3748", mb: 0.5 }}
                  >
                    Verified Vendors
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#718096" }}>
                    All vendors go through our strict verification process
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#10B981",
                    mt: 1,
                    mr: 2,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#2D3748", mb: 0.5 }}
                  >
                    Secure Transactions
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#718096" }}>
                    Protected communication and secure payment processing
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#8B5CF6",
                    mt: 1,
                    mr: 2,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#2D3748", mb: 0.5 }}
                  >
                    Global Reach
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#718096" }}>
                    Connect with suppliers and buyers worldwide
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Side - Form */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: { md: "500px" },
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#2D3748",
                  mb: 1,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                {type === "login" ? "Welcome Back" : "Create Account"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#718096" }}>
                {type === "login"
                  ? "Sign in to your vendor account"
                  : "Join our marketplace platform"}
              </Typography>
            </Box>

            {/* Google Sign In Button */}
            {showSocialLogin && (
              <>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={googleLoading ? <CircularProgress size={20} /> : <GoogleIcon />}
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading || loading}
                  sx={{
                    py: 1.5,
                    mb: 3,
                    borderColor: "#E2E8F0",
                    color: "#4A5568",
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#CBD5E0",
                      bgcolor: "#F7FAFC",
                    },
                  }}
                >
                  Continue with Google
                </Button>

                {errors.google && (
                  <FormHelperText error sx={{ mb: 2, textAlign: "center" }}>
                    {errors.google}
                  </FormHelperText>
                )}

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Divider sx={{ flex: 1 }} />
                  <Typography
                    variant="body2"
                    sx={{ mx: 2, color: "#A0AEC0", fontSize: "0.875rem" }}
                  >
                    OR CONTINUE WITH
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Box>
              </>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {error && (
                <FormHelperText error sx={{ mb: 2, textAlign: "center" }}>
                  {error}
                </FormHelperText>
              )}

              {/* Full Name - only for signup */}
              {type === "signup" && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 500, color: "#4A5568" }}
                  >
                    Full Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#E2E8F0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#CBD5E0",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#5E48E8",
                        },
                      },
                    }}
                  />
                </Box>
              )}

              {/* Email */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, fontWeight: 500, color: "#4A5568" }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#E2E8F0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#CBD5E0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5E48E8",
                      },
                    },
                  }}
                />
              </Box>

              {/* Account Type - only for signup */}
              {type === "signup" && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, fontWeight: 500, color: "#4A5568" }}
                  >
                    Account Type
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="vendor"
                        control={<Radio sx={{ color: "#5E48E8" }} />}
                        label="Vendor (Sell products)"
                        sx={{
                          mb: 1,
                          "& .MuiFormControlLabel-label": {
                            color: "#4A5568",
                            fontWeight: 500,
                          },
                        }}
                      />
                      <FormControlLabel
                        value="buyer"
                        control={<Radio sx={{ color: "#5E48E8" }} />}
                        label="Buyer (Purchase products)"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            color: "#4A5568",
                            fontWeight: 500,
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}

              {/* Password */}
              <Box sx={{ mb: type === "signup" ? 3 : 2 }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, fontWeight: 500, color: "#4A5568" }}
                >
                  Password
                </Typography>
                <TextField
                  fullWidth
                  placeholder={type === "signup" ? "Create a password" : "Enter your password"}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleShowPassword}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#E2E8F0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#CBD5E0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5E48E8",
                      },
                    },
                  }}
                />
              </Box>

              {/* Confirm Password - only for signup */}
              {type === "signup" && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 500, color: "#4A5568" }}
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={toggleShowConfirmPassword}
                            edge="end"
                            size="small"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#E2E8F0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#CBD5E0",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#5E48E8",
                        },
                      },
                    }}
                  />
                </Box>
              )}

              {/* Forgot Password Link - only for login */}
              {type === "login" && (
                <Box sx={{ textAlign: "right", mb: 4 }}>
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    sx={{
                      color: "#5E48E8",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot your password?
                  </Link>
                </Box>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.5,
                  mb: 3,
                  bgcolor: "#2D3748",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  "&:hover": {
                    bgcolor: "#1A202C",
                  },
                  "&:disabled": {
                    bgcolor: "#E2E8F0",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : type === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Switch between login and signup */}
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#718096" }}>
                  {type === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <Link
                    component={RouterLink}
                    to={type === "login" ? "/signup" : "/login"}
                    onClick={clearError}
                    sx={{
                      color: "#5E48E8",
                      textDecoration: "none",
                      fontWeight: 600,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {type === "login" ? "Sign up" : "Sign in"}
                  </Link>
                </Typography>
              </Box>

              {/* Demo Credentials - only for login */}
              {type === "login" && (
                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    bgcolor: "#F7FAFC",
                    borderRadius: 2,
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#4A5568", mb: 1, fontWeight: 600 }}
                  >
                    Demo Credentials:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#718096", mb: 0.5 }}>
                    <strong>Vendor:</strong> vendor@example.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#718096", mb: 0.5 }}>
                    <strong>Buyer:</strong> buyer@example.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#718096" }}>
                    <strong>Password:</strong> any password
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthForm;