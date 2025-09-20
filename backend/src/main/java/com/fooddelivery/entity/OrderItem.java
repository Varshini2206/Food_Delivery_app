package com.fooddelivery.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * OrderItem entity representing individual items in an order
 */
@Entity
@Table(name = "order_items", indexes = {
    @Index(name = "idx_order_item_order", columnList = "order_id"),
    @Index(name = "idx_order_item_menu", columnList = "menu_item_id")
})
public class OrderItem extends BaseEntity {

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull(message = "Unit price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Unit price must be greater than 0")
    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private Double unitPrice;

    @NotNull(message = "Total price is required")
    @DecimalMin(value = "0.0", message = "Total price cannot be negative")
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private Double totalPrice;

    @Column(name = "special_instructions", length = 200)
    private String specialInstructions;

    @DecimalMin(value = "0.0", message = "Discount amount cannot be negative")
    @Column(name = "discount_amount", precision = 10, scale = 2)
    private Double discountAmount = 0.0;

    @Column(name = "discount_percentage", precision = 5, scale = 2)
    private Double discountPercentage = 0.0;

    // Snapshot of menu item at the time of order (for historical accuracy)
    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "item_description")
    private String itemDescription;

    @Column(name = "item_image_url")
    private String itemImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_type")
    private MenuItem.ItemType itemType;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_item_id", nullable = false)
    @JsonIgnore
    private MenuItem menuItem;

    // Constructors
    public OrderItem() {}

    public OrderItem(Order order, MenuItem menuItem, Integer quantity) {
        this.order = order;
        this.menuItem = menuItem;
        this.quantity = quantity;
        this.unitPrice = menuItem.getDiscountedPrice();
        this.itemName = menuItem.getName();
        this.itemDescription = menuItem.getDescription();
        this.itemImageUrl = menuItem.getImageUrl();
        this.itemType = menuItem.getType();
        this.discountPercentage = menuItem.getDiscountPercentage();
        calculateTotalPrice();
    }

    // Getters and Setters
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        calculateTotalPrice();
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
        calculateTotalPrice();
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    // Alias methods for services that expect getPrice/setPrice
    public Double getPrice() {
        return totalPrice;
    }

    public void setPrice(Double price) {
        this.totalPrice = price;
    }

    public String getSpecialInstructions() {
        return specialInstructions;
    }

    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }

    public Double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public Double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(Double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getItemImageUrl() {
        return itemImageUrl;
    }

    public void setItemImageUrl(String itemImageUrl) {
        this.itemImageUrl = itemImageUrl;
    }

    public MenuItem.ItemType getItemType() {
        return itemType;
    }

    public void setItemType(MenuItem.ItemType itemType) {
        this.itemType = itemType;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }

    // Utility methods
    private void calculateTotalPrice() {
        if (quantity != null && unitPrice != null) {
            double subtotal = quantity * unitPrice;
            this.totalPrice = subtotal - (discountAmount != null ? discountAmount : 0.0);
        }
    }

    public Double getOriginalPrice() {
        if (menuItem != null) {
            return quantity * menuItem.getPrice();
        }
        return totalPrice;
    }

    public Double getSavings() {
        if (discountAmount != null && discountAmount > 0) {
            return discountAmount;
        }
        if (discountPercentage != null && discountPercentage > 0 && unitPrice != null) {
            return (quantity * unitPrice * discountPercentage) / 100;
        }
        return 0.0;
    }

    public boolean hasDiscount() {
        return (discountAmount != null && discountAmount > 0) || 
               (discountPercentage != null && discountPercentage > 0);
    }

    public String getDisplayType() {
        if (itemType != null) {
            switch (itemType) {
                case VEG: return "🟢 Veg";
                case NON_VEG: return "🔴 Non-Veg";
                case VEGAN: return "🌱 Vegan";
                case JAIN: return "🟡 Jain";
                case CONTAINS_EGG: return "🟠 Contains Egg";
                default: return "🟢 Veg";
            }
        }
        return "🟢 Veg";
    }
}