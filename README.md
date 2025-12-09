# 🎟️ Event Booking Platform — Full-Stack Assignment

This repository contains a complete **Event Booking Platform** built as part of an interview technical task.  
The project demonstrates **backend API development**, **frontend integration**, **authentication**, **clean architecture**, and **production-ready coding practices**.

---

## 🚀 Tech Stack

### **Frontend**
- React + TypeScript  
- Yarn Workspaces  
- Formik  
- Axios  
- React Router  
- Tailwind

### **Backend**
- Node.js + Express (MVC Pattern)  
- MySQL + Sequelize ORM  
- JWT Authentication (Access + Refresh Tokens)  
- Role-Based Access Control (Admin / User)  

### **Optional**
- Redis (Caching Layer)

---

## 📌 Core Features

### **User**
- Browse events  
- View event details  
- Book tickets  
- Prevent duplicate bookings  
- View booking history  

### **Admin**
- Create / update events  
- Manage seat availability  
- View bookings *(optional)*  

---

## 📁 Monorepo Structure
```
my-event-booking/
├── apps/
│ ├── frontend/ # React + TypeScript
│ └── backend/ # Node.js + Express + Sequelize
├── package.json # Yarn workspaces root
├── README.md
└── yarn.lock
```
---

## 🛠️ Running the Project

### **1️⃣ Install all dependencies**
```
yarn install
```

### **2️⃣ Start backend**
```
yarn backend
```

### **3️⃣ Start frontend**
```
yarn frontend
```

### **4️⃣ Start both (concurrently)**
```
yarn dev
```

---

## 🔐 Environment Setup

Create `.env` files in both:
```
apps/frontend/.env
apps/backend/.env
```

### **Backend `.env` Example**
```
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=eventdb

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

### **Frontend `.env` Example**
```
VITE_API_URL=http://localhost:5000
```

---

## 🧱 Backend Architecture Summary (DDD Style)

- **main** → Application entrypoint Sets up the Express server, connects to the database, loads middlewares, and mounts routes.  
- **presentation** → Controllers & Routes Handles HTTP requests and responses. Maps incoming API requests to application use cases. Includes controllers, route definitions, and any HTTP-specific middleware.  
- **application** → Use Cases / Services. Orchestrates domain entities and infrastructure. Contains business workflows, service logic, and DTOs (Data Transfer Objects).  
- **domain** → Core Business Logic. Contains entities, aggregates, value objects, and domain-specific rules. Pure business logic — no database or HTTP dependencies.  
- **infrastructure** → Data Access & External Services. Handles database interactions, external APIs, and repositories. Contains Sequelize models, repository classes, and data mappers. Keeps application and domain layers independent from technology details.  
- **shared** → Common Utilities. Reusable helpers, constants, validators, error handlers, and common classes. Can be imported across all layers for consistency.  

---

## 🧩 Frontend Architecture Summary
- **Components** → Reusable UI blocks  
- **Pages** → Route-based views  
- **Services** → API handlers (Axios)  
- **Formik Forms** → Validations + UI  
- **Hooks** → Shared logic  
- **Context / Auth** → Role-based access  

---

## 📜 Notes
- This project was developed specifically for an interview technical assessment.  
- Architecture is designed for scalability and clarity.  
- Optional features (Redis caching, admin booking view) can be added as extensions.
