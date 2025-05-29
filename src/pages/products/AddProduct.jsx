import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  FormGroup,
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material';
import {
  KeyboardArrowDown,
  CloudUpload,
  Add
} from '@mui/icons-material';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    subheading: '',
    description: '',
    price: '',
    stockStatus: 'In Stock',
    categories: []
  });

  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1518709479606-2c47f0ff2a95?w=400&h=300&fit=crop');

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

  const stockOptions = ['In Stock', 'Out of Stock', 'Limited Stock'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(cat => cat !== category)
        : [...prev.categories, category]
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', p: 3 }}>
      <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
        <Grid container spacing={3}>
          {/* Left Column - Product Information */}
          <Grid item xs={12} md={8}>
            <Card 
              sx={{ 
                borderRadius: 2, 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid',
                borderColor: 'grey.200'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'grey.900' }}>
                  Product Information
                </Typography>
                
                {/* Product Name */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'grey.700', mb: 1 }}>
                    Product Name <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    placeholder="Enter product name"
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'grey.300',
                        },
                        '&:hover fieldset': {
                          borderColor: 'grey.400',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Box>

                {/* Subheading */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'grey.700', mb: 1 }}>
                    Subheading <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.subheading}
                    onChange={(e) => handleInputChange('subheading', e.target.value)}
                    placeholder="Brief description or tagline"
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'grey.300',
                        },
                        '&:hover fieldset': {
                          borderColor: 'grey.400',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Box>

                {/* Description */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'grey.700', mb: 1 }}>
                    Description <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed product description"
                    multiline
                    rows={6}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'grey.300',
                        },
                        '&:hover fieldset': {
                          borderColor: 'grey.400',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Box>

                {/* Price and Stock Status */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'grey.700', mb: 1 }}>
                      Price ($) <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="0"
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'grey.300',
                          },
                          '&:hover fieldset': {
                            borderColor: 'grey.400',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                            borderWidth: 2,
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'grey.700', mb: 1 }}>
                      Stock Status <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        value={formData.stockStatus}
                        onChange={(e) => handleInputChange('stockStatus', e.target.value)}
                        IconComponent={KeyboardArrowDown}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'grey.300',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'grey.400',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                            borderWidth: 2,
                          },
                        }}
                      >
                        {stockOptions.map(option => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Categories and Product Image */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Categories */}
              <Card 
                sx={{ 
                  borderRadius: 2, 
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'grey.900' }}>
                    Categories <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                  </Typography>
                  
                  <FormGroup sx={{ maxHeight: 250, overflowY: 'auto' }}>
                    {categories.map((category) => (
                      <FormControlLabel
                        key={category}
                        control={
                          <Checkbox
                            checked={formData.categories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            size="small"
                            sx={{
                              color: 'grey.400',
                              '&.Mui-checked': {
                                color: 'primary.main',
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ color: 'grey.700' }}>
                            {category}
                          </Typography>
                        }
                        sx={{ mb: 0.5 }}
                      />
                    ))}
                  </FormGroup>
                  
                  {formData.categories.length === 0 && (
                    <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
                      Please select at least one category
                    </Typography>
                  )}
                </CardContent>
              </Card>

              {/* Product Image */}
              <Card 
                sx={{ 
                  borderRadius: 2, 
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'grey.900' }}>
                    Product Image
                  </Typography>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: 200,
                        border: '2px dashed',
                        borderColor: 'grey.300',
                        borderRadius: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'grey.50',
                        mb: 2,
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: 'primary.50',
                        }
                      }}
                      onClick={() => document.getElementById('image-upload').click()}
                    >
                      {selectedImage ? (
                        <Box
                          component="img"
                          src={selectedImage}
                          alt="Product"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 1
                          }}
                        />
                      ) : (
                        <>
                          <CloudUpload sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                          <Typography variant="body2" sx={{ color: 'grey.600' }}>
                            Click to upload image
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'grey.500', mt: 0.5 }}>
                            PNG, JPG, GIF up to 10MB
                          </Typography>
                        </>
                      )}
                    </Box>
                    
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<CloudUpload />}
                      onClick={() => document.getElementById('image-upload').click()}
                      sx={{
                        borderColor: 'grey.300',
                        color: 'grey.700',
                        '&:hover': {
                          bgcolor: 'grey.50',
                          borderColor: 'grey.400',
                        },
                      }}
                    >
                      Choose File
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button 
            variant="outlined" 
            sx={{ 
              px: 4, 
              py: 1.5,
              borderColor: 'grey.300',
              color: 'grey.700',
              '&:hover': {
                bgcolor: 'grey.50',
                borderColor: 'grey.400',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              px: 4, 
              py: 1.5,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Save Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;