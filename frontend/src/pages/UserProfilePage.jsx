import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  List,
  Chip,
  Divider,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Receipt as ReceiptIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../store/slices/orderSlice';
import { updateUserProfile } from '../store/slices/authSlice';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { userOrders = [], loading: orderLoading = false } = useSelector((state) => state.order || {});

  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          apartment: user.address?.apartment || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || ''
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user?.id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field) => (event) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: event.target.value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: event.target.value
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      await dispatch(updateUserProfile(profileData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancelEdit = () => {
    // Reset to original user data
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          apartment: user.address?.apartment || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || ''
        }
      });
    }
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'preparing':
        return 'primary';
      case 'out_for_delivery':
        return 'secondary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderProfileTab = () => (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Profile Information</Typography>
        {!isEditing ? (
          <Button
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
            variant="outlined"
          >
            Edit Profile
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              startIcon={<SaveIcon />}
              onClick={handleSaveProfile}
              variant="contained"
              disabled={authLoading}
            >
              {authLoading ? <CircularProgress size={20} /> : 'Save'}
            </Button>
            <Button
              startIcon={<CancelIcon />}
              onClick={handleCancelEdit}
              variant="outlined"
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}>
              {(profileData.firstName.charAt(0) + profileData.lastName.charAt(0)).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5">
                {profileData.firstName} {profileData.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profileData.email}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={profileData.firstName}
                onChange={handleInputChange('firstName')}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={profileData.lastName}
                onChange={handleInputChange('lastName')}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={profileData.email}
                onChange={handleInputChange('email')}
                disabled={!isEditing}
                type="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={profileData.phone}
                onChange={handleInputChange('phone')}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Default Delivery Address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={profileData.address.street}
                onChange={handleInputChange('address.street')}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apartment/Suite"
                value={profileData.address.apartment}
                onChange={handleInputChange('address.apartment')}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={profileData.address.city}
                onChange={handleInputChange('address.city')}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                value={profileData.address.state}
                onChange={handleInputChange('address.state')}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP Code"
                value={profileData.address.zipCode}
                onChange={handleInputChange('address.zipCode')}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );

  const renderOrderHistoryTab = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order History
      </Typography>

      {orderLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : userOrders && userOrders.length > 0 ? (
        <List sx={{ width: '100%' }}>
          {userOrders.map((order, index) => (
            <Card key={order.id || index} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6">
                      Order #{order.id || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(order.createdAt || new Date())}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <RestaurantIcon sx={{ fontSize: 16 }} />
                      <Typography variant="body2">
                        {order.restaurantName || 'Restaurant'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Chip
                      label={order.status || 'Pending'}
                      color={getOrderStatusColor(order.status)}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="h6" color="primary">
                      {formatPrice(order.total || 0)}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Items:
                </Typography>
                {order.items?.map((item, itemIndex) => (
                  <Box key={itemIndex} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      {item.quantity}x {item.menuItem?.name || item.name || 'Item'}
                    </Typography>
                    <Typography variant="body2">
                      {formatPrice((item.menuItem?.price || item.price || 0) * item.quantity)}
                    </Typography>
                  </Box>
                )) || (
                  <Typography variant="body2" color="text.secondary">
                    No items found
                  </Typography>
                )}

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/order/${order.id}`)}
                  >
                    View Details
                  </Button>
                  {(order.status === 'delivered') && (
                    <Button size="small" variant="contained">
                      Reorder
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <ReceiptIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No orders yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              When you place your first order, it will appear here.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
            >
              Browse Restaurants
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">
          Please log in to view your profile.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
            <Tab
              icon={<PersonIcon />}
              label="Profile"
              id="simple-tab-0"
              aria-controls="simple-tabpanel-0"
            />
            <Tab
              icon={<HistoryIcon />}
              label="Order History"
              id="simple-tab-1"
              aria-controls="simple-tabpanel-1"
            />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          {renderProfileTab()}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {renderOrderHistoryTab()}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default UserProfilePage;