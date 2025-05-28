// src/components/layout/AppLayout.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
  Toolbar,
  AppBar,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory2 as ProductsIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const DRAWER_WIDTH = 240;

const AppLayout = ({ children, title }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  // Navigation items
  const navigationItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      text: "Products",
      icon: <ProductsIcon />,
      path: "/products",
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const drawer = (
    <Box sx={{ 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid #F0F0F0",
          display: "flex",
          alignItems: "center",
          minHeight: 80,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            bgcolor: "#4285F4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "white", fontWeight: 700, fontSize: "1.2rem" }}
          >
            M
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1A1A1A",
              fontSize: "1.1rem",
              lineHeight: 1.2,
            }}
          >
            MarketPlace
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#666",
              fontSize: "0.75rem",
              lineHeight: 1,
            }}
          >
            Vendor Portal
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ 
        flexGrow: 1, 
        pt: 2, 
        overflowY: "auto",
        overflowX: "hidden"
      }}>
        <List sx={{ px: 2 }}>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,
                    bgcolor: isActive ? "#1976D2" : "transparent",
                    color: isActive ? "white" : "#666",
                    "&:hover": {
                      bgcolor: isActive ? "#1976D2" : "#F5F5F5",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "white" : "#666",
                      minWidth: 36,
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      fontSize: "small",
                    })}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#FAFAFA" }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: "100%",
            bgcolor: "white",
            color: "#1A1A1A",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1A1A1A", mr: 2 }}
              >
                MarketPlace
              </Typography>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#4285F4",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                {getUserInitial()}
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ 
          width: { xs: 0, md: DRAWER_WIDTH }, 
          flexShrink: 0 
        }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DRAWER_WIDTH,
                bgcolor: "white",
                borderRight: "1px solid #F0F0F0",
                height: "100vh",
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DRAWER_WIDTH,
                bgcolor: "white",
                borderRight: "1px solid #F0F0F0",
                position: "relative",
                height: "100vh",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Bar with User Profile - Desktop Only */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              px: 3,
              py: 2,
              bgcolor: "white",
              borderBottom: "1px solid #F0F0F0",
              minHeight: 64,
              flexShrink: 0,
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#4285F4",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => navigate("/profile")}
            >
              {getUserInitial()}
            </Avatar>
          </Box>
        )}

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            pt: isMobile ? 10 : 3,
            bgcolor: "#FAFAFA",
            minHeight: "calc(100vh - 64px)",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;