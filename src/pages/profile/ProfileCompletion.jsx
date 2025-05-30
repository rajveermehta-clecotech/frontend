// src/pages/profile/ProfileCompletion.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../context/AuthContext";
import LoadingIndicator from "../../components/ui/LoadingIndicator";
import api from "../../services/api/authApi";
import PublicThemeWrapper from "../../components/layout/PublicThemeWrapper";

// Import updated sub-components
import StepperHeader from "../../components/profileCompletion/StepperHeader";
import RoleSelection from "../../components/profileCompletion/RoleSelection";
import BusinessInformation from "../../components/profileCompletion/BusinessInformation";
import DocumentUpload from "../../components/profileCompletion/DocumentUpload";

const ProfileCompletion = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    showError,
    showSuccess,
    showFileUploadSuccess,
    showFileUploadError,
    showStepComplete,
    showWelcome,
    showProfileComplete
  } = useToast();

  // State for active step
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [stepSaveSuccess, setStepSaveSuccess] = useState({
    0: false,
    1: false,
    2: false
  });

  // Form data state - Updated to match BusinessInformation component
  const [formData, setFormData] = useState({
    vendorType: "Dealer",
    businessName: "",
    businessAddress1: "",
    businessAddress2: "",
    city: "",
    postalCode: "",
    state: "",
    businessPhone: "",
    businessWebsite: "",
    businessDescription: "",
    businessLogo: null,
    documents: {
      businessRegistration: null,
      taxId: null,
      tradeLicense: null,
      gstRegistration: null,
      bankStatement: null,
    }
  });

  // Form errors state
  const [errors, setErrors] = useState({});

  // File preview state
  const [filePreview, setFilePreview] = useState({
    businessLogo: null,
    businessRegistration: null,
    taxId: null,
    tradeLicense: null,
    gstRegistration: null,
    bankStatement: null,
  });

  // Step completion status
  const isStepComplete = (step) => {
    if (stepSaveSuccess[step]) {
      return true;
    }
    
    switch (step) {
      case 0: // Vendor Type
        return !!formData.vendorType;
      case 1: // Business Information
        return (
          !!formData.businessName &&
          !!formData.businessAddress1 &&
          !!formData.city &&
          !!formData.postalCode &&
          !!formData.state &&
          !!formData.businessPhone &&
          !errors.businessName &&
          !errors.businessAddress1 &&
          !errors.city &&
          !errors.postalCode &&
          !errors.state &&
          !errors.businessPhone
        );
      case 2: // Documents
        const uploadedDocs = Object.values(formData.documents).filter(doc => doc !== null);
        return uploadedDocs.length >= 2;
      default:
        return false;
    }
  };

  // Calculate overall progress
  const calculateProgress = () => {
    let progress = 0;
    if (isStepComplete(0)) progress += 33;
    if (isStepComplete(1)) progress += 33;
    if (isStepComplete(2)) progress += 34;
    return progress;
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation errors when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate business logo file
  const validateBusinessLogo = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!allowedTypes.includes(file.type)) {
      return "Please upload a PNG, JPG, or JPEG image file.";
    }

    if (file.size > maxSize) {
      return "File size must be less than 5MB.";
    }

    return null;
  };

  // Handle file uploads - FIXED VERSION
  const handleFileChange = (name, file) => {
    if (name === 'businessLogo') {
      // Handle business logo upload
      if (file) {
        // Clear previous errors
        if (errors.businessLogo) {
          setErrors({
            ...errors,
            businessLogo: "",
          });
        }

        // Validate file
        const validationError = validateBusinessLogo(file);
        if (validationError) {
          setErrors({
            ...errors,
            businessLogo: validationError,
          });
          showFileUploadError(validationError);
          return;
        }

        // Update form data with the file
        setFormData({
          ...formData,
          businessLogo: file,
        });

        // Create file preview
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview({
            ...filePreview,
            businessLogo: reader.result,
          });
        };
        reader.readAsDataURL(file);
        
        // Show success toast
        showFileUploadSuccess('Business logo');
      }
    } else {
      // Handle document uploads
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [name]: file,
        }
      });

      // Create file preview
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview({
            ...filePreview,
            [name]: reader.result,
          });
        };
        reader.readAsDataURL(file);
        
        // Show success toast
        const formattedName = name.replace(/([A-Z])/g, ' $1').toLowerCase();
        showFileUploadSuccess(formattedName);
      }
    }
  };

  // Handle next step button click
  const handleNext = async () => {
    if (isStepComplete(activeStep)) {
      // Show step completion toast
      const stepNames = ['Vendor Type', 'Business Information', 'Document Upload'];
      showStepComplete(stepNames[activeStep]);
      
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  // Handle back button click
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isStepComplete(2)) {
      setLoading(true);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success toast
        showProfileComplete();
        
        // Wait briefly to show success message, then redirect
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } catch (error) {
        console.error("Error completing profile:", error);
        showError("Profile completion failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Initialize component
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
      // Welcome toast - only show once on component mount
      showWelcome('Welcome! Let\'s complete your vendor profile.');
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to ensure it only runs once

  // Show loading state while initially fetching data
  if (initialLoading) {
    return (
      <PublicThemeWrapper>
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "var(--mui-palette-background-default)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoadingIndicator 
            text="Loading your profile..." 
            size="large"
          />
        </Box>
      </PublicThemeWrapper>
    );
  }

  return (
    <PublicThemeWrapper>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "var(--mui-palette-background-default)",
          py: 4,
        }}
      >
        <Container maxWidth="md">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "var(--mui-palette-text-primary)",
                mb: 1,
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              Welcome to MarketPlace
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "var(--mui-palette-text-secondary)",
                fontSize: "1rem",
              }}
            >
              Complete your vendor profile to start selling
            </Typography>
          </Box>

          {/* Stepper Header */}
          <StepperHeader
            activeStep={activeStep}
            isStepComplete={isStepComplete}
            calculateProgress={calculateProgress}
          />

          {/* Main Form Content */}
          <Box
            sx={{
              bgcolor: "var(--mui-palette-background-paper)",
              borderRadius: 2,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              border: "1px solid var(--mui-palette-divider)",
              p: { xs: 3, sm: 4 },
              mb: 4,
              position: "relative",
            }}
          >
            {loading && (
              <LoadingIndicator 
                overlay 
                text="Completing your profile..." 
                size="medium"
              />
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Role Selection */}
              {activeStep === 0 && (
                <RoleSelection
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              )}

              {/* Step 2: Business Information */}
              {activeStep === 1 && (
                <BusinessInformation
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                  handleFileChange={handleFileChange}
                />
              )}

              {/* Step 3: Document Upload */}
              {activeStep === 2 && (
                <DocumentUpload
                  formData={formData}
                  handleFileChange={handleFileChange}
                  filePreview={filePreview}
                />
              )}

              {/* Navigation buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 6,
                  pt: 4,
                  borderTop: "1px solid var(--mui-palette-divider)",
                }}
              >
                <Button
                  variant="text"
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  disabled={activeStep === 0}
                  sx={{
                    color: activeStep === 0 ? "var(--mui-palette-text-disabled)" : "var(--mui-palette-text-secondary)",
                    fontWeight: 500,
                    px: 3,
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "var(--mui-palette-action-hover)",
                    },
                  }}
                >
                  Previous
                </Button>

                {activeStep === 2 ? (
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading || !isStepComplete(activeStep)}
                    sx={{
                      bgcolor: "var(--mui-palette-primary-main)",
                      color: "white",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 1,
                      "&:hover": {
                        bgcolor: "var(--mui-palette-primary-dark)",
                      },
                      "&:disabled": {
                        bgcolor: "var(--mui-palette-action-disabled)",
                        color: "var(--mui-palette-text-disabled)",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    ) : (
                      "Complete Setup"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                    disabled={!isStepComplete(activeStep)}
                    sx={{
                      bgcolor: "var(--mui-palette-primary-main)",
                      color: "white",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 1,
                      "&:hover": {
                        bgcolor: "var(--mui-palette-primary-dark)",
                      },
                      "&:disabled": {
                        bgcolor: "var(--mui-palette-action-disabled)",
                        color: "var(--mui-palette-text-disabled)",
                      },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
    </PublicThemeWrapper>
  );
};

export default ProfileCompletion;