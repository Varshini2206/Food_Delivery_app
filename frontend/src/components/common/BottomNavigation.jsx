import React from 'react';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  FavoriteOutlined as FavoriteIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectBottomNavValue, setBottomNavValue } from '../../store/slices/uiSlice';
import { selectCartItemCount } from '../../store/slices/cartSlice';
import { selectIsAuthenticated } from '../../store/slices/authSlice';
import { openSidebar, openModal } from '../../store/slices/uiSlice';

const BottomNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const bottomNavValue = useSelector(selectBottomNavValue);
  const cartItemCount = useSelector(selectCartItemCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Map routes to navigation values
  const getNavValueFromPath = (pathname) => {
    if (pathname === '/' || pathname === '/home') return 0;
    if (pathname === '/search') return 1;
    if (pathname === '/cart') return 2;
    if (pathname === '/favorites') return 3;
    if (pathname === '/profile' || pathname === '/orders' || pathname === '/settings') return 4;
    return 0;
  };

  // Update nav value based on current route
  React.useEffect(() => {
    const navValue = getNavValueFromPath(location.pathname);
    if (navValue !== bottomNavValue) {
      dispatch(setBottomNavValue(navValue));
    }
  }, [location.pathname, bottomNavValue, dispatch]);

  const handleNavigationChange = (event, newValue) => {
    dispatch(setBottomNavValue(newValue));

    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/search');
        break;
      case 2:
        if (cartItemCount > 0) {
          dispatch(openSidebar('cart'));
        } else {
          // Show empty cart message or navigate to restaurants
          navigate('/');
        }
        break;
      case 3:
        if (isAuthenticated) {
          navigate('/favorites');
        } else {
          dispatch(openModal('login'));
        }
        break;
      case 4:
        if (isAuthenticated) {
          navigate('/profile');
        } else {
          dispatch(openModal('login'));
        }
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
      elevation={8}
    >
      <MuiBottomNavigation
        value={bottomNavValue}
        onChange={handleNavigationChange}
        sx={{
          height: 64,
          '& .MuiBottomNavigationAction-root': {
            minWidth: 0,
            padding: '6px 12px 8px',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={{
            '&.Mui-selected .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
            },
          }}
        />
        
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          sx={{
            '&.Mui-selected .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
            },
          }}
        />
        
        <BottomNavigationAction
          label="Cart"
          icon={
            <Badge badgeContent={cartItemCount} color="primary">
              <CartIcon />
            </Badge>
          }
          sx={{
            '&.Mui-selected .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
            },
          }}
        />
        
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
          sx={{
            '&.Mui-selected .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
            },
          }}
        />
        
        <BottomNavigationAction
          label="Profile"
          icon={<PersonIcon />}
          sx={{
            '&.Mui-selected .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
            },
          }}
        />
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;