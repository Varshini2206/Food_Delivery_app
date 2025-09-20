package com.fooddelivery.controller;

import com.fooddelivery.entity.MenuItem;
import com.fooddelivery.entity.Restaurant;
import com.fooddelivery.repository.MenuItemRepository;
import com.fooddelivery.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Menu operations
 */
@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    /**
     * Get all menu items for a restaurant
     */
    @GetMapping("/restaurants/{restaurantId}/menu")
    @Transactional(readOnly = true)
    public ResponseEntity<List<MenuItem>> getMenuByRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        try {
            Optional<Restaurant> restaurant = restaurantRepository.findById(restaurantId);
            if (restaurant.isPresent()) {
                List<MenuItem> menuItems = menuItemRepository.findByRestaurant(restaurant.get());
                return new ResponseEntity<>(menuItems, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all menu items
     */
    @GetMapping("/menu")
    @Transactional(readOnly = true)
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        try {
            List<MenuItem> menuItems = menuItemRepository.findAll();
            return new ResponseEntity<>(menuItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get menu item by ID
     */
    @GetMapping("/menu/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable("id") Long id) {
        try {
            Optional<MenuItem> menuItemData = menuItemRepository.findById(id);
            if (menuItemData.isPresent()) {
                return new ResponseEntity<>(menuItemData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a new menu item
     */
    @PostMapping("/menu")
    @Transactional
    public ResponseEntity<MenuItem> createMenuItem(@Valid @RequestBody MenuItem menuItem) {
        try {
            MenuItem savedMenuItem = menuItemRepository.save(menuItem);
            return new ResponseEntity<>(savedMenuItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update an existing menu item
     */
    @PutMapping("/menu/{id}")
    @Transactional
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable("id") Long id, @Valid @RequestBody MenuItem menuItem) {
        try {
            Optional<MenuItem> menuItemData = menuItemRepository.findById(id);
            if (menuItemData.isPresent()) {
                MenuItem existingMenuItem = menuItemData.get();
                existingMenuItem.setName(menuItem.getName());
                existingMenuItem.setDescription(menuItem.getDescription());
                existingMenuItem.setPrice(menuItem.getPrice());
                existingMenuItem.setCategory(menuItem.getCategory());
                existingMenuItem.setType(menuItem.getType());
                existingMenuItem.setCalories(menuItem.getCalories());
                existingMenuItem.setPreparationTimeMinutes(menuItem.getPreparationTimeMinutes());
                existingMenuItem.setSpiceLevel(menuItem.getSpiceLevel());
                existingMenuItem.setImageUrl(menuItem.getImageUrl());
                existingMenuItem.setIsAvailable(menuItem.getIsAvailable());
                existingMenuItem.setIsRecommended(menuItem.getIsRecommended());
                existingMenuItem.setDiscountPercentage(menuItem.getDiscountPercentage());
                
                return new ResponseEntity<>(menuItemRepository.save(existingMenuItem), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a menu item
     */
    @DeleteMapping("/menu/{id}")
    public ResponseEntity<HttpStatus> deleteMenuItem(@PathVariable("id") Long id) {
        try {
            menuItemRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get menu items by category
     */
    @GetMapping("/menu/category/{category}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<MenuItem>> getMenuItemsByCategory(@PathVariable("category") String category) {
        try {
            List<MenuItem> menuItems = menuItemRepository.findByCategory(category);
            return new ResponseEntity<>(menuItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get available menu items for a restaurant
     */
    @GetMapping("/restaurants/{restaurantId}/menu/available")
    @Transactional(readOnly = true)
    public ResponseEntity<List<MenuItem>> getAvailableMenuByRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        try {
            Optional<Restaurant> restaurant = restaurantRepository.findById(restaurantId);
            if (restaurant.isPresent()) {
                List<MenuItem> menuItems = menuItemRepository.findByRestaurantAndIsAvailable(restaurant.get(), true);
                return new ResponseEntity<>(menuItems, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}