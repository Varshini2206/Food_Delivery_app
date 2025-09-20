import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Skeleton,
  Alert,
  Tab,
  Tabs,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
  Share as ShareIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantById, fetchMenuItems } from '../store/slices/restaurantSlice';
import MenuCategory from '../components/menu/MenuCategory';
import LoadingSpinner from '../components/common/LoadingSpinner';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`restaurant-tabpanel-${index}`}
      aria-labelledby={`restaurant-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [tabValue, setTabValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { currentRestaurant = null, menuItems = [], isLoading = false, error = null } = useSelector((state) => state.restaurants || {});

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantById(id));
      dispatch(fetchMenuItems(id));
    }
  }, [dispatch, id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // TODO: Dispatch action to add/remove from favorites
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentRestaurant?.name,
        text: `Check out ${currentRestaurant?.name} on FoodieExpress!`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  if (isLoading && !currentRestaurant) {
    return <LoadingSpinner message="Loading restaurant details..." />;
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  if (!currentRestaurant) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">Restaurant not found</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Box>
      {/* Header with back button */}
      <Box sx={{ position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 10, borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
            <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {currentRestaurant.name}
            </Typography>
            <IconButton onClick={handleFavoriteToggle} color={isFavorite ? 'primary' : 'default'}>
              {isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
            </IconButton>
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {/* Restaurant Hero Section */}
        <Card sx={{ mb: 3 }}>
          <Box sx={{ position: 'relative' }}>
            {currentRestaurant.coverImageUrl && (
              <Box
                component="img"
                src={currentRestaurant.coverImageUrl}
                alt={currentRestaurant.name}
                sx={{
                  width: '100%',
                  height: { xs: 200, md: 300 },
                  objectFit: 'cover',
                }}
              />
            )}
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', p: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                {currentRestaurant.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {currentRestaurant.cuisineType}
              </Typography>
            </Box>
          </Box>

          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <StarIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {currentRestaurant.averageRating || 'New'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({currentRestaurant.totalReviews || 0} reviews)
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TimeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <Typography variant="body2">
                  {currentRestaurant.estimatedDeliveryTimeMinutes || 30} mins
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <Typography variant="body2">
                  {currentRestaurant.city}
                </Typography>
              </Box>

              <Chip
                label={currentRestaurant.isOpen ? 'Open' : 'Closed'}
                color={currentRestaurant.isOpen ? 'success' : 'error'}
                size="small"
              />
            </Box>

            {currentRestaurant.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {currentRestaurant.description}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {currentRestaurant.deliveryFee && (
                <Chip
                  label={`₹${currentRestaurant.deliveryFee} delivery`}
                  variant="outlined"
                  size="small"
                />
              )}
              {currentRestaurant.minimumOrderAmount && (
                <Chip
                  label={`₹${currentRestaurant.minimumOrderAmount} minimum`}
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Tabs for Menu and Reviews */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab 
              label={`Menu (${menuItems.length})`} 
              icon={<RestaurantIcon />}
              iconPosition="start"
            />
            <Tab 
              label={`Reviews (${currentRestaurant.totalReviews || 0})`} 
              icon={<StarIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Menu Tab */}
        <TabPanel value={tabValue} index={0}>
          {isLoading ? (
            <Box>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} variant="rectangular" height={120} sx={{ mb: 2 }} />
              ))}
            </Box>
          ) : Object.keys(groupedMenuItems).length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <RestaurantIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Menu coming soon
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This restaurant is still setting up their menu.
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedMenuItems).map(([category, items]) => (
              <MenuCategory
                key={category}
                category={category}
                items={items}
                restaurantId={currentRestaurant.id}
                restaurantName={currentRestaurant.name}
              />
            ))
          )}
        </TabPanel>

        {/* Reviews Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <StarIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Reviews coming soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Customer reviews will be displayed here.
            </Typography>
          </Box>
        </TabPanel>
      </Container>
    </Box>
  );
};

export default RestaurantDetailPage;