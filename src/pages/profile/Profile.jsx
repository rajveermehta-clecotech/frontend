import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  TextField,
  Divider,
  Stack,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Edit,
  FiberManualRecord,
} from "@mui/icons-material";

// Mock static data
const staticUserData = {
  role: "vendor",
  vendorProfile: {
    business: {
      businessName: "TechCorp Solutions",
      businessLogo: "",
      city: "Mumbai",
      state: "Maharashtra",
      phoneNumber: "+91 98765 43210",
      address1: "123 Business Park, Sector 15",
      pincode: "400001"
    },
    vendorType: "manufacturer",
    profileCompletion: 85,
    gstNumber: "27AABCT1234A1Z5",
    isBuyer: false
  }
};

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Separate edit mode states for each card
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [bioEditMode, setBioEditMode] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(staticUserData);
  const [error, setError] = useState(null);

  // Form data state with business information from static data
  const [formData, setFormData] = useState({
    name: userData?.vendorProfile?.business?.businessName || "",
    userType: userData?.role ? `${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}` : "Premium User",
    role: userData?.vendorProfile?.vendorType || "manufacturer",
    experienceLevel: "Intermediate", // Default as not in API
    location: userData?.vendorProfile?.business?.city && userData?.vendorProfile?.business?.state ? 
      `${userData.vendorProfile.business.city}, ${userData.vendorProfile.business.state}` : "",
    phoneNumber: userData?.vendorProfile?.business?.phoneNumber || "",
    address: userData?.vendorProfile?.business?.address1 || "",
    pincode: userData?.vendorProfile?.business?.pincode || "",
    availability: userData?.vendorProfile?.isBuyer === false ? true : false,
    profileCompletion: userData?.vendorProfile?.profileCompletion || 0,
    gstNumber: userData?.vendorProfile?.gstNumber || "",
    tags: ["#Manufacturer", "#Business", "#Vendor"],
    badges: ["Profile " + (userData?.vendorProfile?.profileCompletion || 0) + "% Complete"],
  });

  // Update form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.vendorProfile?.business?.businessName || "",
        userType: userData.role ? `${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}` : "Premium User",
        role: userData.vendorProfile?.vendorType || "manufacturer",
        experienceLevel: "Intermediate", // Default as not in API
        location: userData.vendorProfile?.business?.city && userData.vendorProfile?.business?.state ? 
          `${userData.vendorProfile.business.city}, ${userData.vendorProfile.business.state}` : "",
        phoneNumber: userData.vendorProfile?.business?.phoneNumber || "",
        address: userData.vendorProfile?.business?.address1 || "",
        pincode: userData.vendorProfile?.business?.pincode || "",
        availability: userData.vendorProfile?.isBuyer === false ? true : false,
        profileCompletion: userData.vendorProfile?.profileCompletion || 0,
        gstNumber: userData.vendorProfile?.gstNumber || "",
        tags: ["#Manufacturer", "#Business", "#Vendor"],
        badges: [`Profile ${userData.vendorProfile?.profileCompletion || 0}% Complete`],
      });
    }
  }, [userData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle edit mode for profile card
  const toggleProfileEdit = () => {
    if (profileEditMode) {
      // Reset to original values if canceling
      if (userData) {
        setFormData({
          ...formData,
          name: userData.vendorProfile?.business?.businessName || "",
          userType: userData.role ? `${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}` : "Premium User",
        });
      }
    }
    setProfileEditMode(!profileEditMode);
  };

  // Toggle edit mode for bio card
  const toggleBioEdit = () => {
    if (bioEditMode) {
      // Reset to original values if canceling
      if (userData) {
        setFormData({
          ...formData,
          role: userData.vendorProfile?.vendorType || "manufacturer",
          location: userData.vendorProfile?.business?.city && userData.vendorProfile?.business?.state ? 
            `${userData.vendorProfile.business.city}, ${userData.vendorProfile.business.state}` : "",
          phoneNumber: userData.vendorProfile?.business?.phoneNumber || "",
          address: userData.vendorProfile?.business?.address1 || "",
          pincode: userData.vendorProfile?.business?.pincode || "",
          gstNumber: userData.vendorProfile?.gstNumber || "",
        });
      }
    }
    setBioEditMode(!bioEditMode);
  };

  // Save profile changes (mock function)
  const saveProfileChanges = async () => {
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setProfileEditMode(false);
      
      // Update userData with new values
      const updatedUserData = {
        ...userData,
        vendorProfile: {
          ...userData.vendorProfile,
          business: {
            ...userData.vendorProfile.business,
            businessName: formData.name
          }
        },
        role: formData.userType.toLowerCase()
      };
      setUserData(updatedUserData);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 500);
  };

  // Save bio changes (mock function)
  const saveBioChanges = async () => {
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setBioEditMode(false);

      // Update userData with new values
      const updatedUserData = {
        ...userData,
        vendorProfile: {
          ...userData.vendorProfile,
          vendorType: formData.role,
          gstNumber: formData.gstNumber,
          isBuyer: !formData.availability,
          business: {
            ...userData.vendorProfile.business,
            address1: formData.address,
            city: formData.location.split(',')[0]?.trim() || '',
            state: formData.location.split(',')[1]?.trim() || '',
            pincode: formData.pincode,
            phoneNumber: formData.phoneNumber,
          }
        }
      };
      setUserData(updatedUserData);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 500);
  };

  const infoItemStyle = {
    mb: 3,
  };

  const labelStyle = {
    color: "text.secondary",
    fontSize: "0.875rem",
    mb: 0.5,
  };

  const valueStyle = {
    fontSize: "1rem",
    mb: 1,
    color: "text.primary",
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: { xs: 2, sm: 3 },
      minHeight: 'calc(100vh - 70px)',
      bgcolor: 'background.default'
    }}>
      {success && (
        <Box sx={{ 
          mb: 3, 
          p: 2, 
          bgcolor: 'success.light', 
          color: 'success.contrastText',
          borderRadius: 1,
          border: 1,
          borderColor: 'success.main'
        }}>
          <Typography variant="body2">
            ✓ Profile Updated Successfully
          </Typography>
        </Box>
      )}

      {error && (
        <Box sx={{ 
          mb: 3, 
          p: 2, 
          bgcolor: 'error.light', 
          color: 'error.contrastText',
          borderRadius: 1,
          border: 1,
          borderColor: 'error.main'
        }}>
          <Typography variant="body2">
            ✗ {error}
          </Typography>
        </Box>
      )}

      <Box sx={{ position: "relative", pb: 4 }}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: 600, 
            mb: 1,
            color: "text.primary"
          }}
        >
          Profile
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ mb: 3 }}
        >
          View all your profile details here.
        </Typography>

        <Grid container spacing={2} direction="column">
          {/* Profile card - full width */}
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: theme.palette.mode === 'dark' 
                  ? "0px 1px 3px rgba(255, 255, 255, 0.1)" 
                  : "0px 1px 3px rgba(0, 0, 0, 0.1)",
                position: "relative",
                bgcolor: "background.paper",
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.12)' 
                  : 'none'
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                {profileEditMode ? (
                  <TextField
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    autoFocus
                    sx={{
                      mb: 1,
                      maxWidth: 250,
                      mx: 'auto',
                      '& .MuiOutlinedInput-root': {
                        textAlign: 'center',
                        bgcolor: 'background.paper',
                      },
                      '& .MuiInputBase-input': {
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'text.primary',
                      }
                    }}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: "text.primary"
                    }}
                  >
                    {formData.name || "Business Name"}
                  </Typography>
                )}

                {profileEditMode ? (
                  <TextField
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    disabled
                    sx={{
                      mb: 2,
                      maxWidth: 200,
                      mx: 'auto',
                      '& .MuiOutlinedInput-root': {
                        textAlign: 'center',
                        bgcolor: 'background.paper',
                      },
                      '& .MuiInputBase-input': {
                        textAlign: 'center',
                        color: 'success.main',
                      }
                    }}
                  />
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "success.main",
                      mb: 2,
                    }}
                  >
                    {formData.userType}
                  </Typography>
                )}

                <Avatar
                  src={userData?.vendorProfile?.business?.businessLogo || ""}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: theme.palette.mode === 'dark' ? "grey.700" : "grey.300",
                    fontSize: "2.5rem",
                    margin: '0 auto',
                    color: "text.primary",
                    border: theme.palette.mode === 'dark' 
                      ? '2px solid rgba(255, 255, 255, 0.12)' 
                      : '2px solid rgba(0, 0, 0, 0.12)'
                  }}
                >
                  {formData.name ? formData.name.charAt(0).toUpperCase() : "B"}
                </Avatar>
              </CardContent>
              
              {/* Edit button at bottom */}
              <Box sx={{ pb: 2, pt: 1, display: 'flex', justifyContent: 'center' }}>
                {!profileEditMode ? (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Edit />}
                    onClick={toggleProfileEdit}
                    sx={{
                      borderRadius: 20,
                      px: 2,
                      py: 0.5,
                      textTransform: "none",
                      fontSize: "0.875rem",
                      borderColor: "primary.main",
                      color: "primary.main",
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(144, 202, 249, 0.08)' 
                          : 'rgba(25, 118, 210, 0.04)'
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={toggleProfileEdit}
                      sx={{
                        borderRadius: 20,
                        px: 2,
                        py: 0.5,
                        textTransform: "none",
                        fontSize: "0.875rem",
                        color: "text.primary",
                        borderColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.23)' 
                          : 'rgba(0, 0, 0, 0.23)'
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={saveProfileChanges}
                      sx={{
                        borderRadius: 20,
                        px: 2,
                        py: 0.5,
                        textTransform: "none",
                        fontSize: "0.875rem",
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>
          
          {/* Bio card - full width */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: theme.palette.mode === 'dark' 
                  ? "0px 1px 3px rgba(255, 255, 255, 0.1)" 
                  : "0px 1px 3px rgba(0, 0, 0, 0.1)",
                position: "relative",
                bgcolor: "background.paper",
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.12)' 
                  : 'none'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary"
                    }}
                  >
                    Business Details
                  </Typography>

                  {/* Profile completion indicator */}
                  <Chip 
                    label={`${formData.profileCompletion}% Complete`}
                    size="small"
                    color="success"
                    sx={{ 
                      height: '24px',
                      borderRadius: 1,
                      bgcolor: 'success.main',
                      color: 'success.contrastText',
                      '& .MuiChip-label': {
                        color: 'success.contrastText'
                      }
                    }}
                  />
                </Box>

                <Divider sx={{ 
                  mb: 3,
                  borderColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.12)' 
                    : 'rgba(0, 0, 0, 0.12)'
                }} />

                <Grid container spacing={2}>
                  {/* Left column of details */}
                  <Grid item xs={12} md={6}>
                    <Box sx={infoItemStyle}>
                      <Typography variant="body2" sx={labelStyle}>
                        Vendor Type
                      </Typography>
                      {bioEditMode ? (
                        <TextField
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ 
                            mb: 1,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'background.paper',
                            }
                          }}
                        />
                      ) : (
                        <Typography variant="body1" sx={valueStyle}>
                          {formData.role ? formData.role.charAt(0).toUpperCase() + formData.role.slice(1) : "Manufacturer"}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={infoItemStyle}>
                      <Typography variant="body2" sx={labelStyle}>
                        GST Number
                      </Typography>
                      {bioEditMode ? (
                        <TextField
                          name="gstNumber"
                          value={formData.gstNumber}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ 
                            mb: 1,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'background.paper',
                            }
                          }}
                        />
                      ) : (
                        <Typography variant="body1" sx={valueStyle}>
                          {formData.gstNumber || "Not provided"}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={infoItemStyle}>
                      <Typography variant="body2" sx={labelStyle}>
                        Phone Number
                      </Typography>
                      {bioEditMode ? (
                        <TextField
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ 
                            mb: 1,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'background.paper',
                            }
                          }}
                        />
                      ) : (
                        <Typography variant="body1" sx={valueStyle}>
                          {formData.phoneNumber || "Not provided"}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={infoItemStyle}>
                      <Typography variant="body2" sx={labelStyle}>
                        Badges
                      </Typography>
                      <Box>
                        {formData.badges.map((badge, index) => (
                          <Chip
                            key={index}
                            label={badge}
                            size="small"
                            sx={{
                              bgcolor: 'info.main',
                              color: 'info.contrastText',
                              fontSize: '0.75rem',
                              height: '24px',
                              borderRadius: 1,
                              mr: 1,
                              '& .MuiChip-label': {
                                color: 'info.contrastText'
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Grid>

                  {/* Right column of details */}
                  <Grid item xs={12} md={6}>
                    <Box sx={infoItemStyle}>
                      <Typography variant="body2" sx={labelStyle}>
                        Address
                      </Typography>
                      {bioEditMode ? (
                        <TextField
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ 
                            mb: 1,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'background.paper',
                            }
                          }}
                        />
                      ) : (
                        <Typography variant="body1" sx={valueStyle}>
                          {formData.address || "Not provided"}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={infoItemStyle}>
                      <Typography variant="body2" sx={labelStyle}>
                        Location
                      </Typography>
                      {bioEditMode ? (
                        <TextField
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          size="small"
                          placeholder="City, State"
                          sx={{ 
                            mb: 1,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'background.paper',
                            }
                          }}
                        />
                      ) : (
                        <Typography variant="body1" sx={valueStyle}>
                          {formData.location || "Not provided"}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={infoItemStyle}>
                      <Typography variant="body2" sx={labelStyle}>
                        Pincode
                      </Typography>
                      {bioEditMode ? (
                        <TextField
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          size="small"
                          sx={{ 
                            mb: 1,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'background.paper',
                            }
                          }}
                        />
                      ) : (
                        <Typography variant="body1" sx={valueStyle}>
                          {formData.pincode || "Not provided"}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={infoItemStyle}>
                      <Typography variant="body2" sx={labelStyle}>
                        Availability
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FiberManualRecord sx={{ color: 'success.main', fontSize: '0.7rem', mr: 0.5 }} />
                        <Typography variant="body1" sx={{ color: "text.primary" }}>
                          {formData.availability ? "Available for Business" : "Not Available"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={infoItemStyle}>
                      <Typography variant="body2" sx={labelStyle}>
                        Tags
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {formData.tags.map((tag, index) => (
                          <Typography 
                            key={index} 
                            variant="body1"
                            sx={{ 
                              mr: index < formData.tags.length - 1 ? 1 : 0,
                              color: "text.primary"
                            }}
                          >
                            {tag}{index < formData.tags.length - 1 ? ", " : ""}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
              
              {/* Edit button at bottom */}
              <Box sx={{ pb: 2, pt: 1, display: 'flex', justifyContent: 'flex-end', px: 3 }}>
                {!bioEditMode ? (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Edit />}
                    onClick={toggleBioEdit}
                    sx={{
                      borderRadius: 20,
                      px: 2,
                      py: 0.5,
                      textTransform: "none",
                      fontSize: "0.875rem",
                      borderColor: "primary.main",
                      color: "primary.main",
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(144, 202, 249, 0.08)' 
                          : 'rgba(25, 118, 210, 0.04)'
                      }
                    }}
                  >
                    Edit Details
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={toggleBioEdit}
                      sx={{
                        borderRadius: 20,
                        px: 2,
                        py: 0.5,
                        textTransform: "none",
                        fontSize: "0.875rem",
                        color: "text.primary",
                        borderColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.23)' 
                          : 'rgba(0, 0, 0, 0.23)'
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={saveBioChanges}
                      sx={{
                        borderRadius: 20,
                        px: 2,
                        py: 0.5,
                        textTransform: "none",
                        fontSize: "0.875rem",
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;