import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as CartIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItemCount, toggleCart } from '../../store/slices/cartSlice';
import { selectIsAuthenticated, selectUser, logout } from '../../store/slices/authSlice';
import { openSidebar, openModal } from '../../store/slices/uiSlice';
import { useAuth } from '../auth/AuthProvider';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openLoginModal, openRegisterModal } = useAuth();

  const cartItemCount = useSelector(selectCartItemCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/');
  };

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  const handleLocationClick = () => {
    dispatch(openModal('addressForm'));
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      dispatch(openModal('login'));
    }
    handleMenuClose();
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={() => dispatch(openSidebar('menu'))}
              sx={{ mr: 1 }}
              aria-label="Open navigation menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
            >
              FoodieExpress
            </Typography>
          </Box>
          
          {!isMobile && (
            <Button
              startIcon={<LocationIcon />}
              onClick={handleLocationClick}
              sx={{ 
                ml: 2, 
                color: 'text.secondary',
                textTransform: 'none',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              Select Location
            </Button>
          )}
        </Box>

        {/* Center Section - Search (Desktop) */}
        {!isMobile && (
          <Box sx={{ 
            flex: 1, 
            maxWidth: 600, 
            mx: 3,
            position: 'relative'
          }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => navigate('/search')}
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                color: 'text.secondary',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover',
                },
              }}
            >
              Search for restaurants, cuisines...
            </Button>
          </Box>
        )}

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton 
              onClick={() => navigate('/search')}
              aria-label="Search restaurants"
            >
              <SearchIcon />
            </IconButton>
          )}
          
          <IconButton 
            onClick={handleCartClick}
            aria-label={`Shopping cart with ${cartItemCount} items`}
          >
            <Badge badgeContent={cartItemCount} color="primary">
              <CartIcon />
            </Badge>
          </IconButton>

          {isAuthenticated && (
            <IconButton aria-label="View notifications">
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}

          <IconButton 
            onClick={handleMenuOpen}
            aria-label="Open user menu"
          >
            {isAuthenticated && user?.avatar ? (
              <Avatar 
                src={user.avatar} 
                alt={user.name}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <AccountIcon />
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {isAuthenticated ? (
              [
                <MenuItem key="profile" onClick={handleProfileClick}>
                  Profile
                </MenuItem>,
                <MenuItem key="orders" onClick={() => { navigate('/orders'); handleMenuClose(); }}>
                  My Orders
                </MenuItem>,
                <MenuItem key="favorites" onClick={() => { navigate('/favorites'); handleMenuClose(); }}>
                  Favorites
                </MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>
                  Logout
                </MenuItem>,
              ]
            ) : (
              [
                <MenuItem key="login" onClick={() => { openLoginModal(); handleMenuClose(); }}>
                  Login
                </MenuItem>,
                <MenuItem key="register" onClick={() => { openRegisterModal(); handleMenuClose(); }}>
                  Sign Up
                </MenuItem>,
              ]
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;