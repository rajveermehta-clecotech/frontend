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
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Inventory2 as ProductsIcon,
  People as EnquiriesIcon,
  CheckCircle as VerifiedIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircleOutline as InStockIcon,
  Warning as LowStockIcon,
  Cancel as OutOfStockIcon,
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
        message: "Looking for wholesale pricing on your electronics range. Please send catalog.",
        date: "19/01/2024",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
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
      <Box sx={{ width: "100%", minHeight: "100vh" }}>
        {/* Welcome Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #4285F4 0%, #1976D2 100%)",
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            mb: 4,
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
            Welcome back, {user?.name || "John"}!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Here's what's happening with your marketplace today.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Total Products */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid #E3F2FD",
                height: "100%",
                position: "relative",
                overflow: "visible",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  bgcolor: "#4285F4",
                  borderRadius: "4px 0 0 4px",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <ProductsIcon
                    sx={{ color: "#4285F4", fontSize: 24, mr: 1, mt: 0.5 }}
                  />
                  <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                    <TrendingUpIcon
                      sx={{ color: "#4CAF50", fontSize: 16, mr: 0.5 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "#4CAF50", fontWeight: 600 }}
                    >
                      +{dashboardData.productGrowth}%
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: "#1A1A1A",
                    mb: 1,
                    fontSize: "2.5rem",
                  }}
                >
                  {dashboardData.totalProducts}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{ color: "#666", fontWeight: 500, mb: 0.5 }}
                >
                  Total Products
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#999", fontSize: "0.875rem" }}
                >
                  Active listings
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Active Enquiries */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid #E3F2FD",
                height: "100%",
                position: "relative",
                overflow: "visible",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  bgcolor: "#4285F4",
                  borderRadius: "4px 0 0 4px",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <EnquiriesIcon
                    sx={{ color: "#4285F4", fontSize: 24, mr: 1, mt: 0.5 }}
                  />
                  <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                    <TrendingUpIcon
                      sx={{ color: "#4CAF50", fontSize: 16, mr: 0.5 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "#4CAF50", fontWeight: 600 }}
                    >
                      +{dashboardData.enquiryGrowth}%
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: "#1A1A1A",
                    mb: 1,
                    fontSize: "2.5rem",
                  }}
                >
                  {dashboardData.activeEnquiries}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{ color: "#666", fontWeight: 500, mb: 0.5 }}
                >
                  Active Enquiries
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#999", fontSize: "0.875rem" }}
                >
                  Pending responses
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Profile Status */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid #E3F2FD",
                height: "100%",
                position: "relative",
                overflow: "visible",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  bgcolor: "#4CAF50",
                  borderRadius: "4px 0 0 4px",
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <VerifiedIcon
                    sx={{ color: "#4CAF50", fontSize: 24, mr: 1, mt: 0.5 }}
                  />
                  <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                    <TrendingUpIcon
                      sx={{ color: "#4CAF50", fontSize: 16, mr: 0.5 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "#4CAF50", fontWeight: 600 }}
                    >
                      {dashboardData.profileCompletion}%
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#1A1A1A",
                    mb: 1,
                    fontSize: "1.75rem",
                  }}
                >
                  {dashboardData.profileStatus}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{ color: "#666", fontWeight: 500, mb: 0.5 }}
                >
                  Profile Status
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#999", fontSize: "0.875rem" }}
                >
                  Profile complete
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Stock Overview */}
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            mb: 4,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#1A1A1A", mb: 3 }}
            >
              Stock Overview
            </Typography>

            <Grid container spacing={4}>
              {/* In Stock */}
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <InStockIcon sx={{ color: "#4CAF50", mr: 1 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#666" }}
                    >
                      In Stock
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#1A1A1A", mb: 1 }}
                  >
                    {dashboardData.stockOverview.inStock.count}
                  </Typography>
                  <Box sx={{ width: "100%", mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={dashboardData.stockOverview.inStock.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "#E8F5E8",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: "#4CAF50",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#999", fontSize: "0.875rem" }}
                  >
                    {dashboardData.stockOverview.inStock.percentage}% of total products
                  </Typography>
                </Box>
              </Grid>

              {/* Low Stock */}
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <LowStockIcon sx={{ color: "#FF9800", mr: 1 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#666" }}
                    >
                      Low Stock
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#1A1A1A", mb: 1 }}
                  >
                    {dashboardData.stockOverview.lowStock.count}
                  </Typography>
                  <Box sx={{ width: "100%", mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={dashboardData.stockOverview.lowStock.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "#FFF3E0",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: "#FF9800",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#999", fontSize: "0.875rem" }}
                  >
                    {dashboardData.stockOverview.lowStock.percentage}% of total products
                  </Typography>
                </Box>
              </Grid>

              {/* Out of Stock */}
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <OutOfStockIcon sx={{ color: "#F44336", mr: 1 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#666" }}
                    >
                      Out of Stock
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#1A1A1A", mb: 1 }}
                  >
                    {dashboardData.stockOverview.outOfStock.count}
                  </Typography>
                  <Box sx={{ width: "100%", mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={dashboardData.stockOverview.outOfStock.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "#FFEBEE",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: "#F44336",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#999", fontSize: "0.875rem" }}
                  >
                    {dashboardData.stockOverview.outOfStock.percentage}% of total products
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Recent Enquiries */}
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
                sx={{ fontWeight: 600, color: "#1A1A1A" }}
              >
                Recent Enquiries
              </Typography>
              <Chip
                label="2 New"
                size="small"
                sx={{
                  bgcolor: "#4285F4",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              />
            </Box>

            <Box sx={{ space: 2 }}>
              {dashboardData.recentEnquiries.map((enquiry, index) => (
                <Box
                  key={enquiry.id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    p: 2,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#F8F9FA",
                    },
                    mb: index < dashboardData.recentEnquiries.length - 1 ? 2 : 0,
                  }}
                >
                  <Avatar
                    src={enquiry.avatar}
                    alt={enquiry.name}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#1A1A1A", mr: 1 }}
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
                            fontSize: "0.7rem",
                            height: 20,
                          }}
                        />
                      )}
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        mb: 1,
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
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
                    startIcon={<ReplyIcon />}
                    onClick={() => handleReplyEnquiry(enquiry.id)}
                    sx={{
                      borderColor: "#4285F4",
                      color: "#4285F4",
                      fontWeight: 500,
                      px: 2,
                      py: 0.5,
                      minWidth: "auto",
                      "&:hover": {
                        borderColor: "#1976D2",
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
    </AppLayout>
  );
};

export default Dashboard;