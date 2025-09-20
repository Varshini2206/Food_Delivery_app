package com.fooddelivery.repository;

import com.fooddelivery.entity.Review;
import com.fooddelivery.entity.Restaurant;
import com.fooddelivery.entity.User;
import com.fooddelivery.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Review entity
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE r.restaurant.id = :restaurantId")
    List<Review> findByRestaurantId(@Param("restaurantId") Long restaurantId);
    
    @Query("SELECT r FROM Review r WHERE r.customer.id = :customerId")
    List<Review> findByCustomerId(@Param("customerId") Long customerId);
    
    @Query("SELECT r FROM Review r WHERE r.order.id = :orderId")
    List<Review> findByOrderId(@Param("orderId") Long orderId);
    
    List<Review> findByRatingBetween(Double minRating, Double maxRating);
    
    @Query("SELECT r FROM Review r WHERE r.restaurant.id = :restaurantId AND r.rating >= :minRating")
    List<Review> findByRestaurantIdAndRatingGreaterThanEqual(@Param("restaurantId") Long restaurantId, @Param("minRating") Double minRating);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.restaurant.id = :restaurantId")
    Double findAverageRatingByRestaurantId(@Param("restaurantId") Long restaurantId);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.restaurant.id = :restaurantId")
    Long countByRestaurantId(@Param("restaurantId") Long restaurantId);
}