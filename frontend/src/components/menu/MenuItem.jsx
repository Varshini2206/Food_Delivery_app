import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalOffer as OfferIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../../store/slices/cartSlice';

const MenuItem = ({ item, restaurantId, restaurantName }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  // Find current quantity in cart
  const cartItem = cartItems.find(cartItem => cartItem.menuItem.id === item.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (currentQuantity === 0) {
      dispatch(addToCart({
        menuItem: item,
        restaurantId,
        restaurantName,
        quantity: 1,
        customizations: []
      }));
    } else {
      dispatch(updateQuantity({
        menuItemId: item.id,
        quantity: currentQuantity + 1
      }));
    }
  };

  const handleRemoveFromCart = () => {
    if (currentQuantity > 0) {
      dispatch(updateQuantity({
        menuItemId: item.id,
        quantity: currentQuantity - 1
      }));
    }
  };

  const getItemTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'veg':
        return 'success';
      case 'non-veg':
        return 'error';
      case 'vegan':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getItemTypeIcon = (type) => {
    return type === 'veg' ? '🟢' : type === 'non-veg' ? '🔴' : '⚪';
  };

  return (
    <Card 
      sx={{ 
        display: 'flex',
        mb: 2,
        boxShadow: 2,
        '&:hover': { boxShadow: 4 },
        opacity: item.isAvailable ? 1 : 0.6
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', position: 'relative' }}>
          {/* Item type indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <span style={{ fontSize: '12px', marginRight: '4px' }}>
              {getItemTypeIcon(item.type)}
            </span>
            <Chip
              label={item.type || 'Veg'}
              size="small"
              color={getItemTypeColor(item.type)}
              sx={{ fontSize: '10px', height: '20px' }}
            />
            {item.isSpicy && (
              <Chip
                label="🌶️ Spicy"
                size="small"
                color="warning"
                sx={{ ml: 1, fontSize: '10px', height: '20px' }}
              />
            )}
          </Box>

          {/* Item name and description */}
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
            {item.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {item.description}
          </Typography>

          {/* Price and offers */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              ₹{item.price}
            </Typography>
            {item.originalPrice && item.originalPrice > item.price && (
              <Typography 
                variant="body2" 
                sx={{ 
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  ml: 1
                }}
              >
                ₹{item.originalPrice}
              </Typography>
            )}
            {item.discount && (
              <Chip
                icon={<OfferIcon />}
                label={`${item.discount}% OFF`}
                color="primary"
                size="small"
                sx={{ ml: 1 }}
              />
            )}
          </Box>

          {/* Customizations and allergens */}
          {item.customizations && item.customizations.length > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Customizations available
            </Typography>
          )}
          
          {item.allergens && item.allergens.length > 0 && (
            <Typography variant="caption" color="warning.main" sx={{ display: 'block', mb: 1 }}>
              Contains: {item.allergens.join(', ')}
            </Typography>
          )}

          {/* Add to cart controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            {!item.isAvailable ? (
              <Button 
                variant="outlined" 
                disabled 
                sx={{ color: 'text.secondary' }}
              >
                Out of Stock
              </Button>
            ) : currentQuantity === 0 ? (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddToCart}
                sx={{ borderRadius: 2 }}
              >
                Add to Cart
              </Button>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton 
                  onClick={handleRemoveFromCart}
                  size="small"
                  aria-label={`Remove one ${item.name} from cart`}
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>
                  {currentQuantity}
                </Typography>
                <IconButton 
                  onClick={handleAddToCart}
                  size="small"
                  aria-label={`Add one ${item.name} to cart`}
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </CardContent>
      </Box>

      {/* Item image */}
      {item.imageUrl && (
        <CardMedia
          component="img"
          sx={{ width: 120, height: 120, objectFit: 'cover' }}
          image={item.imageUrl}
          alt={item.name}
        />
      )}
    </Card>
  );
};

export default MenuItem;