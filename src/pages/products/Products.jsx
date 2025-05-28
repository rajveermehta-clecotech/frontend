// src/pages/products/Products.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import AppLayout from "../../components/layout/AppLayout";

const Products = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  
  // Sample products data matching the reference image
  const productsData = [
    {
      id: 1,
      name: 'Industrial Laptop Pro',
      description: 'Rugged laptop for industrial environments',
      categories: ['Electronics', 'Computers'],
      price: 1299.99,
      stockStatus: 'in stock',
      uploadDate: '15/01/2024',
    },
    {
      id: 2,
      name: 'Smart Sensor Module',
      description: 'IoT-enabled environmental monitoring sensor',
      categories: ['Electronics', 'IoT'],
      price: 89.99,
      stockStatus: 'low stock',
      uploadDate: '10/01/2024',
    },
    {
      id: 3,
      name: 'Cable Management System',
      description: 'Professional cable organization solution',
      categories: ['Infrastructure', 'Cable Management'],
      price: 45.50,
      stockStatus: 'out of stock',
      uploadDate: '05/01/2024',
    },
  ];
  
  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // Navigate to add new product
  const handleAddProduct = () => {
    navigate('/products/new');
  };
  
  // Handle product actions
  const handleViewProduct = (productId) => {
    navigate(`/products/${productId}`);
  };
  
  const handleEditProduct = (productId) => {
    navigate(`/products/${productId}/edit`);
  };
  
  const handleDeleteProduct = (productId) => {
    console.log('Delete product:', productId);
    // Handle delete logic here
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };
  
  // Get stock status chip color and text
  const getStockStatusChip = (status) => {
    switch (status) {
      case 'in stock':
        return (
          <Chip
            label="in stock"
            size="small"
            sx={{
              bgcolor: '#D4F5D4',
              color: '#2E7D2E',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 24,
              borderRadius: '12px',
            }}
          />
        );
      case 'low stock':
        return (
          <Chip
            label="low stock"
            size="small"
            sx={{
              bgcolor: '#FFF3CD',
              color: '#856404',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 24,
              borderRadius: '12px',
            }}
          />
        );
      case 'out of stock':
        return (
          <Chip
            label="out of stock"
            size="small"
            sx={{
              bgcolor: '#F8D7DA',
              color: '#721C24',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 24,
              borderRadius: '12px',
            }}
          />
        );
      default:
        return (
          <Chip
            label={status}
            size="small"
            sx={{
              bgcolor: '#E9ECEF',
              color: '#495057',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 24,
              borderRadius: '12px',
            }}
          />
        );
    }
  };
  
  return (
    <AppLayout title="Products">
      <Box sx={{ width: "100%" }}>
        {/* Page Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#1A1A1A',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: 0.5,
              }}
            >
              Product Management
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontSize: '1rem',
              }}
            >
              Manage your product catalog
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            sx={{
              bgcolor: '#1A1A1A',
              color: 'white',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#333',
              },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Add Product
          </Button>
        </Box>
        
        {/* Search and Filter Bar */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 4,
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' }
          }}
        >
          {/* Search */}
          <TextField
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              minWidth: { xs: '100%', md: '300px' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#E0E0E0',
                },
                '&:hover fieldset': {
                  borderColor: '#B0B0B0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4285F4',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#999', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
          
          {/* Filter by Category */}
          <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 200 } }}>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              displayEmpty
              sx={{
                bgcolor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E0E0E0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#B0B0B0',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4285F4',
                },
              }}
              startAdornment={
                <FilterIcon sx={{ color: '#999', fontSize: 18, mr: 1 }} />
              }
            >
              <MenuItem value="">Filter by category</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="infrastructure">Infrastructure</MenuItem>
              <MenuItem value="iot">IoT</MenuItem>
            </Select>
          </FormControl>
          
          {/* Sort */}
          <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 150 } }}>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              sx={{
                bgcolor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E0E0E0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#B0B0B0',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4285F4',
                },
              }}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        {/* Products Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #E0E0E0',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                <TableCell
                  sx={{
                    color: '#666',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    py: 2,
                    px: 3,
                  }}
                >
                  Product
                </TableCell>
                <TableCell
                  sx={{
                    color: '#666',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    py: 2,
                    px: 3,
                  }}
                >
                  Categories
                </TableCell>
                <TableCell
                  sx={{
                    color: '#666',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    py: 2,
                    px: 3,
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{
                    color: '#666',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    py: 2,
                    px: 3,
                  }}
                >
                  Stock Status
                </TableCell>
                <TableCell
                  sx={{
                    color: '#666',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    py: 2,
                    px: 3,
                  }}
                >
                  Upload Date
                </TableCell>
                <TableCell
                  sx={{
                    color: '#666',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    py: 2,
                    px: 3,
                    textAlign: 'center',
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsData.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    '&:hover': {
                      bgcolor: '#F8F9FA',
                    },
                    '&:last-child td': {
                      borderBottom: 0,
                    },
                  }}
                >
                  {/* Product */}
                  <TableCell sx={{ py: 3, px: 3 }}>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: '#1A1A1A',
                          fontSize: '0.95rem',
                          mb: 0.5,
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          fontSize: '0.8rem',
                        }}
                      >
                        {product.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  {/* Categories */}
                  <TableCell sx={{ py: 3, px: 3 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {product.categories.map((category, index) => (
                        <Chip
                          key={index}
                          label={category}
                          size="small"
                          sx={{
                            bgcolor: '#E3F2FD',
                            color: '#1976D2',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            height: 22,
                            borderRadius: '11px',
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  
                  {/* Price */}
                  <TableCell sx={{ py: 3, px: 3 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: '#1A1A1A',
                        fontSize: '0.95rem',
                      }}
                    >
                      {formatCurrency(product.price)}
                    </Typography>
                  </TableCell>
                  
                  {/* Stock Status */}
                  <TableCell sx={{ py: 3, px: 3 }}>
                    {getStockStatusChip(product.stockStatus)}
                  </TableCell>
                  
                  {/* Upload Date */}
                  <TableCell sx={{ py: 3, px: 3 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontSize: '0.875rem',
                      }}
                    >
                      {product.uploadDate}
                    </Typography>
                  </TableCell>
                  
                  {/* Actions */}
                  <TableCell sx={{ py: 3, px: 3, textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewProduct(product.id)}
                        sx={{
                          color: '#666',
                          '&:hover': {
                            color: '#4285F4',
                            bgcolor: 'rgba(66, 133, 244, 0.1)',
                          },
                        }}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEditProduct(product.id)}
                        sx={{
                          color: '#666',
                          '&:hover': {
                            color: '#FF9800',
                            bgcolor: 'rgba(255, 152, 0, 0.1)',
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteProduct(product.id)}
                        sx={{
                          color: '#666',
                          '&:hover': {
                            color: '#F44336',
                            bgcolor: 'rgba(244, 67, 54, 0.1)',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AppLayout>
  );
};

export default Products;