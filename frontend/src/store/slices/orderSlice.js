import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/api';

// Async thunks
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/orders', orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to place order');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/orders/customer/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

const initialState = {
  orders: [],
  userOrders: [],
  currentOrder: null,
  orderHistory: [],
  activeOrders: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasMore: true,
  },
  // For delivery partners
  availableOrders: [],
  assignedOrders: [],
  // For restaurant owners
  incomingOrders: [],
  // Order tracking
  trackingInfo: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Place order
    placeOrderStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload;
      state.orders.unshift(action.payload);
      state.activeOrders.unshift(action.payload);
      state.error = null;
    },
    placeOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Fetch orders
    fetchOrdersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      const { orders, pagination, replace = true } = action.payload;
      state.isLoading = false;
      
      if (replace) {
        state.orders = orders;
      } else {
        state.orders = [...state.orders, ...orders];
      }
      
      if (pagination) {
        state.pagination = pagination;
      }
      
      // Separate active and history orders
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));
      
      state.activeOrders = orders.filter(order => 
        ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(order.status) ||
        new Date(order.orderDate) > threeDaysAgo
      );
      
      state.orderHistory = orders.filter(order => 
        ['DELIVERED', 'CANCELLED'].includes(order.status) &&
        new Date(order.orderDate) <= threeDaysAgo
      );
      
      state.error = null;
    },
    fetchOrdersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Current order details
    fetchOrderStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload;
      state.error = null;
    },
    fetchOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update order status
    updateOrderStatus: (state, action) => {
      const { orderId, status, statusTimestamp } = action.payload;
      
      // Update in orders list
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
        if (statusTimestamp) {
          state.orders[orderIndex].statusHistory = [
            ...(state.orders[orderIndex].statusHistory || []),
            { status, timestamp: statusTimestamp }
          ];
        }
      }
      
      // Update current order
      if (state.currentOrder && state.currentOrder.id === orderId) {
        state.currentOrder.status = status;
        if (statusTimestamp) {
          state.currentOrder.statusHistory = [
            ...(state.currentOrder.statusHistory || []),
            { status, timestamp: statusTimestamp }
          ];
        }
      }
      
      // Update active/history categorization
      const updatedOrder = state.orders[orderIndex];
      if (updatedOrder) {
        if (['DELIVERED', 'CANCELLED'].includes(status)) {
          state.activeOrders = state.activeOrders.filter(order => order.id !== orderId);
          state.orderHistory.unshift(updatedOrder);
        } else {
          const activeIndex = state.activeOrders.findIndex(order => order.id === orderId);
          if (activeIndex !== -1) {
            state.activeOrders[activeIndex] = updatedOrder;
          }
        }
      }
    },

    // Cancel order
    cancelOrderStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    cancelOrderSuccess: (state, action) => {
      state.isLoading = false;
      const orderId = action.payload;
      
      // Update order status
      orderSlice.caseReducers.updateOrderStatus(state, {
        payload: { orderId, status: 'CANCELLED', statusTimestamp: new Date().toISOString() }
      });
      
      state.error = null;
    },
    cancelOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // For delivery partners - available orders
    fetchAvailableOrdersSuccess: (state, action) => {
      state.availableOrders = action.payload;
    },
    
    // Accept delivery order
    acceptDeliveryOrder: (state, action) => {
      const orderId = action.payload;
      const order = state.availableOrders.find(order => order.id === orderId);
      
      if (order) {
        state.availableOrders = state.availableOrders.filter(order => order.id !== orderId);
        state.assignedOrders.push({ ...order, status: 'ASSIGNED' });
      }
    },

    // For restaurant owners - incoming orders
    fetchIncomingOrdersSuccess: (state, action) => {
      state.incomingOrders = action.payload;
    },

    // Order tracking
    setTrackingInfo: (state, action) => {
      state.trackingInfo = action.payload;
    },
    clearTrackingInfo: (state) => {
      state.trackingInfo = null;
    },

    // Clear data
    clearOrders: (state) => {
      state.orders = [];
      state.activeOrders = [];
      state.orderHistory = [];
      state.pagination = initialState.pagination;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Pagination
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    resetPagination: (state) => {
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      // Place order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  placeOrderStart,
  placeOrderSuccess,
  placeOrderFailure,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFailure,
  updateOrderStatus,
  cancelOrderStart,
  cancelOrderSuccess,
  cancelOrderFailure,
  fetchAvailableOrdersSuccess,
  acceptDeliveryOrder,
  fetchIncomingOrdersSuccess,
  setTrackingInfo,
  clearTrackingInfo,
  clearOrders,
  clearCurrentOrder,
  clearError,
  setPage,
  resetPagination,
} = orderSlice.actions;

export default orderSlice.reducer;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectActiveOrders = (state) => state.orders.activeOrders;
export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrdersLoading = (state) => state.orders.isLoading;
export const selectOrdersError = (state) => state.orders.error;
export const selectOrdersPagination = (state) => state.orders.pagination;
export const selectAvailableOrders = (state) => state.orders.availableOrders;
export const selectAssignedOrders = (state) => state.orders.assignedOrders;
export const selectIncomingOrders = (state) => state.orders.incomingOrders;
export const selectTrackingInfo = (state) => state.orders.trackingInfo;