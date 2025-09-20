import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  addresses: [],
  favorites: [],
  preferences: {
    language: 'en',
    currency: 'USD',
    notifications: {
      orderUpdates: true,
      promotions: true,
      recommendations: true,
      email: true,
      sms: false,
    },
    dietary: {
      isVegetarian: false,
      isVegan: false,
      allergens: [],
    },
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Profile
    fetchProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    },
    fetchProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateProfileSuccess: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    // Addresses
    fetchAddressesSuccess: (state, action) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.addresses.findIndex(addr => addr.id === id);
      if (index !== -1) {
        state.addresses[index] = { ...state.addresses[index], ...updates };
      }
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
    },
    setDefaultAddress: (state, action) => {
      const addressId = action.payload;
      state.addresses = state.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId,
      }));
    },

    // Favorites
    fetchFavoritesSuccess: (state, action) => {
      state.favorites = action.payload;
    },
    addToFavorites: (state, action) => {
      const restaurant = action.payload;
      const exists = state.favorites.find(fav => fav.id === restaurant.id);
      if (!exists) {
        state.favorites.push(restaurant);
      }
    },
    removeFromFavorites: (state, action) => {
      const restaurantId = action.payload;
      state.favorites = state.favorites.filter(fav => fav.id !== restaurantId);
    },

    // Preferences
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateNotificationPreferences: (state, action) => {
      state.preferences.notifications = {
        ...state.preferences.notifications,
        ...action.payload,
      };
    },
    updateDietaryPreferences: (state, action) => {
      state.preferences.dietary = {
        ...state.preferences.dietary,
        ...action.payload,
      };
    },

    // Clear data
    clearUserData: (state) => {
      state.profile = null;
      state.addresses = [];
      state.favorites = [];
      state.preferences = initialState.preferences;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileSuccess,
  fetchAddressesSuccess,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
  fetchFavoritesSuccess,
  addToFavorites,
  removeFromFavorites,
  updatePreferences,
  updateNotificationPreferences,
  updateDietaryPreferences,
  clearUserData,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUserProfile = (state) => state.user.profile;
export const selectUserAddresses = (state) => state.user.addresses;
export const selectDefaultAddress = (state) => 
  state.user.addresses.find(addr => addr.isDefault) || state.user.addresses[0];
export const selectUserFavorites = (state) => state.user.favorites;
export const selectUserPreferences = (state) => state.user.preferences;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;