package com.fooddelivery.controller;

import com.fooddelivery.entity.Order;
import com.fooddelivery.entity.User;
import com.fooddelivery.entity.Restaurant;
import com.fooddelivery.repository.OrderRepository;
import com.fooddelivery.repository.UserRepository;
import com.fooddelivery.repository.RestaurantRepository;
import com.fooddelivery.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Map;

/**
 * REST Controller for Order operations
 */
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private OrderService orderService;

    /**
     * Get all orders
     */
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderRepository.findAll();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get order by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Long id) {
        try {
            Optional<Order> orderData = orderRepository.findById(id);
            if (orderData.isPresent()) {
                return new ResponseEntity<>(orderData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a new order
     */
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> orderRequest) {
        try {
            // Get authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }
            
            String username = authentication.getName();
            String deliveryAddress = (String) orderRequest.get("deliveryAddress");
            String deliveryCity = (String) orderRequest.get("deliveryCity");
            String deliveryState = (String) orderRequest.get("deliveryState");
            String deliveryPostalCode = (String) orderRequest.get("deliveryPostalCode");
            
            if (deliveryAddress == null || deliveryAddress.trim().isEmpty()) {
                return new ResponseEntity<>("Delivery address is required", HttpStatus.BAD_REQUEST);
            }
            
            if (deliveryCity == null || deliveryCity.trim().isEmpty()) {
                return new ResponseEntity<>("Delivery city is required", HttpStatus.BAD_REQUEST);
            }
            
            if (deliveryState == null || deliveryState.trim().isEmpty()) {
                return new ResponseEntity<>("Delivery state is required", HttpStatus.BAD_REQUEST);
            }
            
            if (deliveryPostalCode == null || deliveryPostalCode.trim().isEmpty()) {
                return new ResponseEntity<>("Delivery postal code is required", HttpStatus.BAD_REQUEST);
            }
            
            // Extract order items and other data
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> orderItems = (List<Map<String, Object>>) orderRequest.get("orderItems");
            Double subtotal = Double.valueOf(orderRequest.get("subtotal").toString());
            Double totalAmount = Double.valueOf(orderRequest.get("totalAmount").toString());
            Double deliveryFee = Double.valueOf(orderRequest.get("deliveryFee").toString());
            Double taxAmount = Double.valueOf(orderRequest.get("taxAmount").toString());
            String paymentMethod = (String) orderRequest.get("paymentMethod");
            
            // Create order using the service
            Order savedOrder = orderService.createOrderFromItems(
                username, deliveryAddress, deliveryCity, deliveryState, deliveryPostalCode,
                orderItems, subtotal, totalAmount, deliveryFee, taxAmount, paymentMethod
            );
            
            return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
            
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create order: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update an existing order
     */
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable("id") Long id, @Valid @RequestBody Order order) {
        try {
            Optional<Order> orderData = orderRepository.findById(id);
            if (orderData.isPresent()) {
                Order existingOrder = orderData.get();
                existingOrder.setStatus(order.getStatus());
                existingOrder.setPaymentMethod(order.getPaymentMethod());
                existingOrder.setPaymentStatus(order.getPaymentStatus());
                existingOrder.setSubtotal(order.getSubtotal());
                existingOrder.setTaxAmount(order.getTaxAmount());
                existingOrder.setDeliveryFee(order.getDeliveryFee());
                existingOrder.setTotalAmount(order.getTotalAmount());
                existingOrder.setEstimatedDeliveryTime(order.getEstimatedDeliveryTime());
                existingOrder.setActualDeliveryTime(order.getActualDeliveryTime());
                existingOrder.setDiscountAmount(order.getDiscountAmount());
                
                return new ResponseEntity<>(orderRepository.save(existingOrder), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete an order
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable("id") Long id) {
        try {
            orderRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get orders by user ID
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable("userId") Long userId) {
        try {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                List<Order> orders = orderRepository.findByCustomer(user.get());
                return new ResponseEntity<>(orders, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get orders by restaurant ID
     */
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Order>> getOrdersByRestaurantId(@PathVariable("restaurantId") Long restaurantId) {
        try {
            Optional<Restaurant> restaurant = restaurantRepository.findById(restaurantId);
            if (restaurant.isPresent()) {
                List<Order> orders = orderRepository.findByRestaurant(restaurant.get());
                return new ResponseEntity<>(orders, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get orders by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable("status") String status) {
        try {
            Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status.toUpperCase());
            List<Order> orders = orderRepository.findByStatus(orderStatus);
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}