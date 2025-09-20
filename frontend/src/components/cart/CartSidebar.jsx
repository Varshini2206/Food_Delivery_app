import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Button,
  Divider,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  updateQuantity,
  removeFromCart,
  clearCart,
  toggleCart
} from '../../store/slices/cartSlice';
import { useAuth } from '../auth/AuthProvider';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openLoginModal } = useAuth();
  
  const { 
    items: cartItems, 
    isOpen, 
    restaurantId, 
    restaurantName,
    totalAmount: subtotal,
    deliveryFee,
    taxes,
    grandTotal: total,
    itemCount 
  } = useSelector((state) => state.cart);
  
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(toggleCart());
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart({
        menuItemId: item.menuItem.id,
        customizations: item.customizations,
      }));
    } else {
      dispatch(updateQuantity({
        menuItemId: item.menuItem.id,
        quantity: newQuantity,
        customizations: item.customizations,
      }));
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      menuItemId: item.menuItem.id,
      customizations: item.customizations,
    }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    handleClose();
    navigate('/checkout');
  };

  const handleViewRestaurant = () => {
    if (restaurantId) {
      handleClose();
      navigate(`/restaurant/${restaurantId}`);
    }
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  if (cartItems.length === 0) {
    return (
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            maxWidth: '100vw',
          },
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" component="h2">
              Your Cart
            </Typography>
            <IconButton onClick={handleClose} aria-label="Close cart">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
          }}>
            <CartIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add some delicious items from restaurants to get started!
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                navigate('/');
              }}
            >
              Browse Restaurants
            </Button>
          </Box>
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          maxWidth: '100vw',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" component="h2">
              Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </Typography>
            <IconButton onClick={handleClose} aria-label="Close cart">
              <CloseIcon />
            </IconButton>
          </Box>

          {restaurantName && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Order from:
              </Typography>
              <Chip
                label={restaurantName}
                size="small"
                color="primary"
                variant="outlined"
                onClick={handleViewRestaurant}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          )}
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <List sx={{ p: 0 }}>
            {cartItems.map((item, index) => (
              <ListItem key={`${item.menuItem.id}-${index}`} sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
                  {/* Item Image */}
                  <Avatar
                    src={item.menuItem.imageUrl}
                    alt={item.menuItem.name}
                    variant="rounded"
                    sx={{ width: 60, height: 60, flexShrink: 0 }}
                  >
                    {!item.menuItem.imageUrl && item.menuItem.name.charAt(0)}
                  </Avatar>

                  {/* Item Details */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {item.menuItem.name}
                    </Typography>
                    
                    {item.customizations && item.customizations.length > 0 && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        {item.customizations.join(', ')}
                      </Typography>
                    )}

                    <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                      {formatPrice(item.menuItem.price)}
                    </Typography>

                    {/* Quantity Controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.menuItem.name}`}
                        sx={{ 
                          minWidth: 32, 
                          height: 32,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      
                      <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>
                        {item.quantity}
                      </Typography>
                      
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.menuItem.name}`}
                        sx={{ 
                          minWidth: 32, 
                          height: 32,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() => handleRemoveItem(item)}
                        aria-label={`Remove ${item.menuItem.name} from cart`}
                        sx={{ ml: 'auto', color: 'error.main' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">{formatPrice(subtotal)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Delivery Fee</Typography>
              <Typography variant="body2">{formatPrice(deliveryFee)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Taxes & Fees</Typography>
              <Typography variant="body2">{formatPrice(taxes)}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {formatPrice(total)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={handleClearCart}
              sx={{ flex: 1 }}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              onClick={handleCheckout}
              sx={{ flex: 2 }}
              disabled={cartItems.length === 0}
            >
              {isAuthenticated ? 'Checkout' : 'Login to Checkout'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartSidebar;