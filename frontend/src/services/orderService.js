import api, { endpoints } from './api';

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post(endpoints.orders.create, orderData);
    return response.data;
  },

  // Get user's orders
  getOrders: async (page = 1, limit = 10, status = null) => {
    const params = { page, limit };
    if (status) params.status = status;
    const queryParams = new URLSearchParams(params).toString();
    const response = await api.get(`${endpoints.orders.list}?${queryParams}`);
    return response.data;
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    const response = await api.get(endpoints.orders.details(orderId));
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId, reason = '') => {
    const response = await api.put(endpoints.orders.cancel(orderId), { reason });
    return response.data;
  },

  // Track order
  trackOrder: async (orderId) => {
    const response = await api.get(endpoints.orders.track(orderId));
    return response.data;
  },

  // Get order history
  getOrderHistory: async (page = 1, limit = 10) => {
    const response = await api.get(`${endpoints.orders.history}?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Reorder (create order from previous order)
  reorder: async (orderId) => {
    const response = await api.post(`/orders/${orderId}/reorder`);
    return response.data;
  },

  // Rate and review order
  rateOrder: async (orderId, rating, review = '') => {
    const response = await api.post(`/orders/${orderId}/review`, { rating, review });
    return response.data;
  },

  // For delivery partners
  delivery: {
    // Get available orders for delivery
    getAvailableOrders: async (lat, lng, radius = 10) => {
      const response = await api.get(`${endpoints.orders.available}?lat=${lat}&lng=${lng}&radius=${radius}`);
      return response.data;
    },

    // Accept delivery order
    acceptOrder: async (orderId) => {
      const response = await api.post(endpoints.orders.accept(orderId));
      return response.data;
    },

    // Update order status
    updateOrderStatus: async (orderId, status, location = null) => {
      const payload = { status };
      if (location) {
        payload.location = location;
      }
      const response = await api.put(endpoints.orders.updateStatus(orderId), payload);
      return response.data;
    },

    // Get assigned orders
    getAssignedOrders: async () => {
      const response = await api.get('/orders/assigned');
      return response.data;
    },

    // Complete delivery
    completeDelivery: async (orderId, deliveryProof = null) => {
      const payload = {};
      if (deliveryProof) {
        const formData = new FormData();
        formData.append('proof', deliveryProof);
        formData.append('orderId', orderId);
        const response = await api.post(`/orders/${orderId}/complete`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      } else {
        const response = await api.post(`/orders/${orderId}/complete`);
        return response.data;
      }
    },

    // Get delivery earnings
    getEarnings: async (startDate, endDate) => {
      const response = await api.get(`/delivery/earnings?startDate=${startDate}&endDate=${endDate}`);
      return response.data;
    },
  },

  // For restaurant owners
  restaurant: {
    // Get incoming orders
    getIncomingOrders: async () => {
      const response = await api.get(endpoints.orders.incoming);
      return response.data;
    },

    // Confirm order
    confirmOrder: async (orderId, estimatedPrepTime) => {
      const response = await api.post(endpoints.orders.confirm(orderId), { estimatedPrepTime });
      return response.data;
    },

    // Update order status
    updateOrderStatus: async (orderId, status) => {
      const response = await api.put(endpoints.orders.updateStatus(orderId), { status });
      return response.data;
    },

    // Reject order
    rejectOrder: async (orderId, reason) => {
      const response = await api.post(`/orders/${orderId}/reject`, { reason });
      return response.data;
    },

    // Get order analytics
    getOrderAnalytics: async (startDate, endDate) => {
      const response = await api.get(`/restaurants/orders/analytics?startDate=${startDate}&endDate=${endDate}`);
      return response.data;
    },
  },
};

export default orderService;