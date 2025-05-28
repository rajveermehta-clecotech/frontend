import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Inventory2 as ProductsIcon,
  People as EnquiriesIcon,
  CheckCircle as VerifiedIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircleOutline,
  Warning,
  Cancel,
  Reply as ReplyIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import AppLayout from "../../components/layout/AppLayout";
import LoadingIndicator from "../../components/ui/LoadingIndicator";

// Memoized KPI Card Component
const KPICard = React.memo(({ title, value, growth, icon, color }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e0e0e0",
        height: "100%",
        bgcolor: "white",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          {React.cloneElement(icon, { sx: { color, fontSize: 20, mr: 1 } })}
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#666", 
              fontWeight: 500,
              fontSize: "0.875rem",
              flexGrow: 1
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TrendingUpIcon sx={{ color: "#10B981", fontSize: 14, mr: 0.5 }} />
            <Typography
              variant="caption"
              sx={{ 
                color: "#10B981", 
                fontWeight: 600, 
                fontSize: "0.75rem" 
              }}
            >
              +{growth}%
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1A1A1A",
            mb: 0.5,
            fontSize: "2rem",
          }}
        >
          {value}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: "#999", 
            fontSize: "0.75rem" 
          }}
        >
          {title === "Total Products" ? "Active listings" : 
           title === "Active Enquiries" ? "Pending responses" : 
           "Profile complete"}
        </Typography>
      </CardContent>
    </Card>
  );
});

KPICard.displayName = "KPICard";

// Memoized Stock Overview Card Component
const StockOverviewCard = React.memo(({ title, count, percentage, color, icon }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        {React.cloneElement(icon, { sx: { color, mr: 1, fontSize: 20 } })}
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: "#666" }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{ 
          fontWeight: 700, 
          color: "#1A1A1A", 
          mb: 2, 
          fontSize: "2rem"
        }}
      >
        {count}
      </Typography>
      <Box sx={{ width: "100%", mb: 1 }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: `${color}20`,
            "& .MuiLinearProgress-bar": {
              bgcolor: color,
              borderRadius: 3,
            },
          }}
        />
      </Box>
      <Typography
        variant="caption"
        sx={{ color: "#999", fontSize: "0.75rem" }}
      >
        {percentage}% of total products
      </Typography>
    </Box>
  );
});

StockOverviewCard.displayName = "StockOverviewCard";

