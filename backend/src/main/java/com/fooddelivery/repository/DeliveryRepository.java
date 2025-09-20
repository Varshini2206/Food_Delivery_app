package com.fooddelivery.repository;

import com.fooddelivery.entity.Delivery;
import com.fooddelivery.entity.User;
import com.fooddelivery.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Delivery entity
 */
@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    @Query("SELECT d FROM Delivery d WHERE d.deliveryPartner.id = :deliveryPartnerId")
    List<Delivery> findByDeliveryPartnerId(@Param("deliveryPartnerId") Long deliveryPartnerId);
    
    @Query("SELECT d FROM Delivery d WHERE d.order.id = :orderId")
    Optional<Delivery> findByOrderId(@Param("orderId") Long orderId);
    
    List<Delivery> findByStatus(Delivery.DeliveryStatus status);
    
    @Query("SELECT d FROM Delivery d WHERE d.deliveryPartner.id = :partnerId AND d.status = :status")
    List<Delivery> findByDeliveryPartnerIdAndStatus(@Param("partnerId") Long partnerId, @Param("status") Delivery.DeliveryStatus status);
}