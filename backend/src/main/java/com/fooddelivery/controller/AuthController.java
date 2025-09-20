package com.fooddelivery.controller;

import com.fooddelivery.dto.JwtAuthenticationResponse;
import com.fooddelivery.dto.LoginRequest;
import com.fooddelivery.dto.SignupRequest;
import com.fooddelivery.entity.User;
import com.fooddelivery.repository.UserRepository;
import com.fooddelivery.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

/**
 * Authentication Controller for login, signup, and token management
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    /**
     * User login endpoint
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);
            String refreshToken = tokenProvider.generateRefreshToken(loginRequest.getEmail());

            User user = (User) authentication.getPrincipal();
            JwtAuthenticationResponse.UserInfo userInfo = new JwtAuthenticationResponse.UserInfo(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole().name(),
                user.getProfileImageUrl()
            );

            return ResponseEntity.ok(new JwtAuthenticationResponse(
                jwt, 
                refreshToken, 
                86400L, // 24 hours in seconds
                userInfo
            ));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    /**
     * User registration endpoint
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        Map<String, Object> response = new HashMap<>();

        // Check if email exists
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            response.put("message", "Email is already taken!");
            return ResponseEntity.badRequest().body(response);
        }

        // Check if phone number exists
        if (signUpRequest.getPhoneNumber() != null && 
            userRepository.existsByPhoneNumber(signUpRequest.getPhoneNumber())) {
            response.put("message", "Phone number is already in use!");
            return ResponseEntity.badRequest().body(response);
        }

        // Create new user
        User user = new User();
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setRole(signUpRequest.getRole());
        user.setAddressLine1(signUpRequest.getAddressLine1());
        user.setAddressLine2(signUpRequest.getAddressLine2());
        user.setCity(signUpRequest.getCity());
        user.setState(signUpRequest.getState());
        user.setPostalCode(signUpRequest.getPostalCode());
        user.setCountry(signUpRequest.getCountry());

        User result = userRepository.save(user);

        response.put("message", "User registered successfully");
        response.put("userId", result.getId());
        return ResponseEntity.ok(response);
    }

    /**
     * Token refresh endpoint
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        
        if (refreshToken == null || !tokenProvider.validateToken(refreshToken) || 
            !tokenProvider.isRefreshToken(refreshToken)) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid refresh token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        String username = tokenProvider.getUsernameFromToken(refreshToken);
        String newAccessToken = tokenProvider.generateTokenFromUsername(username);
        String newRefreshToken = tokenProvider.generateRefreshToken(username);

        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", newAccessToken);
        response.put("refreshToken", newRefreshToken);
        response.put("tokenType", "Bearer");
        response.put("expiresIn", 86400L);

        return ResponseEntity.ok(response);
    }

    /**
     * Logout endpoint (client-side token removal is sufficient for stateless JWT)
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "User logged out successfully");
        return ResponseEntity.ok(response);
    }

    /**
     * Get current user information
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = (User) authentication.getPrincipal();
        JwtAuthenticationResponse.UserInfo userInfo = new JwtAuthenticationResponse.UserInfo(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getRole().name(),
            user.getProfileImageUrl()
        );

        return ResponseEntity.ok(userInfo);
    }

    /**
     * User signup endpoint (alias for register)
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody Map<String, Object> request) {
        try {
            // Convert the generic request to SignupRequest format
            SignupRequest signUpRequest = new SignupRequest();
            
            // Handle both fullName and firstName/lastName formats
            if (request.containsKey("fullName")) {
                String fullName = (String) request.get("fullName");
                String[] nameParts = fullName.split(" ", 2);
                signUpRequest.setFirstName(nameParts[0]);
                signUpRequest.setLastName(nameParts.length > 1 ? nameParts[1] : "");
            } else {
                signUpRequest.setFirstName((String) request.get("firstName"));
                signUpRequest.setLastName((String) request.get("lastName"));
            }
            
            signUpRequest.setEmail((String) request.get("email"));
            signUpRequest.setPassword((String) request.get("password"));
            
            // Handle both phone and phoneNumber formats
            String phone = (String) request.getOrDefault("phone", request.get("phoneNumber"));
            signUpRequest.setPhoneNumber(phone);
            
            // Set default role as CUSTOMER if not provided
            if (request.containsKey("role")) {
                signUpRequest.setRole(User.UserRole.valueOf((String) request.get("role")));
            } else {
                signUpRequest.setRole(User.UserRole.CUSTOMER);
            }
            
            signUpRequest.setCountry((String) request.getOrDefault("country", "India"));
            
            // Call the original registration method
            ResponseEntity<?> response = registerUser(signUpRequest);
            
            // If registration was successful, generate a token for the test
            if (response.getStatusCode().is2xxSuccessful()) {
                Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
                Long userId = (Long) responseBody.get("userId");
                
                // Generate token for the registered user
                String token = tokenProvider.generateTokenFromUsername(signUpRequest.getEmail());
                
                Map<String, Object> tokenResponse = new HashMap<>();
                tokenResponse.put("message", responseBody.get("message"));
                tokenResponse.put("userId", userId);
                tokenResponse.put("token", token);
                
                return ResponseEntity.ok(tokenResponse);
            }
            
            return response;
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Get user profile endpoint
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("phone", user.getPhone());
            response.put("address", user.getAddress());
            response.put("role", user.getRole());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to get profile: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Update user profile endpoint
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody User profileUpdate, Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Update profile fields
            user.setFirstName(profileUpdate.getFirstName());
            user.setLastName(profileUpdate.getLastName());
            user.setPhone(profileUpdate.getPhone());
            user.setAddress(profileUpdate.getAddress());
            
            User updatedUser = userRepository.save(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Profile updated successfully");
            response.put("user", updatedUser);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to update profile: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * User signin endpoint (alias for login)
     */
    @PostMapping("/signin")
    public ResponseEntity<?> signinUser(@Valid @RequestBody LoginRequest loginRequest) {
        return authenticateUser(loginRequest);
    }
}
