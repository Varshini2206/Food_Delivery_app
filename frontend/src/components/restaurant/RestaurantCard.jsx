import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  FavoriteOutlined as FavoriteIcon,
  FavoriteBorderOutlined as FavoriteBorderIcon,
  LocalOffer as OfferIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../store/slices/authSlice';
import { useAuth } from '../auth/AuthProvider';

const RestaurantCard = ({ restaurant, isFavorite = false, onToggleFavorite }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { openLoginModal } = useAuth();

  const handleCardClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    onToggleFavorite?.(restaurant.id);
  };

  const formatDeliveryFee = (fee) => {
    if (!fee || fee === 0) return 'Free delivery';
    return `₹${fee} delivery`;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
      onClick={handleCardClick}
    >
      {/* Restaurant Image */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={restaurant.imageUrl}
          alt={restaurant.name}
          sx={{
            objectFit: 'cover',
          }}
        />
        
        {/* Favorite Button */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? `Remove ${restaurant.name} from favorites` : `Add ${restaurant.name} to favorites`}
        >
          {isFavorite ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>

        {/* Offer Badge */}
        {restaurant.offer && (
          <Chip
            icon={<OfferIcon />}
            label={restaurant.offer}
            size="small"
            color="primary"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              fontWeight: 'bold',
            }}
          />
        )}

        {/* New Badge */}
        {restaurant.isNew && (
          <Chip
            label="NEW"
            size="small"
            color="success"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              fontWeight: 'bold',
            }}
          />
        )}
      </Box>

      {/* Restaurant Details */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Restaurant Name and Cuisine */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {restaurant.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          {restaurant.cuisine}
        </Typography>

        {/* Rating and Reviews */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={restaurant.rating}
            precision={0.1}
            size="small"
            readOnly
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            ({restaurant.reviewCount} reviews)
          </Typography>
        </Box>

        {/* Delivery Info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
            pt: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {restaurant.deliveryTime}
            </Typography>
          </Box>
          
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {formatDeliveryFee(restaurant.deliveryFee)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;