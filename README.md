# Crafty. — Premium Handcrafted E-Commerce Platform 🏺

**Crafty** is a high-performance, secure, and scalable e-commerce web application engineered to deliver a seamless shopping experience for premium handcrafted goods. Built with modern full-stack architecture, real-time data synchronization, and enterprise-grade authentication.

## 🚀 Live Demo

[Click here to visit Live Demo](https://crafty-phi-tan.vercel.app/)

---

## Core Features

- **Secure User Authentication**  
  Firebase Authentication with Email/Password and Google OAuth; persistent sessions across page reloads.

- **Protected Route Access Control**  
  Next.js middleware with Firebase Admin SDK verification; restricted access to `/dashboard/add` and `/dashboard/orders`.

- **Dynamic Product Catalog**  
  Server-side rendered listings with real-time category filtering and full-text search.

- **Rich Product Detail Pages**  
  High-resolution image zoom, structured specifications, shipping details, and responsive layout.

- **Order Management System**  
  Full CRUD functionality for user orders via RESTful Express.js API backed by MongoDB.

- **Responsive & Accessible UI**  
  Built with Next.js 14 (App Router), Tailwind CSS, and mobile-first design; WCAG-compliant components.

- **Performance-Optimized Frontend**  
  Swiper.js hero slider, lazy-loaded images, and optimized asset delivery for fast load times.

- **Full-Stack Data Architecture**  
  Node.js/Express backend with MongoDB (Native Driver) for scalable product and order persistence.

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
