// src/pages/settings/Settings.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Tab,
  Tabs,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import AppLayout from "../../components/layout/AppLayout";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    fullName: "John Vendor",
    email: "vendor@example.com",
    contactNumber: "+1 (555) 123-4567",
    address: "123 Business St, Suite 100, City, State 12345",
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    console.log("Update profile:", profileData);
    // Handle profile update logic here
  };

  const handleChangePassword = () => {
    console.log("Change password:", passwordData);
    // Handle password change logic here
  };

  return (
    <AppLayout title="Settings">
      <Box sx={{ width: "100%" }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1A1A1A",
              mb: 1,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Settings
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              fontSize: "1rem",
            }}
          >
            Manage your account preferences
          </Typography>
        </Box>

        {/* Main Content Card */}
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E0E0E0",
          }}
        >
          {/* Tab Navigation */}
          <Box sx={{ borderBottom: "1px solid #E0E0E0", px: 3, pt: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "#666",
                  minHeight: 48,
                  "&.Mui-selected": {
                    color: "#1A1A1A",
                    fontWeight: 600,
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#4285F4",
                  height: 2,
                },
              }}
            >
              <Tab
                icon={<PersonIcon sx={{ fontSize: 20 }} />}
                iconPosition="start"
                label="Update Profile"
                sx={{ mr: 4 }}
              />
              <Tab
                icon={<LockIcon sx={{ fontSize: 20 }} />}
                iconPosition="start"
                label="Change Password"
              />
            </Tabs>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Update Profile Tab */}
            {activeTab === 0 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1A1A1A",
                    mb: 4,
                    fontSize: "1.25rem",
                  }}
                >
                  Profile Information
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1A1A1A",
                          mb: 1,
                          fontSize: "0.9rem",
                        }}
                      >
                        Full Name
                      </Typography>
                      <TextField
                        fullWidth
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileChange}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "#F8F9FA",
                            "& fieldset": {
                              borderColor: "#E0E0E0",
                            },
                            "&:hover fieldset": {
                              borderColor: "#B0B0B0",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#4285F4",
                            },
                          },
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1A1A1A",
                          mb: 1,
                          fontSize: "0.9rem",
                        }}
                      >
                        Email
                      </Typography>
                      <TextField
                        fullWidth
                        name="email"
                        value={profileData.email}
                        disabled
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "#F8F9FA",
                            "& fieldset": {
                              borderColor: "#E0E0E0",
                            },
                            "&.Mui-disabled": {
                              bgcolor: "#F0F0F0",
                            },
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#666",
                          fontSize: "0.75rem",
                          mt: 0.5,
                          display: "block",
                        }}
                      >
                        Email cannot be changed
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1A1A1A",
                          mb: 1,
                          fontSize: "0.9rem",
                        }}
                      >
                        Contact Number
                      </Typography>
                      <TextField
                        fullWidth
                        name="contactNumber"
                        value={profileData.contactNumber}
                        onChange={handleProfileChange}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "#F8F9FA",
                            "& fieldset": {
                              borderColor: "#E0E0E0",
                            },
                            "&:hover fieldset": {
                              borderColor: "#B0B0B0",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#4285F4",
                            },
                          },
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#1A1A1A",
                          mb: 1,
                          fontSize: "0.9rem",
                        }}
                      >
                        Address
                      </Typography>
                      <TextField
                        fullWidth
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        variant="outlined"
                        multiline
                        rows={2}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "#F8F9FA",
                            "& fieldset": {
                              borderColor: "#E0E0E0",
                            },
                            "&:hover fieldset": {
                              borderColor: "#B0B0B0",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#4285F4",
                            },
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                  <Button
                    variant="contained"
                    onClick={handleUpdateProfile}
                    sx={{
                      bgcolor: "#1A1A1A",
                      color: "white",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#333",
                      },
                    }}
                  >
                    Update Profile
                  </Button>
                </Box>
              </Box>
            )}

            {/* Change Password Tab */}
            {activeTab === 1 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1A1A1A",
                    mb: 4,
                    fontSize: "1.25rem",
                  }}
                >
                  Change Password
                </Typography>

                <Box sx={{ maxWidth: 400 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "#1A1A1A",
                        mb: 1,
                        fontSize: "0.9rem",
                      }}
                    >
                      Current Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#F8F9FA",
                          "& fieldset": {
                            borderColor: "#E0E0E0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#B0B0B0",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#4285F4",
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "#1A1A1A",
                        mb: 1,
                        fontSize: "0.9rem",
                      }}
                    >
                      New Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#F8F9FA",
                          "& fieldset": {
                            borderColor: "#E0E0E0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#B0B0B0",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#4285F4",
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "#1A1A1A",
                        mb: 1,
                        fontSize: "0.9rem",
                      }}
                    >
                      Confirm New Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#F8F9FA",
                          "& fieldset": {
                            borderColor: "#E0E0E0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#B0B0B0",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#4285F4",
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                  <Button
                    variant="contained"
                    onClick={handleChangePassword}
                    sx={{
                      bgcolor: "#1A1A1A",
                      color: "white",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#333",
                      },
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default Settings;