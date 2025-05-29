// src/components/profileCompletion/StepperHeader.jsx
import { Box, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const StepperHeader = ({ 
  activeStep, 
  isStepComplete, 
  calculateProgress 
}) => {
  const steps = [
    { number: 1, label: "1" },
    { number: 2, label: "2" },
    { number: 3, label: "3" }
  ];

  return (
    <Box sx={{ mb: 6 }}>
      {/* Progress Indicator */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          position: "relative",
        }}
      >
        {steps.map((step, index) => (
          <Box key={step.number} sx={{ display: "flex", alignItems: "center" }}>
            {/* Step Circle */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: 
                  index < activeStep 
                    ? "var(--mui-palette-primary-main)" 
                    : index === activeStep 
                    ? "var(--mui-palette-primary-main)" 
                    : "var(--mui-palette-action-disabled)",
                color: 
                  index < activeStep 
                    ? "white" 
                    : index === activeStep 
                    ? "white" 
                    : "var(--mui-palette-text-disabled)",
                fontWeight: 600,
                fontSize: "1rem",
                position: "relative",
                zIndex: 2,
                border: index <= activeStep ? "none" : "2px solid var(--mui-palette-divider)",
              }}
            >
              {index < activeStep ? (
                <CheckCircle sx={{ fontSize: 24, color: "white" }} />
              ) : (
                step.label
              )}
            </Box>

            {/* Progress Line */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  width: { xs: 80, sm: 120, md: 160 },
                  height: 4,
                  bgcolor: "var(--mui-palette-action-disabled)",
                  position: "relative",
                  mx: 2,
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    width: index < activeStep ? "100%" : "0%",
                    height: "100%",
                    bgcolor: "var(--mui-palette-primary-main)",
                    transition: "width 0.3s ease",
                    borderRadius: 2,
                  }}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Overall Progress Bar */}
      <Box sx={{ width: "100%", mb: 2 }}>
        <Box
          sx={{
            width: "100%",
            height: 8,
            bgcolor: "var(--mui-palette-action-disabled)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${calculateProgress()}%`,
              height: "100%",
              bgcolor: "var(--mui-palette-primary-main)",
              transition: "width 0.3s ease",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StepperHeader;