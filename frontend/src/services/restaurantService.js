import api, { endpoints } from './api';

export const restaurantService = {
  // Get all restaurants with pagination and filters
  getRestaurants: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`${endpoints.restaurants.list}?${queryParams}`);
    return response.data;
  },

  // Get featured restaurants
  getFeaturedRestaurants: async () => {
    const response = await api.get(endpoints.restaurants.featured);
    return response.data;
  },

  // Get nearby restaurants
  getNearbyRestaurants: async (lat, lng, radius = 5) => {
    const response = await api.get(`${endpoints.restaurants.nearby}?lat=${lat}&lng=${lng}&radius=${radius}`);
    return response.data;
  },

  // Search restaurants
  searchRestaurants: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`${endpoints.restaurants.search}?${queryParams}`);
    return response.data;
  },

  // Get restaurant details
  getRestaurantDetails: async (id) => {
    const response = await api.get(endpoints.restaurants.details(id));
    return response.data;
  },

  // Get restaurant menu
  getRestaurantMenu: async (id, categoryId = null) => {
    const params = categoryId ? `?categoryId=${categoryId}` : '';
    const response = await api.get(`${endpoints.restaurants.menu(id)}${params}`);
    return response.data;
  },

  // Get restaurant reviews
  getRestaurantReviews: async (id, page = 1, limit = 10) => {
    const response = await api.get(`${endpoints.restaurants.reviews(id)}?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Filter restaurants by cuisine
  getRestaurantsByCuisine: async (cuisine, params = {}) => {
    const queryParams = new URLSearchParams({ cuisine, ...params }).toString();
    const response = await api.get(`${endpoints.restaurants.list}?${queryParams}`);
    return response.data;
  },

  // Get restaurant categories/cuisines
  getCategories: async () => {
    const response = await api.get('/restaurants/categories');
    return response.data;
  },

  // For restaurant owners
  restaurantOwner: {
    // Get own restaurant details
    getMyRestaurant: async () => {
      const response = await api.get('/restaurants/my-restaurant');
      return response.data;
    },

    // Update restaurant details
    updateRestaurant: async (restaurantData) => {
      const response = await api.put('/restaurants/my-restaurant', restaurantData);
      return response.data;
    },

    // Update restaurant hours
    updateHours: async (hours) => {
      const response = await api.put('/restaurants/my-restaurant/hours', hours);
      return response.data;
    },

    // Update restaurant status (open/closed)
    updateStatus: async (isOpen) => {
      const response = await api.put('/restaurants/my-restaurant/status', { isOpen });
      return response.data;
    },

    // Get restaurant analytics
    getAnalytics: async (startDate, endDate) => {
      const response = await api.get(`/restaurants/my-restaurant/analytics?startDate=${startDate}&endDate=${endDate}`);
      return response.data;
    },

    // Upload restaurant images
    uploadImage: async (file, type = 'gallery') => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', type);
      const response = await api.post('/restaurants/my-restaurant/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },

    // Delete restaurant image
    deleteImage: async (imageId) => {
      const response = await api.delete(`/restaurants/my-restaurant/images/${imageId}`);
      return response.data;
    },
  },
};

export default restaurantService;