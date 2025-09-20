import React, { useState } from 'react';
import {
  Box,
  Typography,
  Collapse,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import MenuItem from './MenuItem';

const MenuCategory = ({ category, items, restaurantId, restaurantName }) => {
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const availableItems = items.filter(item => item.isAvailable);
  const unavailableItems = items.filter(item => !item.isAvailable);

  return (
    <Box sx={{ mb: 3 }}>
      {/* Category Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 2,
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 2,
          cursor: 'pointer'
        }}
        onClick={handleExpandClick}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            {category}
          </Typography>
          <Chip 
            label={`${items.length} items`} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
          {availableItems.length !== items.length && (
            <Chip 
              label={`${unavailableItems.length} unavailable`} 
              size="small" 
              color="warning" 
              variant="outlined"
            />
          )}
        </Box>
        
        <IconButton size="small" aria-label={expanded ? `Collapse ${category} category` : `Expand ${category} category`}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Category Items */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 1 }}>
          {/* Available Items */}
          {availableItems.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              restaurantId={restaurantId}
              restaurantName={restaurantName}
            />
          ))}
          
          {/* Divider if there are unavailable items */}
          {unavailableItems.length > 0 && availableItems.length > 0 && (
            <Divider sx={{ my: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Currently Unavailable
              </Typography>
            </Divider>
          )}
          
          {/* Unavailable Items */}
          {unavailableItems.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              restaurantId={restaurantId}
              restaurantName={restaurantName}
            />
          ))}

          {/* Empty state */}
          {items.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                No items available in this category
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default MenuCategory;