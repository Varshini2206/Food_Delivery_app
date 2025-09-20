package com.fooddelivery.controller;

import com.fooddelivery.entity.Delivery;
import com.fooddelivery.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Delivery operations
 */
@RestController
@RequestMapping("/deliveries")
public class DeliveryController {

    @Autowired
    private DeliveryRepository deliveryRepository;

    /**
     * Get all deliveries
     */
    @GetMapping
    public ResponseEntity<List<Delivery>> getAllDeliveries() {
        try {
            List<Delivery> deliveries = deliveryRepository.findAll();
            return new ResponseEntity<>(deliveries, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get delivery by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Delivery> getDeliveryById(@PathVariable("id") Long id) {
        try {
            Optional<Delivery> deliveryData = deliveryRepository.findById(id);
            if (deliveryData.isPresent()) {
                return new ResponseEntity<>(deliveryData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a new delivery
     */
    @PostMapping
    public ResponseEntity<Delivery> createDelivery(@Valid @RequestBody Delivery delivery) {
        try {
            Delivery savedDelivery = deliveryRepository.save(delivery);
            return new ResponseEntity<>(savedDelivery, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update an existing delivery
     */
    @PutMapping("/{id}")
    public ResponseEntity<Delivery> updateDelivery(@PathVariable("id") Long id, @Valid @RequestBody Delivery delivery) {
        try {
            Optional<Delivery> deliveryData = deliveryRepository.findById(id);
            if (deliveryData.isPresent()) {
                Delivery existingDelivery = deliveryData.get();
                existingDelivery.setStatus(delivery.getStatus());
                existingDelivery.setAssignedTime(delivery.getAssignedTime());
                existingDelivery.setPickupTime(delivery.getPickupTime());
                existingDelivery.setDeliveryTime(delivery.getDeliveryTime());
                existingDelivery.setEstimatedPickupTime(delivery.getEstimatedPickupTime());
                existingDelivery.setEstimatedDeliveryTime(delivery.getEstimatedDeliveryTime());
                existingDelivery.setDistanceKm(delivery.getDistanceKm());
                existingDelivery.setDeliveryFee(delivery.getDeliveryFee());
                existingDelivery.setPartnerEarnings(delivery.getPartnerEarnings());
                existingDelivery.setPickupInstructions(delivery.getPickupInstructions());
                existingDelivery.setDeliveryInstructions(delivery.getDeliveryInstructions());
                
                return new ResponseEntity<>(deliveryRepository.save(existingDelivery), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a delivery
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteDelivery(@PathVariable("id") Long id) {
        try {
            deliveryRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get deliveries by delivery partner ID
     */
    @GetMapping("/partner/{partnerId}")
    public ResponseEntity<List<Delivery>> getDeliveriesByPartnerId(@PathVariable("partnerId") Long partnerId) {
        try {
            List<Delivery> deliveries = deliveryRepository.findByDeliveryPartnerId(partnerId);
            return new ResponseEntity<>(deliveries, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get deliveries by order ID
     */
    @GetMapping("/order/{orderId}")
    public ResponseEntity<Delivery> getDeliveryByOrderId(@PathVariable("orderId") Long orderId) {
        try {
            Optional<Delivery> delivery = deliveryRepository.findByOrderId(orderId);
            if (delivery.isPresent()) {
                return new ResponseEntity<>(delivery.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get deliveries by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Delivery>> getDeliveriesByStatus(@PathVariable("status") String status) {
        try {
            Delivery.DeliveryStatus deliveryStatus = Delivery.DeliveryStatus.valueOf(status.toUpperCase());
            List<Delivery> deliveries = deliveryRepository.findByStatus(deliveryStatus);
            return new ResponseEntity<>(deliveries, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}