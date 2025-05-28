import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  CssBaseline,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Assignment as ProjectsIcon,
  Settings as SettingsIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/common';

const DRAWER_WIDTH = 240;
const DRAWER_SHRUNK_WIDTH = 60;
const APPBAR_HEIGHT = 64;

const AppLayout = ({ children, title }) => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setIsDrawerExpanded(!isDrawerExpanded);
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

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Products', icon: <ProductsIcon />, path: '/products' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
  ];

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Scrollable Menu Items */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={isMobileOrTablet ? handleDrawerToggle : undefined}
              sx={{
                justifyContent: isMobileOrTablet || isDrawerExpanded ? 'initial' : 'center',
                px: isMobileOrTablet || isDrawerExpanded ? 2 : 1,
                '&:hover': { bgcolor: theme.palette.action.hover },
                '&.Mui-selected': { bgcolor: theme.palette.action.selected },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: isMobileOrTablet || isDrawerExpanded ? 'auto' : 'auto',
                  mr: isMobileOrTablet || isDrawerExpanded ? 2 : 0,
                  justifyContent: isMobileOrTablet || isDrawerExpanded ? 'initial' : 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {(isMobileOrTablet || isDrawerExpanded) && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      {/* User Info */}
      <Box
        sx={{
          p: isMobileOrTablet || isDrawerExpanded ? 2 : 1,
          display: 'flex',
          justifyContent: isMobileOrTablet || isDrawerExpanded ? 'flex-start' : 'center',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
          {getInitials(user?.name || 'User')}
        </Avatar>
        {(isMobileOrTablet || isDrawerExpanded) && (
          <Typography variant="body2" sx={{ ml: 2 }}>{user?.name || 'User'}</Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Fixed Navbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          height: APPBAR_HEIGHT,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label={isDrawerExpanded ? 'shrink drawer' : 'expand drawer'}
            edge="start"
            onClick={handleDesktopDrawerToggle}
            sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}
          >
            {isDrawerExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {title || 'Dashboard'}
          </Typography>
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
              {getInitials(user?.name || 'User')}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: isDrawerExpanded ? DRAWER_WIDTH : DRAWER_SHRUNK_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile/Tablet Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              bgcolor: theme.palette.background.paper,
              height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
              top: APPBAR_HEIGHT,
              overflowY: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: isDrawerExpanded ? DRAWER_WIDTH : DRAWER_SHRUNK_WIDTH,
              bgcolor: theme.palette.background.paper,
              height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
              top: APPBAR_HEIGHT,
              overflowY: 'hidden',
              borderRight: `1px solid ${theme.palette.divider}`,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${isDrawerExpanded ? DRAWER_WIDTH : DRAWER_SHRUNK_WIDTH}px)` },
          minHeight: '100vh',
          bgcolor: theme.palette.background.default,
          mt: `${APPBAR_HEIGHT}px`,
          overflowY: 'auto',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;