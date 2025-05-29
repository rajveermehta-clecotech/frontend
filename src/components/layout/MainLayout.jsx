import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Collapse,
  Badge,
  InputBase,
  Card,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Settings as SettingsIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/common';

const DRAWER_WIDTH = 260;
const MINI_DRAWER_WIDTH = 60;
const HEADER_HEIGHT = 70;

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Layout state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  // Menu items - Berry style organization
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'group',
      children: [
        {
          id: 'default',
          title: 'Dashboard',
          type: 'item',
          icon: DashboardIcon,
          url: '/dashboard'
        }
      ]
    },
    {
      id: 'application',
      title: 'Application',
      type: 'group',
      children: [
        {
          id: 'products',
          title: 'Products',
          type: 'collapse',
          icon: ProductsIcon,
          children: [
            {
              id: 'product-list',
              title: 'All Products',
              type: 'item',
              url: '/products'
            },
            {
              id: 'add-product',
              title: 'Add Product',
              type: 'item',
              url: '/products/new'
            }
          ]
        },
        {
          id: 'profile',
          title: 'Profile',
          type: 'item',
          icon: ProfileIcon,
          url: '/profile'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      children: [
        {
          id: 'settings',
          title: 'Settings',
          type: 'item',
          icon: SettingsIcon,
          url: '/settings'
        }
      ]
    }
  ];

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDrawerOpen(!drawerOpen);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    handleProfileMenuClose();
  };

  const isActive = (url) => {
    return location.pathname === url || location.pathname.startsWith(url + '/');
  };

  // Render menu group
  const renderMenuGroup = (group) => {
    return (
      <Box key={group.id} sx={{ mb: 1 }}>
        {drawerOpen && (
          <Typography
            variant="caption"
            sx={{
              px: 3,
              py: 1,
              display: 'block',
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.5px'
            }}
          >
            {group.title}
          </Typography>
        )}
        <List sx={{ py: 0 }}>
          {group.children?.map(renderMenuItem)}
        </List>
      </Box>
    );
  };

  // Render menu item
  const renderMenuItem = (item) => {
    if (item.type === 'collapse') {
      return (
        <React.Fragment key={item.id}>
          <ListItemButton
            onClick={() => {
              if (item.id === 'products') {
                setProductMenuOpen(!productMenuOpen);
              }
            }}
            sx={{
              minHeight: 44,
              px: 2.5,
              py: 1,
              borderRadius: '12px',
              mx: 1.5,
              mb: 0.5,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: 'text.secondary',
                '& svg': { fontSize: '1.25rem' }
              }}
            >
              <item.icon />
            </ListItemIcon>
            {drawerOpen && (
              <>
                <ListItemText
                  primary={item.title}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'text.primary'
                    },
                  }}
                />
                {item.id === 'products' ? (
                  productMenuOpen ? <ExpandLess /> : <ExpandMore />
                ) : null}
              </>
            )}
          </ListItemButton>
          
          {drawerOpen && (
            <Collapse in={productMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children?.map((child) => (
                  <ListItemButton
                    key={child.id}
                    component={Link}
                    to={child.url}
                    selected={isActive(child.url)}
                    onClick={isMobile ? handleDrawerToggle : undefined}
                    sx={{
                      minHeight: 36,
                      px: 2.5,
                      py: 0.5,
                      pl: 5.5,
                      borderRadius: '12px',
                      mx: 1.5,
                      mb: 0.5,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      },
                      '&.Mui-selected': {
                        bgcolor: alpha(theme.palette.primary.main, 0.12),
                        color: 'primary.main',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.16),
                        },
                      },
                    }}
                  >
                    <ListItemText
                      primary={child.title}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.8125rem',
                          fontWeight: isActive(child.url) ? 600 : 400,
                        },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    }

    return (
      <ListItemButton
        key={item.id}
        component={Link}
        to={item.url}
        selected={isActive(item.url)}
        onClick={isMobile ? handleDrawerToggle : undefined}
        sx={{
          minHeight: 44,
          px: 2.5,
          py: 1,
          borderRadius: '12px',
          mx: 1.5,
          mb: 0.5,
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.08),
          },
          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: 'white',
            '& .MuiListItemIcon-root': {
              color: 'white',
            },
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: isActive(item.url) ? 'inherit' : 'text.secondary',
            '& svg': { fontSize: '1.25rem' }
          }}
        >
          <item.icon />
        </ListItemIcon>
        {drawerOpen && (
          <ListItemText
            primary={item.title}
            sx={{
              '& .MuiListItemText-primary': {
                fontSize: '0.875rem',
                fontWeight: isActive(item.url) ? 600 : 500,
              },
            }}
          />
        )}
      </ListItemButton>
    );
  };

  // Drawer content
  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: drawerOpen ? 'flex-start' : 'center',
          px: drawerOpen ? 3 : 2,
          py: 2.5,
          minHeight: HEADER_HEIGHT,
        }}
      >
        {drawerOpen ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.1rem',
                mr: 1.5,
              }}
            >
              B
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.25rem',
              }}
            >
              Berry
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.1rem',
            }}
          >
            B
          </Box>
        )}
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 2 }}>
        {menuItems.map(renderMenuGroup)}
      </Box>

      <Divider />

      {/* User Profile Section */}
      <Box sx={{ p: 2 }}>
        {drawerOpen ? (
          <Card
            sx={{
              p: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 40,
                  height: 40,
                  fontSize: '0.875rem',
                }}
              >
                {getInitials(user?.name || 'User')}
              </Avatar>
              <Box sx={{ ml: 1.5, flexGrow: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user?.name || 'User Name'}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: '0.75rem' }}
                >
                  {user?.role || 'User'}
                </Typography>
              </Box>
              <IconButton size="small" onClick={handleProfileMenuOpen}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </Card>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                }}
              >
                {getInitials(user?.name || 'User')}
              </Avatar>
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          height: HEADER_HEIGHT,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: `${HEADER_HEIGHT}px !important`,
            px: { xs: 2, sm: 3 },
          }}
        >
          {/* Menu Toggle */}
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              color: 'text.primary',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            {drawerOpen && !isMobile ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          {/* Search Box */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              bgcolor: alpha(theme.palette.common.black, 0.04),
              borderRadius: 2,
              px: 2,
              py: 0.5,
              mr: 2,
              minWidth: 200,
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search…"
              sx={{ color: 'text.primary', fontSize: '0.875rem' }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Header Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* User Menu */}
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 36,
                  height: 36,
                  fontSize: '0.875rem',
                }}
              >
                {getInitials(user?.name || 'User')}
              </Avatar>
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              elevation: 8,
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1.5,
                  fontSize: '0.875rem',
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                navigate('/profile');
                handleProfileMenuClose();
              }}
            >
              <ProfileIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Profile
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{ color: 'error.main' }}
            >
              <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{
          width: { lg: drawerOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH },
          flexShrink: { lg: 0 },
        }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open={drawerOpen}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            lg: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH}px)`
          },
          minHeight: '100vh',
          bgcolor: '#fafafa',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Content Wrapper with proper spacing */}
        <Box
          sx={{
            pt: `${HEADER_HEIGHT}px`,
            minHeight: '100vh',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;