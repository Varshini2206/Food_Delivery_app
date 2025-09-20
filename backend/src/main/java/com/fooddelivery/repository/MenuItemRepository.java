package com.fooddelivery.repository;

import com.fooddelivery.entity.MenuItem;
import com.fooddelivery.entity.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    List<MenuItem> findByRestaurant(Restaurant restaurant);
    
    List<MenuItem> findByRestaurantAndIsAvailable(Restaurant restaurant, Boolean isAvailable);
    
    List<MenuItem> findByCategory(String category);
    
    List<MenuItem> findByType(MenuItem.ItemType type);
    
    @Query("SELECT DISTINCT m.category FROM MenuItem m WHERE m.restaurant = :restaurant")
    List<String> findCategoriesByRestaurant(@Param("restaurant") Restaurant restaurant);
    
    @Query("SELECT m FROM MenuItem m WHERE m.restaurant = :restaurant AND m.category = :category AND m.isAvailable = true")
    List<MenuItem> findByRestaurantAndCategory(@Param("restaurant") Restaurant restaurant, @Param("category") String category);
    
    @Query("SELECT m FROM MenuItem m WHERE " +
           "LOWER(m.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) AND " +
           "m.isAvailable = true")
    Page<MenuItem> searchMenuItems(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    @Query("SELECT m FROM MenuItem m WHERE m.isRecommended = true AND m.isAvailable = true")
    List<MenuItem> findRecommendedItems();
    
    @Query("SELECT m FROM MenuItem m WHERE m.discountPercentage > 0 AND m.isAvailable = true")
    List<MenuItem> findItemsOnDiscount();
    
    @Query("SELECT m FROM MenuItem m WHERE m.totalOrders > :threshold ORDER BY m.totalOrders DESC")
    List<MenuItem> findPopularItems(@Param("threshold") Integer threshold);
    
    // Additional methods for service support
    List<MenuItem> findByRestaurantId(Long restaurantId);
    List<MenuItem> findByNameContainingIgnoreCase(String name);
    List<MenuItem> findByIsAvailableTrue();
    List<MenuItem> findByPriceBetween(Double minPrice, Double maxPrice);
}