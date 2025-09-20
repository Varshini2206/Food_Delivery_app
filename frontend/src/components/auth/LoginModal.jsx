import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Divider,
  Link,
  CircularProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../../services/api';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';

const LoginModal = ({ open, onClose, onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      dispatch(loginStart());
      const response = await authApi.login(formData);
      
      const { token, user } = response.data;
      
      dispatch(loginSuccess({ token, user }));
      dispatch(addNotification({
        type: 'success',
        message: `Welcome back, ${user.firstName || user.first_name}!`,
      }));
      
      onClose();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      dispatch(loginFailure(errorMessage));
      dispatch(addNotification({
        type: 'error',
        message: errorMessage,
      }));
    }
  };

  const handleSocialLogin = (provider) => {
    // For now, show a message that social login is coming soon
    dispatch(addNotification({
      type: 'info',
      message: `${provider} login coming soon!`,
    }));
  };

  const handleClose = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 1,
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h2" fontWeight="bold">
            Welcome Back
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Sign in to your account to continue
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange('password')}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password Link */}
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Link
              href="#"
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                dispatch(addNotification({
                  type: 'info',
                  message: 'Password reset feature coming soon!',
                }));
              }}
            >
              Forgot password?
            </Link>
          </Box>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign In'
            )}
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or continue with
            </Typography>
          </Divider>

          {/* Social Login Buttons */}
          <Box display="flex" gap={2} mb={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialLogin('Google')}
              sx={{ textTransform: 'none' }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={() => handleSocialLogin('Facebook')}
              sx={{ textTransform: 'none' }}
            >
              Facebook
            </Button>
          </Box>

          {/* Sign Up Link */}
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchToRegister();
                }}
                sx={{ fontWeight: 'medium' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;