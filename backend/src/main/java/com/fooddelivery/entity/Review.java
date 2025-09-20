package com.fooddelivery.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Review entity representing customer reviews and ratings
 */
@Entity
@Table(name = "reviews", indexes = {
    @Index(name = "idx_review_customer", columnList = "customer_id"),
    @Index(name = "idx_review_restaurant", columnList = "restaurant_id"),
    @Index(name = "idx_review_order", columnList = "order_id"),
    @Index(name = "idx_review_rating", columnList = "rating")
})
public class Review extends BaseEntity {

    @NotNull(message = "Rating is required")
    @DecimalMin(value = "1.0", message = "Rating must be at least 1.0")
    @DecimalMax(value = "5.0", message = "Rating cannot exceed 5.0")
    @Column(name = "rating", nullable = false, precision = 2, scale = 1)
    private Double rating;

    @Size(max = 1000, message = "Comment must not exceed 1000 characters")
    @Column(name = "comment", length = 1000)
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(name = "review_type", nullable = false)
    private ReviewType reviewType;

    // Food-specific ratings
    @DecimalMin(value = "0.0", message = "Food rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Food rating cannot exceed 5.0")
    @Column(name = "food_rating", precision = 2, scale = 1)
    private Double foodRating;

    // Delivery-specific ratings
    @DecimalMin(value = "0.0", message = "Delivery rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Delivery rating cannot exceed 5.0")
    @Column(name = "delivery_rating", precision = 2, scale = 1)
    private Double deliveryRating;

    // Service-specific ratings
    @DecimalMin(value = "0.0", message = "Service rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Service rating cannot exceed 5.0")
    @Column(name = "service_rating", precision = 2, scale = 1)
    private Double serviceRating;

    @Column(name = "is_anonymous", nullable = false)
    private Boolean isAnonymous = false;

    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified = false;

    @Column(name = "is_helpful_count", nullable = false)
    private Integer helpfulCount = 0;

    @Column(name = "is_reported", nullable = false)
    private Boolean isReported = false;

    @Column(name = "moderation_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ModerationStatus moderationStatus = ModerationStatus.PENDING;

    // Restaurant owner response
    @Column(name = "restaurant_response", length = 500)
    private String restaurantResponse;

    @Column(name = "response_date")
    private java.time.LocalDateTime responseDate;

    // Photo reviews
    @ElementCollection
    @CollectionTable(name = "review_photos", joinColumns = @JoinColumn(name = "review_id"))
    @Column(name = "photo_url")
    @JsonIgnore
    private java.util.List<String> photoUrls;

    // Tags for review categorization
    @ElementCollection
    @CollectionTable(name = "review_tags", joinColumns = @JoinColumn(name = "review_id"))
    @Column(name = "tag")
    @JsonIgnore
    private java.util.List<String> tags; // e.g., "Fast Delivery", "Hot Food", "Poor Packaging"

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnore
    private User customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    @JsonIgnore
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_partner_id")
    @JsonIgnore
    private User deliveryPartner;

    // Enums
    public enum ReviewType {
        RESTAURANT,     // Review for restaurant and food
        DELIVERY,       // Review for delivery service
        OVERALL        // Overall experience review
    }

    public enum ModerationStatus {
        PENDING,
        APPROVED,
        REJECTED,
        FLAGGED
    }

    // Constructors
    public Review() {}

    public Review(User customer, Order order, Double rating, ReviewType reviewType) {
        this.customer = customer;
        this.order = order;
        this.rating = rating;
        this.reviewType = reviewType;
        this.restaurant = order.getRestaurant();
    }

    // Getters and Setters
    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public ReviewType getReviewType() {
        return reviewType;
    }

    public void setReviewType(ReviewType reviewType) {
        this.reviewType = reviewType;
    }

    public Double getFoodRating() {
        return foodRating;
    }

    public void setFoodRating(Double foodRating) {
        this.foodRating = foodRating;
    }

    public Double getDeliveryRating() {
        return deliveryRating;
    }

    public void setDeliveryRating(Double deliveryRating) {
        this.deliveryRating = deliveryRating;
    }

    public Double getServiceRating() {
        return serviceRating;
    }

    public void setServiceRating(Double serviceRating) {
        this.serviceRating = serviceRating;
    }

    public Boolean getIsAnonymous() {
        return isAnonymous;
    }

    public void setIsAnonymous(Boolean isAnonymous) {
        this.isAnonymous = isAnonymous;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public Integer getHelpfulCount() {
        return helpfulCount;
    }

    public void setHelpfulCount(Integer helpfulCount) {
        this.helpfulCount = helpfulCount;
    }

    public Boolean getIsReported() {
        return isReported;
    }

    public void setIsReported(Boolean isReported) {
        this.isReported = isReported;
    }

    public ModerationStatus getModerationStatus() {
        return moderationStatus;
    }

    public void setModerationStatus(ModerationStatus moderationStatus) {
        this.moderationStatus = moderationStatus;
    }

    public String getRestaurantResponse() {
        return restaurantResponse;
    }

    public void setRestaurantResponse(String restaurantResponse) {
        this.restaurantResponse = restaurantResponse;
        this.responseDate = java.time.LocalDateTime.now();
    }

    public java.time.LocalDateTime getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(java.time.LocalDateTime responseDate) {
        this.responseDate = responseDate;
    }

    public java.util.List<String> getPhotoUrls() {
        return photoUrls;
    }

    public void setPhotoUrls(java.util.List<String> photoUrls) {
        this.photoUrls = photoUrls;
    }

    public java.util.List<String> getTags() {
        return tags;
    }

    public void setTags(java.util.List<String> tags) {
        this.tags = tags;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
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
    }

    // Utility methods
    public String getCustomerDisplayName() {
        if (isAnonymous) {
            return "Anonymous";
        }
        return customer != null ? customer.getFirstName() : "Unknown";
    }

    public boolean isPositive() {
        return rating >= 4.0;
    }

    public boolean isNegative() {
        return rating <= 2.0;
    }

    public boolean hasPhotos() {
        return photoUrls != null && !photoUrls.isEmpty();
    }

    public boolean hasRestaurantResponse() {
        return restaurantResponse != null && !restaurantResponse.trim().isEmpty();
    }

    public String getRatingDisplay() {
        return "⭐".repeat(rating.intValue()) + " " + rating + "/5";
    }

    public void incrementHelpfulCount() {
        this.helpfulCount++;
    }

    public boolean isApproved() {
        return moderationStatus == ModerationStatus.APPROVED;
    }

    public Double getOverallRating() {
        if (foodRating != null && deliveryRating != null && serviceRating != null) {
            return (foodRating + deliveryRating + serviceRating) / 3.0;
        }
        return rating;
    }
}