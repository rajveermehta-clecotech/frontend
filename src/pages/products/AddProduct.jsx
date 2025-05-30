import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  KeyboardArrowDown,
  ArrowBack,
  CloudUpload,
  Delete,
  Close,
  Add,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: 'Navy Blue Sneakers Shoe',
    category: 'Men',
    subCategory: 'Shoe',
    price: '$175',
    description: 'The lifestyle sneakers collection is just what you need to complete a sporty look. Shaft measures approximately low-top from arch Mesh fabric panels at front, sides, and collar for breathable comfort from cushioned comfort insole with arch support. Shock-absorbing.',
    tags: ['Sneaker', 'Shoe', 'Footwear', 'Fashion', 'Blue', 'Stylish', 'Nike', 'Menshoes']
  });

  const [uploadedImages, setUploadedImages] = useState([
    { name: 'Navy Blue Shoe 01.png', size: '462 kB', progress: 100 },
    { name: 'Navy Blue Shoe 02.png', size: '512 kB', progress: 100 },
    { name: 'Navy Blue Shoe 03.png', size: '478 kB', progress: 100 },
    { name: 'Navy Blue Shoe 04.png', size: '1.28MB/sec', progress: 75, uploading: true }
  ]);

  const [newTag, setNewTag] = useState('');

  const categories = ['Men', 'Women', 'Kids', 'Electronics', 'Sports'];
  const subCategories = {
    'Men': ['Shoe', 'Clothing', 'Accessories'],
    'Women': ['Shoe', 'Clothing', 'Accessories'],
    'Kids': ['Shoe', 'Clothing', 'Toys'],
    'Electronics': ['Phones', 'Computers', 'Gadgets'],
    'Sports': ['Equipment', 'Apparel', 'Footwear']
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleRemoveImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    console.log('Publishing product:', formData);
    // Handle publish logic here
  };

  const handleCancel = () => {
    navigate('/products');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
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
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            mb: 1,
          }}
        >
          Add Product
        </Typography>
      </Box>

      {/* Main Content Container */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: { xs: 3, md: 4 },
        width: '100%',
        alignItems: 'flex-start'
      }}>
        {/* Left Section - Image Upload */}
        <Box sx={{
          flex: { xs: '1', lg: '1.2' },
          width: { xs: '100%', lg: 'auto' },
          minWidth: 0
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
            {/* Product Name */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  mb: 1,
                  fontSize: '14px'
                }}
              >
                Product Name
              </Typography>
              <TextField
                fullWidth
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                variant="outlined"
                size="small"
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

            {/* Category and Sub Category Row */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 3 },
              mb: 3
            }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: 'text.secondary',
                    mb: 1,
                    fontSize: '14px'
                  }}
                >
                  Category
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    IconComponent={KeyboardArrowDown}
                    sx={{
                      bgcolor: 'background.paper',
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
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: 'text.secondary',
                    mb: 1,
                    fontSize: '14px'
                  }}
                >
                  Sub Category
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.subCategory}
                    onChange={(e) => handleInputChange('subCategory', e.target.value)}
                    IconComponent={KeyboardArrowDown}
                    sx={{
                      bgcolor: 'background.paper',
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
                    {subCategories[formData.category]?.map(subCategory => (
                      <MenuItem key={subCategory} value={subCategory}>{subCategory}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Price */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  mb: 1,
                  fontSize: '14px'
                }}
              >
                Price
              </Typography>
              <TextField
                fullWidth
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                variant="outlined"
                size="small"
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

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  mb: 1,
                  fontSize: '14px'
                }}
              >
                Description
              </Typography>
              <TextField
                fullWidth
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                multiline
                rows={4}
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

            {/* Tags */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: 'text.secondary',
                  mb: 2,
                  fontSize: '14px'
                }}
              >
                Tags
              </Typography>

              {/* Existing Tags */}
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 2
              }}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    deleteIcon={<Close />}
                    size="small"
                    sx={{
                      bgcolor: index === 1 ? 'primary.main' : 'action.hover',
                      color: index === 1 ? 'white' : 'text.primary',
                      '& .MuiChip-deleteIcon': {
                        color: index === 1 ? 'white' : 'text.secondary',
                        '&:hover': {
                          color: index === 1 ? 'white' : 'text.primary',
                        }
                      }
                    }}
                  />
                ))}
              </Box>

              {/* Add New Tag */}
              <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center'
              }}>
                <TextField
                  size="small"
                  placeholder="Add a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={{
                    flex: 1,
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
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleAddTag}
                  startIcon={<Add />}
                  sx={{
                    textTransform: 'none',
                    borderColor: 'divider',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider'
            }}>
              <Button
                variant="contained"
                onClick={handlePublish}
                sx={{
                  px: 4,
                  py: 1,
                  bgcolor: 'primary.main',
                  color: 'white',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    boxShadow: 'none',
                  },
                }}
              >
                Publish Product
              </Button>
            </Box>
          </Box>
        </Box>





        {/* Right Section - Product Details */}
        <Box sx={{
          flex: { xs: '1', lg: '1' },
          width: { xs: '100%', lg: 'auto' },
          minWidth: { xs: 'auto', lg: '400px' },
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
                fontWeight: 500,
                mb: 3,
                color: 'text.secondary',
                fontSize: { xs: '16px', md: '18px' }
              }}
            >
              Add Images
            </Typography>

            {/* Upload Area */}
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'primary.main',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                mb: 3,
                cursor: 'pointer',
                bgcolor: 'background.default',
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}
            >
              <CloudUpload sx={{
                fontSize: 48,
                color: 'text.disabled',
                mb: 2
              }} />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 1
                }}
              >
                Drop your files here, or{' '}
                <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                  Browse
                </Box>
              </Typography>
            </Box>

            {/* Uploaded Images List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {uploadedImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: 'background.default',
                    borderRadius: 1,
                    gap: 2
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    JPG
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: 'text.primary',
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {image.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        display: 'block',
                        mb: image.uploading ? 1 : 0
                      }}
                    >
                      {image.size}
                    </Typography>

                    {image.uploading && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={image.progress}
                          sx={{
                            flex: 1,
                            height: 4,
                            borderRadius: 2,
                            bgcolor: 'action.hover',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'success.main'
                            }
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'success.main',
                            fontWeight: 500,
                            minWidth: 'fit-content'
                          }}
                        >
                          {image.progress}% done
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main',
                        bgcolor: 'error.light'
                      }
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>

            {uploadedImages.some(img => img.uploading) && (
              <Button
                variant="text"
                sx={{
                  mt: 2,
                  color: 'error.main',
                  textTransform: 'none',
                  fontSize: '12px'
                }}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default AddProduct;