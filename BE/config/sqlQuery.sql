use ECOM;
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier
    username VARCHAR(50) NOT NULL UNIQUE, -- Username for login
    email VARCHAR(100) NOT NULL UNIQUE, -- Email for contact/login
    password VARCHAR(255) NOT NULL, -- Hashed password for security
    first_name VARCHAR(50), -- User's first name
    last_name VARCHAR(50), -- User's last name
    phone_number VARCHAR(15), -- User's contact number
    country VARCHAR(100), -- User's country
    place VARCHAR(100), -- User's city or town
    address TEXT, -- Full address for billing or shipping
    postal_code VARCHAR(20), -- Postal or ZIP code
    date_of_birth DATE, -- Optional field for personalization
    profile_picture VARCHAR(255), -- URL of the profile picture
    wallet_balance DECIMAL(10, 2) DEFAULT 0.00, -- E-wallet balance for the user
    is_active BOOLEAN DEFAULT TRUE, -- Status to activate/deactivate user
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Registration date
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Last update
    role VARCHAR(50) DEFAULT 'customer' -- Role-based access control
);
USE your_database_name;

INSERT INTO users (
    username, email, password, first_name, last_name, phone_number, country, place, address, postal_code, date_of_birth, profile_picture, wallet_balance, is_active, role
) VALUES
('john_doe', 'john.doe@example.com', 'hashed_password_1', 'John', 'Doe', '9876543210', 'USA', 'New York', '123 Main St, Apt 4B', '10001', '1990-05-15', 'https://example.com/profile/john_doe.jpg', 100.50, TRUE, 'customer'),
('jane_smith', 'jane.smith@example.com', 'hashed_password_2', 'Jane', 'Smith', '9876543211', 'Canada', 'Toronto', '456 Queen St, Apt 12C', 'M5V1Z4', '1985-10-22', 'https://example.com/profile/jane_smith.jpg', 200.75, TRUE, 'customer'),
('mike_brown', 'mike.brown@example.com', 'hashed_password_3', 'Mike', 'Brown', '9876543212', 'UK', 'London', '789 King St, Flat 5', 'WC2N5DU', '1993-08-10', 'https://example.com/profile/mike_brown.jpg', 50.00, TRUE, 'customer'),
('sarah_jones', 'sarah.jones@example.com', 'hashed_password_4', 'Sarah', 'Jones', '9876543213', 'Australia', 'Sydney', '101 George St', '2000', '1995-12-05', 'https://example.com/profile/sarah_jones.jpg', 150.00, TRUE, 'customer'),
('robert_wilson', 'robert.wilson@example.com', 'hashed_password_5', 'Robert', 'Wilson', '9876543214', 'India', 'Mumbai', '502 Andheri West', '400053', '1988-04-17', 'https://example.com/profile/robert_wilson.jpg', 300.00, TRUE, 'admin'),
('emily_davis', 'emily.davis@example.com', 'hashed_password_6', 'Emily', 'Davis', '9876543215', 'France', 'Paris', '234 Rue de Rivoli', '75001', '1992-11-20', 'https://example.com/profile/emily_davis.jpg', 75.00, TRUE, 'customer'),
('david_taylor', 'david.taylor@example.com', 'hashed_password_7', 'David', 'Taylor', '9876543216', 'Germany', 'Berlin', '78 Alexanderplatz', '10178', '1991-09-12', 'https://example.com/profile/david_taylor.jpg', 120.00, TRUE, 'customer'),
('lisa_clark', 'lisa.clark@example.com', 'hashed_password_8', 'Lisa', 'Clark', '9876543217', 'Italy', 'Rome', '56 Piazza Navona', '00186', '1987-03-30', 'https://example.com/profile/lisa_clark.jpg', 180.00, TRUE, 'vendor'),
('mark_lewis', 'mark.lewis@example.com', 'hashed_password_9', 'Mark', 'Lewis', '9876543218', 'Spain', 'Barcelona', '12 La Rambla', '08002', '1994-06-18', 'https://example.com/profile/mark_lewis.jpg', 90.00, TRUE, 'vendor'),
('nancy_white', 'nancy.white@example.com', 'hashed_password_10', 'Nancy', 'White', '9876543219', 'Japan', 'Tokyo', '89 Shibuya Crossing', '150-0002', '1996-07-25', 'https://example.com/profile/nancy_white.jpg', 250.00, TRUE, 'customer');

DELETE FROM products WHERE product_id IN ('B09VCHLSJF', 'B09TT6BFDX' , 'B09T3KB6JZ' , 'B09SB6SJB4','B09RX1FK54' , 'B09RZS1NQT');
 
CREATE TABLE cart (
    cart_id VARCHAR(50) PRIMARY KEY,          -- Unique Cart Item ID
    user_id BIGINT NOT NULL,                  -- FK from `users.id`
    product_id VARCHAR(50) NOT NULL,          -- FK from `products.product_id`
    quantity INT DEFAULT 1 CHECK (quantity > 0),  -- Quantity should be at least 1
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for tracking
    CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- Changed `user_id` to `id`
);
