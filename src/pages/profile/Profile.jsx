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
import NotificationAlert from "../../components/ui/NotificationAlert";
import LoadingIndicator from "../../components/ui/LoadingIndicator";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api/authApi";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Separate edit mode states for each card
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [bioEditMode, setBioEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await api.get('/auth/me');
        setUserData(response.data.data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Form data state with business information from API
  const [formData, setFormData] = useState({
    name: userData?.vendorProfile?.business?.businessName || user?.name || "",
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

  // Save profile changes
  const saveProfileChanges = async () => {
    setLoading(true);
    try {
      // Make API call to update profile
      await api.put('/auth/profile', {
        businessName: formData.name,
        role: formData.userType.toLowerCase(),
      });

      setSuccess(true);
      setProfileEditMode(false);

      // Refresh user data
      const response = await api.get('/auth/me');
      setUserData(response.data.data.user);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Save bio changes
  const saveBioChanges = async () => {
    setLoading(true);
    try {
      // Make API call to update bio
      await api.put('/auth/profile', {
        vendorType: formData.role,
        address1: formData.address,
        city: formData.location.split(',')[0].trim(),
        state: formData.location.split(',')[1]?.trim() || '',
        pincode: formData.pincode,
        phoneNumber: formData.phoneNumber,
        gstNumber: formData.gstNumber,
        isBuyer: !formData.availability,
      });

      setSuccess(true);
      setBioEditMode(false);

      // Refresh user data
      const response = await api.get('/auth/me');
      setUserData(response.data.data.user);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating bio:", error);
      setError("Failed to update profile details");
    } finally {
      setLoading(false);
    }
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
  };

  if (loading && !userData) {
    return (
      <Box sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 3 },
        minHeight: 'calc(100vh - 70px)',
        bgcolor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <LoadingIndicator text="Loading profile..." />
      </Box>
    );
  }

  if (error && !userData) {
    return (
      <Box sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 3 },
        minHeight: 'calc(100vh - 70px)',
        bgcolor: '#f5f5f5'
      }}>
        <NotificationAlert
          type="error"
          title="Error"
          message={error}
          showActionButton={false}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: { xs: 2, sm: 3 },
      minHeight: 'calc(100vh - 70px)',
      bgcolor: '#f5f5f5'
    }}>
      {success && (
        <NotificationAlert
          type="success"
          title="Profile Updated"
          message="Your profile has been successfully updated."
          showActionButton={false}
          sx={{ mb: 3 }}
        />
      )}

      {error && (
        <NotificationAlert
          type="error"
          title="Error"
          message={error}
          showActionButton={false}
          sx={{ mb: 3 }}
        />
      )}

      <Box sx={{ position: "relative", pb: 4 }}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: 600, 
            mb: 1,
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
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                position: "relative"
              }}
            >
              {loading && profileEditMode && <LoadingIndicator overlay text="Saving..." />}

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
                      },
                      '& .MuiInputBase-input': {
                        textAlign: 'center',
                        fontWeight: 600,
                      }
                    }}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
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
                    bgcolor: "#bdbdbd",
                    fontSize: "2.5rem",
                    margin: '0 auto',
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
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                position: "relative"
              }}
            >
              {loading && bioEditMode && <LoadingIndicator overlay text="Saving..." />}

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
                    }}
                  />
                </Box>

                <Divider sx={{ mb: 3 }} />

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
                          sx={{ mb: 1 }}
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
                          sx={{ mb: 1 }}
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
                          sx={{ mb: 1 }}
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
                              bgcolor: 'info.light',
                              color: 'white',
                              fontSize: '0.75rem',
                              height: '24px',
                              borderRadius: 1,
                              mr: 1,
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
                          sx={{ mb: 1 }}
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
                          sx={{ mb: 1 }}
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
                          sx={{ mb: 1 }}
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
                        <Typography variant="body1">
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
                            sx={{ mr: index < formData.tags.length - 1 ? 1 : 0 }}
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