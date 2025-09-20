package com.fooddelivery.repository;

import com.fooddelivery.entity.OrderItem;
import com.fooddelivery.entity.Order;
import com.fooddelivery.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
    List<OrderItem> findByOrderId(Long orderId);
    
    List<OrderItem> findByOrder(Order order);
    
    List<OrderItem> findByMenuItem(MenuItem menuItem);
    
    List<OrderItem> findByOrderOrderByCreatedAtDesc(Order order);
    
    Integer countByOrder(Order order);
    
    void deleteByOrder(Order order);
}