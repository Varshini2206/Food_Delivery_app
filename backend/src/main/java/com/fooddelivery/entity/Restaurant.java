package com.fooddelivery.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalTime;
import java.util.List;

/**
 * Restaurant entity representing restaurant partners
 */
@Entity
@Table(name = "restaurants", indexes = {
    @Index(name = "idx_restaurant_city", columnList = "city"),
    @Index(name = "idx_restaurant_cuisine", columnList = "cuisine_type"),
    @Index(name = "idx_restaurant_status", columnList = "status")
})
public class Restaurant extends BaseEntity {

    @NotBlank(message = "Restaurant name is required")
    @Size(max = 100, message = "Restaurant name must not exceed 100 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(name = "description", length = 500)
    private String description;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Phone number should be valid")
    @Column(name = "phone_number")
    private String phoneNumber;

    @Email(message = "Email should be valid")
    @Column(name = "email")
    private String email;

    @NotBlank(message = "Address is required")
    @Column(name = "address_line1", nullable = false)
    private String addressLine1;

    @Column(name = "address_line2")
    private String addressLine2;

    @NotBlank(message = "City is required")
    @Column(name = "city", nullable = false)
    private String city;

    @NotBlank(message = "State is required")
    @Column(name = "state", nullable = false)
    private String state;

    @NotBlank(message = "Postal code is required")
    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    @Column(name = "country", nullable = false)
    private String country = "India";

    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @NotBlank(message = "Cuisine type is required")
    @Column(name = "cuisine_type", nullable = false)
    private String cuisineType;

    @DecimalMin(value = "0.0", message = "Average rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Average rating cannot exceed 5.0")
    @Column(name = "average_rating", precision = 2, scale = 1)
    private Double averageRating = 0.0;

    @Min(value = 0, message = "Total reviews cannot be negative")
    @Column(name = "total_reviews", nullable = false)
    private Integer totalReviews = 0;

    @DecimalMin(value = "0.0", message = "Minimum order amount cannot be negative")
    @Column(name = "minimum_order_amount", precision = 10, scale = 2)
    private Double minimumOrderAmount;

    @DecimalMin(value = "0.0", message = "Delivery fee cannot be negative")
    @Column(name = "delivery_fee", precision = 10, scale = 2)
    private Double deliveryFee;

    @Min(value = 0, message = "Delivery time cannot be negative")
    @Column(name = "estimated_delivery_time_minutes")
    private Integer estimatedDeliveryTimeMinutes;

    @Column(name = "opening_time")
    private LocalTime openingTime;

    @Column(name = "closing_time")
    private LocalTime closingTime;

    @Column(name = "is_open", nullable = false)
    private Boolean isOpen = true;

    @Column(name = "is_accepting_orders", nullable = false)
    private Boolean isAcceptingOrders = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RestaurantStatus status = RestaurantStatus.PENDING;

    @Column(name = "cover_image_url")
    private String coverImageUrl;

    @Column(name = "logo_url")
    private String logoUrl;

    @ElementCollection
    @CollectionTable(name = "restaurant_images", joinColumns = @JoinColumn(name = "restaurant_id"))
    @Column(name = "image_url")
    @JsonIgnore
    private List<String> imageUrls;

    @ElementCollection
    @CollectionTable(name = "restaurant_features", joinColumns = @JoinColumn(name = "restaurant_id"))
    @Column(name = "feature")
    @JsonIgnore
    private List<String> features; // e.g., "Home Delivery", "Takeaway", "Online Payment"

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "gst_number")
    private String gstNumber;

    @Column(name = "bank_account_number")
    private String bankAccountNumber;

    @Column(name = "bank_ifsc_code")
    private String bankIfscCode;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonIgnore
    private User owner;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<MenuItem> menuItems;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Order> orders;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Review> reviews;

    // Enums
    public enum RestaurantStatus {
        PENDING,
        APPROVED,
        REJECTED,
        SUSPENDED,
        INACTIVE
    }

    // Constructors
    public Restaurant() {}

