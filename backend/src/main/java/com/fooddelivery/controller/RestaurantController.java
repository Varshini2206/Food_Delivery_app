package com.fooddelivery.controller;

import com.fooddelivery.entity.Restaurant;
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
 * REST Controller for Restaurant operations
 */
@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:3000")
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    /**
     * Get all restaurants
     */
    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        try {
            List<Restaurant> restaurants = restaurantRepository.findAll();
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get restaurant by ID
     */
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable("id") Long id) {
        try {
            Optional<Restaurant> restaurantData = restaurantRepository.findById(id);
            if (restaurantData.isPresent()) {
                return new ResponseEntity<>(restaurantData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a new restaurant
     */
    @PostMapping
    @Transactional
    public ResponseEntity<Restaurant> createRestaurant(@Valid @RequestBody Restaurant restaurant) {
        try {
            Restaurant savedRestaurant = restaurantRepository.save(restaurant);
            return new ResponseEntity<>(savedRestaurant, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update an existing restaurant
     */
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable("id") Long id, @Valid @RequestBody Restaurant restaurant) {
        try {
            Optional<Restaurant> restaurantData = restaurantRepository.findById(id);
            if (restaurantData.isPresent()) {
                Restaurant existingRestaurant = restaurantData.get();
                existingRestaurant.setName(restaurant.getName());
                existingRestaurant.setDescription(restaurant.getDescription());
                existingRestaurant.setPhoneNumber(restaurant.getPhoneNumber());
                existingRestaurant.setEmail(restaurant.getEmail());
                existingRestaurant.setAddressLine1(restaurant.getAddressLine1());
                existingRestaurant.setAddressLine2(restaurant.getAddressLine2());
                existingRestaurant.setCity(restaurant.getCity());
                existingRestaurant.setState(restaurant.getState());
                existingRestaurant.setPostalCode(restaurant.getPostalCode());
                existingRestaurant.setCuisineType(restaurant.getCuisineType());
                existingRestaurant.setAverageRating(restaurant.getAverageRating());
                existingRestaurant.setDeliveryFee(restaurant.getDeliveryFee());
                existingRestaurant.setOpeningTime(restaurant.getOpeningTime());
                existingRestaurant.setClosingTime(restaurant.getClosingTime());
                existingRestaurant.setStatus(restaurant.getStatus());
                
                return new ResponseEntity<>(restaurantRepository.save(existingRestaurant), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a restaurant
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRestaurant(@PathVariable("id") Long id) {
        try {
            restaurantRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get restaurants by city
     */
    @GetMapping("/city/{city}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Restaurant>> getRestaurantsByCity(@PathVariable("city") String city) {
        try {
            List<Restaurant> restaurants = restaurantRepository.findOpenRestaurantsByCity(city);
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get restaurants by cuisine type
     */
    @GetMapping("/cuisine/{cuisineType}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Restaurant>> getRestaurantsByCuisine(@PathVariable("cuisineType") String cuisineType) {
        try {
            List<Restaurant> restaurants = restaurantRepository.findByCuisineType(cuisineType);
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Search restaurants by name
     */
    @GetMapping("/search")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestParam String query) {
        try {
            List<Restaurant> restaurants = restaurantRepository.findByNameContainingIgnoreCase(query);
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get restaurants by category (alias for cuisine)
     */
    @GetMapping("/category/{category}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Restaurant>> getRestaurantsByCategory(@PathVariable("category") String category) {
        try {
            List<Restaurant> restaurants = restaurantRepository.findByCuisineTypeContainingIgnoreCase(category);
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}