# MERN E-commerce Store

A full-stack e-commerce website built with the MERN stack.

## Live Demo
- Frontend: https://mern-ecommerce-store-beta.vercel.app
- Backend API: https://mern-ecommerce-api-5b7h.onrender.com
## Features
- User registration and login (JWT authentication, bcrypt password hashing)
- Role-based access (customer and admin)
- Product listing with search and category filter
- Product images
- Shopping cart (persists after refresh)
- Checkout and order history
- Admin dashboard to add and delete products
- Secure order pricing (calculated on the server) and stock reduction

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, React Router, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Deployment:** Vercel (frontend), Render (backend)

## Run Locally

### Backend
cd backend
npm install
npm run dev

Create `backend/.env`:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret

### Frontend
cd frontend
npm install
npm run dev



## Author
Iqra Bashir