import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close as CloseIcon,
} from '@mui/icons-material';

const ProductDetailsModal = ({ open, onClose, product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  if (!product) return null;

  // Get stock status chip
  const getStockStatusChip = (status) => {
    switch (status) {
      case "in stock":
        return (
          <Chip
            label="In stock"
            size="small"
            sx={{
              bgcolor: "#e8f5e8",
              color: "#2e7d32",
              fontWeight: 500,
              fontSize: "0.75rem",
              height: 24,
              borderRadius: "4px",
              textTransform: "capitalize",
            }}
          />
        );
      case "low stock":
        return (
          <Chip
            label="Low stock"
            size="small"
            sx={{
              bgcolor: "#fff3e0",
              color: "#f57c00",
              fontWeight: 500,
              fontSize: "0.75rem",
              height: 24,
              borderRadius: "4px",
              textTransform: "capitalize",
            }}
          />
        );
      case "out of stock":
        return (
          <Chip
            label="Out of stock"
            size="small"
            sx={{
              bgcolor: "#ffebee",
              color: "#d32f2f",
              fontWeight: 500,
              fontSize: "0.75rem",
              height: 24,
              borderRadius: "4px",
              textTransform: "capitalize",
            }}
          />
        );
      default:
        return (
          <Chip
            label={status}
            size="small"
            sx={{
              bgcolor: "#f5f5f5",
              color: "#616161",
              fontWeight: 500,
              fontSize: "0.75rem",
              height: 24,
              borderRadius: "4px",
              textTransform: "capitalize",
            }}
          />
        );
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper',
          maxWidth: isMobile ? '95vw' : '500px',
          margin: isMobile ? 1 : 'auto',
        }
      }}
    >
      {/* Dialog Title */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
          pt: 3,
          px: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            fontSize: '1.25rem',
          }}
        >
          Product Details
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent sx={{ px: 3, pb: 3, pt: 0 }}>
        {/* Product Image */}
        <Box
          sx={{
            width: '100%',
            height: 200,
            bgcolor: '#f5f5f5',
            borderRadius: 1,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=200&fit=crop"
            alt={product.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Product Name */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              mb: 0.5,
              fontWeight: 500,
            }}
          >
            Product Name
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.primary',
              fontSize: '1.125rem',
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </Typography>
        </Box>

        {/* Two Column Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 3,
            mb: 2,
          }}
        >
          {/* Left Column */}
          <Box>
            {/* Categories */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                Categories
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {product.categories.map((category, index) => (
                  <Chip
                    key={index}
                    label={category}
                    size="small"
                    sx={{
                      bgcolor: '#e3f2fd',
                      color: '#1976d2',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      height: 24,
                      borderRadius: '4px',
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Price */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  mb: 0.5,
                  fontWeight: 500,
                }}
              >
                Price
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'text.primary',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                }}
              >
                {formatCurrency(product.price)}
              </Typography>
            </Box>
          </Box>

          {/* Right Column */}
          <Box>
            {/* Upload Date */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  mb: 0.5,
                  fontWeight: 500,
                }}
              >
                Upload Date
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  fontSize: '0.95rem',
                }}
              >
                {product.uploadDate}
              </Typography>
            </Box>

            {/* Stock Status */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                Stock Status
              </Typography>
              {getStockStatusChip(product.stockStatus)}
            </Box>
          </Box>
        </Box>

        {/* Subheading */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              mb: 0.5,
              fontWeight: 500,
            }}
          >
            Subheading
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              fontSize: '0.95rem',
              lineHeight: 1.5,
            }}
          >
            {product.description}
          </Typography>
        </Box>

        {/* Description */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              mb: 1,
              fontWeight: 500,
            }}
          >
            Description
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            High-performance industrial laptop designed for harsh environments. Features IP65 rating, 
            military-grade durability, and extended battery life.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;