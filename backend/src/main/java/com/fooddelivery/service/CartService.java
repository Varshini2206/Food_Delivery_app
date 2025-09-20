package com.fooddelivery.service;

import com.fooddelivery.entity.CartItem;
import com.fooddelivery.entity.MenuItem;
import com.fooddelivery.entity.User;
import com.fooddelivery.repository.CartItemRepository;
import com.fooddelivery.repository.MenuItemRepository;
import com.fooddelivery.repository.UserRepository;
import com.fooddelivery.dto.AddToCartRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public CartItem addToCart(AddToCartRequest request, String username) {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        MenuItem menuItem = menuItemRepository.findById(request.getMenuItemId())
            .orElseThrow(() -> new RuntimeException("Menu item not found: " + request.getMenuItemId()));
        
        if (!menuItem.isAvailable()) {
            throw new RuntimeException("Menu item is not available");
        }
        
        // Check if item already exists in cart
        Optional<CartItem> existingCartItem = cartItemRepository.findByUserAndMenuItem(user, menuItem);
        
        if (existingCartItem.isPresent()) {
            // Update quantity if item already exists
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
            cartItem.setSpecialInstructions(request.getSpecialInstructions());
            return cartItemRepository.save(cartItem);
        } else {
            // Create new cart item
            CartItem cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setMenuItem(menuItem);
            cartItem.setQuantity(request.getQuantity());
            cartItem.setSpecialInstructions(request.getSpecialInstructions());
            return cartItemRepository.save(cartItem);
        }
    }
    
    public List<CartItem> getCartItems(String username) {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        return cartItemRepository.findByUserOrderByCreatedAtDesc(user);
    }
    
    public CartItem updateCartItem(Long itemId, Integer quantity, String username) {
        CartItem cartItem = cartItemRepository.findById(itemId)
            .orElseThrow(() -> new RuntimeException("Cart item not found: " + itemId));
        
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Cart item does not belong to user");
        }
        
        if (quantity <= 0) {
            cartItemRepository.delete(cartItem);
            return null;
        }
        
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }
    
    public void removeFromCart(Long itemId, String username) {
        CartItem cartItem = cartItemRepository.findById(itemId)
            .orElseThrow(() -> new RuntimeException("Cart item not found: " + itemId));
        
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Cart item does not belong to user");
        }
        
        cartItemRepository.delete(cartItem);
    }
    
    public void clearCart(String username) {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        cartItemRepository.deleteByUser(user);
    }
    
    public Integer getCartItemCount(String username) {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        return cartItemRepository.countByUser(user);
    }
    
    public Double getCartTotal(String username) {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        
        return cartItems.stream()
            .mapToDouble(item -> item.getMenuItem().getPrice() * item.getQuantity())
            .sum();
    }
}
