import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { setupApiInterceptors } from '../services/api';

// Import slices
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import restaurantSlice from './slices/restaurantSlice';
import orderSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';
import uiSlice from './slices/uiSlice';

const persistConfig = {
  key: 'foodie-express-root',
  storage,
  whitelist: ['auth', 'cart'], // Only persist auth and cart data
  blacklist: ['ui'], // Don't persist UI state
};

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  restaurants: restaurantSlice,
  orders: orderSlice,
  user: userSlice,
  ui: uiSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Setup API interceptors after store is created
setupApiInterceptors(store);

// Helper types for useSelector and useDispatch hooks
// Usage: const dispatch = useDispatch(); const state = useSelector(state => state.auth);
export default store;