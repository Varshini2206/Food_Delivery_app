import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ProfilePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          User profile, settings, and account management coming soon!
        </Typography>
      </Box>
    </Container>
  );
};

export default ProfilePage;