// Main Dashboard Component
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(true);

  // Memoized dashboard data
  const dashboardData = useMemo(() => ({
    totalProducts: 3,
    productGrowth: 12,
    activeEnquiries: 2,
    enquiryGrowth: 8,
    profileStatus: "Verified",
    profileCompletion: 100,
    stockOverview: {
      inStock: { count: 1, percentage: 33.3 },
      lowStock: { count: 1, percentage: 33.3 },
      outOfStock: { count: 1, percentage: 33.3 },
    },
    recentEnquiries: [
      {
        id: 1,
        name: "Alice Johnson",
        isNew: true,
        message: "Hi, I'm interested in bulk purchasing of your Industrial Laptop Pro. Can you provide pricing for 50+ units?",
        date: "20/01/2024",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: 2,
        name: "Bob Smith",
        isNew: true,
        message: "Does the Smart Sensor Module support LoRaWAN connectivity? We need it for our IoT infrastructure.",
        date: "19/01/2024",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 3,
        name: "Carol Davis",
        isNew: false,
        message: "When will the Cable Management System be back in stock? We have an urgent project coming up.",
        date: "18/01/2024",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        responded: true,
      },
    ],
  }), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleReplyEnquiry = React.useCallback((enquiryId) => {
    console.log("Reply to enquiry:", enquiryId);
    // Handle reply logic here
  }, []);

  if (loading) {
    return (
      <AppLayout title="Dashboard">
        <LoadingIndicator text="Loading dashboard..." />
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Dashboard">
      <Box 
        sx={{ 
          width: "100%", 
          minHeight: "100vh", 
          bgcolor: "#f5f5f5"
        }}
      >
        {/* Welcome Header with Dark Gradient matching the new theme */}
        <Box sx={{ p: { xs: 2, sm: 3 }, pb: 0 }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
              borderRadius: 2,
              p: { xs: 3, sm: 4 },
              mb: 3,
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              Welcome back, John!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.9,
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Here's what's happening with your marketplace today.
            </Typography>
          </Box>
        </Box>

        {/* KPI Cards */}
        <Box sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <KPICard
                title="Total Products"
                value={dashboardData.totalProducts}
                growth={dashboardData.productGrowth}
                icon={<ProductsIcon />}
                color="#1F2937"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <KPICard
                title="Active Enquiries"
                value={dashboardData.activeEnquiries}
                growth={dashboardData.enquiryGrowth}
                icon={<EnquiriesIcon />}
                color="#10B981"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <KPICard
                title="Profile Status"
                value={dashboardData.profileStatus}
                growth={dashboardData.profileCompletion}
                icon={<VerifiedIcon />}
                color="#10B981"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Stock Overview */}
        <Box sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              bgcolor: "white",
              border: "1px solid #e0e0e0",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: 600, 
                  color: "#1A1A1A", 
                  mb: 3, 
                  fontSize: "1.125rem" 
                }}
              >
                Stock Overview
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <StockOverviewCard
                    title="In Stock"
                    count={dashboardData.stockOverview.inStock.count}
                    percentage={dashboardData.stockOverview.inStock.percentage}
                    color="#10B981"
                    icon={<CheckCircleOutline />}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StockOverviewCard
                    title="Low Stock"
                    count={dashboardData.stockOverview.lowStock.count}
                    percentage={dashboardData.stockOverview.lowStock.percentage}
                    color="#F59E0B"
                    icon={<Warning />}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StockOverviewCard
                    title="Out of Stock"
                    count={dashboardData.stockOverview.outOfStock.count}
                    percentage={dashboardData.stockOverview.outOfStock.percentage}
                    color="#EF4444"
                    icon={<Cancel />}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* Recent Enquiries */}
        <Box sx={{ px: { xs: 2, sm: 3 } }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              bgcolor: "white",
              border: "1px solid #e0e0e0",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#1A1A1A", fontSize: "1.125rem" }}
                >
                  Recent Enquiries
                </Typography>
                <Chip
                  label="2 New"
                  size="small"
                  sx={{
                    bgcolor: "#1F2937",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    height: 24,
                  }}
                />
              </Box>

              <Box>
                {dashboardData.recentEnquiries.map((enquiry, index) => (
                  <Box
                    key={enquiry.id}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      py: 2,
                      borderBottom: index < dashboardData.recentEnquiries.length - 1 ? "1px solid #f0f0f0" : "none",
                      "&:hover": {
                        bgcolor: "#fafafa",
                      },
                    }}
                  >
                    <Avatar
                      src={enquiry.avatar}
                      alt={enquiry.name}
                      sx={{ width: 36, height: 36, mr: 2, mt: 0.5 }}
                    />

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 0.5,
                          flexWrap: "wrap",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, color: "#1A1A1A", mr: 1, fontSize: "0.875rem" }}
                        >
                          {enquiry.name}
                        </Typography>
                        {enquiry.isNew && (
                          <Chip
                            label="new"
                            size="small"
                            sx={{
                              bgcolor: "#1F2937",
                              color: "white",
                              fontWeight: 600,
                              fontSize: "0.65rem",
                              height: 18,
                              mr: 1,
                            }}
                          />
                        )}
                        {enquiry.responded && (
                          <Chip
                            label="responded"
                            size="small"
                            sx={{
                              bgcolor: "#D1FAE5",
                              color: "#065F46",
                              fontWeight: 600,
                              fontSize: "0.65rem",
                              height: 18,
                            }}
                          />
                        )}
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          mb: 0.5,
                          lineHeight: 1.4,
                          fontSize: "0.875rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {enquiry.message}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{ color: "#999", fontSize: "0.75rem" }}
                      >
                        {enquiry.date}
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ReplyIcon sx={{ fontSize: 16 }} />}
                      onClick={() => handleReplyEnquiry(enquiry.id)}
                      sx={{
                        borderColor: "#e0e0e0",
                        color: "#666",
                        fontWeight: 500,
                        px: 1.5,
                        py: 0.5,
                        minWidth: "auto",
                        fontSize: "0.75rem",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#1F2937",
                          color: "#1F2937",
                          bgcolor: "transparent",
                        },
                      }}
                    >
                      Reply
                    </Button>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </AppLayout>
  );
};

export default Dashboard;