import { api, httpClient } from '../config/api';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

// HTTP client with base URL configuration
export { httpClient };
export const baseURL = API_BASE_URL;

// API endpoints
export const endpoints = API_ENDPOINTS;

// This will be called after store is created to setup interceptors
export const setupApiInterceptors = (store) => {
  // Request interceptor to add auth token
  httpClient.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.token;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle errors and token refresh
  httpClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { response } = error;
      
      if (response) {
        switch (response.status) {
          case 401:
            // Unauthorized - token expired or invalid
            const { logout } = require('../store/slices/authSlice');
            const { addNotification } = require('../store/slices/uiSlice');
            store.dispatch(logout());
            store.dispatch(addNotification({
              type: 'error',
              message: 'Session expired. Please login again.',
            }));
            // Redirect to login page
            window.location.href = '/login';
            break;
            
          case 403:
            // Forbidden
            const { addNotification: addNotification403 } = require('../store/slices/uiSlice');
            store.dispatch(addNotification403({
              type: 'error',
              message: 'You do not have permission to perform this action.',
            }));
            break;
            
          case 404:
            // Not found
            const { addNotification: addNotification404 } = require('../store/slices/uiSlice');
            store.dispatch(addNotification404({
              type: 'error',
              message: 'The requested resource was not found.',
            }));
            break;
            
          case 422:
            // Validation error
            const validationErrors = response.data.errors || [response.data.message];
            const { addNotification: addNotification422 } = require('../store/slices/uiSlice');
            store.dispatch(addNotification422({
              type: 'error',
              message: validationErrors.join(', '),
            }));
            break;
            
          case 500:
            // Server error
            const { addNotification: addNotification500 } = require('../store/slices/uiSlice');
            store.dispatch(addNotification500({
              type: 'error',
              message: 'Internal server error. Please try again later.',
            }));
            break;
            
          default:
            // Other errors
            const { addNotification: addNotificationDefault } = require('../store/slices/uiSlice');
            store.dispatch(addNotificationDefault({
              type: 'error',
              message: response.data.message || 'An error occurred. Please try again.',
            }));
        }
      } else if (error.request) {
        // Network error
        const { addNotification: addNotificationNetwork } = require('../store/slices/uiSlice');
        store.dispatch(addNotificationNetwork({
          type: 'error',
          message: 'Network error. Please check your internet connection.',
        }));
      } else {
        // Other error
        const { addNotification: addNotificationOther } = require('../store/slices/uiSlice');
        store.dispatch(addNotificationOther({
          type: 'error',
          message: 'An unexpected error occurred.',
        }));
      }
      
      return Promise.reject(error);
    }
  );
};

// API Service Methods
export const authApi = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/signup', userData),
  logout: () => api.post('/api/auth/logout'),
  refreshToken: () => api.post('/api/auth/refresh'),
  getProfile: () => api.get('/api/auth/profile'),
  updateProfile: (profileData) => api.put('/api/auth/profile', profileData),
};

export const restaurantApi = {
  list: (params) => api.get('/restaurants', { params }),
  featured: () => api.get('/restaurants/featured'),
  nearby: (location) => api.get('/restaurants/nearby', { params: location }),
  search: (query, filters) => api.get('/restaurants/search', { params: { query, ...filters } }),
  details: (id) => api.get(`/restaurants/${id}`),
  menu: (id) => api.get(`/restaurants/${id}/menu`),
  reviews: (id) => api.get(`/restaurants/${id}/reviews`),
};

export const orderApi = {
  placeOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: (userId) => api.get(`/orders/customer/${userId}`),
  getOrderDetails: (orderId) => api.get(`/orders/${orderId}`),
  cancelOrder: (orderId) => api.put(`/orders/${orderId}/cancel`),
  trackOrder: (orderId) => api.get(`/orders/${orderId}/track`),
};

export const menuApi = {
  getItem: (id) => api.get(`/menu-items/${id}`),
  search: (query) => api.get('/menu-items/search', { params: { query } }),
};

export const reviewApi = {
  create: (reviewData) => api.post('/reviews', reviewData),
  list: (restaurantId) => api.get('/reviews', { params: { restaurantId } }),
};

export const userApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  getUserOrders: () => api.get('/users/orders'),
  getUserAddresses: () => api.get('/users/addresses'),
  addAddress: (addressData) => api.post('/users/addresses', addressData),
  updateAddress: (id, addressData) => api.put(`/users/addresses/${id}`, addressData),
  deleteAddress: (id) => api.delete(`/users/addresses/${id}`),
};

export const cartApi = {
  getCart: () => api.get('/cart'),
  addToCart: (itemData) => api.post('/cart/add', itemData),
  updateCartItem: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/items/${itemId}`),
  clearCart: () => api.delete('/cart'),
};

export default api;