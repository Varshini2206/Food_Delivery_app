package com.fooddelivery.controller;

import com.fooddelivery.entity.CartItem;
import com.fooddelivery.service.CartService;
import com.fooddelivery.dto.AddToCartRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @PostMapping("/add")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<CartItem> addToCart(@RequestBody AddToCartRequest request, Authentication auth) {
        CartItem cartItem = cartService.addToCart(request, auth.getName());
        return ResponseEntity.ok(cartItem);
    }
    
    @GetMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<CartItem>> getCart(Authentication auth) {
        List<CartItem> cartItems = cartService.getCartItems(auth.getName());
        return ResponseEntity.ok(cartItems);
    }
    
    @PutMapping("/{itemId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<CartItem> updateCartItem(
            @PathVariable Long itemId, 
            @RequestParam Integer quantity, 
            Authentication auth) {
        CartItem cartItem = cartService.updateCartItem(itemId, quantity, auth.getName());
        return ResponseEntity.ok(cartItem);
    }
    
    @DeleteMapping("/{itemId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long itemId, Authentication auth) {
        cartService.removeFromCart(itemId, auth.getName());
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/clear")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Void> clearCart(Authentication auth) {
        cartService.clearCart(auth.getName());
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/count")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Integer> getCartItemCount(Authentication auth) {
        Integer count = cartService.getCartItemCount(auth.getName());
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/total")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Double> getCartTotal(Authentication auth) {
        Double total = cartService.getCartTotal(auth.getName());
        return ResponseEntity.ok(total);
    }
}