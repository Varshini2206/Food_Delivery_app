package com.fooddelivery.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Order entity representing customer orders
 */
@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_order_customer", columnList = "customer_id"),
    @Index(name = "idx_order_restaurant", columnList = "restaurant_id"),
    @Index(name = "idx_order_status", columnList = "status"),
    @Index(name = "idx_order_date", columnList = "order_date")
})
public class Order extends BaseEntity {

    @Column(name = "order_number", unique = true, nullable = false)
    private String orderNumber;

    @NotNull(message = "Order date is required")
    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private OrderStatus status = OrderStatus.PLACED;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @NotNull(message = "Subtotal is required")
    @DecimalMin(value = "0.0", message = "Subtotal cannot be negative")
    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private Double subtotal;

    @DecimalMin(value = "0.0", message = "Tax amount cannot be negative")
    @Column(name = "tax_amount", precision = 10, scale = 2)
    private Double taxAmount = 0.0;

    @DecimalMin(value = "0.0", message = "Delivery fee cannot be negative")
    @Column(name = "delivery_fee", precision = 10, scale = 2)
    private Double deliveryFee = 0.0;

    @DecimalMin(value = "0.0", message = "Discount amount cannot be negative")
    @Column(name = "discount_amount", precision = 10, scale = 2)
    private Double discountAmount = 0.0;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.0", message = "Total amount cannot be negative")
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private Double totalAmount;

    @Column(name = "special_instructions", length = 500)
    private String specialInstructions;

    @Column(name = "estimated_delivery_time")
    private LocalDateTime estimatedDeliveryTime;

    @Column(name = "actual_delivery_time")
    private LocalDateTime actualDeliveryTime;

    // Delivery Address
    @Column(name = "delivery_address_line1", nullable = false)
    private String deliveryAddressLine1;

    @Column(name = "delivery_address_line2")
    private String deliveryAddressLine2;

    @Column(name = "delivery_city", nullable = false)
    private String deliveryCity;

    @Column(name = "delivery_state", nullable = false)
    private String deliveryState;

    @Column(name = "delivery_postal_code", nullable = false)
    private String deliveryPostalCode;

    @Column(name = "delivery_latitude")
    private Double deliveryLatitude;

    @Column(name = "delivery_longitude")
    private Double deliveryLongitude;

    @Column(name = "delivery_contact_name")
    private String deliveryContactName;

    @Column(name = "delivery_contact_phone")
    private String deliveryContactPhone;

    @Column(name = "coupon_code")
    private String couponCode;

    @Column(name = "refund_amount", precision = 10, scale = 2)
    private Double refundAmount = 0.0;

    @Column(name = "cancellation_reason")
    private String cancellationReason;

    @Column(name = "preparation_start_time")
    private LocalDateTime preparationStartTime;

    @Column(name = "preparation_completion_time")
    private LocalDateTime preparationCompletionTime;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnore
    private User customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    @JsonIgnore
    private Restaurant restaurant;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Delivery delivery;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Review> reviews;

    // Enums
    public enum OrderStatus {
        PENDING,
        PLACED,
        CONFIRMED,
        PREPARING,
        READY_FOR_PICKUP,
        OUT_FOR_DELIVERY,
        DELIVERED,
        CANCELLED,
        REFUNDED
    }

    public enum PaymentMethod {
        CASH_ON_DELIVERY,
        CREDIT_CARD,
        DEBIT_CARD,
        UPI,
        WALLET,
        NET_BANKING
    }

    public enum PaymentStatus {
        PENDING,
        PROCESSING,
        COMPLETED,
        FAILED,
        REFUNDED,
        CANCELLED
    }

    // Constructors
    public Order() {
        this.orderDate = LocalDateTime.now();
    }

    public Order(User customer, Restaurant restaurant) {
        this();
        this.customer = customer;
        this.restaurant = restaurant;
        generateOrderNumber();
    }

    // Getters and Setters
    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Double getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(Double taxAmount) {
        this.taxAmount = taxAmount;
    }

    public Double getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(Double deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public Double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getSpecialInstructions() {
        return specialInstructions;
    }

    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }

