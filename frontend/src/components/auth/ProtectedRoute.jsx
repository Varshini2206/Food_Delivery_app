import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated } from '../../store/slices/authSlice';
import { openModal } from '../../store/slices/uiSlice';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openModal('login'));
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    // Return a simple message or redirect component
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h3>Please log in to access this page</h3>
        <p>You need to be logged in to view this content.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;