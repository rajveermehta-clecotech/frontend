// src/components/profileCompletion/BusinessInformation.jsx
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { 
  Business as BusinessIcon,
  CloudUpload as UploadIcon 
} from "@mui/icons-material";

const BusinessInformation = ({
  formData,
  handleChange,
  errors,
  filePreview,
  handleFileChange,
}) => {
  return (
    <Box>
      {/* Step Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <BusinessIcon sx={{ color: "#4A90E2", mr: 2, fontSize: 24 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1A202C",
              fontSize: "1.5rem",
            }}
          >
            Step 2: Business Info
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "#718096",
            fontSize: "1rem",
          }}
        >
          Enter your business details
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* Business Name and Phone - Side by side */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#2D3748",
                mb: 1,
                fontSize: "0.9rem",
              }}
            >
              Business Name *
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your business name"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              error={!!errors.businessName}
              helperText={errors.businessName}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E2E8F0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CBD5E0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4A90E2",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#2D3748",
                mb: 1,
                fontSize: "0.9rem",
              }}
            >
              Business Phone *
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your business phone"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              error={!!errors.businessPhone}
              helperText={errors.businessPhone}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E2E8F0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CBD5E0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4A90E2",
                  },
                },
              }}
            />
          </Grid>

          {/* Business Address - Full width */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#2D3748",
                mb: 1,
                fontSize: "0.9rem",
              }}
            >
              Business Address *
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Enter your complete business address"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              error={!!errors.businessAddress}
              helperText={errors.businessAddress}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E2E8F0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CBD5E0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4A90E2",
                  },
                },
              }}
            />
          </Grid>

          {/* Business Website - Full width */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#2D3748",
                mb: 1,
                fontSize: "0.9rem",
              }}
            >
              Business Website{" "}
              <Typography
                component="span"
                sx={{ color: "#718096", fontWeight: 400 }}
              >
                (Optional)
              </Typography>
            </Typography>
            <TextField
              fullWidth
              placeholder="https://your-website.com"
              name="businessWebsite"
              value={formData.businessWebsite}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E2E8F0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CBD5E0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4A90E2",
                  },
                },
              }}
            />
          </Grid>

          {/* Business Description - Full width */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#2D3748",
                mb: 1,
                fontSize: "0.9rem",
              }}
            >
              Business Description
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Tell us about your business..."
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E2E8F0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#CBD5E0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4A90E2",
                  },
                },
              }}
            />
          </Grid>

          {/* Business Logo Upload - Full width */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#2D3748",
                mb: 2,
                fontSize: "0.9rem",
              }}
            >
              Business Logo
            </Typography>
            
            <Box
              sx={{
                border: "2px dashed #CBD5E0",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                backgroundColor: "#F7FAFC",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#4A90E2",
                  backgroundColor: "#EBF8FF",
                },
              }}
              component="label"
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleFileChange("businessLogo", e.target.files[0]);
                  }
                }}
              />
              
              <UploadIcon 
                sx={{ 
                  fontSize: 48, 
                  color: "#4A90E2", 
                  mb: 2 
                }} 
              />
              
              <Typography
                variant="body1"
                sx={{
                  color: "#4A90E2",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Click to upload your business logo
              </Typography>
              
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#4A90E2",
                  color: "#4A90E2",
                  fontWeight: 500,
                  px: 3,
                  py: 1,
                  "&:hover": {
                    borderColor: "#3182CE",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Choose File
              </Button>
              
              {filePreview.businessLogo && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={filePreview.businessLogo}
                    alt="Business Logo Preview"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "100px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BusinessInformation;