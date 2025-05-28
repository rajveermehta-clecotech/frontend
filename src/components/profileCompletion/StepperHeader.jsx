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
                    ? "#4A90E2" 
                    : index === activeStep 
                    ? "#4A90E2" 
                    : "#E2E8F0",
                color: 
                  index < activeStep 
                    ? "white" 
                    : index === activeStep 
                    ? "white" 
                    : "#A0AEC0",
                fontWeight: 600,
                fontSize: "1rem",
                position: "relative",
                zIndex: 2,
              }}
            >
              {index < activeStep ? (
                <CheckCircle sx={{ fontSize: 24 }} />
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
                  bgcolor: "#E2E8F0",
                  position: "relative",
                  mx: 2,
                }}
              >
                <Box
                  sx={{
                    width: index < activeStep ? "100%" : "0%",
                    height: "100%",
                    bgcolor: "#4A90E2",
                    transition: "width 0.3s ease",
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
            bgcolor: "#E2E8F0",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${calculateProgress()}%`,
              height: "100%",
              bgcolor: "#4A90E2",
              transition: "width 0.3s ease",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StepperHeader;