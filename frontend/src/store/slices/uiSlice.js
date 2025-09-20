import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Global UI state
  isLoading: false,
  loadingMessage: '',
  
  // Notifications/Snackbars
  notifications: [],
  
  // Modal states
  modals: {
    login: false,
    register: false,
    addressForm: false,
    orderDetails: false,
    restaurantInfo: false,
    menuItemDetails: false,
  },
  
  // Sidebar/Drawer states
  sidebars: {
    cart: false,
    filters: false,
    menu: false,
    profile: false,
  },
  
  // Search and filters UI
  searchVisible: false,
  filtersVisible: false,
  
  // Map and location
  mapVisible: false,
  currentLocation: null,
  locationPermission: null, // 'granted', 'denied', 'prompt'
  
  // Theme and layout
  theme: 'light', // 'light', 'dark'
  layout: 'grid', // 'grid', 'list' for restaurant display
  
  // Navigation
  bottomNavValue: 0,
  
  // Form states
  forms: {
    address: {
      isOpen: false,
      editingId: null,
    },
    review: {
      isOpen: false,
      orderId: null,
      restaurantId: null,
    },
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Global loading
    setGlobalLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || '';
    },
    clearGlobalLoading: (state) => {
      state.isLoading = false;
      state.loadingMessage = '';
    },

    // Notifications
    addNotification: (state, action) => {
      const notification = {
        id: Date.now() + Math.random(),
        type: 'info', // 'success', 'error', 'warning', 'info'
        message: '',
        autoHideDuration: 5000,
        ...action.payload,
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },

    // Modals
    openModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals.hasOwnProperty(modalName)) {
        state.modals[modalName] = true;
      }
    },
    closeModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals.hasOwnProperty(modalName)) {
        state.modals[modalName] = false;
      }
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false;
      });
    },

    // Sidebars
    openSidebar: (state, action) => {
      const sidebarName = action.payload;
      if (state.sidebars.hasOwnProperty(sidebarName)) {
        state.sidebars[sidebarName] = true;
      }
    },
    closeSidebar: (state, action) => {
      const sidebarName = action.payload;
      if (state.sidebars.hasOwnProperty(sidebarName)) {
        state.sidebars[sidebarName] = false;
      }
    },
    toggleSidebar: (state, action) => {
      const sidebarName = action.payload;
      if (state.sidebars.hasOwnProperty(sidebarName)) {
        state.sidebars[sidebarName] = !state.sidebars[sidebarName];
      }
    },
    closeAllSidebars: (state) => {
      Object.keys(state.sidebars).forEach(sidebar => {
        state.sidebars[sidebar] = false;
      });
    },

    // Search and filters
    toggleSearch: (state) => {
      state.searchVisible = !state.searchVisible;
    },
    showSearch: (state) => {
      state.searchVisible = true;
    },
    hideSearch: (state) => {
      state.searchVisible = false;
    },
    toggleFilters: (state) => {
      state.filtersVisible = !state.filtersVisible;
    },
    showFilters: (state) => {
      state.filtersVisible = true;
    },
    hideFilters: (state) => {
      state.filtersVisible = false;
    },

    // Map and location
    toggleMap: (state) => {
      state.mapVisible = !state.mapVisible;
    },
    showMap: (state) => {
      state.mapVisible = true;
    },
    hideMap: (state) => {
      state.mapVisible = false;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setLocationPermission: (state, action) => {
      state.locationPermission = action.payload;
    },

    // Theme and layout
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },

    // Navigation
    setBottomNavValue: (state, action) => {
      state.bottomNavValue = action.payload;
    },

    // Forms
    openAddressForm: (state, action) => {
      state.forms.address.isOpen = true;
      state.forms.address.editingId = action.payload || null;
    },
    closeAddressForm: (state) => {
      state.forms.address.isOpen = false;
      state.forms.address.editingId = null;
    },
    openReviewForm: (state, action) => {
      state.forms.review.isOpen = true;
      state.forms.review.orderId = action.payload.orderId;
      state.forms.review.restaurantId = action.payload.restaurantId;
    },
    closeReviewForm: (state) => {
      state.forms.review.isOpen = false;
      state.forms.review.orderId = null;
      state.forms.review.restaurantId = null;
    },

    // Reset UI state
    resetUIState: (state) => {
      return { ...initialState, theme: state.theme };
    },
  },
});

export const {
  setGlobalLoading,
  clearGlobalLoading,
  addNotification,
  removeNotification,
  clearAllNotifications,
  openModal,
  closeModal,
  closeAllModals,
  openSidebar,
  closeSidebar,
  toggleSidebar,
  closeAllSidebars,
  toggleSearch,
  showSearch,
  hideSearch,
  toggleFilters,
  showFilters,
  hideFilters,
  toggleMap,
  showMap,
  hideMap,
  setCurrentLocation,
  setLocationPermission,
  toggleTheme,
  setTheme,
  setLayout,
  setBottomNavValue,
  openAddressForm,
  closeAddressForm,
  openReviewForm,
  closeReviewForm,
  resetUIState,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors
export const selectGlobalLoading = (state) => state.ui.isLoading;
export const selectLoadingMessage = (state) => state.ui.loadingMessage;
export const selectNotifications = (state) => state.ui.notifications;
export const selectModals = (state) => state.ui.modals;
export const selectSidebars = (state) => state.ui.sidebars;
export const selectSearchVisible = (state) => state.ui.searchVisible;
export const selectFiltersVisible = (state) => state.ui.filtersVisible;
export const selectMapVisible = (state) => state.ui.mapVisible;
export const selectCurrentLocation = (state) => state.ui.currentLocation;
export const selectLocationPermission = (state) => state.ui.locationPermission;
export const selectTheme = (state) => state.ui.theme;
export const selectLayout = (state) => state.ui.layout;
export const selectBottomNavValue = (state) => state.ui.bottomNavValue;
export const selectForms = (state) => state.ui.forms;