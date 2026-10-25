-- ==============================
-- Multi-Business Management Schema
-- ==============================

-- 1. Companies
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0
);

-- 2. Business Types (lookup)
CREATE TABLE business_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_code VARCHAR(50) UNIQUE NOT NULL,
    type_name VARCHAR(100) NOT NULL,
    description TEXT,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0
);

-- 3. Businesses
CREATE TABLE businesses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    business_type_id INT NOT NULL,
    business_name VARCHAR(255) NOT NULL,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (business_type_id) REFERENCES business_types(id)
);

-- 4. Branches
CREATE TABLE branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    business_id INT NOT NULL,
    company_id INT NOT NULL,
    branch_name VARCHAR(255) NOT NULL,
    address TEXT,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (business_id) REFERENCES businesses(id)
);

-- 5. Role Types (lookup)
CREATE TABLE role_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_code VARCHAR(50) UNIQUE NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    description TEXT,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0
);

-- 6. Roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT NOT NULL,
    role_type_id INT NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    description TEXT,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (role_type_id) REFERENCES role_types(id)
);

-- 7. Menu Categories (lookup)
CREATE TABLE menu_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_code VARCHAR(50) UNIQUE NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0
);

-- 8. Menus
CREATE TABLE menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    parent_id INT DEFAULT NULL,
    menu_category_id INT DEFAULT NULL,
    key_name VARCHAR(100) NOT NULL,
    label VARCHAR(255) NOT NULL,
    icon VARCHAR(100) DEFAULT NULL,
    image_url VARCHAR(100) DEFAULT NULL,
    route VARCHAR(255) DEFAULT NULL,
    is_default BOOLEAN DEFAULT TRUE,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (parent_id) REFERENCES menus(id),
    FOREIGN KEY (menu_category_id) REFERENCES menu_categories(id)
);

-- 9. Company Menus
CREATE TABLE company_menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    menu_id INT NOT NULL,
    is_custom BOOLEAN DEFAULT FALSE,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (menu_id) REFERENCES menus(id)
);

-- 10. Role Menu Access
CREATE TABLE role_menu_access (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    role_id INT NOT NULL,
    menu_id INT NOT NULL,
    can_view BOOLEAN DEFAULT TRUE,
    can_edit BOOLEAN DEFAULT FALSE,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (menu_id) REFERENCES menus(id)
);

-- 11. Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    branch_id INT NOT NULL,
    role_id INT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- 12. User Access
CREATE TABLE user_access (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    branch_id INT DEFAULT NULL,
    role_id INT NOT NULL,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE enums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enum_group VARCHAR(100) NOT NULL,   -- e.g. "business_type", "role_type", "menu_category"
    enum_key VARCHAR(100) NOT NULL,     -- e.g. "medical_store", "admin", "sales"
    enum_label VARCHAR(255) NOT NULL,   -- e.g. "Medical Store", "Administrator", "Sales"
    description TEXT DEFAULT NULL,

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    UNIQUE(enum_group, enum_key)
);

INSERT INTO enums (id, enum_group, enum_key, enum_label)
VALUES
(1, 'business_type', 'medical_store', 'Medical Store'),
(2, 'business_type', 'hotel', 'Hotel'),
(3, 'role_type', 'admin', 'Administrator'),
(4, 'role_type', 'cashier', 'Cashier'),
(5, 'menu_category', 'sales', 'Sales'),
(6, 'menu_category', 'purchase', 'Purchase');




-- Subscription Plans (lookup)
CREATE TABLE subscription_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plan_code VARCHAR(50) UNIQUE NOT NULL,   -- e.g. "basic", "pro", "enterprise"
    plan_name VARCHAR(100) NOT NULL,         -- e.g. "Basic Plan"
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    billing_cycle ENUM('monthly','yearly') DEFAULT 'monthly',
    max_users INT DEFAULT NULL,              -- optional: limit users per plan
    max_branches INT DEFAULT NULL,           -- optional: limit branches per plan

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0
);

-- Company Subscriptions
CREATE TABLE company_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('active','expired','cancelled','pending') DEFAULT 'active',

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
);

