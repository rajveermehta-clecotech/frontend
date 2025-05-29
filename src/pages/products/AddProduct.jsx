import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Divider,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  Stack,
  Chip,
  Paper,
  InputAdornment,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  ArrowBack,
  Save as SaveIcon,
  Cancel as CancelIcon,
  AddPhotoAlternate as AddPhotoIcon,
  Close as CloseIcon,
  Star as StarIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import LoadingIndicator from "../../components/ui/LoadingIndicator";
import NotificationAlert from "../../components/ui/NotificationAlert";

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Loading and notification states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  // Form state
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    discountPrice: '',
    stock: '',
    sku: '',
    featured: false,
    status: 'active',
    images: [],
    specifications: [],
    variants: []
  });
  
  // Form validation errors
  const [errors, setErrors] = useState({});
  
  // Mock categories - in a real app, these would be fetched from an API
  const categories = [
    'Electronics',
    'Clothing',
    'Home Decor',
    'Furniture',
    'Kitchen',
    'Beauty',
    'Sports',
    'Books',
    'Toys',
    'Jewelry',
    'Photography',
    'Other'
  ];
  
  // Status options
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'archived', label: 'Archived' }
  ];
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For price and discountPrice, ensure numeric values
    if (name === 'price' || name === 'discountPrice' || name === 'stock') {
      const numValue = value === '' ? '' : Number(value);
      setProduct({
        ...product,
        [name]: numValue
      });
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
    
    // Clear validation errors when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Handle switch/checkbox changes
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setProduct({
      ...product,
      [name]: checked
    });
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    // In a real app, you would handle file upload to server here
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProduct({
          ...product,
          images: [...product.images, reader.result]
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Remove image
  const handleRemoveImage = (index) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    setProduct({
      ...product,
      images: updatedImages
    });
  };
  
  // Add specification field
  const handleAddSpecification = () => {
    setProduct({
      ...product,
      specifications: [...product.specifications, { name: '', value: '' }]
    });
  };
  
  // Update specification field
  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...product.specifications];
    updatedSpecs[index][field] = value;
    setProduct({
      ...product,
      specifications: updatedSpecs
    });
  };
  
  // Remove specification field
  const handleRemoveSpecification = (index) => {
    const updatedSpecs = [...product.specifications];
    updatedSpecs.splice(index, 1);
    setProduct({
      ...product,
      specifications: updatedSpecs
    });
  };
  
  // Add variant field
  const handleAddVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, { name: '', sku: '', price: '', stock: '' }]
    });
  };
  
  // Update variant field
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...product.variants];
    
    // For price and stock, ensure numeric values
    if (field === 'price' || field === 'stock') {
      updatedVariants[index][field] = value === '' ? '' : Number(value);
    } else {
      updatedVariants[index][field] = value;
    }
    
    setProduct({
      ...product,
      variants: updatedVariants
    });
  };
  
  // Remove variant field
  const handleRemoveVariant = (index) => {
    const updatedVariants = [...product.variants];
    updatedVariants.splice(index, 1);
    setProduct({
      ...product,
      variants: updatedVariants
    });
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!product.name) {
      newErrors.name = 'Product name is required';
    }
    
    if (!product.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!product.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(product.price) || product.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (product.discountPrice && (isNaN(product.discountPrice) || product.discountPrice <= 0)) {
      newErrors.discountPrice = 'Discount price must be a positive number';
    }
    
    if (product.discountPrice && product.discountPrice >= product.price) {
      newErrors.discountPrice = 'Discount price must be less than regular price';
    }
    
    if (product.stock === '') {
      newErrors.stock = 'Stock quantity is required';
    } else if (isNaN(product.stock) || product.stock < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    }
    
    if (!product.sku) {
      newErrors.sku = 'SKU is required';
    }
    
    if (product.images.length === 0) {
      newErrors.images = 'At least one product image is required';
    }
    
    // Validate specifications
    product.specifications.forEach((spec, index) => {
      if (!spec.name && spec.value) {
        newErrors[`spec_${index}_name`] = 'Specification name is required';
      }
      if (spec.name && !spec.value) {
        newErrors[`spec_${index}_value`] = 'Specification value is required';
      }
    });
    
    // Validate variants
    product.variants.forEach((variant, index) => {
      if (!variant.name) {
        newErrors[`variant_${index}_name`] = 'Variant name is required';
      }
      if (!variant.sku) {
        newErrors[`variant_${index}_sku`] = 'Variant SKU is required';
      }
      if (!variant.price) {
        newErrors[`variant_${index}_price`] = 'Variant price is required';
      } else if (isNaN(variant.price) || variant.price <= 0) {
        newErrors[`variant_${index}_price`] = 'Variant price must be a positive number';
      }
      if (variant.stock === '') {
        newErrors[`variant_${index}_stock`] = 'Variant stock is required';
      } else if (isNaN(variant.stock) || variant.stock < 0) {
        newErrors[`variant_${index}_stock`] = 'Variant stock must be a non-negative number';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // If validation fails, scroll to the top to show error messages
      window.scrollTo(0, 0);
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the product data to your backend here
      
      setSuccess(true);
      
      // Reset form after successful submission
      // In a real app, you might redirect to the product listing or detail page
      setTimeout(() => {
        navigate('/products');
      }, 1500);
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
      setLoading(false);
    }
  };
  
  // Handle cancel button click
  const handleCancel = () => {
    navigate('/products');
  };
  
  // Generate breadcrumbs
  const generateBreadcrumbs = () => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/products')}
          sx={{ 
            color: 'text.secondary',
            '&:hover': { bgcolor: 'transparent', color: 'primary.main' }
          }}
        >
          Back to Products
        </Button>
      </Box>
    );
  };
  
  return (
      // {success && (
      //   <NotificationAlert
      //     type="success"
      //     title="Product Created"
      //     message="Your product has been successfully created."
      //     showActionButton={false}
      //     sx={{ mb: 3 }}
      //   />
      // )}
      
      // {error && (
      //   <NotificationAlert
      //     type="error"
      //     title="Error"
      //     message={error}
      //     showActionButton={false}
      //     sx={{ mb: 3 }}
      //   />
      // )}
      
      <Box sx={{ position: 'relative' }}>
        {loading && <LoadingIndicator overlay text="Creating product..." />}
        
        {generateBreadcrumbs()}
        
        <form onSubmit={handleSubmit}>
          {/* Page Header */}
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              sx={{ 
                fontWeight: 700, 
                color: 'text.primary',
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                mb: 1
              }}
            >
              Add New Product
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Fill in the details below to create a new product
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  mb: 3,
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 600, 
                      mb: 3,
                      fontSize: { xs: '1rem', sm: '1.25rem' }
                    }}
                  >
                    Basic Information
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Product Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Product Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!errors.category} required>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                          labelId="category-label"
                          name="category"
                          value={product.category}
                          onChange={handleChange}
                          label="Category"
                        >
                          {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.category && (
                          <FormHelperText>{errors.category}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                          labelId="status-label"
                          name="status"
                          value={product.status}
                          onChange={handleChange}
                          label="Status"
                        >
                          {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                        variant="outlined"
                        type="number"
                        inputProps={{ min: 0, step: "0.01" }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Discount Price (Optional)"
                        name="discountPrice"
                        value={product.discountPrice}
                        onChange={handleChange}
                        error={!!errors.discountPrice}
                        helperText={errors.discountPrice}
                        variant="outlined"
                        type="number"
                        inputProps={{ min: 0, step: "0.01" }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Stock Quantity"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        error={!!errors.stock}
                        helperText={errors.stock}
                        variant="outlined"
                        type="number"
                        inputProps={{ min: 0, step: 1 }}
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="SKU (Stock Keeping Unit)"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        error={!!errors.sku}
                        helperText={errors.sku}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={product.featured}
                              onChange={handleSwitchChange}
                              name="featured"
                              color="primary"
                            />
                          }
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <StarIcon sx={{ color: 'warning.main', mr: 1, fontSize: '1.2rem' }} />
                              <Typography variant="body1">Featured Product</Typography>
                            </Box>
                          }
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              
              {/* Specifications */}
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  mb: 3,
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 600, 
                      mb: 3,
                      fontSize: { xs: '1rem', sm: '1.25rem' }
                    }}
                  >
                    Specifications (Optional)
                  </Typography>
                  
                  {product.specifications.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        No specifications added yet
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddSpecification}
                        sx={{ 
                          mt: 1,
                          borderRadius: 8,
                          borderColor: 'divider',
                          color: 'text.primary',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'transparent'
                          }
                        }}
                      >
                        Add Specification
                      </Button>
                    </Box>
                  ) : (
                    <>
                      {product.specifications.map((spec, index) => (
                        <Box
                          key={index}
                          sx={{
                            mb: 2,
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: 'background.paper'
                          }}
                        >
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={5}>
                              <TextField
                                fullWidth
                                label="Specification Name"
                                value={spec.name}
                                onChange={(e) => handleSpecificationChange(index, 'name', e.target.value)}
                                error={!!errors[`spec_${index}_name`]}
                                helperText={errors[`spec_${index}_name`]}
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <TextField
                                fullWidth
                                label="Specification Value"
                                value={spec.value}
                                onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                                error={!!errors[`spec_${index}_value`]}
                                helperText={errors[`spec_${index}_value`]}
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <IconButton
                                color="error"
                                onClick={() => handleRemoveSpecification(index)}
                                sx={{ float: 'right' }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                      
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddSpecification}
                        sx={{ 
                          mt: 1,
                          borderRadius: 8,
                          borderColor: 'divider',
                          color: 'text.primary',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'transparent'
                          }
                        }}
                      >
                        Add Another Specification
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
              
              {/* Variants */}
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  mb: 3,
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 600, 
                      mb: 3,
                      fontSize: { xs: '1rem', sm: '1.25rem' }
                    }}
                  >
                    Product Variants (Optional)
                  </Typography>
                  
                  {product.variants.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        No variants added yet
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddVariant}
                        sx={{ 
                          mt: 1,
                          borderRadius: 8,
                          borderColor: 'divider',
                          color: 'text.primary',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'transparent'
                          }
                        }}
                      >
                        Add Variant
                      </Button>
                    </Box>
                  ) : (
                    <>
                      {product.variants.map((variant, index) => (
                        <Paper
                          key={index}
                          elevation={0}
                          sx={{
                            mb: 3,
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              Variant #{index + 1}
                            </Typography>
                            <IconButton color="error" onClick={() => handleRemoveVariant(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Variant Name (e.g. Color, Size)"
                                value={variant.name}
                                onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                                error={!!errors[`variant_${index}_name`]}
                                helperText={errors[`variant_${index}_name`]}
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Variant SKU"
                                value={variant.sku}
                                onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                                error={!!errors[`variant_${index}_sku`]}
                                helperText={errors[`variant_${index}_sku`]}
                                variant="outlined"
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Price"
                                value={variant.price}
                                onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                error={!!errors[`variant_${index}_price`]}
                                helperText={errors[`variant_${index}_price`]}
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0, step: "0.01" }}
                                InputProps={{
                                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Stock"
                                value={variant.stock}
                                onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                                error={!!errors[`variant_${index}_stock`]}
                                helperText={errors[`variant_${index}_stock`]}
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0, step: 1 }}
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}
                      
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddVariant}
                        sx={{ 
                          mt: 1,
                          borderRadius: 8,
                          borderColor: 'divider',
                          color: 'text.primary',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'transparent'
                          }
                        }}
                      >
                        Add Another Variant
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
            
            {/* Images */}
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: errors.images ? 'error.main' : 'divider',
                  mb: 3,
                  position: { xs: 'static', md: 'sticky' },
                  top: { md: 100 },
                  zIndex: 1
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      fontSize: { xs: '1rem', sm: '1.25rem' }
                    }}
                  >
                    Product Images
                  </Typography>
                  
                  {errors.images && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="error.main">
                        {errors.images}
                      </Typography>
                    </Box>
                  )}
                  
                  <Box
                    sx={{
                      width: '100%',
                      height: 180,
                      borderRadius: 2,
                      border: '2px dashed',
                      borderColor: errors.images ? 'error.main' : 'divider',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      mb: 3,
                      p: 2,
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'rgba(94, 72, 232, 0.04)',
                      }
                    }}
                    component="label"
                  >
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <AddPhotoIcon sx={{ color: 'text.secondary', fontSize: 40, mb: 1 }} />
                    <Typography variant="body1" sx={{ mb: 0.5, textAlign: 'center' }}>
                      Click to upload product images
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                      Supports JPG, PNG, WEBP (max 5MB)
                    </Typography>
                  </Box>
                  
                  {product.images.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Uploaded Images ({product.images.length})
                      </Typography>
                      
                      {/* Uploaded images grid with thumbnails */}
                      <Grid container spacing={1} sx={{ mb: 2 }}>
                        {product.images.map((image, index) => (
                          <Grid item xs={4} sm={3} key={index}>
                            <Box
                              sx={{
                                position: 'relative',
                                width: '100%',
                                paddingTop: '100%', // 1:1 Aspect ratio
                                borderRadius: 2,
                                overflow: 'hidden',
                                border: '1px solid',
                                borderColor: 'divider',
                              }}
                            >
                              <Box
                                component="img"
                                src={image}
                                alt={`Product image ${index + 1}`}
                                sx={{ 
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                              
                              <IconButton
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                                  '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                  },
                                  width: 24,
                                  height: 24,
                                }}
                                onClick={() => handleRemoveImage(index)}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                        
                        {/* Add more images button */}
                        {product.images.length > 0 && (
                          <Grid item xs={4} sm={3}>
                            <Box
                              sx={{
                                position: 'relative',
                                width: '100%',
                                paddingTop: '100%', // 1:1 Aspect ratio
                                borderRadius: 2,
                                border: '2px dashed',
                                borderColor: 'divider',
                                overflow: 'hidden',
                              }}
                            >
                              <Button
                                component="label"
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'text.secondary',
                                  '&:hover': {
                                    bgcolor: 'rgba(94, 72, 232, 0.04)',
                                  }
                                }}
                              >
                                <input
                                  type="file"
                                  hidden
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                />
                                <AddIcon fontSize="small" />
                                <Typography variant="caption" align="center">
                                  Add More
                                </Typography>
                              </Button>
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  )}
                  
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Image Guidelines:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                      <Typography variant="body2" component="li" sx={{ mb: 0.5 }}>
                        Use high-quality images (at least 800x800px)
                      </Typography>
                      <Typography variant="body2" component="li" sx={{ mb: 0.5 }}>
                        Maintain a consistent aspect ratio
                      </Typography>
                      <Typography variant="body2" component="li" sx={{ mb: 0.5 }}>
                        Use white or transparent backgrounds
                      </Typography>
                      <Typography variant="body2" component="li">
                        Show the product from multiple angles
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Form Actions */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mt: 4,
              mb: { xs: 4, sm: 2 },
              position: 'sticky',
              bottom: { xs: 16, sm: 20 },
              bgcolor: 'background.default',
              py: 2,
              zIndex: 2,
              width: '100%'
            }}
          >
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              disabled={loading}
              sx={{ 
                borderRadius: 8,
                px: 3,
                borderColor: 'divider',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'text.primary',
                  bgcolor: 'transparent',
                },
                flex: { xs: '1 1 auto', sm: '0 1 auto' }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              type="submit"
              disabled={loading}
              sx={{ 
                borderRadius: 8,
                px: 3,
                flex: { xs: '1 1 auto', sm: '0 1 auto' }
              }}
            >
              Create Product
            </Button>
          </Box>
        </form>
      </Box>
  );
};

export default AddProduct;