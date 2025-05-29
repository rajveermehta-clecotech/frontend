import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
  useMediaQuery,
  Button,
  Stack,
  LinearProgress,
  Divider,
  alpha,
} from "@mui/material";
import {
  LocalMall as ShoppingBagIcon,
  Description as DescriptionIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreHoriz as MoreHorizIcon,
  AccountBalanceWallet as WalletIcon,
  Assignment as AssignmentIcon,
  Store as StoreIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";

// Berry Colors matching the exact template
const berryColors = {
  primary: {
    light: "#e3f2fd",
    main: "#2196f3",
    dark: "#0d47a1",
  },
  secondary: {
    light: "#f3e5f5",
    main: "#9c27b0",
    dark: "#4a148c",
  },
  success: {
    light: "#e8f5e8",
    main: "#4caf50",
    dark: "#1b5e20",
  },
  warning: {
    light: "#fff3e0",
    main: "#ff9800",
    dark: "#e65100",
  },
  error: {
    light: "#ffebee",
    main: "#f44336",
    dark: "#b71c1c",
  },
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
  },
};

// Total Earning Card (Purple Gradient - Exact Berry Style)
const TotalEarningCard = () => {
  return (
    <Card
      sx={{
        background: "linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)",
        color: "white",
        overflow: "hidden",
        position: "relative",
        "&:after": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background:
            "linear-gradient(210.04deg, rgba(255, 255, 255, 0.2) -50.94%, rgba(255, 255, 255, 0) 83.49%)",
          borderRadius: "50%",
          top: -85,
          right: -95,
        },
        "&:before": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background:
            "linear-gradient(140.9deg, rgba(255, 255, 255, 0.1) -14.02%, rgba(255, 255, 255, 0) 70.50%)",
          borderRadius: "50%",
          top: -125,
          right: -15,
        },
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2.25 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, mb: 0.75, opacity: 0.8, fontSize: '1rem' }}
            >
              Total Earning
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 600, fontSize: '2rem' }}>
              $500.00
            </Typography>
          </Box>
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              color: "inherit",
              "& svg": { fontSize: "1.875rem" },
              width: 44,
              height: 44,
            }}
          >
            <ShoppingBagIcon />
          </Avatar>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.8, fontSize: '0.875rem' }}>
            $42,148
          </Typography>
          <IconButton size="small" sx={{ color: "inherit", opacity: 0.6 }}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

