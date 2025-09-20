import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const FavoritesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Favorites
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Favorite restaurants and dishes coming soon!
        </Typography>
      </Box>
    </Container>
  );
};

export default FavoritesPage;