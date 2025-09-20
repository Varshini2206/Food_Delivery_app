package com.fooddelivery.repository;

import com.fooddelivery.entity.Order;
import com.fooddelivery.entity.Restaurant;
import com.fooddelivery.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCustomer(User customer);
    
    // Alias methods for OrderService compatibility
    List<Order> findByCustomerOrderByOrderDateDesc(User customer);
    List<Order> findAllByOrderByOrderDateDesc();
    List<Order> findByStatusOrderByOrderDateDesc(Order.OrderStatus status);
    List<Order> findByOrderDateBetweenOrderByOrderDateDesc(LocalDateTime startDate, LocalDateTime endDate);
    
    Page<Order> findByCustomer(User customer, Pageable pageable);
    
    List<Order> findByRestaurant(Restaurant restaurant);
    
    Page<Order> findByRestaurant(Restaurant restaurant, Pageable pageable);
    
    List<Order> findByStatus(Order.OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.restaurant = :restaurant AND o.status = :status")
    List<Order> findByRestaurantAndStatus(@Param("restaurant") Restaurant restaurant, @Param("status") Order.OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.orderDate BETWEEN :startDate AND :endDate")
    List<Order> findByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT o FROM Order o WHERE o.orderNumber = :orderNumber")
    Order findByOrderNumber(@Param("orderNumber") String orderNumber);
    
    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    Long countByStatus(@Param("status") Order.OrderStatus status);
    
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status = com.fooddelivery.entity.Order$OrderStatus.DELIVERED AND o.orderDate BETWEEN :startDate AND :endDate")
    Double getTotalRevenueInDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(o) FROM Order o WHERE o.restaurant = :restaurant AND o.status = com.fooddelivery.entity.Order$OrderStatus.DELIVERED")
    Long getCompletedOrdersCount(@Param("restaurant") Restaurant restaurant);
}