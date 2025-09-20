package com.fooddelivery.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

/**
 * MenuItem entity representing food items in restaurant menus
 */
@Entity
@Table(name = "menu_items", indexes = {
    @Index(name = "idx_menu_item_restaurant", columnList = "restaurant_id"),
    @Index(name = "idx_menu_item_category", columnList = "category"),
    @Index(name = "idx_menu_item_available", columnList = "is_available")
})
public class MenuItem extends BaseEntity {

    @NotBlank(message = "Item name is required")
    @Size(max = 100, message = "Item name must not exceed 100 characters")
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(name = "description", length = 500)
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private Double price;

    @NotBlank(message = "Category is required")
    @Column(name = "category", nullable = false)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ItemType type = ItemType.VEG;

    @Min(value = 0, message = "Calories cannot be negative")
    @Column(name = "calories")
    private Integer calories;

    @Min(value = 0, message = "Preparation time cannot be negative")
    @Column(name = "preparation_time_minutes")
    private Integer preparationTimeMinutes;

    @Column(name = "spice_level")
    private String spiceLevel; // Mild, Medium, Hot, Extra Hot

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable = true;

    @Column(name = "is_recommended", nullable = false)
    private Boolean isRecommended = false;

    @DecimalMin(value = "0.0", message = "Discount percentage cannot be negative")
    @DecimalMax(value = "100.0", message = "Discount percentage cannot exceed 100")
    @Column(name = "discount_percentage", precision = 5, scale = 2)
    private Double discountPercentage = 0.0;

    @Column(name = "image_url")
    private String imageUrl;

    @ElementCollection
    @CollectionTable(name = "menu_item_ingredients", joinColumns = @JoinColumn(name = "menu_item_id"))
    @Column(name = "ingredient")
    @JsonIgnore
    private List<String> ingredients;

    @ElementCollection
    @CollectionTable(name = "menu_item_allergens", joinColumns = @JoinColumn(name = "menu_item_id"))
    @Column(name = "allergen")
    @JsonIgnore
    private List<String> allergens;

    @ElementCollection
    @CollectionTable(name = "menu_item_tags", joinColumns = @JoinColumn(name = "menu_item_id"))
    @Column(name = "tag")
    @JsonIgnore
    private List<String> tags; // e.g., "Bestseller", "New", "Chef's Special"

    @DecimalMin(value = "0.0", message = "Rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Rating cannot exceed 5.0")
    @Column(name = "average_rating", precision = 2, scale = 1)
    private Double averageRating = 0.0;

    @Min(value = 0, message = "Total orders cannot be negative")
    @Column(name = "total_orders", nullable = false)
    private Integer totalOrders = 0;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    @JsonIgnore
    private Restaurant restaurant;

    @OneToMany(mappedBy = "menuItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<OrderItem> orderItems;

    // Enums
    public enum ItemType {
        VEG,
        NON_VEG,
        VEGAN,
        JAIN,
        CONTAINS_EGG
    }

    // Constructors
    public MenuItem() {}

    public MenuItem(String name, Double price, String category, Restaurant restaurant) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.restaurant = restaurant;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public ItemType getType() {
        return type;
    }

    public void setType(ItemType type) {
        this.type = type;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public Integer getPreparationTimeMinutes() {
        return preparationTimeMinutes;
    }

    public void setPreparationTimeMinutes(Integer preparationTimeMinutes) {
        this.preparationTimeMinutes = preparationTimeMinutes;
    }

    public String getSpiceLevel() {
        return spiceLevel;
    }

    public void setSpiceLevel(String spiceLevel) {
        this.spiceLevel = spiceLevel;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    // Alias method for services that expect isAvailable()
    public Boolean isAvailable() {
        return isAvailable;
    }

    // Setter method for services that expect setAvailable()
    public void setAvailable(Boolean available) {
        this.isAvailable = available;
    }

    public Boolean getIsRecommended() {
        return isRecommended;
    }

    public void setIsRecommended(Boolean isRecommended) {
        this.isRecommended = isRecommended;
    }

    public Double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(Double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getAllergens() {
        return allergens;
    }

    public void setAllergens(List<String> allergens) {
        this.allergens = allergens;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Integer totalOrders) {
        this.totalOrders = totalOrders;
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

    // Utility methods
    public Double getDiscountedPrice() {
        if (discountPercentage != null && discountPercentage > 0) {
            return price - (price * discountPercentage / 100);
        }
        return price;
    }

    public Double getSavings() {
        if (discountPercentage != null && discountPercentage > 0) {
            return price * discountPercentage / 100;
        }
        return 0.0;
    }

    public boolean hasDiscount() {
        return discountPercentage != null && discountPercentage > 0;
    }

    public boolean isPopular() {
        return totalOrders != null && totalOrders > 50; // Threshold for popular items
    }

    public String getDisplayType() {
        switch (type) {
            case VEG: return "🟢 Veg";
            case NON_VEG: return "🔴 Non-Veg";
            case VEGAN: return "🌱 Vegan";
            case JAIN: return "🟡 Jain";
            case CONTAINS_EGG: return "🟠 Contains Egg";
            default: return "🟢 Veg";
        }
    }
}