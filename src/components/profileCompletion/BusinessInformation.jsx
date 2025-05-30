// src/components/profileCompletion/BusinessInformation.jsx
import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import {
  Business as BusinessIcon,
  CheckCircle as CheckIcon,
  AccessTime as AccessTimeIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";

const BusinessInformation = ({
  formData,
  handleChange,
  errors,
  handleFileChange, // This should handle the business logo upload
}) => {
  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpg,image/jpeg';
    input.onchange = (e) => {
      if (e.target.files[0]) {
        // Use the handleFileChange prop passed from parent
        handleFileChange('businessLogo', e.target.files[0]);
      }
    };
    input.click();
  };

  const isUploaded = formData.businessLogo !== null;
  
  return (
    <Box>
      {/* Step Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <BusinessIcon sx={{ color: "primary.main", mr: 2, fontSize: 24 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: "1.5rem" }}>
            Step 2: Business Info
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Enter your business details
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box sx={{ mb: 4 }}>
        {/* Business Name */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Business Name"
            fullWidth
            placeholder="Enter your business name"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            error={!!errors.businessName}
            helperText={errors.businessName}
          />
        </Box>

        {/* Business Address 1 */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Business Address 1"
            fullWidth
            placeholder="Enter business address line 1"
            name="businessAddress1"
            value={formData.businessAddress1}
            onChange={handleChange}
            error={!!errors.businessAddress1}
            helperText={errors.businessAddress1}
          />
        </Box>

        {/* Business Address 2 */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Business Address 2"
            fullWidth
            placeholder="Enter business address line 2"
            name="businessAddress2"
            value={formData.businessAddress2}
            onChange={handleChange}
            error={!!errors.businessAddress2}
            helperText={errors.businessAddress2}
          />
        </Box>

        {/* City / Postal / State */}
        <Box display="flex" gap={2} sx={{ mb: 3 }}>
          <TextField
            label="City"
            name="city"
            fullWidth
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />
          <TextField
            label="Postal Code"
            name="postalCode"
            fullWidth
            value={formData.postalCode}
            onChange={handleChange}
            error={!!errors.postalCode}
            helperText={errors.postalCode}
          />
          <TextField
            label="State"
            name="state"
            fullWidth
            value={formData.state}
            onChange={handleChange}
            error={!!errors.state}
            helperText={errors.state}
          />
        </Box>

        {/* Business Phone */}
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Business Phone"
            fullWidth
            placeholder="Enter your business phone"
            name="businessPhone"
            value={formData.businessPhone}
            onChange={handleChange}
            error={!!errors.businessPhone}
            helperText={errors.businessPhone}
          />
        </Box>

        {/* Business Logo Upload */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, color: "var(--mui-palette-text-primary)" }}>
            Business Logo (Optional)
          </Typography>
          
          <Box
            sx={{
              border: "1px solid var(--mui-palette-divider)",
              borderRadius: 2,
              bgcolor: "var(--mui-palette-background-paper)",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              },
              px: 3,
              py: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ mr: 2 }}>
                  {isUploaded ? (
                    <CheckIcon sx={{ color: "#48BB78", fontSize: 24 }} />
                  ) : (
                    <AccessTimeIcon sx={{ color: "var(--mui-palette-text-disabled)", fontSize: 24 }} />
                  )}
                </Box>
                
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color: "var(--mui-palette-text-primary)",
                      fontSize: "1rem",
                    }}
                  >
                    Business Logo
                  </Typography>
                  {formData.businessLogo && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--mui-palette-text-secondary)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {formData.businessLogo.name}
                    </Typography>
                  )}
                </Box>
              </Box>
              
              <Button
                variant="outlined"
                size="small"
                startIcon={<UploadIcon />}
                onClick={handleFileUpload}
                disabled={isUploaded}
                sx={{
                  borderColor: isUploaded ? "#48BB78" : "var(--mui-palette-primary-main)",
                  color: isUploaded ? "#48BB78" : "var(--mui-palette-primary-main)",
                  fontWeight: 500,
                  px: 2,
                  py: 0.5,
                  "&:hover": {
                    borderColor: isUploaded ? "#38A169" : "var(--mui-palette-primary-dark)",
                    backgroundColor: "var(--mui-palette-action-hover)",
                  },
                  "&.Mui-disabled": {
                    borderColor: "#48BB78",
                    color: "#48BB78",
                  },
                }}
              >
                {isUploaded ? "Uploaded" : "Upload"}
              </Button>
            </Box>
          </Box>
          
          {/* Validation Messages */}
          {errors.businessLogo && (
            <Typography 
              variant="caption" 
              color="error.main" 
              sx={{ mt: 1, display: "block", ml: 2 }}
            >
              {errors.businessLogo}
            </Typography>
          )}
          
          {isUploaded && (
            <Typography 
              variant="caption" 
              color="success.main" 
              sx={{ mt: 1, display: "block", ml: 2 }}
            >
              ✓ Business logo uploaded successfully
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessInformation;