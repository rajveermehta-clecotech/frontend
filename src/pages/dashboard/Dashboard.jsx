// src/pages/dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
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

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(true);

  // Dashboard data
  const [dashboardData, setDashboardData] = useState({
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
  });

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleReplyEnquiry = (enquiryId) => {
    console.log("Reply to enquiry:", enquiryId);
    // Handle reply logic here
  };

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
        {/* Welcome Header */}
        <Box sx={{ p: { xs: 2, sm: 3 }, pb: 0 }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #4285F4 0%, #1976D2 100%)",
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
            {/* Total Products */}
            <Grid item xs={12} md={4}>
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
                    <ProductsIcon sx={{ color: "#4285F4", fontSize: 20, mr: 1 }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#666", 
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        flexGrow: 1
                      }}
                    >
                      Total Products
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingUpIcon sx={{ color: "#4CAF50", fontSize: 14, mr: 0.5 }} />
                      <Typography
                        variant="caption"
                        sx={{ 
                          color: "#4CAF50", 
                          fontWeight: 600, 
                          fontSize: "0.75rem" 
                        }}
                      >
                        +{dashboardData.productGrowth}%
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
                    {dashboardData.totalProducts}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: "#999", 
                      fontSize: "0.75rem" 
                    }}
                  >
                    Active listings
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Active Enquiries */}
            <Grid item xs={12} md={4}>
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
                    <EnquiriesIcon sx={{ color: "#4CAF50", fontSize: 20, mr: 1 }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#666", 
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        flexGrow: 1
                      }}
                    >
                      Active Enquiries
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingUpIcon sx={{ color: "#4CAF50", fontSize: 14, mr: 0.5 }} />
                      <Typography
                        variant="caption"
                        sx={{ 
                          color: "#4CAF50", 
                          fontWeight: 600, 
                          fontSize: "0.75rem" 
                        }}
                      >
                        +{dashboardData.enquiryGrowth}%
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
                    {dashboardData.activeEnquiries}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: "#999", 
                      fontSize: "0.75rem" 
                    }}
                  >
                    Pending responses
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Profile Status */}
            <Grid item xs={12} md={4}>
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
                    <VerifiedIcon sx={{ color: "#4CAF50", fontSize: 20, mr: 1 }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#666", 
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        flexGrow: 1
                      }}
                    >
                      Profile Status
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingUpIcon sx={{ color: "#4CAF50", fontSize: 14, mr: 0.5 }} />
                      <Typography
                        variant="caption"
                        sx={{ 
                          color: "#4CAF50", 
                          fontWeight: 600, 
                          fontSize: "0.75rem" 
                        }}
                      >
                        {dashboardData.profileCompletion}%
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#1A1A1A",
                      mb: 0.5,
                      fontSize: "1.5rem",
                    }}
                  >
                    {dashboardData.profileStatus}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: "#999", 
                      fontSize: "0.75rem" 
                    }}
                  >
                    Profile complete
                  </Typography>
                </CardContent>
              </Card>
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
                {/* In Stock */}
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <CheckCircleOutline sx={{ color: "#4CAF50", mr: 1, fontSize: 20 }} />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "#666" }}
                      >
                        In Stock
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
                      {dashboardData.stockOverview.inStock.count}
                    </Typography>
                    <Box sx={{ width: "100%", mb: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={dashboardData.stockOverview.inStock.percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "#E8F5E8",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#4CAF50",
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#999", fontSize: "0.75rem" }}
                    >
                      {dashboardData.stockOverview.inStock.percentage}% of total products
                    </Typography>
                  </Box>
                </Grid>

                {/* Low Stock */}
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Warning sx={{ color: "#FF9800", mr: 1, fontSize: 20 }} />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "#666" }}
                      >
                        Low Stock
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
                      {dashboardData.stockOverview.lowStock.count}
                    </Typography>
                    <Box sx={{ width: "100%", mb: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={dashboardData.stockOverview.lowStock.percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "#FFF3E0",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#FF9800",
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#999", fontSize: "0.75rem" }}
                    >
                      {dashboardData.stockOverview.lowStock.percentage}% of total products
                    </Typography>
                  </Box>
                </Grid>

                {/* Out of Stock */}
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Cancel sx={{ color: "#F44336", mr: 1, fontSize: 20 }} />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "#666" }}
                      >
                        Out of Stock
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
                      {dashboardData.stockOverview.outOfStock.count}
                    </Typography>
                    <Box sx={{ width: "100%", mb: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={dashboardData.stockOverview.outOfStock.percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "#FFEBEE",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#F44336",
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#999", fontSize: "0.75rem" }}
                    >
                      {dashboardData.stockOverview.outOfStock.percentage}% of total products
                    </Typography>
                  </Box>
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
                    bgcolor: "#4285F4",
                    color: "white",
                    fontWeight: 500,
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
                              bgcolor: "#4285F4",
                              color: "white",
                              fontWeight: 500,
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
                              bgcolor: "#E8F5E8",
                              color: "#4CAF50",
                              fontWeight: 500,
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
                          borderColor: "#4285F4",
                          color: "#4285F4",
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