-- Payments / Invoices
CREATE TABLE subscription_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_subscription_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('credit_card','debit_card','upi','netbanking','paypal') NOT NULL,
    transaction_id VARCHAR(255) UNIQUE,
    status ENUM('success','failed','pending') DEFAULT 'success',

    active TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    modified_by INT DEFAULT NULL,
    deleted TINYINT DEFAULT 0,

    FOREIGN KEY (company_subscription_id) REFERENCES company_subscriptions(id)
);


INSERT INTO subscription_plans (plan_code, plan_name, description, price, billing_cycle, duration_days, max_users, max_branches)
VALUES
('trial', 'Trial Plan', 'Free 14-day trial', 0.00, 'trial', 14, 5, 1),
('basic', 'Basic Plan', 'For small businesses', 499.00, 'monthly', NULL, 5, 1),
('pro', 'Pro Plan', 'For growing businesses', 1999.00, 'monthly', NULL, 50, 10),
('enterprise', 'Enterprise Plan', 'Unlimited access for large companies', 9999.00, 'yearly', NULL, NULL, NULL);


ALTER TABLE subscription_plans
    ADD COLUMN duration_days INT NULL AFTER billing_cycle;

ALTER TABLE subscription_plans
    MODIFY COLUMN billing_cycle
        ENUM('trial', 'monthly', 'yearly') DEFAULT 'monthly';
        
INSERT INTO subscription_plans (
    id, plan_code, plan_name, description,
    price, billing_cycle, duration_days,
    max_users, max_branches
) VALUES
(1, 'trial', 'Trial Plan', '14-day trial', 0.00, 'trial', 14, 5, 1),
(2, 'basic', 'Basic Plan', 'Small business', 499.00, 'monthly', NULL, 5, 1),
(3, 'pro', 'Pro Plan', 'Growing business', 1999.00, 'monthly', NULL, 50, 10),
(4, 'enterprise', 'Enterprise Plan', 'Large business', 9999.00, 'yearly', NULL, NULL, NULL);


ALTER TABLE branches
  ADD COLUMN district VARCHAR(100) NULL AFTER address,
  ADD COLUMN taluk VARCHAR(100) NULL AFTER district;

  ALTER TABLE roles
    ADD COLUMN company_id INT NULL AFTER id,
    MODIFY COLUMN branch_id INT NULL;

    ALTER TABLE roles
    MODIFY COLUMN company_id INT NOT NULL,
    ADD CONSTRAINT fk_roles_company
        FOREIGN KEY (company_id) REFERENCES companies(id);

INSERT INTO role_types
    (role_code, role_name, description, active, deleted, created, modified)
VALUES
    ('admin', 'Administrator','Manage company settings, users, branches and permissions',1, 0, NOW(), NOW()),
    ('manager', 'Manager','Manage daily operations and assigned business functions',1, 0, NOW(), NOW()),
    ('supervisor', 'Supervisor','Supervise staff and monitor daily operations',1, 0, NOW(), NOW()),
    ('staff', 'Staff','Perform assigned operational tasks',1, 0, NOW(), NOW()),
    ('accountant', 'Accountant','Manage permitted billing, accounting and financial functions',1, 0, NOW(), NOW()),
    ('viewer', 'Viewer','View permitted information without editing',1, 0, NOW(), NOW(),
    ('organization_admin','Organization Admin','Manage the organization, all its businesses and branches, users, roles, permissions and subscription',1,0,NOW(),NOW()));

INSERT INTO business_types
    (type_code, type_name, description, active, deleted, created, modified)
VALUES
    ('medical', 'Medical Store','Medical shops and pharmacies', 1, 0, NOW(), NOW()),
    ('hospital', 'Hospital','Hospitals and healthcare organizations', 1, 0, NOW(), NOW()),
    ('departmental', 'Departmental Store','Departmental and retail stores', 1, 0, NOW(), NOW()),
    ('restaurant', 'Restaurant','Restaurants and food service businesses', 1, 0, NOW(), NOW());
    
ALTER TABLE companies
ADD CONSTRAINT uq_companies_email UNIQUE (email);