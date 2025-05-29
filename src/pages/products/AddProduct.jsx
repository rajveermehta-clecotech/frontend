import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Paper,
  FormHelperText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  transition: 'box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  },
}));

const ImageUploadArea = styled(Paper)(({ theme }) => ({
  border: '2px dashed #d0d0d0',
  borderRadius: '12px',
  padding: '32px 16px',
  textAlign: 'center',
  backgroundColor: '#fafafa',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginBottom: '16px',
  minHeight: '180px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    borderColor: '#1976d2',
    backgroundColor: '#f3f8ff',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '24px 12px',
    minHeight: '150px',
  },
}));

const ImagePreview = styled('img')(({ theme }) => ({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  [theme.breakpoints.down('sm')]: {
    height: '160px',
  },
}));

const RequiredSpan = styled('span')({
  color: '#d32f2f',
});

const CategoriesContainer = styled(Box)(({ theme }) => ({
  maxHeight: '280px',
  overflowY: 'auto',
  padding: '4px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#c1c1c1',
    borderRadius: '10px',
    '&:hover': {
      background: '#a8a8a8',
    },
  },
}));

const ResponsiveContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '32px',
  alignItems: 'flex-start',
  [theme.breakpoints.down('lg')]: {
    gap: '24px',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '24px',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: '1 1 65%',
  minWidth: 0,
  [theme.breakpoints.down('md')]: {
    flex: '1 1 100%',
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  flex: '1 1 35%',
  minWidth: '280px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  [theme.breakpoints.down('md')]: {
    flex: '1 1 100%',
    minWidth: 'unset',
  },
  [theme.breakpoints.down('sm')]: {
    gap: '20px',
  },
}));

const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '16px',
  marginTop: '32px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    gap: '12px',
    marginTop: '24px',
  },
}));

