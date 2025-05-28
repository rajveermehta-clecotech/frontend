// src/components/ProfileCompletionNav.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBack, Person, Settings, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProfileCompletionNav = ({ title = "Complete Your Profile" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: "none",
        bgcolor: "white",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {/* User menu */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 1, display: { xs: "none", sm: "block" } }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              {user?.name || "Alex Parkinson"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.role || "Freelancer"}
            </Typography>
          </Box>
          <IconButton onClick={handleMenu} size="small" sx={{ ml: 1 }}>
            <Avatar
              alt={user?.name || "User"}
              src="https://randomuser.me/api/portraits/men/32.jpg"
              sx={{ width: 38, height: 38 }}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 2,
              sx: {
                mt: 1.5,
                width: 200,
                borderRadius: 2,
              },
            }}
          >
            <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Profile</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ProfileCompletionNav;
