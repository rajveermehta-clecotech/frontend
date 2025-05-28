import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import { Menu as MenuIcon, Close } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const PublicNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar 
          disableGutters
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            py: { xs: 1, md: 1.5 }
          }}
        >
          {/* Logo */}
          <Box 
            component={RouterLink} 
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Box
              sx={{
                bgcolor: 'primary.main',
                width: { xs: 36, md: 42 },
                height: { xs: 36, md: 42 },
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1.5
              }}
            >
              {/* Placeholder logo */}
              <Box
                sx={{
                  width: { xs: 10, md: 12 },
                  height: { xs: 10, md: 12 },
                  borderRadius: '50%',
                  bgcolor: 'white',
                }}
              />
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                fontWeight: 600,
                color: 'text.primary',
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              Freelance Hub
            </Typography>
          </Box>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 2 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.name}
                    component={RouterLink}
                    to={link.path}
                    color="inherit"
                    sx={{
                      mx: 0.5,
                      fontWeight: isActive(link.path) ? 600 : 500,
                      color: isActive(link.path) ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        bgcolor: 'rgba(94, 72, 232, 0.08)',
                        color: 'primary.main'
                      }
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
              </Box>
              
              <Box>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  color="primary"
                  sx={{ 
                    mr: 1.5,
                    px: 2,
                    py: 0.75,
                    borderRadius: 6,
                    fontWeight: 600,
                    borderColor: isActive('/login') ? 'primary.main' : 'divider',
                    color: isActive('/login') ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  Log in
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  color="primary"
                  sx={{ 
                    px: 2,
                    py: 0.75,
                    borderRadius: 6,
                    fontWeight: 600,
                    bgcolor: isActive('/signup') ? 'primary.dark' : 'primary.main'
                  }}
                >
                  Sign up
                </Button>
              </Box>
            </Box>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleMenuToggle}
              edge="end"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMenuToggle}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 300,
            bgcolor: 'white',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleMenuToggle} aria-label="close menu">
            <Close />
          </IconButton>
        </Box>
        
        <Divider />
        
        <List sx={{ pt: 2 }}>
          {navLinks.map((link) => (
            <ListItem
              key={link.name}
              component={RouterLink}
              to={link.path}
              onClick={handleMenuToggle}
              sx={{
                color: isActive(link.path) ? 'primary.main' : 'text.primary',
                bgcolor: isActive(link.path) ? 'rgba(94, 72, 232, 0.08)' : 'transparent',
                borderRadius: 1,
                my: 0.5,
                mx: 1,
                '&:hover': {
                  bgcolor: 'rgba(94, 72, 232, 0.08)',
                  color: 'primary.main'
                },
                textDecoration: 'none'
              }}
            >
              <ListItemText 
                primary={link.name}
                primaryTypographyProps={{ 
                  fontWeight: isActive(link.path) ? 600 : 500 
                }}
              />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ mt: 2, mb: 3 }} />
        
        <Box sx={{ px: 2, pb: 3 }}>
          <Button
            component={RouterLink}
            to="/login"
            fullWidth
            variant="outlined"
            color="primary"
            sx={{
              mb: 2,
              py: 1,
              borderRadius: 6,
              fontWeight: 600,
              borderColor: isActive('/login') ? 'primary.main' : 'divider',
              color: isActive('/login') ? 'primary.main' : 'text.primary'
            }}
            onClick={handleMenuToggle}
          >
            Log in
          </Button>
          <Button
            component={RouterLink}
            to="/signup"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ 
              py: 1,
              borderRadius: 6,
              fontWeight: 600
            }}
            onClick={handleMenuToggle}
          >
            Sign up
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default PublicNavbar;