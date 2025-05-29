// src/pages/dashboard/Dashboard.jsx
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
        p: 3,
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

      {/* Dashboard Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Statistics />
        <Stock />
        <Enquiry />
      </Box>
    </Box>
  );
};

export default Dashboard;