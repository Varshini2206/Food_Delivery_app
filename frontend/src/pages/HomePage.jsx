import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../components/common/LoadingSpinner';
import RestaurantList from '../components/restaurant/RestaurantList';
import { addNotification } from '../store/slices/uiSlice';
import { fetchRestaurantsStart, fetchRestaurantsSuccess, fetchRestaurantsFailure } from '../store/slices/restaurantSlice';
import { restaurantApi } from '../services/api';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { restaurants = [], isLoading = false } = useSelector((state) => state.restaurants || {});

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        dispatch(fetchRestaurantsStart());
        const response = await restaurantApi.list();
        dispatch(fetchRestaurantsSuccess({ 
          restaurants: response.data || [], 
          replace: true 
        }));
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        dispatch(fetchRestaurantsFailure(error.message || 'Failed to fetch restaurants'));
        dispatch(addNotification({
          type: 'error',
          message: 'Failed to load restaurants. Please try again.',
        }));
      }
    };

    fetchRestaurants();
  }, [dispatch]);

  // Use real restaurants data from the backend
  const featuredRestaurants = restaurants.length > 0 ? restaurants.map(restaurant => ({
    id: restaurant.id,
    name: restaurant.name,
    cuisine: restaurant.cuisineType || restaurant.cuisine_type,
    rating: restaurant.averageRating || restaurant.average_rating || 4.0,
    reviewCount: restaurant.totalReviews || restaurant.total_reviews || 0,
    deliveryTime: `${restaurant.estimatedDeliveryTimeMinutes || restaurant.estimated_delivery_time_minutes || 30}-${(restaurant.estimatedDeliveryTimeMinutes || restaurant.estimated_delivery_time_minutes || 30) + 10} min`,
    deliveryFee: restaurant.deliveryFee || restaurant.delivery_fee || 0,
    imageUrl: restaurant.coverImageUrl || restaurant.cover_image_url || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
    offer: restaurant.discount ? `${restaurant.discount}% OFF` : null,
    isNew: false,
  })) : [
    {
      id: 1,
      name: "Mama Mia's Italian",
      cuisine: "Italian",
      rating: 4.8,
      reviewCount: 245,
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
      offer: "20% OFF",
      isNew: false,
    },
    {
      id: 2,
      name: "Spice Garden",
      cuisine: "Indian",
      rating: 4.6,
      reviewCount: 189,
      deliveryTime: "30-40 min",
      deliveryFee: 1.99,
      imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&crop=center",
      offer: "Free Delivery",
      isNew: true,
    },
    {
      id: 3,
      name: "Burger Palace",
      cuisine: "American",
      rating: 4.5,
      reviewCount: 312,
      deliveryTime: "20-30 min",
      deliveryFee: 2.49,
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center",
      offer: "Buy 1 Get 1",
      isNew: false,
    },
    {
      id: 4,
      name: "Sushi Express",
      cuisine: "Japanese",
      rating: 4.9,
      reviewCount: 156,
      deliveryTime: "35-45 min",
      deliveryFee: 3.99,
      imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center",
      offer: "10% OFF",
      isNew: false,
    },
  ];

  useEffect(() => {
    // Welcome message for new users
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      dispatch(addNotification({
        type: 'success',
        message: 'Welcome to FoodieExpress! Your favorite food is just a click away.',
        autoHideDuration: 6000,
      }));
      localStorage.setItem('hasVisited', 'true');
    }
  }, [dispatch]);

  const cuisines = [
    { name: "Italian", icon: "🍝", color: "#ff6b6b" },
    { name: "Indian", icon: "🍛", color: "#ff8e53" },
    { name: "Chinese", icon: "🥢", color: "#ff9f43" },
    { name: "American", icon: "🍔", color: "#26de81" },
    { name: "Japanese", icon: "🍣", color: "#2bcbba" },
    { name: "Mexican", icon: "🌮", color: "#45aaf2" },
    { name: "Thai", icon: "🍜", color: "#a55eea" },
    { name: "Pizza", icon: "🍕", color: "#fd79a8" },
  ];

  // Show loading spinner if data is loading
  if (isLoading) {
    return <LoadingSpinner message="Loading restaurants..." />;
  }

  const handleCuisineClick = (cuisine) => {
    navigate(`/search?cuisine=${encodeURIComponent(cuisine)}`);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                }}
              >
                Delicious food, delivered fast
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                Order from your favorite restaurants and get fresh food delivered to your doorstep in minutes.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/search')}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                Order Now
              </Button>
            </Grid>
            {!isMobile && (
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&crop=center"
                  alt="Delicious food"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: 500,
                    borderRadius: 2,
                    boxShadow: theme.shadows[10],
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Cuisines Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
          Explore Cuisines
        </Typography>
        
        <Grid container spacing={2}>
          {cuisines.map((cuisine, index) => (
            <Grid item xs={6} sm={4} md={3} lg={1.5} key={index}>
              <Card
                sx={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  p: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[6],
                  },
                }}
                onClick={() => handleCuisineClick(cuisine.name)}
              >
                <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                  {cuisine.icon}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {cuisine.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Restaurants */}
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <RestaurantList 
          restaurants={featuredRestaurants}
          isLoading={isLoading}
          title="Featured Restaurants"
          showFilters={false}
          showSearch={false}
        />
        
        {isMobile && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/search')}
              fullWidth
            >
              View All Restaurants
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;