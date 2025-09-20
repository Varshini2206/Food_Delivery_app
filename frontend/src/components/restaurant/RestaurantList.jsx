import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Paper,
  Button,
  Skeleton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import RestaurantCard from './RestaurantCard';

const RestaurantList = ({ 
  restaurants = [], 
  isLoading = false, 
  title = "Restaurants near you",
  showFilters = true,
  showSearch = true 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Available cuisines for filtering
  const cuisines = [
    'All',
    'Indian',
    'Italian', 
    'Chinese',
    'American',
    'Japanese',
    'Mexican',
    'Thai',
    'Mediterranean',
  ];

  // Filter restaurants based on search and filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = !searchQuery || 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCuisine = !selectedCuisine || 
      selectedCuisine === 'All' ||
      restaurant.cuisine === selectedCuisine;
    
    return matchesSearch && matchesCuisine;
  });

  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        // Extract delivery time numbers for comparison
        const timeA = parseInt(a.deliveryTime.split('-')[0]);
        const timeB = parseInt(b.deliveryTime.split('-')[0]);
        return timeA - timeB;
      case 'deliveryFee':
        return a.deliveryFee - b.deliveryFee;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('');
    setSortBy('rating');
  };

  const activeFiltersCount = [searchQuery, selectedCuisine].filter(Boolean).length;

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          {title}
        </Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper sx={{ overflow: 'hidden' }}>
                <Skeleton variant="rectangular" height={200} />
                <Box sx={{ p: 2 }}>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" height={20} width="60%" />
                  <Skeleton variant="text" height={20} width="80%" />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sortedRestaurants.length} restaurant{sortedRestaurants.length !== 1 ? 's' : ''} found
        </Typography>
      </Box>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            {showSearch && (
              <TextField
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery('')} aria-label="Clear search">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 250, flexGrow: 1 }}
              />
            )}

            {/* Cuisine Filter */}
            {showFilters && (
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  displayEmpty
                  size="small"
                >
                  {cuisines.map((cuisine) => (
                    <MenuItem key={cuisine} value={cuisine === 'All' ? '' : cuisine}>
                      {cuisine}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Sort */}
            {showFilters && (
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  size="small"
                  startAdornment={<SortIcon sx={{ mr: 1, fontSize: 20 }} />}
                >
                  <MenuItem value="rating">Rating</MenuItem>
                  <MenuItem value="deliveryTime">Delivery Time</MenuItem>
                  <MenuItem value="deliveryFee">Delivery Fee</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                </Select>
              </FormControl>
            )}

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="outlined"
                size="small"
                onClick={handleClearFilters}
                startIcon={<ClearIcon />}
              >
                Clear ({activeFiltersCount})
              </Button>
            )}
          </Box>

          {/* Active Filter Chips */}
          {(selectedCuisine || searchQuery) && (
            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              {searchQuery && (
                <Chip
                  label={`Search: "${searchQuery}"`}
                  onDelete={() => setSearchQuery('')}
                  size="small"
                />
              )}
              {selectedCuisine && (
                <Chip
                  label={`Cuisine: ${selectedCuisine}`}
                  onDelete={() => setSelectedCuisine('')}
                  size="small"
                />
              )}
            </Box>
          )}
        </Paper>
      )}

      {/* Restaurant Grid */}
      {sortedRestaurants.length > 0 ? (
        <Grid container spacing={3}>
          {sortedRestaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
              <RestaurantCard
                restaurant={restaurant}
                isFavorite={false} // TODO: Connect to favorites state
                onToggleFavorite={(id) => {
                  // TODO: Implement favorite toggle
                  console.log('Toggle favorite for restaurant:', id);
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: 'text.secondary',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            No restaurants found
          </Typography>
          <Typography variant="body2">
            {searchQuery || selectedCuisine
              ? 'Try adjusting your search or filters'
              : 'No restaurants available at the moment'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RestaurantList;