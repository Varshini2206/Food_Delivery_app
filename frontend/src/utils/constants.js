// API Configuration Constants
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    PROFILE: '/api/auth/profile',
    REFRESH: '/api/auth/refresh'
  },
  
  // Restaurant endpoints
  RESTAURANTS: {
    LIST: '/api/restaurants',
    DETAILS: (id) => `/api/restaurants/${id}`,
    SEARCH: '/api/restaurants/search',
    BY_CATEGORY: (category) => `/api/restaurants/category/${category}`,
    BY_CUISINE: (cuisine) => `/api/restaurants/cuisine/${cuisine}`
  },
  
  // Menu endpoints
  MENU: {
    BY_RESTAURANT: (restaurantId) => `/api/restaurants/${restaurantId}/menu`,
    ITEM_DETAILS: (id) => `/api/menu-items/${id}`,
    ALL_ITEMS: '/api/menu-items',
    SEARCH: '/api/menu-items/search',
    BY_CATEGORY: (category) => `/api/menu-items/category/${category}`
  },
  
  // Cart endpoints
  CART: {
    LIST: '/api/cart',
    ADD: '/api/cart/add',
    UPDATE: (itemId) => `/api/cart/${itemId}`,
    REMOVE: (itemId) => `/api/cart/${itemId}`,
    CLEAR: '/api/cart/clear',
    COUNT: '/api/cart/count',
    TOTAL: '/api/cart/total'
  },
  
  // Order endpoints
  ORDERS: {
    LIST: '/api/orders',
    CREATE: '/api/orders',
    DETAILS: (id) => `/api/orders/${id}`,
    UPDATE_STATUS: (id) => `/api/orders/${id}/status`,
    CANCEL: (id) => `/api/orders/${id}/cancel`
  },
  
  // User endpoints
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
    CHANGE_PASSWORD: '/api/user/change-password',
    ADDRESSES: '/api/user/addresses'
  }
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// Request Headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Request Timeout (in milliseconds)
export const REQUEST_TIMEOUT = 10000;

// Token Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  CART: 'cart_data',
  PREFERENCES: 'user_preferences'
};

// Application Configuration
export const APP_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50
  },
  SEARCH: {
    MIN_QUERY_LENGTH: 2,
    DEBOUNCE_DELAY: 300
  },
  CART: {
    MAX_ITEMS: 50,
    AUTO_SAVE_DELAY: 500
  }
};

const constants = {
  API_BASE_URL,
  API_ENDPOINTS,
  HTTP_STATUS,
  DEFAULT_HEADERS,
  REQUEST_TIMEOUT,
  STORAGE_KEYS,
  APP_CONFIG
};

export default constants;