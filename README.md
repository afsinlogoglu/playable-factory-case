# E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js, Express.js, and MongoDB. This application provides a complete online shopping experience with user authentication, product management, order processing, and an admin dashboard for business operations.

## Project Description

This e-commerce platform is designed to provide a seamless shopping experience for customers while offering comprehensive management tools for administrators. The application features a responsive design that works across all devices, secure user authentication, and a robust product management system.

The platform includes essential e-commerce functionalities such as product browsing with category filtering, shopping cart management, wishlist features, order processing, and customer reviews. For administrators, it provides tools for managing products, categories, orders, and user accounts.

## Technology Stack

### Frontend Technologies
- **Next.js 14**: React framework with App Router for server-side rendering and routing
- **TypeScript**: Type-safe JavaScript for better development experience and code reliability
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Context**: State management for global application state
- **React Hook Form**: Form handling and validation with minimal re-renders
- **Lucide React**: Modern icon library for consistent UI elements

### Backend Technologies
- **Express.js 4.18.2**: Fast and minimalist web framework for Node.js
- **TypeScript**: Type-safe JavaScript on the server side
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Tokens for secure authentication
- **bcryptjs**: Password hashing for security
- **Multer**: File upload handling for images
- **Express Validator**: Input validation and sanitization
- **Nodemailer**: Email sending for notifications and verification
- **Express Rate Limit**: API rate limiting for security
- **CORS**: Cross-origin resource sharing configuration

### Development Tools
- **ts-node-dev**: TypeScript development server with hot reload
- **ESLint**: Code linting for maintaining code quality
- **Prettier**: Code formatting for consistent style

## Installation Instructions

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- **Node.js**: Version 18 or higher
- **MongoDB**: Version 5 or higher
- **npm** or **yarn**: Package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd playable-factory-case
```

### Step 2: Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

### Step 3: Environment Configuration
Create and configure the environment file:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CORS_ORIGIN=http://localhost:3000
```

### Step 4: Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

### Step 5: Frontend Environment Configuration
Create and configure the frontend environment file:
```bash
cp .env.example .env.local
```

Edit the `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## Running the Application

### Start MongoDB
Ensure MongoDB is running on your system:

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo systemctl start mongod
```

**Windows:**
```bash
net start MongoDB
```

### Start Backend Server
```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5001`

### Start Frontend Server
```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:3000`

### Database Seeding
To populate the database with sample data for testing:
```bash
cd backend
npm run seed
```

This will create sample categories, products, and user accounts.

## Demo Credentials

### Customer Account
- **Email**: customer@example.com
- **Password**: password123

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123

## API Documentation

### Authentication Endpoints

**User Registration**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+905551234567"
}
```

**User Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Email Verification**
```
GET /api/auth/verify-email/:token
```

**Password Reset Request**
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Get Current User**
```
GET /api/auth/me
Authorization: Bearer <jwt-token>
```

### Product Endpoints

**Get All Products**
```
GET /api/products?category=elektronik&search=iphone&page=1&limit=12
```

**Get Product by ID**
```
GET /api/products/:id
```

**Create Product (Admin Only)**
```
POST /api/products
Authorization: Bearer <admin-jwt-token>
Content-Type: multipart/form-data

{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone model",
  "price": 89999.99,
  "category": "category-id",
  "stock": 50,
  "images": [file1, file2]
}
```

**Update Product (Admin Only)**
```
PUT /api/products/:id
Authorization: Bearer <admin-jwt-token>
```

**Delete Product (Admin Only)**
```
DELETE /api/products/:id
Authorization: Bearer <admin-jwt-token>
```

### Category Endpoints

**Get All Categories**
```
GET /api/categories
```

**Create Category (Admin Only)**
```
POST /api/categories
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "name": "Electronics",
  "description": "Electronic devices and accessories"
}
```

### Order Endpoints

**Get User Orders**
```
GET /api/orders/my-orders
Authorization: Bearer <jwt-token>
```

**Create Order**
```
POST /api/orders
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "items": [
    {
      "product": "product-id",
      "quantity": 2,
      "price": 89999.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Istanbul",
    "state": "Istanbul",
    "zipCode": "34000",
    "country": "Turkey"
  },
  "totalPrice": 179999.98
}
```

### Review Endpoints

**Get Product Reviews**
```
GET /api/reviews/product/:productId
```

**Add Review**
```
POST /api/reviews
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "product": "product-id",
  "rating": 5,
  "title": "Excellent Product",
  "comment": "This product exceeded my expectations."
}
```

### Admin Endpoints

**Get Dashboard Statistics**
```
GET /api/admin/stats
Authorization: Bearer <admin-jwt-token>
```

**Get Recent Orders**
```
GET /api/admin/orders/recent
Authorization: Bearer <admin-jwt-token>
```

## Deployment Guide

### Backend Deployment (Heroku)

1. Create a Heroku account and install Heroku CLI
2. Create a new Heroku app
3. Add MongoDB add-on (MongoDB Atlas)
4. Set environment variables in Heroku dashboard
5. Deploy the application:

```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel)

1. Create a Vercel account
2. Connect your GitHub repository
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Environment Variables for Production

**Backend (.env):**
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://your-frontend-domain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## Features List

### Customer Features
- **User Authentication**: Secure registration and login with email verification
- **Product Browsing**: Browse products with category filtering and search functionality
- **Shopping Cart**: Add, remove, and manage items with quantity control
- **Wishlist**: Save favorite products for later purchase
- **Order Management**: Place orders and track order status
- **Product Reviews**: Read and write product reviews with rating system
- **User Profile**: Manage personal information and shipping addresses
- **Responsive Design**: Mobile-friendly interface that works on all devices

### Admin Features
- **Product Management**: Create, update, and delete products with image upload
- **Category Management**: Organize products with category system
- **Order Management**: View and manage customer orders
- **Review Moderation**: Approve or delete customer reviews
- **Dashboard**: View sales statistics and analytics
- **User Management**: Access customer information and order history

### Technical Features
- **JWT Authentication**: Secure token-based authentication system
- **File Upload**: Image upload for products and categories
- **Rate Limiting**: API protection against abuse and spam
- **Input Validation**: Comprehensive form validation and sanitization
- **Error Handling**: Proper error responses and logging
- **CORS Support**: Cross-origin resource sharing configuration
- **Email Integration**: Password reset and email verification system

### Bonus Features
- **Real-time Cart Updates**: Shopping cart updates without page refresh
- **Category-based Product Filtering**: Filter products by category
- **Search Functionality**: Search products by name and description
- **Responsive Product Cards**: Beautiful product display with placeholder images
- **Smooth Scrolling**: Enhanced user experience with smooth page transitions
- **Toast Notifications**: User-friendly success and error messages

## Project Structure

```
playable-factory-case/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middlewares/     # Custom middlewares
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Server entry point
│   ├── uploads/             # File uploads
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js app router
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utility libraries
│   │   └── types/           # TypeScript types
│   ├── public/              # Static assets
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed description
3. Contact the development team

## Version History

- **v1.0.0**: Initial release with basic e-commerce functionality
  - User authentication and authorization
  - Product and category management
  - Shopping cart and order processing
  - Admin dashboard
  - Responsive design
  - Review system
  - File upload functionality