    public Restaurant(String name, String cuisineType, User owner) {
        this.name = name;
        this.cuisineType = cuisineType;
        this.owner = owner;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getCuisineType() {
        return cuisineType;
    }

    public void setCuisineType(String cuisineType) {
        this.cuisineType = cuisineType;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(Integer totalReviews) {
        this.totalReviews = totalReviews;
    }

    public Double getMinimumOrderAmount() {
        return minimumOrderAmount;
    }

    public void setMinimumOrderAmount(Double minimumOrderAmount) {
        this.minimumOrderAmount = minimumOrderAmount;
    }

    public Double getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(Double deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public Integer getEstimatedDeliveryTimeMinutes() {
        return estimatedDeliveryTimeMinutes;
    }

    public void setEstimatedDeliveryTimeMinutes(Integer estimatedDeliveryTimeMinutes) {
        this.estimatedDeliveryTimeMinutes = estimatedDeliveryTimeMinutes;
    }

    public LocalTime getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(LocalTime openingTime) {
        this.openingTime = openingTime;
    }

    public LocalTime getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(LocalTime closingTime) {
        this.closingTime = closingTime;
    }

    public Boolean getIsOpen() {
        return isOpen;
    }

    public void setIsOpen(Boolean isOpen) {
        this.isOpen = isOpen;
    }

    // Alias methods for services
    public Boolean isOpen() {
        return isOpen;
    }

    public Double getRating() {
        return averageRating;
    }

    public Integer getDeliveryTime() {
        return estimatedDeliveryTimeMinutes;
    }

    public String getImageUrl() {
        return coverImageUrl;
    }

    public Double getMinOrderAmount() {
        return minimumOrderAmount;
    }

    public String getLocation() {
        StringBuilder location = new StringBuilder();
        if (addressLine1 != null) location.append(addressLine1);
        if (addressLine2 != null) location.append(", ").append(addressLine2);
        if (city != null) location.append(", ").append(city);
        if (state != null) location.append(", ").append(state);
        if (postalCode != null) location.append(" ").append(postalCode);
        return location.toString();
    }

    // Setter methods for service compatibility
    public void setLocation(String location) {
        // This is a complex field, so we'll just set the first address line for now
        this.addressLine1 = location;
    }

    public void setImageUrl(String imageUrl) {
        this.coverImageUrl = imageUrl;
    }

    public void setDeliveryTime(Integer deliveryTime) {
        this.estimatedDeliveryTimeMinutes = deliveryTime;
    }

    public void setMinOrderAmount(Double minOrderAmount) {
        this.minimumOrderAmount = minOrderAmount;
    }

    public void setRating(Double rating) {
        this.averageRating = rating;
    }

    public void setOpen(Boolean open) {
        this.isOpen = open;
    }

    public Boolean getIsAcceptingOrders() {
        return isAcceptingOrders;
    }

    public void setIsAcceptingOrders(Boolean isAcceptingOrders) {
        this.isAcceptingOrders = isAcceptingOrders;
    }

    public RestaurantStatus getStatus() {
        return status;
    }

    public void setStatus(RestaurantStatus status) {
        this.status = status;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getGstNumber() {
        return gstNumber;
    }

    public void setGstNumber(String gstNumber) {
        this.gstNumber = gstNumber;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }

    public String getBankIfscCode() {
        return bankIfscCode;
    }

    public void setBankIfscCode(String bankIfscCode) {
        this.bankIfscCode = bankIfscCode;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<MenuItem> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    // Utility methods
    public String getFullAddress() {
        StringBuilder address = new StringBuilder();
        if (addressLine1 != null) address.append(addressLine1);
        if (addressLine2 != null) address.append(", ").append(addressLine2);
        if (city != null) address.append(", ").append(city);
        if (state != null) address.append(", ").append(state);
        if (postalCode != null) address.append(" - ").append(postalCode);
        return address.toString();
    }

    public boolean isCurrentlyOpen() {
        if (!isOpen || !isAcceptingOrders) {
            return false;
        }
        // Add logic to check current time against opening/closing hours
        return true;
    }

    public boolean isApproved() {
        return status == RestaurantStatus.APPROVED;
    }
}