    public LocalDateTime getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }

    public void setEstimatedDeliveryTime(LocalDateTime estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

    public LocalDateTime getActualDeliveryTime() {
        return actualDeliveryTime;
    }

    public void setActualDeliveryTime(LocalDateTime actualDeliveryTime) {
        this.actualDeliveryTime = actualDeliveryTime;
    }

    public String getDeliveryAddressLine1() {
        return deliveryAddressLine1;
    }

    public void setDeliveryAddressLine1(String deliveryAddressLine1) {
        this.deliveryAddressLine1 = deliveryAddressLine1;
    }

    public String getDeliveryAddressLine2() {
        return deliveryAddressLine2;
    }

    public void setDeliveryAddressLine2(String deliveryAddressLine2) {
        this.deliveryAddressLine2 = deliveryAddressLine2;
    }

    public String getDeliveryCity() {
        return deliveryCity;
    }

    public void setDeliveryCity(String deliveryCity) {
        this.deliveryCity = deliveryCity;
    }

    public String getDeliveryState() {
        return deliveryState;
    }

    public void setDeliveryState(String deliveryState) {
        this.deliveryState = deliveryState;
    }

    public String getDeliveryPostalCode() {
        return deliveryPostalCode;
    }

    public void setDeliveryPostalCode(String deliveryPostalCode) {
        this.deliveryPostalCode = deliveryPostalCode;
    }

    public Double getDeliveryLatitude() {
        return deliveryLatitude;
    }

    public void setDeliveryLatitude(Double deliveryLatitude) {
        this.deliveryLatitude = deliveryLatitude;
    }

    public Double getDeliveryLongitude() {
        return deliveryLongitude;
    }

    public void setDeliveryLongitude(Double deliveryLongitude) {
        this.deliveryLongitude = deliveryLongitude;
    }

    public String getDeliveryContactName() {
        return deliveryContactName;
    }

    public void setDeliveryContactName(String deliveryContactName) {
        this.deliveryContactName = deliveryContactName;
    }

    public String getDeliveryContactPhone() {
        return deliveryContactPhone;
    }

    public void setDeliveryContactPhone(String deliveryContactPhone) {
        this.deliveryContactPhone = deliveryContactPhone;
    }

    // Composite delivery address getter for services
    public String getDeliveryAddress() {
        StringBuilder address = new StringBuilder();
        if (deliveryAddressLine1 != null) address.append(deliveryAddressLine1);
        if (deliveryAddressLine2 != null) address.append(", ").append(deliveryAddressLine2);
        if (deliveryCity != null) address.append(", ").append(deliveryCity);
        if (deliveryState != null) address.append(", ").append(deliveryState);
        if (deliveryPostalCode != null) address.append(" ").append(deliveryPostalCode);
        return address.toString();
    }

    // Composite delivery address setter for services
    public void setDeliveryAddress(String address) {
        // For simplicity, we'll set the first line to the full address
        this.deliveryAddressLine1 = address;
    }

    // Delivery date getter/setter (maps to actualDeliveryTime)
    public LocalDateTime getDeliveryDate() {
        return actualDeliveryTime;
    }

    public void setDeliveryDate(LocalDateTime deliveryDate) {
        this.actualDeliveryTime = deliveryDate;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public Double getRefundAmount() {
        return refundAmount;
    }

    public void setRefundAmount(Double refundAmount) {
        this.refundAmount = refundAmount;
    }

    public String getCancellationReason() {
        return cancellationReason;
    }

    public void setCancellationReason(String cancellationReason) {
        this.cancellationReason = cancellationReason;
    }

    public LocalDateTime getPreparationStartTime() {
        return preparationStartTime;
    }

    public void setPreparationStartTime(LocalDateTime preparationStartTime) {
        this.preparationStartTime = preparationStartTime;
    }

    public LocalDateTime getPreparationCompletionTime() {
        return preparationCompletionTime;
    }

    public void setPreparationCompletionTime(LocalDateTime preparationCompletionTime) {
        this.preparationCompletionTime = preparationCompletionTime;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    // Alias methods for services that expect getUser/setUser
    public User getUser() {
        return customer;
    }

    public void setUser(User user) {
        this.customer = user;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    // Utility methods
    private void generateOrderNumber() {
        this.orderNumber = "ORD" + System.currentTimeMillis();
    }

    public String getFullDeliveryAddress() {
        StringBuilder address = new StringBuilder();
        if (deliveryAddressLine1 != null) address.append(deliveryAddressLine1);
        if (deliveryAddressLine2 != null) address.append(", ").append(deliveryAddressLine2);
        if (deliveryCity != null) address.append(", ").append(deliveryCity);
        if (deliveryState != null) address.append(", ").append(deliveryState);
        if (deliveryPostalCode != null) address.append(" - ").append(deliveryPostalCode);
        return address.toString();
    }

    public boolean canBeCancelled() {
        return status == OrderStatus.PLACED || status == OrderStatus.CONFIRMED;
    }

    public boolean isDelivered() {
        return status == OrderStatus.DELIVERED;
    }

    public boolean isCancelled() {
        return status == OrderStatus.CANCELLED;
    }

    public boolean isPaid() {
        return paymentStatus == PaymentStatus.COMPLETED;
    }

    public void calculateTotalAmount() {
        this.totalAmount = subtotal + taxAmount + deliveryFee - discountAmount;
    }

    public Integer getTotalItems() {
        return orderItems != null ? orderItems.stream()
                .mapToInt(OrderItem::getQuantity)
                .sum() : 0;
    }
}