// Total Order Line Chart Card (Blue with Line Chart)
const TotalOrderLineCard = () => {
  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <CardContent sx={{ p: 2.25 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, color: "text.secondary", mb: 0.75, fontSize: '1rem' }}
            >
              Total Order
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: 600, color: "text.primary", fontSize: '2rem' }}
            >
              $961
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Button
              size="small"
              variant="text"
              sx={{ minWidth: "auto", p: 0.5, fontSize: "0.75rem", color: 'text.secondary' }}
            >
              Month
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{ 
                minWidth: "auto", 
                p: 0.5, 
                fontSize: "0.75rem",
                bgcolor: 'primary.main',
                color: 'white',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  boxShadow: 'none',
                }
              }}
            >
              Year
            </Button>
          </Box>
        </Box>

        {/* Simple Line Chart Representation */}
        <Box sx={{ height: 95, position: "relative", mt: 2 }}>
          <svg width="100%" height="100%" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient
                id="chartGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#2196f3" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2196f3" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 70 Q 40 30 80 45 T 160 35 T 240 25 T 320 20 T 400 15"
              stroke="#2196f3"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 0 70 Q 40 30 80 45 T 160 35 T 240 25 T 320 20 T 400 15 L 400 95 L 0 95 Z"
              fill="url(#chartGradient)"
            />
          </svg>
        </Box>
        
        {/* Stats at bottom */}
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: '1rem', mr: 0.5 }} />
            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600, fontSize: '0.75rem' }}>
              59.3%
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
            You made an extra 35,000 this year
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Total Income Card (Blue Gradient)
const TotalIncomeCard = () => {
  return (
    <Card
      sx={{
        background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
        color: "white",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        "&:after": {
          content: '""',
          position: "absolute",
          width: 150,
          height: 150,
          background:
            "linear-gradient(210.04deg, rgba(255, 255, 255, 0.15) -50.94%, rgba(255, 255, 255, 0) 83.49%)",
          borderRadius: "50%",
          top: -50,
          right: -50,
        },
      }}
    >
      <CardContent sx={{ p: 2.25 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, mb: 0.75, opacity: 0.9, fontSize: '1rem' }}
            >
              Total Income
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 600, fontSize: '2rem' }}>
              $203k
            </Typography>
          </Box>
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              color: "inherit",
              "& svg": { fontSize: "1.875rem" },
              width: 44,
              height: 44,
            }}
          >
            <DescriptionIcon />
          </Avatar>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
            Yearly revenue
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Total Growth Card with Bar Chart
const TotalGrowthCard = () => {
  const data = [
    { investment: 20, loss: 30, profit: 50, maintenance: 10 },
    { investment: 40, loss: 20, profit: 80, maintenance: 15 },
    { investment: 30, loss: 10, profit: 60, maintenance: 20 },
    { investment: 35, loss: 15, profit: 70, maintenance: 12 },
    { investment: 25, loss: 35, profit: 40, maintenance: 8 },
    { investment: 45, loss: 25, profit: 90, maintenance: 18 },
    { investment: 50, loss: 20, profit: 95, maintenance: 22 },
    { investment: 15, loss: 40, profit: 30, maintenance: 5 },
    { investment: 30, loss: 15, profit: 65, maintenance: 14 },
    { investment: 40, loss: 20, profit: 75, maintenance: 16 },
    { investment: 20, loss: 30, profit: 45, maintenance: 10 },
    { investment: 35, loss: 25, profit: 80, maintenance: 20 },
  ];

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 2.25 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
            Total Growth
          </Typography>
          <Button
            size="small"
            variant="outlined"
            sx={{ 
              textTransform: "none",
              fontSize: '0.75rem',
              borderColor: 'divider',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main',
              }
            }}
          >
            Today
          </Button>
        </Box>

        <Typography variant="h3" sx={{ fontWeight: 600, mb: 1, fontSize: '2rem' }}>
          $2,324.00
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: '1rem', mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600, fontSize: '0.75rem' }}>
            59.3%
          </Typography>
        </Box>

        {/* Bar Chart */}
        <Box sx={{ height: 200, mb: 2 }}>
          <svg width="100%" height="100%">
            {data.map((item, index) => {
              const x = (index * 90) / (data.length - 1);
              const totalHeight =
                item.investment + item.loss + item.profit + item.maintenance;
              const scale = 150 / 100; // Max height scaling

              return (
                <g key={index}>
                  {/* Investment (Light Green) */}
                  <rect
                    x={`${x}%`}
                    y={200 - item.investment * scale}
                    width="6%"
                    height={item.investment * scale}
                    fill="#81c784"
                    rx="1"
                  />
                  {/* Loss (Blue) */}
                  <rect
                    x={`${x}%`}
                    y={200 - (item.investment + item.loss) * scale}
                    width="6%"
                    height={item.loss * scale}
                    fill="#2196f3"
                    rx="1"
                  />
                  {/* Profit (Purple) */}
                  <rect
                    x={`${x}%`}
                    y={
                      200 - (item.investment + item.loss + item.profit) * scale
                    }
                    width="6%"
                    height={item.profit * scale}
                    fill="#673ab7"
                    rx="1"
                  />
                  {/* Maintenance (Light Purple) */}
                  <rect
                    x={`${x}%`}
                    y={200 - totalHeight * scale}
                    width="6%"
                    height={item.maintenance * scale}
                    fill="#e1bee7"
                    rx="1"
                  />
                </g>
              );
            })}
          </svg>
        </Box>

        {/* Chart Legend */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: "#81c784",
                borderRadius: 0.5,
              }}
            />
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>Investment</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: "#2196f3",
                borderRadius: 0.5,
              }}
            />
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>Loss</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: "#673ab7",
                borderRadius: 0.5,
              }}
            />
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>Profit</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: "#e1bee7",
                borderRadius: 0.5,
              }}
            />
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>Maintenance</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Popular Stocks Card
const PopularStocksCard = () => {
  const stocks = [
    {
      name: "Bajaj Finery",
      code: "BAJAJFINSV.NS",
      price: 1839.0,
      change: 10,
      profit: true,
    },
    { name: "TTML", code: "TTML.NS", price: 100.0, change: 10, profit: false },
    {
      name: "Reliance",
      code: "RELIANCE.NS",
      price: 200.0,
      change: 10,
      profit: true,
    },
    { name: "TTML", code: "TTML.NS", price: 189.0, change: 10, profit: false },
    {
      name: "Stolon",
      code: "STOLON.NS",
      price: 189.0,
      change: 10,
      profit: false,
    },
  ];

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 2.25 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
            Popular Stocks
          </Typography>
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        </Box>

        {/* Featured Stock with Chart */}
        <Box sx={{ mb: 3, p: 2, bgcolor: alpha('#673ab7', 0.08), borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Bajaj Finery
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: berryColors.success.main, fontWeight: 500, fontSize: '0.75rem' }}
              >
                10% Profit
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
              $1839.00
            </Typography>
          </Box>

          {/* Mini Chart */}
          <Box sx={{ height: 60 }}>
            <svg width="100%" height="100%">
              <defs>
                <linearGradient
                  id="stockGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#673ab7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#673ab7" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 40 Q 30 20 60 30 T 120 25 T 180 20 T 240 15 T 300 10"
                stroke="#673ab7"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 0 40 Q 30 20 60 30 T 120 25 T 180 20 T 240 15 T 300 10 L 300 60 L 0 60 Z"
                fill="url(#stockGradient)"
              />
            </svg>
          </Box>
        </Box>

        {/* Stock List */}
        <List sx={{ p: 0 }}>
          {stocks.map((stock, index) => (
            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: stock.profit
                      ? berryColors.success.light
                      : berryColors.error.light,
                    color: stock.profit
                      ? berryColors.success.main
                      : berryColors.error.main,
                    width: 32,
                    height: 32,
                  }}
                >
                  {stock.profit ? (
                    <TrendingUpIcon fontSize="small" />
                  ) : (
                    <TrendingDownIcon fontSize="small" />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {stock.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption"
                    sx={{
                      color: stock.profit
                        ? berryColors.success.main
                        : berryColors.error.main,
                      fontSize: '0.75rem',
                    }}
                  >
                    {stock.change}% {stock.profit ? "Profit" : "loss"}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  ${stock.price.toFixed(2)}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button 
            variant="text" 
            size="small" 
            sx={{ 
              textTransform: "none",
              fontSize: '0.75rem',
              color: 'primary.main',
              '&:hover': {
                bgcolor: alpha('#2196f3', 0.08),
              }
            }}
          >
            View All →
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        flexGrow: 1,
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

      <Grid container spacing={3}>
        {/* First Row - Main Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <TotalEarningCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TotalOrderLineCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TotalIncomeCard />
        </Grid>

        {/* Second Row - Growth Chart and Popular Stocks */}
        <Grid item xs={12} md={8}>
          <TotalGrowthCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <PopularStocksCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;