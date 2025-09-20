import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Cart items with structure: { menuItem, quantity, restaurantId, customizations }
  restaurantId: null, // Current restaurant for the cart
  restaurantName: null,
  totalAmount: 0,
  itemCount: 0,
  isOpen: false, // Cart sidebar visibility
  deliveryAddress: null,
  deliveryFee: 0,
  taxes: 0,
  discounts: 0,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { menuItem, quantity = 1, restaurantId, restaurantName, customizations = [] } = action.payload;
      
      // If adding from different restaurant, clear cart and show warning
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = [];
        state.itemCount = 0;
        state.totalAmount = 0;
      }
      
      // Set restaurant info
      state.restaurantId = restaurantId;
      state.restaurantName = restaurantName;
      
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => item.menuItem.id === menuItem.id && 
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        state.items.push({
          menuItem,
          quantity,
          restaurantId,
          customizations,
          itemTotal: menuItem.price * quantity,
        });
      }
      
      // Recalculate totals
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    removeFromCart: (state, action) => {
      const { menuItemId, customizations = [] } = action.payload;
      
      state.items = state.items.filter(
        item => !(item.menuItem.id === menuItemId && 
        JSON.stringify(item.customizations) === JSON.stringify(customizations))
      );
      
      // Clear restaurant if cart is empty
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.restaurantName = null;
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    updateQuantity: (state, action) => {
      const { menuItemId, quantity, customizations = [] } = action.payload;
      
      const itemIndex = state.items.findIndex(
        item => item.menuItem.id === menuItemId && 
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );
      
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = quantity;
          state.items[itemIndex].itemTotal = state.items[itemIndex].menuItem.price * quantity;
        }
      }
      
      // Clear restaurant if cart is empty
      if (state.items.length === 0) {
        state.restaurantId = null;
        state.restaurantName = null;
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      state.restaurantName = null;
      state.totalAmount = 0;
      state.itemCount = 0;
      state.deliveryAddress = null;
      state.deliveryFee = 0;
      state.taxes = 0;
      state.discounts = 0;
      state.grandTotal = 0;
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    openCart: (state) => {
      state.isOpen = true;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },
    
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
      // Recalculate delivery fee based on distance (mock calculation)
      state.deliveryFee = action.payload ? 2.99 : 0;
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    applyDiscount: (state, action) => {
      state.discounts = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    calculateTotals: (state) => {
      // Calculate item count and subtotal
      state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.itemTotal, 0);
      
      // Calculate taxes (8% of subtotal)
      state.taxes = state.totalAmount * 0.08;
      
      // Calculate grand total
      state.grandTotal = state.totalAmount + state.deliveryFee + state.taxes - state.discounts;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  setDeliveryAddress,
  applyDiscount,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCart = (state) => state.cart;
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) => state.cart.itemCount;
export const selectCartTotal = (state) => state.cart.totalAmount;
export const selectCartGrandTotal = (state) => state.cart.grandTotal;
export const selectCartRestaurant = (state) => ({
  id: state.cart.restaurantId,
  name: state.cart.restaurantName,
});
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectDeliveryAddress = (state) => state.cart.deliveryAddress;