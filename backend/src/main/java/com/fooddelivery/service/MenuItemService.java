package com.fooddelivery.service;

import com.fooddelivery.entity.MenuItem;
import com.fooddelivery.repository.MenuItemRepository;
import com.fooddelivery.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MenuItemService {
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Autowired
    private RestaurantRepository restaurantRepository;
    
    public List<MenuItem> getMenuByRestaurant(Long restaurantId) {
        if (!restaurantRepository.existsById(restaurantId)) {
            throw new RuntimeException("Restaurant not found with id: " + restaurantId);
        }
        return menuItemRepository.findByRestaurantId(restaurantId);
    }
    
    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Menu item not found with id: " + id));
    }
    
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }
    
    public List<MenuItem> searchMenuItems(String query) {
        return menuItemRepository.findByNameContainingIgnoreCase(query);
    }
    
    public List<MenuItem> getMenuItemsByCategory(String category) {
        return menuItemRepository.findByCategory(category);
    }
    
    public MenuItem createMenuItem(MenuItem menuItem) {
        if (menuItem.getRestaurant() == null || menuItem.getRestaurant().getId() == null) {
            throw new RuntimeException("Restaurant is required for menu item");
        }
        
        if (!restaurantRepository.existsById(menuItem.getRestaurant().getId())) {
            throw new RuntimeException("Restaurant not found");
        }
        
        return menuItemRepository.save(menuItem);
    }
    
    public MenuItem updateMenuItem(Long id, MenuItem menuItem) {
        MenuItem existingMenuItem = getMenuItemById(id);
        
        existingMenuItem.setName(menuItem.getName());
        existingMenuItem.setDescription(menuItem.getDescription());
        existingMenuItem.setPrice(menuItem.getPrice());
        existingMenuItem.setCategory(menuItem.getCategory());
        existingMenuItem.setAvailable(menuItem.isAvailable());
        existingMenuItem.setImageUrl(menuItem.getImageUrl());
        
        return menuItemRepository.save(existingMenuItem);
    }
    
    public void deleteMenuItem(Long id) {
        if (!menuItemRepository.existsById(id)) {
            throw new RuntimeException("Menu item not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }
    
    public List<MenuItem> getAvailableMenuItems() {
        return menuItemRepository.findByIsAvailableTrue();
    }
    
    public List<MenuItem> getMenuItemsByPriceRange(Double minPrice, Double maxPrice) {
        return menuItemRepository.findByPriceBetween(minPrice, maxPrice);
    }
}