import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Email
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
        { name: 'Press', path: '/press' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Community', path: '/community' },
        { name: 'Tutorials', path: '/tutorials' },
        { name: 'Webinars', path: '/webinars' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Security', path: '/security' },
        { name: 'Accessibility', path: '/accessibility' }
      ]
    }
  ];
  
  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com', name: 'Facebook' },
    { icon: <Twitter />, url: 'https://twitter.com', name: 'Twitter' },
    { icon: <LinkedIn />, url: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: <Instagram />, url: 'https://instagram.com', name: 'Instagram' }
  ];
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'white',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: { xs: 4, md: 6 },
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        {/* Main footer content */}
        <Grid container spacing={4}>
          {/* Brand/Logo section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  width: 42,
                  height: 42,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}
              >
                {/* Placeholder logo */}
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'white'
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: 600 }}
              >
                Freelance Hub
              </Typography>
            </Box>
            
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                mb: 3,
                fontSize: { xs: '0.875rem', md: '1rem' },
                maxWidth: '90%'
              }}
            >
              Freelance Hub helps you manage your freelance business effectively, connecting you with clients and optimizing your workflow.
            </Typography>
            
            {/* Newsletter signup - only on desktop/tablet */}
            {!isMobile && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Stay up to date
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    color="primary" 
                    sx={{ 
                      mr: 1,
                      bgcolor: 'primary.light',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.main'
                      }
                    }}
                  >
                    <Email fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    <Link 
                      href="mailto:subscribe@freelancehub.com" 
                      sx={{ 
                        color: 'text.primary',
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Subscribe to our newsletter
                    </Link>
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
          
          {/* Links section */}
          {footerLinks.map((section, index) => (
            <Grid item xs={6} sm={4} md={isTablet ? 4 : 2} key={index}>
              <Typography
                variant="subtitle2"
                sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  fontSize: { xs: '0.9rem', md: '1rem' }
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map((link, linkIndex) => (
                  <Box component="li" key={linkIndex} sx={{ mb: 1 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
          
          {/* Social links - only shown on mobile */}
          {isMobile && (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Connect with us
              </Typography>
              <Box sx={{ display: 'flex' }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    aria-label={social.name}
                    sx={{ 
                      mr: 1.5,
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'rgba(94, 72, 232, 0.08)'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        {/* Footer bottom */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' }
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: { xs: 2, sm: 0 },
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            © {new Date().getFullYear()} Freelance Hub. All rights reserved.
          </Typography>
          
          {/* Social links on tablet/desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  aria-label={social.name}
                  sx={{ 
                    ml: 1,
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'rgba(94, 72, 232, 0.08)'
                    }
                  }}
                  size="small"
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;