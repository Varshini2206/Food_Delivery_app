package com.fooddelivery.config;

import com.fooddelivery.security.JwtAuthenticationEntryPoint;
import com.fooddelivery.security.JwtAuthenticationFilter;
import com.fooddelivery.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security Configuration
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
            .and()
            .csrf().disable()
            .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                // Public endpoints
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/restaurants").permitAll()
                .antMatchers(HttpMethod.GET, "/api/restaurants/*").permitAll()
                .antMatchers(HttpMethod.GET, "/api/restaurants/*/menu").permitAll()
                .antMatchers(HttpMethod.GET, "/api/menu-items/*").permitAll()
                .antMatchers(HttpMethod.GET, "/api/cart").permitAll()
                .antMatchers("/actuator/**").permitAll()
                .antMatchers("/uploads/**").permitAll()
                
                // Customer endpoints
                .antMatchers(HttpMethod.POST, "/api/orders").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.GET, "/api/orders/customer/*").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.POST, "/api/reviews").hasRole("CUSTOMER")
                
                // Restaurant Owner endpoints
                .antMatchers(HttpMethod.POST, "/api/restaurants").hasRole("RESTAURANT_OWNER")
                .antMatchers(HttpMethod.PUT, "/api/restaurants/*").hasRole("RESTAURANT_OWNER")
                .antMatchers(HttpMethod.POST, "/api/restaurants/*/menu").hasRole("RESTAURANT_OWNER")
                .antMatchers(HttpMethod.PUT, "/api/menu-items/*").hasRole("RESTAURANT_OWNER")
                .antMatchers(HttpMethod.DELETE, "/api/menu-items/*").hasRole("RESTAURANT_OWNER")
                .antMatchers(HttpMethod.GET, "/api/orders/restaurant/*").hasRole("RESTAURANT_OWNER")
                .antMatchers(HttpMethod.PUT, "/api/orders/*/status").hasRole("RESTAURANT_OWNER")
                
                // Delivery Partner endpoints
                .antMatchers(HttpMethod.GET, "/api/deliveries/available").hasRole("DELIVERY_PARTNER")
                .antMatchers(HttpMethod.POST, "/api/deliveries/*/accept").hasRole("DELIVERY_PARTNER")
                .antMatchers(HttpMethod.PUT, "/api/deliveries/*/status").hasRole("DELIVERY_PARTNER")
                .antMatchers(HttpMethod.PUT, "/api/deliveries/*/location").hasRole("DELIVERY_PARTNER")
                
                // Admin endpoints
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/restaurants/*/approve").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/users").hasRole("ADMIN")
                
                // All other requests require authentication
                .anyRequest().authenticated();

        // H2 Console specific configuration
        http.headers().frameOptions().disable();

        // Add JWT filter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}