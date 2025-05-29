import React from 'react';
import { 
  Box, 
  Typography, 
  Breadcrumbs, 
  Link, 
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const PageWrapper = ({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  children,
  spacing = 3,
  maxWidth = false 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = () => {
    if (breadcrumbs.length > 0) return breadcrumbs;
    
    const pathnames = location.pathname.split('/').filter(x => x);
    return pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      
      return {
        label: value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' '),
        path: to,
        isLast
      };
    });
  };

  const finalBreadcrumbs = generateBreadcrumbs();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {/* Page Header */}
      {(title || finalBreadcrumbs.length > 0) && (
        <Box
          sx={{
            mb: spacing,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Breadcrumbs */}
          {finalBreadcrumbs.length > 0 && (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{
                mb: 1,
                '& .MuiBreadcrumbs-separator': {
                  color: 'text.secondary',
                },
              }}
            >
              <Link
                component={RouterLink}
                to="/dashboard"
                underline="hover"
                color="text.secondary"
                sx={{
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Dashboard
              </Link>
              {finalBreadcrumbs.map((breadcrumb, index) => {
                if (breadcrumb.isLast) {
                  return (
                    <Typography
                      key={index}
                      color="text.primary"
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      {breadcrumb.label}
                    </Typography>
                  );
                }
                return (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={breadcrumb.path}
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {breadcrumb.label}
                  </Link>
                );
              })}
            </Breadcrumbs>
          )}

          {/* Page Title */}
          {title && (
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                mb: subtitle ? 0.5 : 0,
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
          )}

          {/* Subtitle */}
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                mt: 0.5,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Page Content with optimal spacing for dashboard cards */}
      <Box
        sx={{
          width: '100%',
          // Optimal spacing for dashboard cards and responsive layout
          '& .MuiGrid-container': {
            width: '100%',
            margin: 0,
          },
          '& .MuiGrid-item': {
            paddingLeft: theme.spacing(spacing / 2),
            paddingTop: theme.spacing(spacing / 2),
          },
          // Ensure cards take full width properly
          '& .MuiCard-root': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          '& .MuiCardContent-root:last-child': {
            paddingBottom: theme.spacing(2),
          },
          // Better responsive behavior for dashboard stats cards
          '& .dashboard-stat-card': {
            minHeight: { xs: 'auto', sm: '140px', md: '160px' },
          },
          // Ensure proper spacing for mobile
          [theme.breakpoints.down('sm')]: {
            '& .MuiGrid-item': {
              paddingLeft: theme.spacing(1),
              paddingTop: theme.spacing(1),
            },
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageWrapper;