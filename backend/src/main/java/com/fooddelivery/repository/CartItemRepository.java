package com.fooddelivery.repository;

import com.fooddelivery.entity.CartItem;
import com.fooddelivery.entity.User;
import com.fooddelivery.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    List<CartItem> findByUser(User user);
    
    List<CartItem> findByUserOrderByCreatedAtDesc(User user);
    
    Optional<CartItem> findByUserAndMenuItem(User user, MenuItem menuItem);
    
    void deleteByUser(User user);
    
    Integer countByUser(User user);
    
    List<CartItem> findByMenuItem(MenuItem menuItem);
    
    boolean existsByUserAndMenuItem(User user, MenuItem menuItem);
    
    void deleteByUserAndMenuItem(User user, MenuItem menuItem);
}