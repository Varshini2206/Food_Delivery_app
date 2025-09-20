import api, { endpoints } from './api';

export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post(endpoints.auth.login, credentials);
    return response.data;
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post(endpoints.auth.register, userData);
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await api.post(endpoints.auth.refresh, { refreshToken });
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post(endpoints.auth.logout);
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get(endpoints.auth.profile);
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put(endpoints.auth.profile, profileData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.put(`${endpoints.auth.profile}/password`, passwordData);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  // Resend verification email
  resendVerificationEmail: async () => {
    const response = await api.post('/auth/resend-verification');
    return response.data;
  },
};

export default authService;