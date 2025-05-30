import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  KeyboardArrowDown,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    subheading: '',
    description: '',
    price: '',
    stockStatus: 'In Stock',
    categories: []
  });

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

  const handleSave = () => {
    console.log('Saving product:', formData);
    // Handle save logic here
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      width: '100%',
      p: { xs: 2, sm: 3, md: 4 }
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleCancel}
          sx={{ 
            mb: 2,
            color: 'text.secondary',
            textTransform: 'none',
            fontSize: '14px',
            p: 1,
            '&:hover': { 
              bgcolor: 'action.hover',
              color: 'primary.main' 
            }
          }}
        >
          Back to Products
        </Button>
        
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600, 
            color: 'text.primary',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            mb: 1,
          }}
        >
          Add New Product
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            fontSize: { xs: '13px', md: '14px' },
          }}
        >
          Fill in the details for your new product
        </Typography>
      </Box>

      {/* Main Content Container */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 4 },
        width: '100%',
        alignItems: 'flex-start'
      }}>
        {/* Left Section - Product Information */}
        <Box sx={{
          flex: { xs: '1', md: '2' },
          width: { xs: '100%', md: 'auto' },
          minWidth: 0 // Prevents flex item from overflowing
        }}>
          <Box sx={{ 
            bgcolor: 'background.paper', 
            borderRadius: 2, 
            p: { xs: 2, sm: 3 },
            width: '100%',
            boxShadow: theme.shadows[1],
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 3, 
                color: 'text.primary',
                fontSize: { xs: '16px', md: '18px' }
              }}
            >
              Product Information
            </Typography>
            
            {/* Product Name */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 500, 
                  color: 'text.primary', 
                  mb: 1,
                  fontSize: '14px'
                }}
              >
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
                    bgcolor: 'background.paper',
                    height: '40px',
                    '& fieldset': {
                      borderColor: 'divider',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>

            {/* Subheading */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 500, 
                  color: 'text.primary', 
                  mb: 1,
                  fontSize: '14px'
                }}
              >
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
                    bgcolor: 'background.paper',
                    height: '40px',
                    '& fieldset': {
                      borderColor: 'divider',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 500, 
                  color: 'text.primary', 
                  mb: 1,
                  fontSize: '14px'
                }}
              >
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
                    bgcolor: 'background.paper',
                    '& fieldset': {
                      borderColor: 'divider',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>

            {/* Price and Stock Status Row */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 3 }
            }}>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500, 
                    color: 'text.primary', 
                    mb: 1,
                    fontSize: '14px'
                  }}
                >
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
                      bgcolor: 'background.paper',
                      height: '40px',
                      '& fieldset': {
                        borderColor: 'divider',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500, 
                    color: 'text.primary', 
                    mb: 1,
                    fontSize: '14px'
                  }}
                >
                  Stock Status <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.stockStatus}
                    onChange={(e) => handleInputChange('stockStatus', e.target.value)}
                    IconComponent={KeyboardArrowDown}
                    displayEmpty
                    sx={{
                      bgcolor: 'background.paper',
                      height: '40px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'divider',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    {stockOptions.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Section - Categories and Product Image */}
        <Box sx={{
          flex: { xs: '1', md: '1' },
          width: { xs: '100%', md: 'auto' },
          minWidth: { xs: 'auto', md: '300px' },
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          {/* Categories */}
          <Box sx={{ 
            bgcolor: 'background.paper', 
            borderRadius: 2, 
            p: { xs: 2, sm: 3 },
            width: '100%',
            boxShadow: theme.shadows[1],
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2, 
                color: 'text.primary',
                fontSize: { xs: '16px', md: '18px' }
              }}
            >
              Categories <Box component="span" sx={{ color: 'error.main' }}>*</Box>
            </Typography>
            
            <FormGroup sx={{ 
              gap: 0.5,
              maxHeight: { xs: '200px', md: '250px' },
              overflowY: 'auto'
            }}>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      size="small"
                      sx={{
                        color: 'action.disabled',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 18,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.primary',
                        fontSize: '14px',
                        fontWeight: 400
                      }}
                    >
                      {category}
                    </Typography>
                  }
                  sx={{ 
                    m: 0,
                    '& .MuiFormControlLabel-label': {
                      ml: 1
                    }
                  }}
                />
              ))}
            </FormGroup>
            
            {formData.categories.length === 0 && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'error.main', 
                  mt: 1,
                  fontSize: '12px'
                }}
              >
                Please select at least one category
              </Typography>
            )}
          </Box>

          {/* Product Image */}
          <Box sx={{ 
            bgcolor: 'background.paper', 
            borderRadius: 2, 
            p: { xs: 2, sm: 3 },
            width: '100%',
            boxShadow: theme.shadows[1],
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2, 
                color: 'text.primary',
                fontSize: { xs: '16px', md: '18px' }
              }}
            >
              Product Image
            </Typography>
            
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: '100%',
                  height: { xs: '180px', sm: '200px', md: '220px' },
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 2,
                  cursor: 'pointer',
                  background: 'linear-gradient(45deg, #000 0%, #003300 50%, #000 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(0, 255, 0, 0.03) 2px,
                      rgba(0, 255, 0, 0.03) 4px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 2px,
                      rgba(0, 255, 0, 0.03) 2px,
                      rgba(0, 255, 0, 0.03) 4px
                    )`,
                  },
                  '&::after': {
                    content: '"01001001 11010110 00110100 10101010 01110011 11001100 00111001 10010110 11010101 00110011 10101001 01110110 00110100 11001010 01110011 10001100"',
                    position: 'absolute',
                    inset: 0,
                    color: 'rgba(0, 255, 0, 0.1)',
                    fontFamily: 'monospace',
                    fontSize: { xs: '6px', sm: '8px' },
                    lineHeight: { xs: '10px', sm: '12px' },
                    wordSpacing: '4px',
                    overflow: 'hidden',
                    whiteSpace: 'pre-wrap',
                    padding: '8px',
                  }
                }}
              >
                <Box sx={{ 
                  position: 'relative', 
                  zIndex: 2, 
                  textAlign: 'center',
                  color: '#00ff00',
                  textShadow: '0 0 10px rgba(0,255,0,0.5)'
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#00ff00', 
                      fontWeight: 500,
                      fontSize: { xs: '14px', sm: '16px' },
                      mb: 0.5
                    }}
                  >
                    Activate Windows
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#00ff00',
                      fontSize: { xs: '10px', sm: '12px' },
                      opacity: 0.8
                    }}
                  >
                    Go to Settings to activate Windows
                  </Typography>
                </Box>
              </Box>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '12px',
                  textAlign: 'left'
                }}
              >
                Choose from samples:
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: { xs: 'stretch', sm: 'flex-end' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2, 
        mt: 4,
        pt: 3,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}>
        <Button 
          variant="outlined" 
          onClick={handleCancel}
          sx={{ 
            px: { xs: 2, sm: 3 }, 
            py: 1,
            borderColor: 'divider',
            color: 'text.primary',
            textTransform: 'none',
            order: { xs: 2, sm: 1 },
            '&:hover': {
              bgcolor: 'action.hover',
              borderColor: 'text.secondary',
            },
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSave}
          sx={{ 
            px: { xs: 2, sm: 3 }, 
            py: 1,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            textTransform: 'none',
            order: { xs: 1, sm: 2 },
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          Save Product
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;