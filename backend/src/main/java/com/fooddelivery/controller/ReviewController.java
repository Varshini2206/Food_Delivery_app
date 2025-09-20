package com.fooddelivery.controller;

import com.fooddelivery.entity.Review;
import com.fooddelivery.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Review operations
 */
@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * Get all reviews
     */
    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<List<Review>> getAllReviews() {
        try {
            List<Review> reviews = reviewRepository.findAll();
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get review by ID
     */
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Review> getReviewById(@PathVariable("id") Long id) {
        try {
            Optional<Review> reviewData = reviewRepository.findById(id);
            if (reviewData.isPresent()) {
                return new ResponseEntity<>(reviewData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a new review
     */
    @PostMapping
    @Transactional
    public ResponseEntity<Review> createReview(@Valid @RequestBody Review review) {
        try {
            Review savedReview = reviewRepository.save(review);
            return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update an existing review
     */
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Review> updateReview(@PathVariable("id") Long id, @Valid @RequestBody Review review) {
        try {
            Optional<Review> reviewData = reviewRepository.findById(id);
            if (reviewData.isPresent()) {
                Review existingReview = reviewData.get();
                existingReview.setRating(review.getRating());
                existingReview.setComment(review.getComment());
                existingReview.setReviewType(review.getReviewType());
                existingReview.setFoodRating(review.getFoodRating());
                existingReview.setDeliveryRating(review.getDeliveryRating());
                existingReview.setServiceRating(review.getServiceRating());
                existingReview.setIsAnonymous(review.getIsAnonymous());
                existingReview.setPhotoUrls(review.getPhotoUrls());
                existingReview.setRestaurantResponse(review.getRestaurantResponse());
                existingReview.setResponseDate(review.getResponseDate());
                existingReview.setHelpfulCount(review.getHelpfulCount());
                
                return new ResponseEntity<>(reviewRepository.save(existingReview), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a review
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteReview(@PathVariable("id") Long id) {
        try {
            reviewRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get reviews by restaurant ID
     */
    @GetMapping("/restaurant/{restaurantId}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Review>> getReviewsByRestaurantId(@PathVariable("restaurantId") Long restaurantId) {
        try {
            List<Review> reviews = reviewRepository.findByRestaurantId(restaurantId);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get reviews by customer ID
     */
    @GetMapping("/customer/{customerId}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Review>> getReviewsByCustomerId(@PathVariable("customerId") Long customerId) {
        try {
            List<Review> reviews = reviewRepository.findByCustomerId(customerId);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get reviews by order ID
     */
    @GetMapping("/order/{orderId}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Review>> getReviewsByOrderId(@PathVariable("orderId") Long orderId) {
        try {
            List<Review> reviews = reviewRepository.findByOrderId(orderId);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get reviews by rating range
     */
    @GetMapping("/rating/{minRating}/{maxRating}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Review>> getReviewsByRatingRange(
            @PathVariable("minRating") Double minRating,
            @PathVariable("maxRating") Double maxRating) {
        try {
            List<Review> reviews = reviewRepository.findByRatingBetween(minRating, maxRating);
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}