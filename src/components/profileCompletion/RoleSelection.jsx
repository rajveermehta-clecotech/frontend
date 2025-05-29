// src/components/profileCompletion/RoleSelection.jsx
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Business as BusinessIcon } from "@mui/icons-material";

const RoleSelection = ({ 
  formData, 
  handleChange, 
  errors 
}) => {
  const vendorTypes = [
    {
      value: "Manufacturer",
      title: "Manufacturer",
      description: "I manufacture products",
    },
    {
      value: "Dealer",
      title: "Dealer", 
      description: "I sell products from manufacturers",
    },
    {
      value: "Broker",
      title: "Broker",
      description: "I connect buyers and sellers",
    }
  ];

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
            Step 1: Vendor Type
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "var(--mui-palette-text-secondary)",
            fontSize: "1rem",
          }}
        >
          Select your business type
        </Typography>
      </Box>

      {/* Vendor Type Selection */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "var(--mui-palette-text-primary)",
            mb: 3,
            fontSize: "1.1rem",
          }}
        >
          Select your vendor type
        </Typography>

        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <RadioGroup 
            name="vendorType" 
            value={formData.vendorType} 
            onChange={handleChange}
            sx={{ gap: 2 }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 3,
              }}
            >
              {vendorTypes.map((type) => (
                <Card
                  key={type.value}
                  sx={{
                    borderRadius: 2,
                    border: "2px solid",
                    borderColor: 
                      formData.vendorType === type.value 
                        ? "var(--mui-palette-primary-main)" 
                        : "var(--mui-palette-divider)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    bgcolor: "var(--mui-palette-background-paper)",
                    "&:hover": {
                      borderColor: "var(--mui-palette-primary-main)",
                      boxShadow: "0 4px 12px rgba(33, 150, 243, 0.15)",
                    },
                    height: "100%",
                  }}
                  onClick={() => {
                    handleChange({
                      target: { name: "vendorType", value: type.value }
                    });
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <FormControlLabel
                      value={type.value}
                      control={
                        <Radio
                          sx={{
                            color: "var(--mui-palette-divider)",
                            "&.Mui-checked": {
                              color: "var(--mui-palette-primary-main)",
                            },
                            mb: 2,
                          }}
                        />
                      }
                      label=""
                      sx={{ 
                        m: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                      }}
                    />
                    
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "var(--mui-palette-text-primary)",
                        mb: 1,
                        fontSize: "1.1rem",
                      }}
                    >
                      {type.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--mui-palette-text-secondary)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {type.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </RadioGroup>
        </FormControl>

        {errors.vendorType && (
          <Typography 
            variant="body2" 
            sx={{ color: "error.main", mt: 1 }}
          >
            {errors.vendorType}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RoleSelection;