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
  useTheme,
  Avatar
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
  ArrowForwardIos,
  Add
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
  
  // Mock categories
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
  
  // Mock reviews
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
  
  // Mock product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
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
            'https://randomuser.me/api/portraits/men/41.jpg',
            'https://randomuser.me/api/portraits/women/67.jpg',
            'https://randomuser.me/api/portraits/men/32.jpg',
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
      setProduct(product);
      setErrors({});
    }
    setEditMode(!editMode);
  };
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setEditMode(false);
      
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
            '&:hover': { 
              bgcolor: 'action.hover', 
              color: 'primary.main' 
            }
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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 400,
        bgcolor: 'background.default'
      }}>
        <LoadingIndicator text="Loading product details..." />
      </Box>
    );
  }
  
  return (
    <Box sx={{ 
      position: 'relative',
      bgcolor: 'background.default',
      minHeight: '100vh',
      p: 3
    }}>
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
                maxWidth: 600,
                bgcolor: 'background.paper'
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
                color: 'primary.dark',
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
                  borderRadius: 2,
                  px: 3,
                  borderColor: 'divider',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'text.primary',
                    bgcolor: 'action.hover',
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
                  borderRadius: 2,
                  px: 3,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  },
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
                  borderRadius: 2,
                  px: 3,
                  borderColor: 'error.main',
                  color: 'error.main',
                  '&:hover': {
                    borderColor: 'error.dark',
                    bgcolor: 'error.light',
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
                  borderRadius: 2,
                  px: 3,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  },
                  flex: { xs: 1, sm: 'none' }
                }}
              >
                Edit Product
              </Button>
            </>
          )}
        </Box>
      </Box>
      
      {/* Success/Error Messages */}
      {success && (
        <NotificationAlert
          type="success"
          title="Success"
          message="Product updated successfully!"
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
            px: { xs: 1, sm: 2 },
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'primary.main',
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
                  boxShadow: theme.shadows[1],
                  border: '1px solid',
                  borderColor: 'divider',
                  mb: 3,
                  bgcolor: 'background.paper'
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      color: 'text.primary'
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
                      sx={{ 
                        mb: 2,
                        bgcolor: 'background.paper'
                      }}
                    />
                  ) : (
                    <Typography 
                      variant="body1" 
                      paragraph
                      sx={{ color: 'text.primary' }}
                    >
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
                            sx={{ bgcolor: 'background.paper' }}
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
                            sx={{ bgcolor: 'background.paper' }}
                          />
                        ) : (
                          <Typography variant="h6" sx={{ fontWeight: 600, color: product.discountPrice ? 'success.main' : 'text.secondary' }}>
                            {product.discountPrice ? formatCurrency(product.discountPrice) : 'No discount'}
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
                        <Typography variant="body1" sx={{ color: 'text.primary' }}>
                          Featured Product
                        </Typography>
                      </Box>
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: theme.shadows[1],
                  border: '1px solid',
                  borderColor: 'divider',
                  mb: 3,
                  bgcolor: 'background.paper'
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      color: 'text.primary'
                    }}
                  >
                    Product Images
                  </Typography>
                  
                  <Grid container spacing={2}>
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
                boxShadow: theme.shadows[1],
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper'
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography
                  variant="h6"
                  sx={{ 
                    fontWeight: 600, 
                    mb: 3,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    color: 'text.primary'
                  }}
                >
                  Technical Specifications
                </Typography>
                
                <TableContainer 
                  component={Paper} 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 2,
                    bgcolor: 'background.paper'
                  }}
                >
                  <Table>
                    <TableBody>
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell 
                            component="th" 
                            scope="row"
                            sx={{ 
                              fontWeight: 500,
                              bgcolor: index % 2 === 0 ? 'action.hover' : 'transparent',
                              width: '30%',
                              color: 'text.primary'
                            }}
                          >
                            {key}
                          </TableCell>
                          <TableCell sx={{ 
                            bgcolor: index % 2 === 0 ? 'action.hover' : 'transparent',
                            color: 'text.primary'
                          }}>
                            {value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
                boxShadow: theme.shadows[1],
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper'
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography
                  variant="h6"
                  sx={{ 
                    fontWeight: 600, 
                    mb: 3,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    color: 'text.primary'
                  }}
                >
                  Customer Reviews
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h3" sx={{ fontWeight: 600, mr: 2, color: 'text.primary' }}>
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
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1, color: 'text.primary' }}>
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
                        <Typography variant="body2" paragraph sx={{ color: 'text.primary' }}>
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
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            color: 'text.primary'
          }
        }}
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: 'text.primary' }}>
          Delete Product
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description" sx={{ color: 'text.secondary' }}>
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