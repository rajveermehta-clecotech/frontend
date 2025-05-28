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
import { useAuth } from "../../context/AuthContext";
import NotificationAlert from "../../components/ui/NotificationAlert";
import LoadingIndicator from "../../components/ui/LoadingIndicator";
import api from "../../services/api/authApi";

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

  // State for active step
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [stepSaveSuccess, setStepSaveSuccess] = useState({
    0: false,
    1: false,
    2: false
  });

  // Form data state
  const [formData, setFormData] = useState({
    vendorType: "Dealer",
    businessName: "",
    businessPhone: "",
    businessAddress: "",
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
          !!formData.businessPhone &&
          !!formData.businessAddress &&
          !errors.businessName &&
          !errors.businessPhone &&
          !errors.businessAddress
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

  // Handle file upload
  const handleFileChange = (name, file) => {
    if (name === 'businessLogo') {
      setFormData({
        ...formData,
        businessLogo: file,
      });
    } else {
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [name]: file,
        }
      });
    }

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
    }
  };

  // Handle next step button click
  const handleNext = async () => {
    if (isStepComplete(activeStep)) {
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
      setError(null);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setSuccess(true);
        
        // Wait briefly to show success message, then redirect
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } catch (error) {
        console.error("Error completing profile:", error);
        setError("Profile completion failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Initialize component
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading state while initially fetching data
  if (initialLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F8FAFC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingIndicator text="Loading your profile..." />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
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
              color: "#1A202C",
              mb: 1,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Welcome to MarketPlace
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#718096",
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
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            p: { xs: 3, sm: 4 },
            mb: 4,
            position: "relative",
          }}
        >
          {loading && (
            <LoadingIndicator overlay text="Completing your profile..." />
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
                filePreview={filePreview}
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
                borderTop: "1px solid #E2E8F0",
              }}
            >
              <Button
                variant="text"
                onClick={handleBack}
                startIcon={<ArrowBack />}
                disabled={activeStep === 0}
                sx={{
                  color: activeStep === 0 ? "#A0AEC0" : "#4A5568",
                  fontWeight: 500,
                  px: 3,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.04)",
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
                    bgcolor: "#4A5568",
                    color: "white",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 1,
                    "&:hover": {
                      bgcolor: "#2D3748",
                    },
                    "&:disabled": {
                      bgcolor: "#E2E8F0",
                      color: "#A0AEC0",
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
                    bgcolor: "#4A5568",
                    color: "white",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 1,
                    "&:hover": {
                      bgcolor: "#2D3748",
                    },
                    "&:disabled": {
                      bgcolor: "#E2E8F0",
                      color: "#A0AEC0",
                    },
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Box>

        {/* Success/Error Messages */}
        {success && (
          <NotificationAlert
            type="success"
            title="Profile Completed"
            message="Your vendor profile has been successfully set up. Redirecting to dashboard..."
            showActionButton={false}
          />
        )}
        
        {error && (
          <NotificationAlert
            type="error"
            title="Error"
            message={error}
            showActionButton={false}
          />
        )}
      </Container>
    </Box>
  );
};

export default ProfileCompletion;