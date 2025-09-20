import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import BottomNavigation from './BottomNavigation';
import CartSidebar from '../cart/CartSidebar';
import Notifications from './Notifications';

const Layout = ({ children, hideFooter = false, hideBottomNav = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          pb: isMobile && !hideBottomNav ? 8 : 0, // Add bottom padding for mobile navigation
        }}
      >
        {children}
      </Box>

      {/* Footer - Hidden on mobile when bottom nav is shown */}
      {!hideFooter && !(isMobile && !hideBottomNav) && <Footer />}

      {/* Bottom Navigation - Only on mobile */}
      {isMobile && !hideBottomNav && <BottomNavigation />}

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Global Notifications */}
      <Notifications />
    </Box>
  );
};

export default Layout;