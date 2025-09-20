package com.fooddelivery.service;

import com.fooddelivery.entity.Restaurant;
import com.fooddelivery.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RestaurantService {
    
    @Autowired
    private RestaurantRepository restaurantRepository;
    
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }
    
    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + id));
    }
    
    public List<Restaurant> searchRestaurants(String query) {
        return restaurantRepository.findByNameContainingIgnoreCase(query);
    }
    
    public List<Restaurant> getRestaurantsByLocation(String location) {
        return restaurantRepository.findByCityContainingIgnoreCase(location);
    }
    
    public List<Restaurant> getRestaurantsByCuisine(String cuisine) {
        return restaurantRepository.findByCuisineTypeContainingIgnoreCase(cuisine);
    }
    
    public List<Restaurant> getRestaurantsByRating(Double minRating) {
        return restaurantRepository.findByAverageRatingGreaterThanEqual(minRating);
    }
    
    public List<Restaurant> getOpenRestaurants() {
        return restaurantRepository.findByIsOpenTrue();
    }
    
    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }
    
    public Restaurant updateRestaurant(Long id, Restaurant restaurant) {
        Restaurant existingRestaurant = getRestaurantById(id);
        
        existingRestaurant.setName(restaurant.getName());
        existingRestaurant.setDescription(restaurant.getDescription());
        existingRestaurant.setLocation(restaurant.getLocation());
        existingRestaurant.setCuisineType(restaurant.getCuisineType());
        existingRestaurant.setImageUrl(restaurant.getImageUrl());
        existingRestaurant.setDeliveryTime(restaurant.getDeliveryTime());
        existingRestaurant.setDeliveryFee(restaurant.getDeliveryFee());
        existingRestaurant.setMinOrderAmount(restaurant.getMinOrderAmount());
        existingRestaurant.setRating(restaurant.getRating());
        existingRestaurant.setOpen(restaurant.isOpen());
        
        return restaurantRepository.save(existingRestaurant);
    }
    
    public void deleteRestaurant(Long id) {
        if (!restaurantRepository.existsById(id)) {
            throw new RuntimeException("Restaurant not found with id: " + id);
        }
        restaurantRepository.deleteById(id);
    }
    
    public List<Restaurant> getRestaurantsByDeliveryTime(Integer maxDeliveryTime) {
        return restaurantRepository.findByEstimatedDeliveryTimeMinutesLessThanEqual(maxDeliveryTime);
    }
    
    public List<Restaurant> getRestaurantsByDeliveryFee(Double maxDeliveryFee) {
        return restaurantRepository.findByDeliveryFeeLessThanEqual(maxDeliveryFee);
    }
    
    public List<Restaurant> getRestaurantsByMinOrder(Double maxMinOrder) {
        return restaurantRepository.findByMinimumOrderAmountLessThanEqual(maxMinOrder);
    }
}