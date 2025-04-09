# 💼 Angular E-Commerce Application

This is a full-featured e-commerce application built with Angular for the frontend and Node.js (Express) for the backend. It supports product listing, cart management, checkout, authentication, and an admin panel for product and user management or categories management. The backend API handles user authentication, product management, cart and order processing, all connected through a MYSQL database.

---

## 🚀 Getting Started

### Front-end
### 🛠️ Install Dependencies

```bash
npm install
```

### ▶️ Run Application

```bash
ng serve
```
The app will run on: [http://localhost:4200](http://localhost:4200)

### Back-end 

### 🛠️ Install Dependencies

```bash
npm install
```

### ▶️ Run Application

```bash
npm run dev
```
The app will run on: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Application Routes & Features

| Route | Path | Description |
|-------|------|-------------|
| 🏠 Home | `/home` | Displays homepage with product highlights |
| 📋 Dashboard | `/dashboard` | Admin dashboard with overall summary |
| 🛆 Product Detail | `/products/:id` | Shows details for a selected product |
| 🔐 Login | `/login` | Login page for user/admin |
| 🧲 Register | `/register` | User registration page |
| 🛒 Cart | `/cart` | Displays user's shopping cart |
| ✅ Checkout | `/checkout` | Checkout flow for placing orders |
| 👤 User Profile | `/user-profile` | Allows users to update their profile |

---

## 🧑‍💼 Admin Panel Functionalities

Admin can:

- ➕ Add new products  
- 🛂 Create product categories  
- 👥 Add and manage users  
- ✏️ Edit product details  
- 🧾 View user order histories  
- ⚙️ Update user profile info  
---

## 👤 User Flow (Customer)

- 🔍 Browse products from homepage
- ➕ Add products to cart/wishlist
- 🛒 Proceed to checkout
- 🔐 Login/Register if not already
- 🛆 Place order and view in profile
- ✏️ Update personal details from profile

---

## 🧾 Route Configuration (JSON)

```json
[
  { "path": "", "redirectTo": "home", "pathMatch": "full" },
  { "path": "home", "component": "DashboardComponent" },
  { "path": "dashboard", "component": "AdminDashboradComponent" },
  { "path": "products/:id", "component": "ProductDetailComponent" },
  { "path": "login", "component": "LoginComponent" },
  { "path": "register", "component": "RegisterComponent" },
  { "path": "checkout", "component": "CheckoutComponent" },
  { "path": "cart", "component": "CartComponent" },
  { "path": "user-profile", "component": "UserProfileComponent" },
  { "path": "**", "redirectTo": "home" }
]
```

---
## 📧 Contact

For any queries or contributions, feel free to open an issue or create a pull request.
