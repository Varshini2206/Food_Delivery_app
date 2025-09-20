package com.fooddelivery.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * Delivery entity representing delivery assignments and tracking
 */
@Entity
@Table(name = "deliveries", indexes = {
    @Index(name = "idx_delivery_partner", columnList = "delivery_partner_id"),
    @Index(name = "idx_delivery_status", columnList = "status"),
    @Index(name = "idx_delivery_pickup_time", columnList = "pickup_time")
})
public class Delivery extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private DeliveryStatus status = DeliveryStatus.PENDING;

    @Column(name = "assigned_time")
    private LocalDateTime assignedTime;

    @Column(name = "pickup_time")
    private LocalDateTime pickupTime;

    @Column(name = "delivery_time")
    private LocalDateTime deliveryTime;

    @Column(name = "estimated_pickup_time")
    private LocalDateTime estimatedPickupTime;

    @Column(name = "estimated_delivery_time")
    private LocalDateTime estimatedDeliveryTime;

    @DecimalMin(value = "0.0", message = "Distance cannot be negative")
    @Column(name = "distance_km", precision = 10, scale = 2)
    private Double distanceKm;

    @DecimalMin(value = "0.0", message = "Delivery fee cannot be negative")
    @Column(name = "delivery_fee", precision = 10, scale = 2)
    private Double deliveryFee;

    @DecimalMin(value = "0.0", message = "Partner earnings cannot be negative")
    @Column(name = "partner_earnings", precision = 10, scale = 2)
    private Double partnerEarnings;

    @Column(name = "pickup_instructions", length = 200)
    private String pickupInstructions;

    @Column(name = "delivery_instructions", length = 200)
    private String deliveryInstructions;

    @Column(name = "delivery_otp")
    private String deliveryOtp;

    @Column(name = "is_otp_verified", nullable = false)
    private Boolean isOtpVerified = false;

    @Column(name = "cancellation_reason")
    private String cancellationReason;

    @Column(name = "delivery_notes", length = 500)
    private String deliveryNotes;

    // Current location tracking (for real-time updates)
    @Column(name = "current_latitude")
    private Double currentLatitude;

    @Column(name = "current_longitude")
    private Double currentLongitude;

    @Column(name = "last_location_update")
    private LocalDateTime lastLocationUpdate;

    // Rating for delivery service
    @DecimalMin(value = "0.0", message = "Rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Rating cannot exceed 5.0")
    @Column(name = "customer_rating", precision = 2, scale = 1)
    private Double customerRating;

    @Column(name = "customer_feedback", length = 500)
    private String customerFeedback;

    // Photo proof of delivery
    @Column(name = "delivery_photo_url")
    private String deliveryPhotoUrl;

    // Relationships
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_partner_id")
    @JsonIgnore
    private User deliveryPartner;

    // Enums
    public enum DeliveryStatus {
        PENDING,           // Waiting for delivery partner assignment
        ASSIGNED,          // Assigned to delivery partner
        PARTNER_ACCEPTED,  // Partner accepted the delivery
        PICKED_UP,         // Order picked up from restaurant
        IN_TRANSIT,        // On the way to customer
        DELIVERED,         // Successfully delivered
        CANCELLED,         // Delivery cancelled
        FAILED,            // Delivery attempt failed
        RETURNED           // Order returned to restaurant
    }

    // Constructors
    public Delivery() {}

    public Delivery(Order order) {
        this.order = order;
        generateDeliveryOtp();
    }

    // Getters and Setters
    public DeliveryStatus getStatus() {
        return status;
    }

    public void setStatus(DeliveryStatus status) {
        this.status = status;
    }

    public LocalDateTime getAssignedTime() {
        return assignedTime;
    }

    public void setAssignedTime(LocalDateTime assignedTime) {
        this.assignedTime = assignedTime;
    }

    public LocalDateTime getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(LocalDateTime pickupTime) {
        this.pickupTime = pickupTime;
    }

    public LocalDateTime getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(LocalDateTime deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public LocalDateTime getEstimatedPickupTime() {
        return estimatedPickupTime;
    }

    public void setEstimatedPickupTime(LocalDateTime estimatedPickupTime) {
        this.estimatedPickupTime = estimatedPickupTime;
    }

    public LocalDateTime getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }

    public void setEstimatedDeliveryTime(LocalDateTime estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

    public Double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public Double getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(Double deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public Double getPartnerEarnings() {
        return partnerEarnings;
    }

    public void setPartnerEarnings(Double partnerEarnings) {
        this.partnerEarnings = partnerEarnings;
    }

    public String getPickupInstructions() {
        return pickupInstructions;
    }

    public void setPickupInstructions(String pickupInstructions) {
        this.pickupInstructions = pickupInstructions;
    }

    public String getDeliveryInstructions() {
        return deliveryInstructions;
    }

    public void setDeliveryInstructions(String deliveryInstructions) {
        this.deliveryInstructions = deliveryInstructions;
    }

    public String getDeliveryOtp() {
        return deliveryOtp;
    }

    public void setDeliveryOtp(String deliveryOtp) {
        this.deliveryOtp = deliveryOtp;
    }

    public Boolean getIsOtpVerified() {
        return isOtpVerified;
    }

    public void setIsOtpVerified(Boolean isOtpVerified) {
        this.isOtpVerified = isOtpVerified;
    }

    public String getCancellationReason() {
        return cancellationReason;
    }

    public void setCancellationReason(String cancellationReason) {
        this.cancellationReason = cancellationReason;
    }

    public String getDeliveryNotes() {
        return deliveryNotes;
    }

    public void setDeliveryNotes(String deliveryNotes) {
        this.deliveryNotes = deliveryNotes;
    }

    public Double getCurrentLatitude() {
        return currentLatitude;
    }

    public void setCurrentLatitude(Double currentLatitude) {
        this.currentLatitude = currentLatitude;
    }

    public Double getCurrentLongitude() {
        return currentLongitude;
    }

    public void setCurrentLongitude(Double currentLongitude) {
        this.currentLongitude = currentLongitude;
    }

    public LocalDateTime getLastLocationUpdate() {
        return lastLocationUpdate;
    }

    public void setLastLocationUpdate(LocalDateTime lastLocationUpdate) {
        this.lastLocationUpdate = lastLocationUpdate;
    }

    public Double getCustomerRating() {
        return customerRating;
    }

    public void setCustomerRating(Double customerRating) {
        this.customerRating = customerRating;
    }

    public String getCustomerFeedback() {
        return customerFeedback;
    }

    public void setCustomerFeedback(String customerFeedback) {
        this.customerFeedback = customerFeedback;
    }

    public String getDeliveryPhotoUrl() {
        return deliveryPhotoUrl;
    }

    public void setDeliveryPhotoUrl(String deliveryPhotoUrl) {
        this.deliveryPhotoUrl = deliveryPhotoUrl;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public User getDeliveryPartner() {
        return deliveryPartner;
    }

    public void setDeliveryPartner(User deliveryPartner) {
        this.deliveryPartner = deliveryPartner;
        if (deliveryPartner != null && status == DeliveryStatus.PENDING) {
            this.status = DeliveryStatus.ASSIGNED;
            this.assignedTime = LocalDateTime.now();
        }
    }

    // Utility methods
    private void generateDeliveryOtp() {
        this.deliveryOtp = String.valueOf((int) (Math.random() * 9000) + 1000);
    }

    public boolean isAssigned() {
        return deliveryPartner != null;
    }

    public boolean isCompleted() {
        return status == DeliveryStatus.DELIVERED;
    }

    public boolean isCancelled() {
        return status == DeliveryStatus.CANCELLED;
    }

    public boolean canBeTracked() {
        return status == DeliveryStatus.PICKED_UP || status == DeliveryStatus.IN_TRANSIT;
    }

    public boolean isInProgress() {
        return status == DeliveryStatus.ASSIGNED || 
               status == DeliveryStatus.PARTNER_ACCEPTED ||
               status == DeliveryStatus.PICKED_UP || 
               status == DeliveryStatus.IN_TRANSIT;
    }

    public void updateCurrentLocation(Double latitude, Double longitude) {
        this.currentLatitude = latitude;
        this.currentLongitude = longitude;
        this.lastLocationUpdate = LocalDateTime.now();
    }

    public Long getDeliveryDurationMinutes() {
        if (pickupTime != null && deliveryTime != null) {
            return java.time.Duration.between(pickupTime, deliveryTime).toMinutes();
        }
        return null;
    }

    public String getStatusDisplay() {
        switch (status) {
            case PENDING: return "Finding delivery partner";
            case ASSIGNED: return "Delivery partner assigned";
            case PARTNER_ACCEPTED: return "Partner on the way to restaurant";
            case PICKED_UP: return "Order picked up";
            case IN_TRANSIT: return "On the way to you";
            case DELIVERED: return "Delivered";
            case CANCELLED: return "Delivery cancelled";
            case FAILED: return "Delivery failed";
            case RETURNED: return "Order returned";
            default: return status.name();
        }
    }
}