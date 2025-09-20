import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  Stack,
  CardContent,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, selectRestaurants, selectRestaurantsLoading } from '../store/slices/restaurantSlice';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(4),
}));

const SearchBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const CategoryCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const HomePage = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectRestaurants);
  const loading = useSelector(selectRestaurantsLoading);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);
  const categories = [
    { name: 'Pizza', image: '🍕', color: '#ff6b6b' },
    { name: 'Burgers', image: '🍔', color: '#4ecdc4' },
    { name: 'Sushi', image: '🍣', color: '#45b7d1' },
    { name: 'Indian', image: '🍛', color: '#96ceb4' },
    { name: 'Chinese', image: '🥡', color: '#feca57' },
    { name: 'Italian', image: '🍝', color: '#ff9ff3' },
    { name: 'Mexican', image: '🌮', color: '#54a0ff' },
    { name: 'Desserts', image: '🍰', color: '#5f27cd' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Delicious food
                <br />
                delivered to your door
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Order from your favorite restaurants and get fresh, hot meals delivered fast.
              </Typography>
              
              <SearchBox>
                <TextField
                  fullWidth
                  placeholder="Enter your delivery address"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <Button variant="contained" sx={{ ml: 1 }}>
                        Find Food
                      </Button>
                    ),
                  }}
                />
              </SearchBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600"
                alt="Delicious food"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        {/* Categories Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            What are you craving?
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={6} sm={4} md={3} lg={1.5} key={category.name}>
                <CategoryCard>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                      {category.image}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {category.name}
                    </Typography>
                  </CardContent>
                </CategoryCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Restaurants */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
              Featured Restaurants
            </Typography>
            <Button variant="outlined">View All</Button>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <LoadingSpinner />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {restaurants.map((restaurant) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
                  <RestaurantCard restaurant={restaurant} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Promotional Section */}
        <Box sx={{ mb: 6 }}>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 4,
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Get the FoodieExpress App
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Enjoy exclusive app-only offers and faster ordering
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main' }}>
                Download for iOS
              </Button>
              <Button variant="outlined" size="large" sx={{ borderColor: 'white', color: 'white' }}>
                Download for Android
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;