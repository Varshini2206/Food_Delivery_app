import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const OrdersPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Orders
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Order history and tracking functionality coming soon!
        </Typography>
      </Box>
    </Container>
  );
};

export default OrdersPage;