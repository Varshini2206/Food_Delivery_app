package com.fooddelivery.dto;

public class AddToCartRequest {
    private Long menuItemId;
    private Integer quantity;
    private String specialInstructions;
    
    public AddToCartRequest() {}
    
    public AddToCartRequest(Long menuItemId, Integer quantity) {
        this.menuItemId = menuItemId;
        this.quantity = quantity;
    }
    
    public AddToCartRequest(Long menuItemId, Integer quantity, String specialInstructions) {
        this.menuItemId = menuItemId;
        this.quantity = quantity;
        this.specialInstructions = specialInstructions;
    }
    
    // Getters and setters
    public Long getMenuItemId() {
        return menuItemId;
    }
    
    public void setMenuItemId(Long menuItemId) {
        this.menuItemId = menuItemId;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public String getSpecialInstructions() {
        return specialInstructions;
    }
    
    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }
}