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


CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,              
    product_id INT NOT NULL,           
    quantity INT NOT NULL DEFAULT 1,   
    total_price DECIMAL(10,2) NOT NULL, 
    status ENUM('pending', 'shipped', 'delivered', 'cancelled', 'returned') DEFAULT 'pending',  
    payment_method ENUM('cash', 'card', 'UPI', 'wallet') DEFAULT 'cash',  
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',  
    tracking_id VARCHAR(50) UNIQUE NULL,   
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    shipped_date TIMESTAMP NULL,    
    delivered_date TIMESTAMP NULL,    
    cancelled_date TIMESTAMP NULL,   
    return_date TIMESTAMP NULL,   
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

select * from orders;

-- Total Orders Count
SELECT COUNT(*) AS total_orders FROM orders;
-- Total Revenue (Sum of All Orders)
SELECT SUM(total_price) AS total_revenue FROM orders WHERE payment_status = 'paid';

-- Orders by Status (Pending, Shipped, Delivered, etc.)
SELECT status, COUNT(*) AS count FROM orders GROUP BY status;

-- Revenue by Payment Method
SELECT payment_method, SUM(total_price) AS revenue FROM orders WHERE payment_status = 'paid' GROUP BY payment_method;

-- Daily Order Trends (Last 7 Days)
SELECT DATE(order_date) AS order_day, COUNT(*) AS order_count
FROM orders
WHERE order_date >= NOW() - INTERVAL 7 DAY
GROUP BY order_day
ORDER BY order_day;


-- Monthly Revenue Trend
SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(total_price) AS total_revenue
FROM orders
WHERE payment_status = 'paid'
GROUP BY month
ORDER BY month;
-- Top 5 Best-Selling Products
SELECT product_id, COUNT(*) AS total_orders, SUM(quantity) AS total_quantity_sold
FROM orders
GROUP BY product_id
ORDER BY total_quantity_sold DESC
LIMIT 5;


-- Active Users (Users Who Placed Orders)
SELECT COUNT(DISTINCT user_id) AS active_users FROM orders;

-- Cancelled & Returned Orders Ratio
SELECT 
    (COUNT(CASE WHEN status = 'cancelled' THEN 1 END) * 100 / COUNT(*)) AS cancelled_percentage,
    (COUNT(CASE WHEN status = 'returned' THEN 1 END) * 100 / COUNT(*)) AS returned_percentage
FROM orders;
-- Extra: Orders by Users
SELECT user_id, COUNT(*) AS total_orders 
FROM orders 
GROUP BY user_id 
ORDER BY total_orders DESC 
LIMIT 10;




INSERT INTO orders (user_id, product_id, quantity, total_price, status, payment_method, payment_status, tracking_id, order_date, shipped_date, delivered_date, cancelled_date, return_date)
VALUES
(1, 'P001', 2, 499.98, 'shipped', 'card', 'paid', 'TRK12345', '2025-03-22 10:00:00', '2025-03-23 12:00:00', NULL, NULL, NULL),
(5, 'P002', 1, 299.99, 'delivered', 'UPI', 'paid', 'TRK12346', '2025-03-20 08:30:00', '2025-03-21 11:00:00', '2025-03-22 14:00:00', NULL, NULL),
(6, 'P003', 3, 899.97, 'pending', 'cash', 'pending', NULL, '2025-03-24 15:45:00', NULL, NULL, NULL, NULL),
(7, 'P004', 1, 199.99, 'cancelled', 'wallet', 'refunded', 'TRK12347', '2025-03-19 09:20:00', NULL, NULL, '2025-03-20 16:00:00', NULL),
(11, 'P005', 2, 599.98, 'returned', 'card', 'refunded', 'TRK12348', '2025-03-18 14:10:00', '2025-03-19 10:30:00', '2025-03-20 13:00:00', NULL, '2025-03-21 18:00:00');


SELECT * FROM ECOM.products;



CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_title VARCHAR(100),
    category_id INT NOT NULL,
    brand VARCHAR(100),
    sku VARCHAR(50) UNIQUE,
    discounted_price DECIMAL(10,2),
    actual_price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    rating FLOAT DEFAULT 0,
    rating_count INT DEFAULT 0,
    description TEXT,
    detail_description TEXT,
    weight VARCHAR(50),
    on_sale TINYINT(1) DEFAULT 0,
    user_id BIGINT,
    img_link VARCHAR(500),
    product_link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
