# Crafty. 🏺

**Crafty** is a full-stack e-commerce web application designed for artisans to list handcrafted goods and for customers to discover unique, sustainable products. It features a polished UI, secure authentication via Firebase, and a complete shopping workflow backed by MongoDB.

## 🚀 Live Demo

[Click here to visit Live Demo](https://crafty-phi-tan.vercel.app/)

---

## ✨ Features

### 🛍️ Customer Experience

- **Hero Slider:** Dynamic, visually appealing slider showcasing featured artisan stories.
- **Shop by Category:** Filter products by specific crafts (Bamboo, Ceramics, Leather, etc.).
- **Product Details:** Comprehensive product pages with image zoom, long descriptions, specifications, and shipping info.
- **Search & Filter:** Real-time filtering by category and search terms.
- **Shopping Cart (Orders):** Add items to orders and view purchase history.

### 🔐 Authentication & Security

- **Firebase Auth:** Secure Login and Registration using Email/Password and Google Sign-In.
- **Protected Routes:** Dashboard pages (`/dashboard/add`, `/dashboard/orders`) are inaccessible without login.
- **Persisted Sessions:** Users remain logged in across page reloads.

### 📦 Vendor Dashboard

- **Add Product:** Secure form to list new items with image URLs, pricing, and detailed descriptions.
- **Manage Orders:** View a list of ordered items and remove them if necessary.

---

## 🛠️ Technology Stack

### Frontend

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** React Hot Toast
- **Slider:** Swiper.js

### Backend & Services

- **Server:** Node.js & Express.js
- **Database:** MongoDB (using Native Driver)
- **Authentication:** Firebase Authentication
- **Deployment:** Vercel (Frontend & Backend)

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone [https://github.com/sayhan-ahmed/crafty-client.git](https://github.com/sayhan-ahmed/crafty-client.git)
cd crafty-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a .env.local file in the root directory. You need your Firebase configuration keys here:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## 🗺️ Application Routes

| Route                       | Type      | Access      | Description                                         |
| :-------------------------- | :-------- | :---------- | :-------------------------------------------------- |
| `/`                         | Page      | Public      | Landing page with Hero, Categories, Featured items. |
| `/products`                 | Page      | Public      | Main shop page with search and filtering.           |
| `/products/[category]/[id]` | Page      | Public      | Dynamic product details page.                       |
| `/login`                    | Auth      | Public      | User login page.                                    |
| `/register`                 | Auth      | Public      | User registration page.                             |
| `/about`                    | Page      | Public      | Static "About Us" page.                             |
| `/contact`                  | Page      | Public      | Contact form.                                       |
| `/dashboard/add`            | Dashboard | **Private** | Form to add new products to the store.              |
| `/dashboard/orders`         | Dashboard | **Private** | View user's placed orders.                          |

---

## 📂 Project Structure

```bash
crafty-client/
├── app/
│   ├── (auth)/          # Login & Register pages (Grouped)
│   ├── dashboard/       # Protected User Dashboard
│   ├── products/        # Listing & Detail pages
│   ├── about/           # Static About page
│   ├── contact/         # Contact page
│   ├── page.jsx         # Landing Page
│   └── layout.jsx       # Root layout (Navbar/Footer)
├── components/          # Reusable UI components
├── lib/                 # Firebase configuration
└── public/              # Static assets
```

## 🔌 API Endpoints (Backend)

The frontend connects to a custom Express.js server hosted separately.

- `GET /products`: Fetch all products.
- `GET /products/:id`: Fetch single product details.
- `POST /products`: Create a new product (Protected).
- `POST /orders`: Place a new order (Protected).
- `GET /orders?email=...`: Fetch user-specific orders.
- `DELETE /orders/:id`: Cancel an order.
