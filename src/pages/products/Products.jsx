// src/pages/products/Products.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import ProductDetailsModal from "./ProductDetailsModal"; // Import the modal component

const Products = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample products data matching the reference image
  const productsData = [
    {
      id: 1,
      name: "Industrial Laptop Pro",
      description: "Rugged laptop for industrial environments",
      categories: ["Electronics", "Computers"],
      price: 1299.99,
      stockStatus: "in stock",
      uploadDate: "15/01/2024",
    },
    {
      id: 2,
      name: "Smart Sensor Module",
      description: "IoT-enabled environmental monitoring sensor",
      categories: ["Electronics", "IoT"],
      price: 89.99,
      stockStatus: "low stock",
      uploadDate: "10/01/2024",
    },
    {
      id: 3,
      name: "Cable Management System",
      description: "Professional cable organization solution",
      categories: ["Infrastructure", "Cable Management"],
      price: 45.5,
      stockStatus: "out of stock",
      uploadDate: "05/01/2024",
    },
  ];

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Navigate to add new product
  const handleAddProduct = () => {
    navigate("/products/new");
  };

  // Handle product actions
  const handleViewProduct = (productId) => {
    const product = productsData.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setModalOpen(true);
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleDeleteProduct = (productId) => {
    console.log("Delete product:", productId);
    // Handle delete logic here
  };

  // Modal handlers
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  // Format currency
  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  // Get stock status chip color and text
  const getStockStatusChip = (status) => {
    switch (status) {
      case "in stock":
        return (
          <Chip
            label="in stock"
            size="small"
            sx={{
              bgcolor: "success.light",
              color: "success.dark",
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 24,
              borderRadius: "12px",
            }}
          />
        );
      case "low stock":
        return (
          <Chip
            label="low stock"
            size="small"
            sx={{
              bgcolor: "warning.light",
              color: "warning.dark",
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 24,
              borderRadius: "12px",
            }}
          />
        );
      case "out of stock":
        return (
          <Chip
            label="out of stock"
            size="small"
            sx={{
              bgcolor: "error.light",
              color: "error.dark",
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 24,
              borderRadius: "12px",
            }}
          />
        );
      default:
        return (
          <Chip
            label={status}
            size="small"
            sx={{
              bgcolor: "grey.200",
              color: "grey.700",
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 24,
              borderRadius: "12px",
            }}
          />
        );
    }
  };

  return (
    <Box sx={{ 
      p: 3,
      bgcolor: "background.default",
      minHeight: "100vh",
    }}>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              fontSize: { xs: "1.5rem", sm: "2rem" },
              mb: 0.5,
            }}
          >
            Product Management
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
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
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontWeight: 600,
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Search and Filter Bar */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
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
            bgcolor: "background.paper",
            borderRadius: 2,
            minWidth: { xs: "100%", md: "300px" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "divider",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Filter by Category */}
        <FormControl size="small" sx={{ minWidth: { xs: "100%", md: 200 } }}>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: "background.paper",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            }}
            startAdornment={
              <FilterIcon sx={{ color: "text.secondary", fontSize: 18, mr: 1 }} />
            }
          >
            <MenuItem value="">Filter by category</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="infrastructure">Infrastructure</MenuItem>
            <MenuItem value="iot">IoT</MenuItem>
          </Select>
        </FormControl>

        {/* Sort */}
        <FormControl size="small" sx={{ minWidth: { xs: "100%", md: 150 } }}>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{
              bgcolor: "background.paper",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
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
          boxShadow: theme.shadows[1],
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 2,
                  px: 3,
                }}
              >
                Product
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 2,
                  px: 3,
                }}
              >
                Categories
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 2,
                  px: 3,
                }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 2,
                  px: 3,
                }}
              >
                Stock Status
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 2,
                  px: 3,
                }}
              >
                Upload Date
              </TableCell>
              <TableCell
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 2,
                  px: 3,
                  textAlign: "center",
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
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  "&:last-child td": {
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
                        color: "text.primary",
                        fontSize: "0.95rem",
                        mb: 0.5,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.8rem",
                      }}
                    >
                      {product.description}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Categories */}
                <TableCell sx={{ py: 3, px: 3 }}>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {product.categories.map((category, index) => (
                      <Chip
                        key={index}
                        label={category}
                        size="small"
                        sx={{
                          bgcolor: "primary.light",
                          color: "primary.dark",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: 22,
                          borderRadius: "11px",
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
                      color: "text.primary",
                      fontSize: "0.95rem",
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
                      color: "text.secondary",
                      fontSize: "0.875rem",
                    }}
                  >
                    {product.uploadDate}
                  </Typography>
                </TableCell>

                {/* Actions */}
                <TableCell sx={{ py: 3, px: 3, textAlign: "center" }}>
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleViewProduct(product.id)}
                      sx={{
                        color: "text.secondary",
                        "&:hover": {
                          color: "primary.main",
                          bgcolor: "primary.light",
                        },
                      }}
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEditProduct(product.id)}
                      sx={{
                        color: "text.secondary",
                        "&:hover": {
                          color: "warning.main",
                          bgcolor: "warning.light",
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteProduct(product.id)}
                      sx={{
                        color: "text.secondary",
                        "&:hover": {
                          color: "error.main",
                          bgcolor: "error.light",
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

      {/* Product Details Modal */}
      <ProductDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </Box>
  );
};

export default Products;