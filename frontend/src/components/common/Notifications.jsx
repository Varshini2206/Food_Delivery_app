import React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotifications, removeNotification } from '../../store/slices/uiSlice';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  const handleClose = (notificationId) => {
    dispatch(removeNotification(notificationId));
  };

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.autoHideDuration}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            mt: index * 7, // Stack notifications vertically
          }}
        >
          <Alert
            severity={notification.type}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => handleClose(notification.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{ 
              minWidth: 300,
              maxWidth: 400,
              '& .MuiAlert-message': {
                wordBreak: 'break-word',
              },
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default Notifications;