const AddProduct = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    productName: '',
    subheading: '',
    description: '',
    price: '',
    stockStatus: 'In Stock',
    categories: [],
    image: null
  });

  const [imagePreview, setImagePreview] = useState('');
  const [categoriesError, setCategoriesError] = useState(false);

  const categories = [
    'Electronics',
    'Computers',
    'Industrial Equipment',
    'IoT',
    'Sensors',
    'Infrastructure',
    'Cable Management',
    'Automation'
  ];

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCategoryChange = (category) => (event) => {
    const isChecked = event.target.checked;
    setFormData(prev => ({
      ...prev,
      categories: isChecked 
        ? [...prev.categories, category]
        : prev.categories.filter(cat => cat !== category)
    }));
    
    if (isChecked && categoriesError) {
      setCategoriesError(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          image: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateCategories = () => {
    if (formData.categories.length === 0) {
      setCategoriesError(true);
      return false;
    }
    setCategoriesError(false);
    return true;
  };

  const handleSave = () => {
    const isValid = validateCategories();
    
    if (isValid) {
      alert('Product saved successfully!');
      console.log('Form data:', formData);
    }
  };

  const handleCancel = () => {
    setFormData({
      productName: '',
      subheading: '',
      description: '',
      price: '',
      stockStatus: 'In Stock',
      categories: [],
      image: null
    });
    setImagePreview('');
    setCategoriesError(false);
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      fontSize: '14px',
      borderRadius: '8px',
      '&:hover fieldset': {
        borderColor: '#1976d2',
      },
      '&.Mui-focused fieldset': {
        borderWidth: '2px',
        borderColor: '#1976d2',
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px',
      fontWeight: 500,
      color: '#555',
    },
  };

  return (
    <Box
      sx={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        backgroundColor: '#f8fafc',
        padding: { xs: '16px', sm: '24px', md: '32px' },
        minHeight: '100vh',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <ResponsiveContainer>
        {/* Main Content - Product Information */}
        <MainContent>
          <StyledCard>
            <CardContent sx={{ 
              padding: { xs: '20px', sm: '24px', md: '32px' },
            }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '16px', sm: '18px' },
                  fontWeight: 600,
                  color: '#1a202c',
                  marginBottom: { xs: '20px', sm: '24px' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                📝 Product Information
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: { xs: '20px', sm: '24px' } 
              }}>
                <TextField
                  fullWidth
                  label={
                    <span>
                      Product Name <RequiredSpan>*</RequiredSpan>
                    </span>
                  }
                  placeholder="Enter product name"
                  value={formData.productName}
                  onChange={handleInputChange('productName')}
                  sx={textFieldStyles}
                />

                <TextField
                  fullWidth
                  label={
                    <span>
                      Subheading <RequiredSpan>*</RequiredSpan>
                    </span>
                  }
                  placeholder="Brief description or tagline"
                  value={formData.subheading}
                  onChange={handleInputChange('subheading')}
                  sx={textFieldStyles}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={isMobile ? 4 : 5}
                  label={
                    <span>
                      Description <RequiredSpan>*</RequiredSpan>
                    </span>
                  }
                  placeholder="Detailed product description"
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  sx={textFieldStyles}
                />

                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: '20px', sm: '16px' }
                }}>
                  <TextField
                    fullWidth
                    type="number"
                    label={
                      <span>
                        Price ($) <RequiredSpan>*</RequiredSpan>
                      </span>
                    }
                    placeholder="0"
                    value={formData.price}
                    onChange={handleInputChange('price')}
                    sx={textFieldStyles}
                  />
                  
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#555',
                      }}
                    >
                      Stock Status <RequiredSpan>*</RequiredSpan>
                    </InputLabel>
                    <Select
                      value={formData.stockStatus}
                      onChange={handleInputChange('stockStatus')}
                      sx={{
                        fontSize: '14px',
                        borderRadius: '8px',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderWidth: '2px',
                          borderColor: '#1976d2',
                        },
                      }}
                    >
                      <MenuItem value="In Stock">✅ In Stock</MenuItem>
                      <MenuItem value="Out of Stock">❌ Out of Stock</MenuItem>
                      <MenuItem value="Limited Stock">⚠️ Limited Stock</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </MainContent>

        {/* Sidebar - Categories and Product Image */}
        <Sidebar>
          {/* Categories */}
          <StyledCard>
            <CardContent sx={{ 
              padding: { xs: '20px', sm: '24px' },
            }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '16px', sm: '18px' },
                  fontWeight: 600,
                  color: '#1a202c',
                  marginBottom: { xs: '16px', sm: '20px' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🏷️ Categories <RequiredSpan>*</RequiredSpan>
              </Typography>

              <CategoriesContainer>
                <FormGroup>
                  {categories.map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          checked={formData.categories.includes(category)}
                          onChange={handleCategoryChange(category)}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 18,
                            },
                            '&.Mui-checked': {
                              color: '#1976d2',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: '14px',
                            color: '#4a5568',
                            fontWeight: formData.categories.includes(category) ? 500 : 400,
                          }}
                        >
                          {category}
                        </Typography>
                      }
                      sx={{ 
                        marginBottom: '8px',
                        marginLeft: 0,
                        '& .MuiFormControlLabel-label': {
                          marginLeft: '8px',
                        },
                      }}
                    />
                  ))}
                </FormGroup>
              </CategoriesContainer>

              {categoriesError && (
                <FormHelperText
                  error
                  sx={{
                    fontSize: '12px',
                    marginTop: '12px',
                    marginLeft: 0,
                  }}
                >
                  Please select at least one category
                </FormHelperText>
              )}
            </CardContent>
          </StyledCard>

          {/* Product Image */}
          <StyledCard>
            <CardContent sx={{ 
              padding: { xs: '20px', sm: '24px' },
            }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '16px', sm: '18px' },
                  fontWeight: 600,
                  color: '#1a202c',
                  marginBottom: { xs: '16px', sm: '20px' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🖼️ Product Image
              </Typography>

              {!imagePreview ? (
                <ImageUploadArea
                  onClick={() => document.getElementById('imageInput').click()}
                >
                  <PhotoCameraIcon
                    sx={{
                      fontSize: { xs: '40px', sm: '48px' },
                      color: '#a0aec0',
                      marginBottom: '12px',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: '13px', sm: '14px' },
                      color: '#4a5568',
                      marginBottom: '4px',
                      fontWeight: 500,
                    }}
                  >
                    Click to upload image
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '11px', sm: '12px' },
                      color: '#718096',
                    }}
                  >
                    PNG, JPG, GIF up to 10MB
                  </Typography>
                </ImageUploadArea>
              ) : (
                <Box sx={{ marginBottom: '16px' }}>
                  <ImagePreview src={imagePreview} alt="Product preview" />
                </Box>
              )}

              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />

              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={() => document.getElementById('imageInput').click()}
                fullWidth={isMobile}
                sx={{
                  color: '#4a5568',
                  borderColor: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '8px',
                  padding: '10px 20px',
                  '&:hover': {
                    backgroundColor: '#f7fafc',
                    borderColor: '#cbd5e0',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {imagePreview ? 'Change Image' : 'Choose File'}
              </Button>
            </CardContent>
          </StyledCard>
        </Sidebar>
      </ResponsiveContainer>

      {/* Action Buttons */}
      <ActionButtonsContainer>
        <Button
          variant="outlined"
          onClick={handleCancel}
          fullWidth={isMobile}
          sx={{
            padding: '12px 32px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#4a5568',
            borderColor: '#e2e8f0',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#f7fafc',
              borderColor: '#cbd5e0',
            },
            transition: 'all 0.2s ease',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          fullWidth={isMobile}
          sx={{
            padding: '12px 32px',
            fontSize: '14px',
            fontWeight: 600,
            backgroundColor: '#1976d2',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          Save Product
        </Button>
      </ActionButtonsContainer>
    </Box>
  );
};

export default AddProduct;