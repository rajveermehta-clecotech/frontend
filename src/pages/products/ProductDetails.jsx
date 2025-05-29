import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Chip,
  Rating,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Switch,
  FormControlLabel,
  CardMedia,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  ArrowBack,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  AddPhotoAlternate as AddPhotoIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Info as InfoIcon,
  Timeline as TimelineIcon,
  Comment as CommentIcon,
  PhotoCamera,
  Close,
  ArrowBackIos,
  ArrowForwardIos
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import LoadingIndicator from "../../components/ui/LoadingIndicator";
import NotificationAlert from "../../components/ui/NotificationAlert";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // State
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Form state
  const [product, setProduct] = useState({
    id: '',
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
    rating: 0,
    reviewCount: 0,
    specifications: {},
    variants: [],
    reviews: []
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
  
  // Mock status options
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'out_of_stock', label: 'Out of Stock' },
    { value: 'archived', label: 'Archived' }
  ];
  
  // Mock specifications - in a real app, this would be specific to the product
  const specifications = [
    { name: 'Dimensions', value: '10 x 5 x 2 inches' },
    { name: 'Weight', value: '0.8 lbs' },
    { name: 'Material', value: 'Aluminum, Plastic' },
    { name: 'Color', value: 'Black, Silver, Rose Gold' },
    { name: 'Warranty', value: '1 Year Limited' },
    { name: 'Country of Origin', value: 'China' }
  ];
  
  // Mock reviews - in a real app, these would be fetched from an API
  const reviews = [
    {
      id: 1,
      user: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      date: '2025-05-10',
      comment: 'Excellent product! Works exactly as described and arrived quickly.',
      verified: true
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4,
      date: '2025-05-05',
      comment: 'Good quality for the price. Would recommend to others looking for this type of product.',
      verified: true
    },
    {
      id: 3,
      user: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 3,
      date: '2025-04-28',
      comment: 'Average product. It does the job but nothing special. Packaging could be improved.',
      verified: false
    }
  ];
  
  // Mock product data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API call to fetch product
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock product data based on ID
        const productData = {
          id: id,
          name: 'Premium Bluetooth Headphones',
          description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life. Features premium sound quality with deep bass and crystal clear highs. Compatible with all Bluetooth devices and includes a built-in microphone for calls.',
          category: 'Electronics',
          price: 129.99,
          discountPrice: 99.99,
          stock: 45,
          sku: 'BH-001',
          featured: true,
          status: 'active',
          images: [
            'https://randomuser.me/api/portraits/men/41.jpg', // Placeholder image
            'https://randomuser.me/api/portraits/women/67.jpg', // Placeholder image
            'https://randomuser.me/api/portraits/men/32.jpg', // Placeholder image
          ],
          rating: 4.5,
          reviewCount: 127,
          specifications: {
            'Brand': 'SoundMax',
            'Model': 'BT-Pro 500',
            'Color': 'Black',
            'Connectivity': 'Bluetooth 5.0',
            'Battery Life': '20 hours',
            'Weight': '250g',
            'Noise Cancellation': 'Yes',
            'Warranty': '1 Year'
          },
          variants: [
            { id: 1, name: 'Black', sku: 'BH-001-BLK', stock: 23, price: 99.99 },
            { id: 2, name: 'White', sku: 'BH-001-WHT', stock: 15, price: 99.99 },
            { id: 3, name: 'Blue', sku: 'BH-001-BLU', stock: 7, price: 109.99 }
          ],
          reviews: reviews
        };
        
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    if (editMode) {
      // If we're exiting edit mode without saving, reset form data
      setProduct(product); // Reset to original data
      setErrors({});
    }
    setEditMode(!editMode);
  };
  
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Save product changes
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    
    setSaveLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would save the product data to your backend here
      
      setSuccess(true);
      setEditMode(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };
  
  // Handle delete button click
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would delete the product from your backend here
      
      setDeleteDialogOpen(false);
      navigate('/products');
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
      setLoading(false);
    }
  };
  
  // Handle delete dialog close
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };
  
  // Format currency
  const formatCurrency = (value) => {
    if (value === '' || value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Generate breadcrumbs for product
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
  
  // If product is loading, show loading indicator
  if (loading && !product.id) {
    return (
      <AppLayout title="Product Details">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <LoadingIndicator text="Loading product details..." />
        </Box>
      </AppLayout>
    );
  }
  
  return (
      <Box sx={{ position: 'relative' }}>
        {saveLoading && <LoadingIndicator overlay text="Saving..." />}
        
        {generateBreadcrumbs()}
        
        {/* Product Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', md: 'center' }, 
          mb: { xs: 3, md: 4 },
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 0 }
        }}>
          <Box sx={{ width: { xs: '100%', md: '60%' } }}>
            {editMode ? (
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                sx={{ 
                  mb: 1,
                  maxWidth: 600
                }}
              />
            ) : (
              <Typography
                variant="h4"
                sx={{ 
                  fontWeight: 700, 
                  color: 'text.primary',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  mb: 1
                }}
              >
                {product.name}
              </Typography>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 1 }}>
              <Chip
                label={product.category}
                size="small"
                sx={{
                  borderRadius: '16px',
                  bgcolor: 'primary.light',
                  color: 'white',
                  fontWeight: 500,
                }}
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={product.rating} precision={0.5} size="small" readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.reviewCount} reviews)
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                SKU: {product.sku}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            width: { xs: '100%', md: 'auto' },
            flexDirection: { xs: 'row', sm: 'row' },
            justifyContent: { xs: 'flex-start', sm: 'flex-start' }
          }}>
            {editMode ? (
              <>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={toggleEditMode}
                  sx={{ 
                    borderRadius: 8,
                    px: 3,
                    borderColor: 'divider',
                    color: 'text.secondary',
                    '&:hover': {
                      borderColor: 'text.primary',
                      bgcolor: 'transparent',
                    },
                    flex: { xs: 1, sm: 'none' }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{ 
                    borderRadius: 8,
                    px: 3,
                    flex: { xs: 1, sm: 'none' }
                  }}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteClick}
                  sx={{ 
                    borderRadius: 8,
                    px: 3,
                    borderColor: 'error.main',
                    color: 'error.main',
                    '&:hover': {
                      borderColor: 'error.dark',
                      bgcolor: 'transparent',
                    },
                    flex: { xs: 1, sm: 'none' }
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={toggleEditMode}
                  sx={{ 
                    borderRadius: 8,
                    px: 3,
                    flex: { xs: 1, sm: 'none' }
                  }}
                >
                  Edit Product
                </Button>
              </>
            )}
          </Box>
        </Box>
        
        {/* Product Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile}
          allowScrollButtonsMobile
          sx={{
            mb: 3,
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              minWidth: { xs: 'auto', sm: 100 },
              px: { xs: 1, sm: 2 }
            }
          }}
        >
          <Tab label="Details" icon={<InfoIcon />} iconPosition="start" />
          <Tab label="Specifications" icon={<TimelineIcon />} iconPosition="start" />
          <Tab 
            label={`Reviews (${product.reviews.length})`} 
            icon={<CommentIcon />} 
            iconPosition="start" 
          />
        </Tabs>
        
        {/* Tab Content */}
        <Grid container spacing={3}>
          {/* Details Tab */}
          {activeTab === 0 && (
            <>
              <Grid item xs={12} md={7}>
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
                        mb: 2,
                        fontSize: { xs: '1rem', sm: '1.25rem' }
                      }}
                    >
                      Product Description
                    </Typography>
                    
                    {editMode ? (
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        multiline
                        rows={6}
                        variant="outlined"
                        sx={{ mb: 2 }}
                      />
                    ) : (
                      <Typography variant="body1" paragraph>
                        {product.description}
                      </Typography>
                    )}
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                            Price
                          </Typography>
                          {editMode ? (
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
                                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                              }}
                            />
                          ) : (
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                              {formatCurrency(product.price)}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                            Discount Price
                          </Typography>
                          {editMode ? (
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
                                startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                              }}
                            />
                          ) : (
                            <Typography variant="h6" sx={{ fontWeight: 600, color: product.discountPrice ? 'success.main' : 'text.secondary' }}>
                              {product.discountPrice ? formatCurrency(product.discountPrice) : 'No discount'}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                            Stock
                          </Typography>
                          {editMode ? (
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
                            />
                          ) : (
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 600, 
                                color: product.stock > 0 ? 'success.main' : 'error.main'
                              }}
                            >
                              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                            SKU
                          </Typography>
                          {editMode ? (
                            <TextField
                              fullWidth
                              label="SKU"
                              name="sku"
                              value={product.sku}
                              onChange={handleChange}
                              error={!!errors.sku}
                              helperText={errors.sku}
                              variant="outlined"
                            />
                          ) : (
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {product.sku}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                            Category
                          </Typography>
                          {editMode ? (
                            <FormControl fullWidth error={!!errors.category}>
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
                          ) : (
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {product.category}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                            Status
                          </Typography>
                          {editMode ? (
                            <FormControl fullWidth>
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
                          ) : (
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 600,
                                color: product.status === 'active' ? 'success.main' : 
                                       product.status === 'out_of_stock' ? 'error.main' : 
                                       'text.secondary'
                              }}
                            >
                              {statusOptions.find(option => option.value === product.status)?.label || 'Unknown'}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={product.featured}
                          onChange={handleSwitchChange}
                          name="featured"
                          color="primary"
                          disabled={!editMode}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StarIcon sx={{ color: 'warning.main', mr: 1, fontSize: '1.2rem' }} />
                          <Typography variant="body1">Featured Product</Typography>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>
                
                {/* Variants Section */}
                {product.variants && product.variants.length > 0 && (
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
                          mb: 2,
                          fontSize: { xs: '1rem', sm: '1.25rem' }
                        }}
                      >
                        Product Variants
                      </Typography>
                      
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Variant</TableCell>
                              <TableCell>SKU</TableCell>
                              <TableCell align="right">Price</TableCell>
                              <TableCell align="right">Stock</TableCell>
                              {editMode && <TableCell>Actions</TableCell>}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {product.variants.map((variant) => (
                              <TableRow key={variant.id}>
                                <TableCell>{variant.name}</TableCell>
                                <TableCell>{variant.sku}</TableCell>
                                <TableCell align="right">{formatCurrency(variant.price)}</TableCell>
                                <TableCell align="right">
                                  <Typography
                                    sx={{ 
                                      color: variant.stock > 0 ? 'success.main' : 'error.main',
                                      fontWeight: 500
                                    }}
                                  >
                                    {variant.stock > 0 ? variant.stock : 'Out of stock'}
                                  </Typography>
                                </TableCell>
                                {editMode && (
                                  <TableCell>
                                    <IconButton size="small" color="primary">
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                )}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      
                      {editMode && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<AddIcon />}
                          sx={{ 
                            mt: 2,
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
                      )}
                    </CardContent>
                  </Card>
                )}
              </Grid>
              
              <Grid item xs={12} md={5}>
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
                        mb: 2,
                        fontSize: { xs: '1rem', sm: '1.25rem' }
                      }}
                    >
                      Product Images
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {/* Main image */}
                      {product.images.length > 0 && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              position: 'relative',
                              width: '100%',
                              height: { xs: 200, sm: 300 },
                              borderRadius: 2,
                              overflow: 'hidden',
                              mb: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                            }}
                          >
                            <CardMedia
                              component="img"
                              image={product.images[0]}
                              alt={product.name}
                              sx={{ 
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                            
                            {editMode && (
                              <IconButton
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                                  '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                  }
                                }}
                                onClick={() => handleRemoveImage(0)}
                              >
                                <Close fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </Grid>
                      )}
                      
                      {/* Thumbnail images */}
                      <Grid container spacing={1} sx={{ mb: 2 }}>
                        {product.images.slice(1).map((image, index) => (
                          <Grid item xs={3} sm={4} md={3} key={index}>
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
                              <CardMedia
                                component="img"
                                image={image}
                                alt={`${product.name} - ${index + 2}`}
                                sx={{ 
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                              
                              {editMode && (
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
                                  onClick={() => handleRemoveImage(index + 1)}
                                >
                                  <Close fontSize="small" />
                                </IconButton>
                              )}
                            </Box>
                          </Grid>
                        ))}
                        
                        {/* Upload new image button - only in edit mode */}
                        {editMode && (
                          <Grid item xs={3} sm={4} md={3}>
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
                                  p: 1,
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
                                <AddPhotoIcon sx={{ mb: 0.5 }} />
                                <Typography variant="caption" align="center">
                                  Add
                                </Typography>
                              </Button>
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                      
                      {/* Image navigation controls - only for multiple images */}
                      {product.images.length > 1 && !editMode && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
                          <IconButton 
                            size="small" 
                            sx={{ 
                              border: '1px solid', 
                              borderColor: 'divider',
                              bgcolor: 'background.paper'
                            }}
                          >
                            <ArrowBackIos fontSize="small" />
                          </IconButton>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {product.images.map((_, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: idx === 0 ? 'primary.main' : 'divider'
                                }}
                              />
                            ))}
                          </Box>
                          <IconButton 
                            size="small" 
                            sx={{ 
                              border: '1px solid', 
                              borderColor: 'divider',
                              bgcolor: 'background.paper'
                            }}
                          >
                            <ArrowForwardIos fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
          
          {/* Specifications Tab */}
          {activeTab === 1 && (
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
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
                    Technical Specifications
                  </Typography>
                  
                  <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                    <Table>
                      <TableBody>
                        {Object.entries(product.specifications).map(([key, value], index) => (
                          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell 
                              component="th" 
                              scope="row"
                              sx={{ 
                                fontWeight: 500,
                                bgcolor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
                                width: '30%'
                              }}
                            >
                              {key}
                            </TableCell>
                            <TableCell sx={{ bgcolor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.02)' : 'transparent' }}>
                              {value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  {editMode && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                      sx={{ 
                        mt: 3,
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
                  )}
                </CardContent>
              </Card>
            </Grid>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 2 && (
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
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
                    Customer Reviews
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h3" sx={{ fontWeight: 600, mr: 2 }}>
                        {product.rating.toFixed(1)}
                      </Typography>
                      <Box>
                        <Rating value={product.rating} precision={0.5} readOnly />
                        <Typography variant="body2" color="text.secondary">
                          Based on {product.reviewCount} reviews
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  {product.reviews.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No reviews yet for this product.
                      </Typography>
                    </Box>
                  ) : (
                    <Stack spacing={3}>
                      {product.reviews.map((review) => (
                        <Box key={review.id}>
                          <Box sx={{ display: 'flex', mb: 2 }}>
                            <Avatar src={review.avatar} alt={review.user} sx={{ mr: 2 }} />
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>
                                  {review.user}
                                </Typography>
                                {review.verified && (
                                  <Chip
                                    label="Verified Purchase"
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: '0.7rem',
                                      bgcolor: 'success.light',
                                      color: 'success.dark',
                                      fontWeight: 500,
                                    }}
                                  />
                                )}
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Rating value={review.rating} size="small" readOnly />
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                  {formatDate(review.date)}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Typography variant="body2" paragraph>
                            {review.comment}
                          </Typography>
                          <Divider sx={{ mt: 2 }} />
                        </Box>
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
        
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Delete Product</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} sx={{ color: 'text.primary' }}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default ProductDetails;