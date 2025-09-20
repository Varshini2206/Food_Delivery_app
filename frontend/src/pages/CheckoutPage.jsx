import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
  LocalAtm as CashIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/slices/cartSlice';
import { placeOrder } from '../store/slices/orderSlice';

const steps = ['Delivery Address', 'Payment Method', 'Review Order'];

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items: cartItems, totalAmount: subtotal, deliveryFee, taxes, grandTotal: total, restaurantName } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading: orderLoading = false, error: orderError = null } = useSelector((state) => state.order || {});

  const [activeStep, setActiveStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Address state
  const [address, setAddress] = useState({
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    instructions: ''
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/');
    }
  }, [cartItems, navigate, orderPlaced]);

  useEffect(() => {
    // Pre-fill user address if available
    if (user?.address) {
      setAddress(prev => ({
        ...prev,
        ...user.address
      }));
    }
  }, [user]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddressChange = (field) => (event) => {
    setAddress(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handlePaymentChange = (field) => (event) => {
    setPaymentDetails(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const isAddressValid = () => {
    return address.street && address.city && address.state && address.zipCode;
  };

  const isPaymentValid = () => {
    if (paymentMethod === 'cash') return true;
    const isValid = paymentDetails.cardNumber && paymentDetails.expiryDate && 
           paymentDetails.cvv && paymentDetails.cardholderName;
    console.log('Payment validation:', { paymentMethod, paymentDetails, isValid });
    return isValid;
  };

  const handlePlaceOrder = async () => {
    console.log('handlePlaceOrder called');
    console.log('activeStep:', activeStep);
    console.log('canContinue():', canContinue());
    console.log('orderLoading:', orderLoading);
    
    // Format address as a string for backend
    const formatAddress = (addr) => {
      const parts = [];
      if (addr.street) parts.push(addr.street);
      if (addr.apartment) parts.push(addr.apartment);
      if (addr.city) parts.push(addr.city);
      if (addr.state) parts.push(addr.state);
      if (addr.zipCode) parts.push(addr.zipCode);
      return parts.join(', ');
    };
    
    // Map frontend payment method to backend enum
    const mapPaymentMethod = (method) => {
      switch (method) {
        case 'card':
          return 'CREDIT_CARD';
        case 'cash':
          return 'CASH_ON_DELIVERY';
        case 'wallet':
          return 'WALLET';
        default:
          return 'CREDIT_CARD';
      }
    };
    
    const orderData = {
      orderItems: cartItems.map(item => ({
        menuItemId: item.menuItem.id,
        quantity: item.quantity,
        customizations: item.customizations,
        price: item.menuItem.price
      })),
      deliveryAddress: formatAddress(address),
      deliveryCity: address.city,
      deliveryState: address.state,
      deliveryPostalCode: address.zipCode,
      paymentMethod: mapPaymentMethod(paymentMethod),
      totalAmount: total,
      subtotal,
      deliveryFee,
      taxAmount: taxes
    };

    console.log('Order data:', orderData);

    try {
      await dispatch(placeOrder(orderData)).unwrap();
      dispatch(clearCart());
      setOrderPlaced(true);
      setActiveStep(3); // Move to success step
    } catch (error) {
      console.error('Order placement failed:', error);
    }
  };

  const formatPrice = (price) => `$${(price || 0).toFixed(2)}`;

  const renderAddressStep = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Delivery Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street Address"
            value={address.street}
            onChange={handleAddressChange('street')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apartment/Suite (Optional)"
            value={address.apartment}
            onChange={handleAddressChange('apartment')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={address.city}
            onChange={handleAddressChange('city')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            value={address.state}
            onChange={handleAddressChange('state')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ZIP Code"
            value={address.zipCode}
            onChange={handleAddressChange('zipCode')}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Delivery Instructions (Optional)"
            value={address.instructions}
            onChange={handleAddressChange('instructions')}
            multiline
            rows={2}
            placeholder="e.g., Ring doorbell, Leave at door, etc."
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderPaymentStep = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCardIcon />
                <span>Credit/Debit Card</span>
              </Box>
            }
          />
          <FormControlLabel
            value="wallet"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WalletIcon />
                <span>Digital Wallet</span>
              </Box>
            }
          />
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CashIcon />
                <span>Cash on Delivery</span>
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'card' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cardholder Name"
              value={paymentDetails.cardholderName}
              onChange={handlePaymentChange('cardholderName')}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card Number"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentChange('cardNumber')}
              placeholder="1234 5678 9012 3456"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              value={paymentDetails.expiryDate}
              onChange={handlePaymentChange('expiryDate')}
              placeholder="MM/YY"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CVV"
              value={paymentDetails.cvv}
              onChange={handlePaymentChange('cvv')}
              placeholder="123"
              required
            />
          </Grid>
        </Grid>
      )}

      {paymentMethod === 'wallet' && (
        <Alert severity="info" sx={{ mt: 2 }}>
          You will be redirected to your digital wallet to complete the payment.
        </Alert>
      )}

      {paymentMethod === 'cash' && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Please have exact change ready. Payment will be collected upon delivery.
        </Alert>
      )}
    </Box>
  );

  const renderReviewStep = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Review Your Order
      </Typography>
      
      {/* Order Items */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Order from {restaurantName}
          </Typography>
          <List sx={{ py: 0 }}>
            {cartItems.map((item, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    src={item.menuItem.imageUrl}
                    alt={item.menuItem.name}
                    variant="rounded"
                  >
                    {item.menuItem.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.quantity}x ${item.menuItem.name}`}
                  secondary={item.customizations?.join(', ')}
                />
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                  {formatPrice(item.menuItem.price * item.quantity)}
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1">
              Delivery Address
            </Typography>
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => setActiveStep(0)}
            >
              Edit
            </Button>
          </Box>
          <Typography variant="body2">
            {address.street}
            {address.apartment && `, ${address.apartment}`}
          </Typography>
          <Typography variant="body2">
            {address.city}, {address.state} {address.zipCode}
          </Typography>
          {address.instructions && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Instructions: {address.instructions}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1">
              Payment Method
            </Typography>
            <Button
              size="small"
              startIcon={<EditIcon />}
              onClick={() => setActiveStep(1)}
            >
              Edit
            </Button>
          </Box>
          <Typography variant="body2">
            {paymentMethod === 'card' && `Credit Card ending in ${paymentDetails.cardNumber.slice(-4)}`}
            {paymentMethod === 'wallet' && 'Digital Wallet'}
            {paymentMethod === 'cash' && 'Cash on Delivery'}
          </Typography>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Order Summary
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Subtotal</Typography>
            <Typography variant="body2">{formatPrice(subtotal)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Delivery Fee</Typography>
            <Typography variant="body2">{formatPrice(deliveryFee)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Taxes & Fees</Typography>
            <Typography variant="body2">{formatPrice(taxes)}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {formatPrice(total)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderSuccessStep = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <ReceiptIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Order Placed Successfully!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Thank you for your order. You will receive a confirmation email shortly.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/orders')}
        >
          Track Order
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderAddressStep();
      case 1:
        return renderPaymentStep();
      case 2:
        return renderReviewStep();
      case 3:
        return renderSuccessStep();
      default:
        return 'Unknown step';
    }
  };

  const canContinue = () => {
    switch (activeStep) {
      case 0:
        return isAddressValid();
      case 1:
        return isPaymentValid();
      case 2:
        return true;
      default:
        return false;
    }
  };

  if (orderPlaced && activeStep === 3) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          {renderSuccessStep()}
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                icon={
                  index === 0 ? <LocationIcon /> :
                  index === 1 ? <PaymentIcon /> :
                  <ReceiptIcon />
                }
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {orderError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {orderError}
          </Alert>
        )}

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handlePlaceOrder}
                disabled={orderLoading || !canContinue()}
                startIcon={orderLoading && <CircularProgress size={20} />}
              >
                {orderLoading ? 'Placing Order...' : 'Place Order'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!canContinue()}
              >
                Continue
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CheckoutPage;