package com.fooddelivery.controller;

import com.fooddelivery.entity.MenuItem;
import com.fooddelivery.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuItemController {
    
    @Autowired
    private MenuItemService menuItemService;
    
    @GetMapping("/restaurants/{restaurantId}/menu")
    public ResponseEntity<List<MenuItem>> getMenuByRestaurant(@PathVariable Long restaurantId) {
        List<MenuItem> menuItems = menuItemService.getMenuByRestaurant(restaurantId);
        return ResponseEntity.ok(menuItems);
    }
    
    @GetMapping("/menu-items/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
        MenuItem menuItem = menuItemService.getMenuItemById(id);
        return ResponseEntity.ok(menuItem);
    }
    
    @GetMapping("/menu-items")
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        List<MenuItem> menuItems = menuItemService.getAllMenuItems();
        return ResponseEntity.ok(menuItems);
    }
    
    @GetMapping("/menu-items/search")
    public ResponseEntity<List<MenuItem>> searchMenuItems(@RequestParam String query) {
        List<MenuItem> menuItems = menuItemService.searchMenuItems(query);
        return ResponseEntity.ok(menuItems);
    }
    
    @GetMapping("/menu-items/category/{category}")
    public ResponseEntity<List<MenuItem>> getMenuItemsByCategory(@PathVariable String category) {
        List<MenuItem> menuItems = menuItemService.getMenuItemsByCategory(category);
        return ResponseEntity.ok(menuItems);
    }
}