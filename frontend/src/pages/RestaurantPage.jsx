import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const RestaurantPage = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurant Details
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Restaurant ID: {id}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Restaurant menu, details, and ordering functionality coming soon!
        </Typography>
      </Box>
    </Container>
  );
};

export default RestaurantPage;