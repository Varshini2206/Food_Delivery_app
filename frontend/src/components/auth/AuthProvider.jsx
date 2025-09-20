import React, { useState, createContext, useContext } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const closeAllModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  const switchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const value = {
    openLoginModal,
    openRegisterModal,
    closeAllModals,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      
      <LoginModal
        open={loginModalOpen}
        onClose={closeAllModals}
        onSwitchToRegister={switchToRegister}
      />
      
      <RegisterModal
        open={registerModalOpen}
        onClose={closeAllModals}
        onSwitchToLogin={switchToLogin}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;