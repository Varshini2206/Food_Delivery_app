package com.fooddelivery.repository;

import com.fooddelivery.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    
    Optional<User> findByPhoneNumber(String phoneNumber);
    
    Boolean existsByEmail(String email);
    
    Boolean existsByPhoneNumber(String phoneNumber);
    
    List<User> findByRole(User.UserRole role);
    
    Page<User> findByRole(User.UserRole role, Pageable pageable);
    
    List<User> findByStatus(User.UserStatus status);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.status = :status")
    List<User> findByRoleAndStatus(@Param("role") User.UserRole role, @Param("status") User.UserStatus status);
    
    @Query("SELECT u FROM User u WHERE u.city = :city AND u.role = com.fooddelivery.entity.User$UserRole.DELIVERY_PARTNER AND u.status = com.fooddelivery.entity.User$UserStatus.ACTIVE")
    List<User> findActiveDeliveryPartnersByCity(@Param("city") String city);
    
    @Query("SELECT u FROM User u WHERE " +
           "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<User> searchUsers(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    Long countByRole(@Param("role") User.UserRole role);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.status = :status")
    Long countByStatus(@Param("status") User.UserStatus status);
    
    @Query("SELECT u FROM User u WHERE u.emailVerificationToken = :token")
    Optional<User> findByEmailVerificationToken(@Param("token") String token);
    
    @Query("SELECT u FROM User u WHERE u.phoneVerificationCode = :code")
    Optional<User> findByPhoneVerificationCode(@Param("code") String code);
    
    @Query("SELECT u FROM User u WHERE u.deletedAt IS NULL")
    List<User> findAllActive();
    
    @Query("SELECT u FROM User u WHERE u.deletedAt IS NULL")
    Page<User> findAllActive(Pageable pageable);
}