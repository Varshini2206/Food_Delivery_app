package com.fooddelivery.service;

import com.fooddelivery.entity.Order;
import com.fooddelivery.entity.OrderItem;
import com.fooddelivery.entity.User;
import com.fooddelivery.entity.CartItem;
import com.fooddelivery.entity.MenuItem;
import com.fooddelivery.repository.OrderRepository;
import com.fooddelivery.repository.OrderItemRepository;
import com.fooddelivery.repository.UserRepository;
import com.fooddelivery.repository.CartItemRepository;
import com.fooddelivery.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

@Service
@Transactional
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;
    
    public Order createOrderFromCart(String username, String deliveryAddress) {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        // Create order
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.PENDING);
        order.setDeliveryAddress(deliveryAddress);
        
        // Calculate total amount
        double totalAmount = cartItems.stream()
            .mapToDouble(item -> item.getMenuItem().getPrice() * item.getQuantity())
            .sum();
        order.setTotalAmount(totalAmount);
        
        // Save order first to get ID
        order = orderRepository.save(order);
        
        // Create order items from cart items
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(cartItem.getMenuItem());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getMenuItem().getPrice());
            orderItem.setSpecialInstructions(cartItem.getSpecialInstructions());
            
            orderItems.add(orderItem);
        }
        
        // Save all order items
        orderItemRepository.saveAll(orderItems);
        
        // Clear cart after successful order creation
        cartItemRepository.deleteByUser(user);
        
        return order;
    }
    
    public List<Order> getOrdersByUser(String username) {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        return orderRepository.findByCustomerOrderByOrderDateDesc(user);
    }
    
    public Order getOrderById(Long orderId, String username) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Order does not belong to user");
        }
        
        return order;
    }
    
    public List<OrderItem> getOrderItems(Long orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new RuntimeException("Order not found: " + orderId);
        }
        
        return orderItemRepository.findByOrderId(orderId);
    }
    
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        
        // Convert string to enum
        Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status.toUpperCase());
        order.setStatus(orderStatus);
        
        if (Order.OrderStatus.DELIVERED.equals(orderStatus)) {
            order.setDeliveryDate(LocalDateTime.now());
        }
        
        return orderRepository.save(order);
    }
    
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }
    
    public List<Order> getOrdersByStatus(String status) {
        Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status.toUpperCase());
        return orderRepository.findByStatusOrderByOrderDateDesc(orderStatus);
    }
    
    public List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.findByOrderDateBetweenOrderByOrderDateDesc(startDate, endDate);
    }
    
    public Double calculateOrderTotal(Long orderId) {
        List<OrderItem> orderItems = getOrderItems(orderId);
        
        return orderItems.stream()
            .mapToDouble(item -> item.getPrice() * item.getQuantity())
            .sum();
    }
    
    public void cancelOrder(Long orderId, String username) {
        Order order = getOrderById(orderId, username);
        
        if (!Order.OrderStatus.PENDING.equals(order.getStatus()) && !Order.OrderStatus.CONFIRMED.equals(order.getStatus())) {
            throw new RuntimeException("Cannot cancel order with status: " + order.getStatus());
        }
        
        order.setStatus(Order.OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
    
    public Order createOrderFromItems(String username, String deliveryAddress, String deliveryCity, 
                                     String deliveryState, String deliveryPostalCode, List<Map<String, Object>> orderItems, 
                                     Double subtotal, Double totalAmount, Double deliveryFee, Double taxAmount, String paymentMethod) {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found: " + username));
        
        if (orderItems == null || orderItems.isEmpty()) {
            throw new RuntimeException("Order items cannot be empty");
        }
        
        // Create order
        Order order = new Order();
        order.setCustomer(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.PLACED);
        order.setDeliveryAddress(deliveryAddress);
        order.setDeliveryCity(deliveryCity);
        order.setDeliveryState(deliveryState);
        order.setDeliveryPostalCode(deliveryPostalCode);
        order.setSubtotal(subtotal);
        order.setTotalAmount(totalAmount);
        order.setDeliveryFee(deliveryFee);
        order.setTaxAmount(taxAmount);
        
        // Set payment method
        if (paymentMethod != null) {
            try {
                order.setPaymentMethod(Order.PaymentMethod.valueOf(paymentMethod));
            } catch (IllegalArgumentException e) {
                order.setPaymentMethod(Order.PaymentMethod.CREDIT_CARD);
            }
        }
        
        // Generate order number
        order.setOrderNumber("ORD-" + System.currentTimeMillis());
        
        // Save order first to get ID
        order = orderRepository.save(order);
        
        // Create order items
        List<OrderItem> items = new ArrayList<>();
        for (Map<String, Object> itemData : orderItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            
            // Get menu item ID
            Object menuItemIdObj = itemData.get("menuItemId");
            if (menuItemIdObj == null) {
                throw new RuntimeException("Menu item ID is required for each order item");
            }
            
            Long menuItemId = Long.valueOf(menuItemIdObj.toString());
            
            // Fetch the menu item from database
            MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found: " + menuItemId));
            
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(Integer.valueOf(itemData.get("quantity").toString()));
            orderItem.setUnitPrice(Double.valueOf(itemData.get("price").toString()));
            orderItem.setTotalPrice(orderItem.getUnitPrice() * orderItem.getQuantity());
            
            if (itemData.get("customizations") != null) {
                orderItem.setSpecialInstructions(itemData.get("customizations").toString());
            }
            
            items.add(orderItem);
        }
        
        // Save all order items
        orderItemRepository.saveAll(items);
        
        return order;
    }
}
