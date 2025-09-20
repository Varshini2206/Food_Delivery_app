import { cartApi } from './api';

export const cartService = {
  // Get current user's cart
  getCart: async () => {
    const response = await cartApi.getCart();
    return response.data;
  },

  // Add item to cart
  addToCart: async (itemData) => {
    const response = await cartApi.addToCart(itemData);
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    const response = await cartApi.updateCartItem(itemId, quantity);
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    const response = await cartApi.removeFromCart(itemId);
    return response.data;
  },

  // Clear all items from cart
  clearCart: async () => {
    const response = await cartApi.clearCart();
    return response.data;
  },

  // Calculate cart total
  calculateTotal: (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  },

  // Calculate cart item count
  calculateItemCount: (cartItems) => {
    return cartItems.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  },

  // Validate cart items
  validateCart: (cartItems) => {
    return cartItems.every(item => 
      item.quantity > 0 && 
      item.price > 0 && 
      item.menuItemId
    );
  },

  // Format cart for order
  formatCartForOrder: (cartItems, restaurantId, deliveryAddress) => {
    return {
      restaurantId,
      deliveryAddress,
      items: cartItems.map(item => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: cartService.calculateTotal(cartItems)
    };
  }
};

export default cartService;