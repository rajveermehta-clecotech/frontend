// src/components/profileCompletion/BusinessInformation.jsx
import {
  Box,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { 
  Business as BusinessIcon,
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
          <BusinessIcon sx={{ color: "var(--mui-palette-primary-main)", mr: 2, fontSize: 24 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "var(--mui-palette-text-primary)",
              fontSize: "1.5rem",
            }}
          >
            Step 2: Business Info
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "var(--mui-palette-text-secondary)",
            fontSize: "1rem",
          }}
        >
          Enter your business details
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            {/* Business Name */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "var(--mui-palette-text-primary)",
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
                    bgcolor: "var(--mui-palette-background-paper)",
                    "& fieldset": {
                      borderColor: "var(--mui-palette-divider)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--mui-palette-primary-main)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--mui-palette-primary-main)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--mui-palette-text-primary)",
                  },
                }}
              />
            </Box>

            {/* Business Address */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "var(--mui-palette-text-primary)",
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
                    bgcolor: "var(--mui-palette-background-paper)",
                    "& fieldset": {
                      borderColor: "var(--mui-palette-divider)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--mui-palette-primary-main)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--mui-palette-primary-main)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--mui-palette-text-primary)",
                  },
                }}
              />
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            {/* Business Phone */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "var(--mui-palette-text-primary)",
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
                    bgcolor: "var(--mui-palette-background-paper)",
                    "& fieldset": {
                      borderColor: "var(--mui-palette-divider)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--mui-palette-primary-main)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--mui-palette-primary-main)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--mui-palette-text-primary)",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BusinessInformation;