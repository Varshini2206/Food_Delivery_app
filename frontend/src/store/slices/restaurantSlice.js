import { createSlice } from '@reduxjs/toolkit';
import api from '../../services/apiConfig';

const initialState = {
  restaurants: [],
  featuredRestaurants: [],
  nearbyRestaurants: [],
  currentRestaurant: null,
  menuItems: [],
  categories: [],
  filters: {
    cuisine: [],
    rating: 0,
    priceRange: [0, 1000],
    deliveryTime: 60,
    isVeg: false,
    searchQuery: '',
  },
  sortBy: 'rating', // rating, deliveryTime, price
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: true,
  },
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    // Fetch restaurants
    fetchRestaurantsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchRestaurantsSuccess: (state, action) => {
      const { restaurants, pagination, replace = true } = action.payload;
      state.isLoading = false;
      
      if (replace) {
        state.restaurants = restaurants;
      } else {
        state.restaurants = [...state.restaurants, ...restaurants];
      }
      
      if (pagination) {
        state.pagination = pagination;
      }
      state.error = null;
    },
    fetchRestaurantsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Featured restaurants
    setFeaturedRestaurants: (state, action) => {
      state.featuredRestaurants = action.payload;
    },

    // Nearby restaurants
    setNearbyRestaurants: (state, action) => {
      state.nearbyRestaurants = action.payload;
    },

    // Current restaurant details
    fetchRestaurantStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchRestaurantSuccess: (state, action) => {
      state.isLoading = false;
      state.currentRestaurant = action.payload;
      state.error = null;
    },
    fetchRestaurantFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Menu items
    fetchMenuItemsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchMenuItemsSuccess: (state, action) => {
      state.isLoading = false;
      state.menuItems = action.payload.menuItems || action.payload;
      state.categories = action.payload.categories || [];
      state.error = null;
    },
    fetchMenuItemsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Filters
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset pagination when filters change
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
    updateSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
      state.pagination.page = 1;
    },

    // Sorting
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.pagination.page = 1;
    },

    // Pagination
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    resetPagination: (state) => {
      state.pagination = initialState.pagination;
    },

    // Clear data
    clearRestaurants: (state) => {
      state.restaurants = [];
      state.pagination = initialState.pagination;
    },
    clearCurrentRestaurant: (state) => {
      state.currentRestaurant = null;
      state.menuItems = [];
      state.categories = [];
    },
    clearError: (state) => {
      state.error = null;
    },

    // Update restaurant rating (after user reviews)
    updateRestaurantRating: (state, action) => {
      const { restaurantId, newRating, reviewCount } = action.payload;
      
      // Update in restaurants list
      const restaurantIndex = state.restaurants.findIndex(r => r.id === restaurantId);
      if (restaurantIndex !== -1) {
        state.restaurants[restaurantIndex].averageRating = newRating;
        state.restaurants[restaurantIndex].reviewCount = reviewCount;
      }
      
      // Update current restaurant if viewing
      if (state.currentRestaurant && state.currentRestaurant.id === restaurantId) {
        state.currentRestaurant.averageRating = newRating;
        state.currentRestaurant.reviewCount = reviewCount;
      }
    },
  },
});

export const {
  fetchRestaurantsStart,
  fetchRestaurantsSuccess,
  fetchRestaurantsFailure,
  setFeaturedRestaurants,
  setNearbyRestaurants,
  fetchRestaurantStart,
  fetchRestaurantSuccess,
  fetchRestaurantFailure,
  fetchMenuItemsStart,
  fetchMenuItemsSuccess,
  fetchMenuItemsFailure,
  updateFilters,
  clearFilters,
  updateSearchQuery,
  setSortBy,
  setPage,
  resetPagination,
  clearRestaurants,
  clearCurrentRestaurant,
  clearError,
  updateRestaurantRating,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;

// Async Thunks
export const fetchRestaurants = (params = {}) => async (dispatch) => {
  try {
    dispatch(fetchRestaurantsStart());
    const response = await api.get('/restaurants', { params });
    dispatch(fetchRestaurantsSuccess({
      restaurants: response.data.restaurants || response.data,
      pagination: response.data.pagination,
      replace: params.page === 1 || !params.page
    }));
  } catch (error) {
    dispatch(fetchRestaurantsFailure(error.response?.data?.message || 'Failed to fetch restaurants'));
  }
};

export const fetchRestaurantById = (id) => async (dispatch) => {
  try {
    dispatch(fetchRestaurantStart());
    const response = await api.get(`/restaurants/${id}`);
    dispatch(fetchRestaurantSuccess(response.data));
  } catch (error) {
    dispatch(fetchRestaurantFailure(error.response?.data?.message || 'Failed to fetch restaurant details'));
  }
};

export const fetchMenuItems = (restaurantId) => async (dispatch) => {
  try {
    dispatch(fetchMenuItemsStart());
    const response = await api.get(`/restaurants/${restaurantId}/menu`);
    dispatch(fetchMenuItemsSuccess(response.data));
  } catch (error) {
    dispatch(fetchMenuItemsFailure(error.response?.data?.message || 'Failed to fetch menu items'));
  }
};

export const searchRestaurants = (query, filters = {}) => async (dispatch) => {
  try {
    dispatch(fetchRestaurantsStart());
    const response = await api.get('/restaurants/search', { params: { query, ...filters } });
    dispatch(fetchRestaurantsSuccess({
      restaurants: response.data.restaurants || response.data,
      pagination: response.data.pagination,
      replace: true
    }));
  } catch (error) {
    dispatch(fetchRestaurantsFailure(error.response?.data?.message || 'Failed to search restaurants'));
  }
};

// Selectors
export const selectRestaurants = (state) => state.restaurants.restaurants;
export const selectFeaturedRestaurants = (state) => state.restaurants.featuredRestaurants;
export const selectNearbyRestaurants = (state) => state.restaurants.nearbyRestaurants;
export const selectCurrentRestaurant = (state) => state.restaurants.currentRestaurant;
export const selectMenuItems = (state) => state.restaurants.menuItems;
export const selectCategories = (state) => state.restaurants.categories;
export const selectFilters = (state) => state.restaurants.filters;
export const selectSortBy = (state) => state.restaurants.sortBy;
export const selectRestaurantsLoading = (state) => state.restaurants.isLoading;
export const selectRestaurantsError = (state) => state.restaurants.error;
export const selectPagination = (state) => state.restaurants.pagination;