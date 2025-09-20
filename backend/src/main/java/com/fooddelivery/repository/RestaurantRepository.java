package com.fooddelivery.repository;

import com.fooddelivery.entity.Restaurant;
import com.fooddelivery.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findByStatus(Restaurant.RestaurantStatus status);
    
    Page<Restaurant> findByStatus(Restaurant.RestaurantStatus status, Pageable pageable);
    
    List<Restaurant> findByOwner(User owner);
    
    @Query("SELECT r FROM Restaurant r WHERE r.city = :city AND r.status = com.fooddelivery.entity.Restaurant$RestaurantStatus.APPROVED AND r.isOpen = true")
    List<Restaurant> findOpenRestaurantsByCity(@Param("city") String city);
    
    @Query("SELECT r FROM Restaurant r WHERE r.cuisineType = :cuisineType AND r.status = com.fooddelivery.entity.Restaurant$RestaurantStatus.APPROVED")
    List<Restaurant> findByCuisineType(@Param("cuisineType") String cuisineType);
    
    @Query("SELECT r FROM Restaurant r WHERE " +
           "LOWER(r.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(r.cuisineType) LIKE LOWER(CONCAT('%', :searchTerm, '%')) AND " +
           "r.status = com.fooddelivery.entity.Restaurant$RestaurantStatus.APPROVED")
    Page<Restaurant> searchRestaurants(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    @Query("SELECT r FROM Restaurant r WHERE r.averageRating >= :minRating AND r.status = com.fooddelivery.entity.Restaurant$RestaurantStatus.APPROVED")
    List<Restaurant> findByMinimumRating(@Param("minRating") Double minRating);
    
    @Query("SELECT COUNT(r) FROM Restaurant r WHERE r.status = :status")
    Long countByStatus(@Param("status") Restaurant.RestaurantStatus status);
    
    // Additional simple methods for controller support
    List<Restaurant> findByNameContainingIgnoreCase(String name);
    List<Restaurant> findByCuisineTypeContainingIgnoreCase(String cuisineType);
    List<Restaurant> findByCityContainingIgnoreCase(String city);
    List<Restaurant> findByAverageRatingGreaterThanEqual(Double averageRating);
    List<Restaurant> findByIsOpenTrue();
    List<Restaurant> findByEstimatedDeliveryTimeMinutesLessThanEqual(Integer estimatedDeliveryTimeMinutes);
    List<Restaurant> findByDeliveryFeeLessThanEqual(Double deliveryFee);
    List<Restaurant> findByMinimumOrderAmountLessThanEqual(Double minimumOrderAmount);
}