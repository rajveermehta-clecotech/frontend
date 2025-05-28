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
  InputAdornment,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Divider,
  Pagination,
  Stack,
  useMediaQuery,
  useTheme,
  Rating,
  CardMedia
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Archive as ArchiveIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Inventory2 as InventoryIcon,
  LocalOffer as LocalOfferIcon,
  CheckCircle as CheckCircleIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import AppLayout from "../../components/layout/AppLayout";

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for tabs, filters, search, and product actions
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [actionsAnchorEl, setActionsAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [page, setPage] = useState(1);
  
  // Tab labels and counts
  const tabs = [
    { label: 'All Products', count: 24 },
    { label: 'Active', count: 18 },
    { label: 'Out of Stock', count: 3 },
    { label: 'Archived', count: 3 }
  ];
  
  // Filter options
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Recent', value: 'recent' },
    { label: 'Best Selling', value: 'best_selling' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Highest Rated', value: 'highest_rated' }
  ];
  
  // Sample products data - in a real app, this would come from an API
  const productsData = [
    {
      id: 1,
      name: 'Premium Bluetooth Headphones',
      category: 'Electronics',
      price: 129.99,
      discountPrice: 99.99,
      stock: 45,
      status: 'active',
      featured: true,
      rating: 4.5,
      reviewCount: 127,
      image: 'https://randomuser.me/api/portraits/men/41.jpg', // Placeholder image
      sku: 'BH-001',
      description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.'
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      category: 'Furniture',
      price: 249.99,
      discountPrice: null,
      stock: 12,
      status: 'active',
      featured: false,
      rating: 4.2,
      reviewCount: 58,
      image: 'https://randomuser.me/api/portraits/women/67.jpg', // Placeholder image
      sku: 'FRN-005',
      description: 'Comfortable office chair with lumbar support and adjustable height.'
    },
    {
      id: 3,
      name: 'Smart Watch Series 5',
      category: 'Electronics',
      price: 199.99,
      discountPrice: 159.99,
      stock: 0,
      status: 'out_of_stock',
      featured: true,
      rating: 4.8,
      reviewCount: 203,
      image: 'https://randomuser.me/api/portraits/men/32.jpg', // Placeholder image
      sku: 'SW-012',
      description: 'Advanced smartwatch with heart rate monitoring, GPS, and fitness tracking.'
    },
    {
      id: 4,
      name: 'Professional DSLR Camera',
      category: 'Photography',
      price: 899.99,
      discountPrice: 799.99,
      stock: 7,
      status: 'active',
      featured: true,
      rating: 4.9,
      reviewCount: 74,
      image: 'https://randomuser.me/api/portraits/women/44.jpg', // Placeholder image
      sku: 'CAM-023',
      description: 'High-resolution DSLR camera with multiple lenses and accessories.'
    },
    {
      id: 5,
      name: 'Organic Cotton T-Shirt',
      category: 'Clothing',
      price: 29.99,
      discountPrice: null,
      stock: 120,
      status: 'active',
      featured: false,
      rating: 4.0,
      reviewCount: 42,
      image: 'https://randomuser.me/api/portraits/men/67.jpg', // Placeholder image
      sku: 'CL-034',
      description: 'Comfortable and eco-friendly cotton t-shirt available in multiple colors.'
    },
    {
      id: 6,
      name: 'Stainless Steel Water Bottle',
      category: 'Kitchen',
      price: 24.99,
      discountPrice: 19.99,
      stock: 35,
      status: 'active',
      featured: false,
      rating: 4.6,
      reviewCount: 91,
      image: 'https://randomuser.me/api/portraits/women/79.jpg', // Placeholder image
      sku: 'KT-045',
      description: 'Eco-friendly stainless steel water bottle that keeps drinks cold for 24 hours.'
    },
    {
      id: 7,
      name: 'Vintage Desk Lamp',
      category: 'Home Decor',
      price: 79.99,
      discountPrice: null,
      stock: 0,
      status: 'out_of_stock',
      featured: false,
      rating: 4.3,
      reviewCount: 28,
      image: 'https://randomuser.me/api/portraits/men/54.jpg', // Placeholder image
      sku: 'HD-056',
      description: 'Classic desk lamp with adjustable arm and vintage-inspired design.'
    },
    {
      id: 8,
      name: 'Wireless Gaming Mouse',
      category: 'Electronics',
      price: 59.99,
      discountPrice: 49.99,
      stock: 23,
      status: 'active',
      featured: true,
      rating: 4.7,
      reviewCount: 136,
      image: 'https://randomuser.me/api/portraits/women/23.jpg', // Placeholder image
      sku: 'GM-067',
      description: 'High-precision gaming mouse with customizable buttons and RGB lighting.'
    },
    {
      id: 9,
      name: 'Natural Bamboo Cutting Board',
      category: 'Kitchen',
      price: 34.99,
      discountPrice: null,
      stock: 0,
      status: 'archived',
      featured: false,
      rating: 4.4,
      reviewCount: 47,
      image: 'https://randomuser.me/api/portraits/men/22.jpg', // Placeholder image
      sku: 'KT-078',
      description: 'Durable bamboo cutting board that',
    }
  ];
  
  // Filter products based on active tab and search query
  const getFilteredProducts = () => {
    let filtered = [...productsData];
    
    // Filter by tab
    if (activeTab === 1) {
      filtered = filtered.filter(product => product.status === 'active');
    } else if (activeTab === 2) {
      filtered = filtered.filter(product => product.stock === 0 || product.status === 'out_of_stock');
    } else if (activeTab === 3) {
      filtered = filtered.filter(product => product.status === 'archived');
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const filteredProducts = getFilteredProducts();
  
  // Pagination calculations
  const productsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage, 
    page * productsPerPage
  );
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1); // Reset to first page when tab changes
  };
  
  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page when search changes
  };
  
  // Handle filter menu
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  
  // Handle product actions menu
  const handleActionsClick = (event, productId) => {
    event.stopPropagation();
    setActionsAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };
  
  const handleActionsClose = () => {
    setActionsAnchorEl(null);
    setSelectedProductId(null);
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };
  
  // Navigate to product detail
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };
  
  // Navigate to add new product
  const handleAddProduct = () => {
    navigate('/products/new');
  };

  // Navigate to edit product
  const handleEditProduct = (event, productId) => {
    event.stopPropagation();
    navigate(`/products/${productId}/edit`);
    handleActionsClose();
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };
  
  // Get stock status text and color
  const getStockStatus = (product) => {
    if (product.status === 'archived') {
      return { text: 'Archived', color: 'text.disabled' };
    } else if (product.stock === 0 || product.status === 'out_of_stock') {
      return { text: 'Out of Stock', color: 'error.main' };
    } else if (product.stock < 10) {
      return { text: 'Low Stock', color: 'warning.main' };
    } else {
      return { text: 'In Stock', color: 'success.main' };
    }
  };
  
  return (
    <AppLayout title="Products">
      {/* Page Header and Actions */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography
              variant="h4"
              sx={{ 
                fontWeight: 700, 
                color: 'text.primary',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: 1
              }}
            >
              Products
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Manage your product catalog
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            sx={{ 
              borderRadius: 8,
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              whiteSpace: 'nowrap'
            }}
          >
            Add New Product
          </Button>
        </Box>
        
        {/* Search and Filter Bar */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 3,
            gap: 2,
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}
        >
          <TextField
            placeholder="Search products by name, category, or SKU..."
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ 
              bgcolor: 'white',
              borderRadius: 2,
              width: { xs: '100%', md: '360px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={handleFilterClick}
              size={isMobile ? 'small' : 'medium'}
              sx={{ 
                borderRadius: 8,
                borderColor: 'divider',
                color: 'text.primary',
                bgcolor: 'white',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'white'
                }
              }}
            >
              Sort & Filter
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
              PaperProps={{
                elevation: 2,
                sx: { 
                  minWidth: 200,
                  borderRadius: 2,
                  mt: 1
                }
              }}
            >
              {filterOptions.map((option) => (
                <MenuItem 
                  key={option.value} 
                  onClick={handleFilterClose}
                  sx={{ fontSize: '0.875rem' }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
        
        {/* Tabs */}
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
              minWidth: { xs: 'auto', sm: 120 },
              px: { xs: 1, sm: 2 }
            }
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {tab.label}
                  <Chip
                    label={tab.count}
                    size="small"
                    sx={{
                      ml: 1,
                      height: 20,
                      fontSize: '0.75rem',
                      bgcolor: activeTab === index ? 'primary.main' : 'action.selected',
                      color: activeTab === index ? 'white' : 'text.primary',
                    }}
                  />
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <InventoryIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter to find what you're looking for.
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {displayedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                      borderColor: 'transparent',
                    }
                  }}
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* Product Image */}
                  <Box sx={{ position: 'relative', height: 200 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    
                    {/* Featured badge */}
                    {product.featured && (
                      <Chip
                        label="Featured"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          bgcolor: 'primary.main',
                          color: 'white',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                    )}
                    
                    {/* Status badge */}
                    <Chip
                      label={getStockStatus(product).text}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: product.status === 'archived' ? 'rgba(0, 0, 0, 0.12)' : (
                          product.stock === 0 ? 'rgba(239, 68, 68, 0.1)' : 
                          product.stock < 10 ? 'rgba(250, 204, 21, 0.1)' : 'rgba(34, 197, 94, 0.1)'
                        ),
                        color: getStockStatus(product).color,
                        fontWeight: 500,
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>
                  
                  <CardContent sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Product Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{
                          borderRadius: '16px',
                          bgcolor: 'primary.light',
                          color: 'white',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => handleActionsClick(e, product.id)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    {/* Product Title */}
                    <Typography
                      variant="h6"
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1,
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {product.name}
                    </Typography>
                    
                    {/* SKU */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      SKU: {product.sku}
                    </Typography>
                    
                    {/* Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={product.rating} precision={0.5} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.reviewCount})
                      </Typography>
                    </Box>
                    
                    {/* Price */}
                    <Box sx={{ mb: 2, mt: 'auto' }}>
                      {product.discountPrice ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600,
                              color: 'primary.main',
                              fontSize: { xs: '1rem', sm: '1.25rem' }
                            }}
                          >
                            {formatCurrency(product.discountPrice)}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              ml: 1, 
                              textDecoration: 'line-through',
                              color: 'text.secondary'
                            }}
                          >
                            {formatCurrency(product.price)}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            color: 'primary.main',
                            fontSize: { xs: '1rem', sm: '1.25rem' }
                          }}
                        >
                          {formatCurrency(product.price)}
                        </Typography>
                      )}
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    {/* Product Footer */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ShoppingBasketIcon 
                          fontSize="small" 
                          sx={{ color: 'text.secondary', mr: 1, fontSize: '1rem' }} 
                        />
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          Stock: {product.stock}
                        </Typography>
                      </Box>
                      
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: 8,
                          minWidth: 'auto',
                          px: 1.5,
                          py: 0.5,
                          fontSize: '0.75rem',
                          borderColor: 'divider',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'transparent'
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product.id);
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary"
                size={isMobile ? "small" : "medium"}
                siblingCount={isMobile ? 0 : 1}
              />
            </Box>
          )}
        </>
      )}
      
      {/* Actions Menu */}
      <Menu
        anchorEl={actionsAnchorEl}
        open={Boolean(actionsAnchorEl)}
        onClose={handleActionsClose}
        PaperProps={{
          elevation: 2,
          sx: {
            minWidth: 180,
            borderRadius: 2,
            mt: 1
          }
        }}
      >
        <MenuItem onClick={(e) => handleEditProduct(e, selectedProductId)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Edit Product</Typography>
        </MenuItem>
        <MenuItem onClick={handleActionsClose}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">View Details</Typography>
        </MenuItem>
        <MenuItem onClick={handleActionsClose}>
          <ListItemIcon>
            <CheckCircleIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Mark as Featured</Typography>
        </MenuItem>
        <MenuItem onClick={handleActionsClose}>
          <ListItemIcon>
            <ArchiveIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Archive Product</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleActionsClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="body2">Delete Product</Typography>
        </MenuItem>
      </Menu>
    </AppLayout>
  );
};

export default Projects;