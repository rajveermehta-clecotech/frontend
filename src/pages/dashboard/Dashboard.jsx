import React from "react";
import { Box, Typography } from "@mui/material";
import Enquiry from "../../components/ui/Enquiry";
import Stock from "../../components/ui/Stock";
import Statistics from "../../components/ui/Statistics";

// Main Dashboard Component
const Dashboard = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        minHeight: "calc(100vh - 70px)",
        bgcolor: "#fafafa",
      }}
    >
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Good Morning Shyam Sundar 🌅
        </Typography>
      </Box>

      {/* Dashboard Cards with mt */}
      <Box sx={{ mt: 2 }}>
        <Statistics />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Stock />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Enquiry />
      </Box>
    </Box>
  );
};

export default Dashboard;
