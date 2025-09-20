-- Sample data for FoodieExpress Application
-- This file will be executed on application startup

-- Insert sample admin user
INSERT INTO users (first_name, last_name, email, password, phone_number, role, status, address_line1, city, state, postal_code, country, is_email_verified, is_phone_verified, created_at, updated_at) VALUES
('Admin', 'User', 'admin@foodieexpress.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543210', 'ADMIN', 'ACTIVE', '123 Admin Street', 'Mumbai', 'Maharashtra', '400001', 'India', true, true, NOW(), NOW());

-- Insert sample customers
INSERT INTO users (first_name, last_name, email, password, phone_number, role, status, address_line1, city, state, postal_code, country, latitude, longitude, is_email_verified, is_phone_verified, created_at, updated_at) VALUES
('John', 'Doe', 'john.doe@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543211', 'CUSTOMER', 'ACTIVE', '456 Customer Lane', 'Mumbai', 'Maharashtra', '400002', 'India', 19.0760, 72.8777, true, true, NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543212', 'CUSTOMER', 'ACTIVE', '789 Food Street', 'Mumbai', 'Maharashtra', '400003', 'India', 19.0760, 72.8777, true, true, NOW(), NOW());

-- Insert sample restaurant owners
INSERT INTO users (first_name, last_name, email, password, phone_number, role, status, address_line1, city, state, postal_code, country, is_email_verified, is_phone_verified, created_at, updated_at) VALUES
('Rajesh', 'Kumar', 'rajesh.kumar@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543213', 'RESTAURANT_OWNER', 'ACTIVE', '321 Restaurant Row', 'Mumbai', 'Maharashtra', '400004', 'India', true, true, NOW(), NOW()),
('Priya', 'Sharma', 'priya.sharma@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543214', 'RESTAURANT_OWNER', 'ACTIVE', '654 Spice Avenue', 'Mumbai', 'Maharashtra', '400005', 'India', true, true, NOW(), NOW());

-- Insert sample delivery partners
INSERT INTO users (first_name, last_name, email, password, phone_number, role, status, address_line1, city, state, postal_code, country, latitude, longitude, is_email_verified, is_phone_verified, created_at, updated_at) VALUES
('Amit', 'Singh', 'amit.singh@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543215', 'DELIVERY_PARTNER', 'ACTIVE', '987 Delivery Drive', 'Mumbai', 'Maharashtra', '400006', 'India', 19.0760, 72.8777, true, true, NOW(), NOW()),
('Ravi', 'Patel', 'ravi.patel@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543216', 'DELIVERY_PARTNER', 'ACTIVE', '147 Speed Street', 'Mumbai', 'Maharashtra', '400007', 'India', 19.0760, 72.8777, true, true, NOW(), NOW());

-- Insert additional restaurant owners for new restaurants
INSERT INTO users (first_name, last_name, email, password, phone_number, role, status, address_line1, city, state, postal_code, country, is_email_verified, is_phone_verified, created_at, updated_at) VALUES
('Chen', 'Wang', 'chen.wang@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543217', 'RESTAURANT_OWNER', 'ACTIVE', '100 Dragon Street', 'Mumbai', 'Maharashtra', '400010', 'India', true, true, NOW(), NOW()),
('Maria', 'Rodriguez', 'maria.rodriguez@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543218', 'RESTAURANT_OWNER', 'ACTIVE', '200 Taco Lane', 'Mumbai', 'Maharashtra', '400011', 'India', true, true, NOW(), NOW()),
('Ahmed', 'Hassan', 'ahmed.hassan@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543219', 'RESTAURANT_OWNER', 'ACTIVE', '300 Kebab Road', 'Mumbai', 'Maharashtra', '400012', 'India', true, true, NOW(), NOW()),
('Hiroshi', 'Tanaka', 'hiroshi.tanaka@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543220', 'RESTAURANT_OWNER', 'ACTIVE', '400 Sushi Circle', 'Mumbai', 'Maharashtra', '400013', 'India', true, true, NOW(), NOW()),
('Sophie', 'Dubois', 'sophie.dubois@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543221', 'RESTAURANT_OWNER', 'ACTIVE', '500 Baguette Boulevard', 'Mumbai', 'Maharashtra', '400014', 'India', true, true, NOW(), NOW()),
('David', 'Miller', 'david.miller@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543222', 'RESTAURANT_OWNER', 'ACTIVE', '600 Burger Street', 'Mumbai', 'Maharashtra', '400015', 'India', true, true, NOW(), NOW()),
('Lakshmi', 'Nair', 'lakshmi.nair@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543223', 'RESTAURANT_OWNER', 'ACTIVE', '700 Curry Lane', 'Mumbai', 'Maharashtra', '400016', 'India', true, true, NOW(), NOW()),
('Antonio', 'Greco', 'antonio.greco@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+919876543224', 'RESTAURANT_OWNER', 'ACTIVE', '800 Pasta Plaza', 'Mumbai', 'Maharashtra', '400017', 'India', true, true, NOW(), NOW());

-- Insert sample restaurants
INSERT INTO restaurants (name, description, phone_number, email, address_line1, city, state, postal_code, country, latitude, longitude, cuisine_type, average_rating, total_reviews, minimum_order_amount, delivery_fee, estimated_delivery_time_minutes, opening_time, closing_time, is_open, is_accepting_orders, status, cover_image_url, logo_url, owner_id, created_at, updated_at) VALUES
('Spice Paradise', 'Authentic Indian cuisine with a modern twist. Experience the rich flavors of traditional recipes.', '+912233445566', 'contact@spiceparadise.com', '123 Flavor Street', 'Mumbai', 'Maharashtra', '400008', 'India', 19.0760, 72.8777, 'Indian', 4.5, 150, 200.00, 40.00, 30, '10:00:00', '23:00:00', true, true, 'APPROVED', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200', 4, NOW(), NOW()),
('Pizza Corner', 'Wood-fired pizzas made with fresh ingredients and artisanal techniques.', '+912233445567', 'hello@pizzacorner.com', '456 Cheese Avenue', 'Mumbai', 'Maharashtra', '400009', 'India', 19.0860, 72.8877, 'Italian', 4.2, 89, 300.00, 50.00, 25, '11:00:00', '23:59:59', true, true, 'APPROVED', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=200', 5, NOW(), NOW()),
('Golden Dragon', 'Authentic Chinese cuisine featuring traditional flavors and modern presentation.', '+912233445568', 'orders@goldendragon.com', '789 Bamboo Street', 'Mumbai', 'Maharashtra', '400010', 'India', 19.0960, 72.8977, 'Chinese', 4.3, 120, 250.00, 45.00, 35, '12:00:00', '22:30:00', true, true, 'APPROVED', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800', 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=200', 8, NOW(), NOW()),
('El Sombrero', 'Vibrant Mexican flavors with fresh ingredients and bold spices.', '+912233445569', 'hola@elsombrero.com', '321 Fiesta Avenue', 'Mumbai', 'Maharashtra', '400011', 'India', 19.1060, 72.9077, 'Mexican', 4.1, 95, 180.00, 35.00, 40, '11:30:00', '23:30:00', true, true, 'APPROVED', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800', 'https://images.unsplash.com/photo-1574873215043-748d6b2a069e?w=200', 9, NOW(), NOW()),
('Sultan Kitchen', 'Middle Eastern delicacies with aromatic spices and traditional cooking methods.', '+912233445570', 'info@sultanskitchen.com', '654 Desert Road', 'Mumbai', 'Maharashtra', '400012', 'India', 19.1160, 72.9177, 'Middle Eastern', 4.4, 78, 220.00, 40.00, 30, '10:30:00', '22:00:00', true, true, 'APPROVED', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=200', 10, NOW(), NOW()),
('Sakura Sushi', 'Fresh sushi and Japanese cuisine prepared by expert chefs.', '+912233445571', 'orders@sakurasushi.com', '987 Cherry Blossom Lane', 'Mumbai', 'Maharashtra', '400013', 'India', 19.1260, 72.9277, 'Japanese', 4.6, 145, 350.00, 60.00, 20, '17:00:00', '23:00:00', true, true, 'APPROVED', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800', 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200', 11, NOW(), NOW()),
('Cafe Parisien', 'French bistro cuisine with classic dishes and fine pastries.', '+912233445572', 'bonjour@cafeparisien.com', '147 Montmartre Street', 'Mumbai', 'Maharashtra', '400014', 'India', 19.1360, 72.9377, 'French', 4.2, 67, 280.00, 50.00, 35, '08:00:00', '21:00:00', true, true, 'APPROVED', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=200', 12, NOW(), NOW()),
('Burger Barn', 'Gourmet burgers made with premium ingredients and creative combinations.', '+912233445573', 'hello@burgerbarn.com', '258 Grill Street', 'Mumbai', 'Maharashtra', '400015', 'India', 19.1460, 72.9477, 'American', 4.0, 156, 150.00, 30.00, 20, '11:00:00', '23:00:00', true, true, 'APPROVED', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800', 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=200', 13, NOW(), NOW()),
('Kerala Delights', 'Traditional South Indian cuisine with coconut-based curries and seafood specialties.', '+912233445574', 'taste@keraladelights.com', '369 Coconut Grove', 'Mumbai', 'Maharashtra', '400016', 'India', 19.1560, 72.9577, 'South Indian', 4.5, 89, 180.00, 35.00, 25, '10:00:00', '22:30:00', true, true, 'APPROVED', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200', 14, NOW(), NOW()),
('Mama Mia', 'Authentic Italian family recipes passed down through generations.', '+912233445575', 'ciao@mamamia.com', '741 Little Italy Lane', 'Mumbai', 'Maharashtra', '400017', 'India', 19.1660, 72.9677, 'Italian', 4.3, 112, 250.00, 45.00, 30, '12:00:00', '23:30:00', true, true, 'APPROVED', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=200', 15, NOW(), NOW());

-- Insert restaurant features
INSERT INTO restaurant_features (restaurant_id, feature) VALUES
(1, 'Home Delivery'), (1, 'Takeaway'), (1, 'Online Payment'), (1, 'Vegetarian Options'),
(2, 'Home Delivery'), (2, 'Takeaway'), (2, 'Online Payment'), (2, 'Wood Fired Oven'),
(3, 'Home Delivery'), (3, 'Takeaway'), (3, 'Online Payment'), (3, 'Authentic Chinese'),
(4, 'Home Delivery'), (4, 'Takeaway'), (4, 'Online Payment'), (4, 'Spicy Food'), (4, 'Live Music'),
(5, 'Home Delivery'), (5, 'Takeaway'), (5, 'Online Payment'), (5, 'Halal Food'), (5, 'Traditional Recipes'),
(6, 'Home Delivery'), (6, 'Takeaway'), (6, 'Online Payment'), (6, 'Fresh Sushi'), (6, 'Expert Chefs'),
(7, 'Home Delivery'), (7, 'Takeaway'), (7, 'Online Payment'), (7, 'French Cuisine'), (7, 'Fresh Pastries'),
(8, 'Home Delivery'), (8, 'Takeaway'), (8, 'Online Payment'), (8, 'Gourmet Burgers'), (8, 'Premium Ingredients'),
(9, 'Home Delivery'), (9, 'Takeaway'), (9, 'Online Payment'), (9, 'South Indian'), (9, 'Coconut Curries'),
(10, 'Home Delivery'), (10, 'Takeaway'), (10, 'Online Payment'), (10, 'Family Recipes'), (10, 'Vegetarian Options');

-- Insert restaurant images
INSERT INTO restaurant_images (restaurant_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600'),
(1, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600'),
(2, 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600'),
(2, 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600'),
(3, 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600'),
(3, 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=600'),
(4, 'https://images.unsplash.com/photo-1574873215043-748d6b2a069e?w=600'),
(4, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600'),
(5, 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'),
(5, 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600'),
(6, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600'),
(6, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600'),
(7, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600'),
(7, 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600'),
(8, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600'),
(8, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600'),
(9, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600'),
(9, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600'),
(10, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'),
(10, 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600');

-- Insert sample menu items for Spice Paradise
INSERT INTO menu_items (name, description, price, category, type, calories, preparation_time_minutes, spice_level, is_available, is_recommended, discount_percentage, image_url, average_rating, total_orders, restaurant_id, created_at, updated_at) VALUES
('Butter Chicken', 'Tender chicken pieces in a rich, creamy tomato-based curry with aromatic spices.', 320.00, 'Main Course', 'NON_VEG', 450, 20, 'Medium', true, true, 0.0, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', 4.6, 45, 1, NOW(), NOW()),
('Paneer Tikka Masala', 'Grilled cottage cheese cubes in a spiced onion-tomato gravy.', 280.00, 'Main Course', 'VEG', 380, 18, 'Medium', true, true, 10.0, 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', 4.4, 32, 1, NOW(), NOW()),
('Biryani Chicken', 'Aromatic basmati rice cooked with tender chicken and traditional spices.', 350.00, 'Rice & Biryani', 'NON_VEG', 520, 45, 'Medium', true, true, 0.0, 'https://images.unsplash.com/photo-1563379091339-03246963d321?w=400', 4.7, 67, 1, NOW(), NOW()),
('Garlic Naan', 'Soft bread baked in tandoor with fresh garlic and herbs.', 80.00, 'Breads', 'VEG', 180, 8, 'Mild', true, false, 0.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', 4.3, 89, 1, NOW(), NOW()),
('Gulab Jamun', 'Traditional Indian sweet dumplings in sugar syrup.', 120.00, 'Desserts', 'VEG', 250, 5, 'None', true, false, 0.0, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 4.5, 23, 1, NOW(), NOW());

-- Insert sample menu items for Pizza Corner
INSERT INTO menu_items (name, description, price, category, type, calories, preparation_time_minutes, spice_level, is_available, is_recommended, discount_percentage, image_url, average_rating, total_orders, restaurant_id, created_at, updated_at) VALUES
('Margherita Pizza', 'Classic pizza with fresh mozzarella, tomato sauce, and basil leaves.', 400.00, 'Pizza', 'VEG', 320, 15, 'None', true, true, 15.0, 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400', 4.4, 78, 2, NOW(), NOW()),
('Pepperoni Pizza', 'Traditional pizza topped with spicy pepperoni and mozzarella cheese.', 550.00, 'Pizza', 'NON_VEG', 480, 18, 'Medium', true, true, 0.0, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', 4.6, 92, 2, NOW(), NOW()),
('Chicken Alfredo Pasta', 'Creamy pasta with grilled chicken in rich alfredo sauce.', 380.00, 'Pasta', 'NON_VEG', 420, 20, 'Mild', true, false, 0.0, 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400', 4.2, 34, 2, NOW(), NOW()),
('Caesar Salad', 'Fresh romaine lettuce with caesar dressing, croutons, and parmesan.', 220.00, 'Salads', 'VEG', 180, 10, 'None', true, false, 0.0, 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', 4.1, 18, 2, NOW(), NOW()),
('Tiramisu', 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.', 180.00, 'Desserts', 'VEG', 320, 5, 'None', true, false, 0.0, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', 4.7, 41, 2, NOW(), NOW());

-- Insert sample menu items for Golden Dragon (Chinese)
INSERT INTO menu_items (name, description, price, category, type, calories, preparation_time_minutes, spice_level, is_available, is_recommended, discount_percentage, image_url, average_rating, total_orders, restaurant_id, created_at, updated_at) VALUES
('Sweet & Sour Pork', 'Crispy pork pieces in tangy sweet and sour sauce with bell peppers.', 380.00, 'Main Course', 'NON_VEG', 420, 25, 'Mild', true, true, 0.0, 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400', 4.5, 56, 3, NOW(), NOW()),
('Kung Pao Chicken', 'Spicy stir-fried chicken with peanuts and vegetables in savory sauce.', 360.00, 'Main Course', 'NON_VEG', 380, 20, 'Hot', true, true, 10.0, 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=400', 4.3, 43, 3, NOW(), NOW()),
('Vegetable Fried Rice', 'Wok-fried rice with fresh vegetables and aromatic seasonings.', 280.00, 'Rice', 'VEG', 320, 15, 'Mild', true, false, 0.0, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', 4.2, 67, 3, NOW(), NOW()),
('Chicken Manchurian', 'Indo-Chinese fusion dish with chicken balls in spicy sauce.', 340.00, 'Main Course', 'NON_VEG', 360, 22, 'Medium', true, true, 0.0, 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400', 4.4, 38, 3, NOW(), NOW());

-- Insert sample menu items for Burger Barn (American)
INSERT INTO menu_items (name, description, price, category, type, calories, preparation_time_minutes, spice_level, is_available, is_recommended, discount_percentage, image_url, average_rating, total_orders, restaurant_id, created_at, updated_at) VALUES
('Classic Beef Burger', 'Juicy beef patty with lettuce, tomato, onion, and special sauce.', 320.00, 'Burgers', 'NON_VEG', 480, 15, 'None', true, true, 0.0, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400', 4.3, 89, 8, NOW(), NOW()),
('Chicken Deluxe Burger', 'Grilled chicken breast with bacon, cheese, and crispy lettuce.', 350.00, 'Burgers', 'NON_VEG', 520, 18, 'None', true, true, 15.0, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', 4.5, 76, 8, NOW(), NOW()),
('Veggie Supreme Burger', 'Plant-based patty with avocado, sprouts, and herb mayo.', 290.00, 'Burgers', 'VEG', 380, 12, 'None', true, false, 0.0, 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400', 4.1, 45, 8, NOW(), NOW()),
('Loaded Fries', 'Crispy fries topped with cheese, bacon bits, and ranch dressing.', 180.00, 'Sides', 'NON_VEG', 420, 10, 'None', true, false, 0.0, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', 4.0, 62, 8, NOW(), NOW());

-- Insert sample menu items for Sakura Sushi (Japanese)
INSERT INTO menu_items (name, description, price, category, type, calories, preparation_time_minutes, spice_level, is_available, is_recommended, discount_percentage, image_url, average_rating, total_orders, restaurant_id, created_at, updated_at) VALUES
('California Roll', 'Fresh crab, avocado, and cucumber wrapped in nori and rice.', 420.00, 'Sushi Rolls', 'NON_VEG', 280, 10, 'None', true, true, 0.0, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', 4.6, 94, 6, NOW(), NOW()),
('Salmon Sashimi', 'Fresh sliced salmon served without rice, traditional style.', 480.00, 'Sashimi', 'NON_VEG', 220, 5, 'None', true, true, 0.0, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400', 4.8, 67, 6, NOW(), NOW()),
('Chicken Teriyaki', 'Grilled chicken glazed with sweet teriyaki sauce and sesame seeds.', 380.00, 'Main Course', 'NON_VEG', 380, 20, 'Mild', true, false, 0.0, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', 4.4, 52, 6, NOW(), NOW()),
('Miso Soup', 'Traditional Japanese soup with tofu, seaweed, and green onions.', 120.00, 'Soups', 'VEG', 80, 5, 'None', true, false, 0.0, 'https://images.unsplash.com/photo-1544378730-6f3a9b6e8abf?w=400', 4.2, 38, 6, NOW(), NOW());

-- Insert menu item ingredients
INSERT INTO menu_item_ingredients (menu_item_id, ingredient) VALUES
(1, 'Chicken'), (1, 'Tomatoes'), (1, 'Cream'), (1, 'Butter'), (1, 'Spices'),
(2, 'Paneer'), (2, 'Onions'), (2, 'Tomatoes'), (2, 'Spices'),
(6, 'Mozzarella'), (6, 'Tomato Sauce'), (6, 'Basil'),
(7, 'Pepperoni'), (7, 'Mozzarella'), (7, 'Tomato Sauce');

-- Insert menu item tags
INSERT INTO menu_item_tags (menu_item_id, tag) VALUES
(1, 'Bestseller'), (1, 'Chef Special'),
(3, 'Popular'), (3, 'Traditional'),
(6, 'Classic'), (6, 'Vegetarian'),
(7, 'Bestseller'), (7, 'Spicy');

-- Password for all sample users: password123
-- All users are active and verified for demo purposes