import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const SearchPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Restaurants
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search functionality coming soon! This will include restaurant search, filters, and sorting options.
        </Typography>
      </Box>
    </Container>
  );
};

export default SearchPage;