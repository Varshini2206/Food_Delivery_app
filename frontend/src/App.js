import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/common/Layout';
import AuthProvider from './components/auth/AuthProvider';

// Import pages
import HomePage from './pages/HomePage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import UserProfilePage from './pages/UserProfilePage';

// Protected Route component
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Restaurant routes */}
          <Route path="/restaurants" element={<HomePage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
          
          {/* Auth routes redirect to home (since we use modals) */}
          <Route path="/login" element={<HomePage />} />
          <Route path="/register" element={<HomePage />} />
          
          {/* Protected Routes - Customer */}
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute roles={['CUSTOMER']}>
                <CheckoutPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute roles={['CUSTOMER']}>
                <div>Orders Page - Coming Soon</div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Dashboard Routes */}
          <Route 
            path="/restaurant-dashboard/*" 
            element={
              <ProtectedRoute roles={['RESTAURANT_OWNER']}>
                <div>Restaurant Dashboard - Coming Soon</div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/delivery-dashboard/*" 
            element={
              <ProtectedRoute roles={['DELIVERY_PARTNER']}>
                <div>Delivery Dashboard - Coming Soon</div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute roles={['ADMIN']}>
                <div>Admin Dashboard - Coming Soon</div>
              </ProtectedRoute>
            } 
          />

          {/* Fallback Route */}
          <Route path="*" element={
            <Box sx={{ 
              padding: '2rem', 
              textAlign: 'center',
              minHeight: '50vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h2>404 - Page Not Found</h2>
              <p>The page you're looking for doesn't exist.</p>
            </Box>
          } />
        </Routes>
        
        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Layout>
    </AuthProvider>
  );
}

export default App;