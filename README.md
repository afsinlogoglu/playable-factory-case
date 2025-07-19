# E-Commerce Platform

Modern, full-stack e-commerce platform built with Next.js, Express.js, and MongoDB. This application provides a complete online shopping experience with user authentication, product management, order processing, and admin dashboard.

## 🚀 Features

### Customer Features
- **User Authentication**: Register, login, email verification, password reset
- **Product Browsing**: Browse products with category filtering and search
- **Shopping Cart**: Add/remove items, quantity management
- **Wishlist**: Save favorite products for later
- **Order Management**: Place orders, track order status
- **Product Reviews**: Read and write product reviews
- **User Profile**: Manage personal information and addresses
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Product Management**: CRUD operations for products with image upload
- **Category Management**: Create and manage product categories
- **Order Management**: View and manage customer orders
- **Review Moderation**: Approve/delete customer reviews
- **Dashboard**: Sales statistics and analytics
- **User Management**: View customer information

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **File Upload**: Image upload for products and categories
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Comprehensive form validation
- **Error Handling**: Proper error responses and logging
- **CORS Support**: Cross-origin resource sharing
- **Email Integration**: Password reset and verification emails

## 🛠 Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Context**: State management
- **Axios**: HTTP client for API calls
- **React Hook Form**: Form handling and validation

### Backend
- **Express.js 4.18.2**: Node.js web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **Express Validator**: Input validation
- **Nodemailer**: Email sending
- **Express Rate Limit**: API rate limiting
- **CORS**: Cross-origin resource sharing

### Development Tools
- **ts-node-dev**: TypeScript development server
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 📋 Prerequisites

- **Node.js**: Version 18 or higher
- **MongoDB**: Version 5 or higher
- **npm** or **yarn**: Package manager

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd playable-factory-case
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```

### 5. Environment Configuration
```bash
cp .env.example .env.local
```

Edit `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## 🏃‍♂️ Running the Application

### Start MongoDB
Make sure MongoDB is running on your system:
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Ubuntu/Debian
sudo systemctl start mongod

# Windows
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

### Database Seeding (Optional)
To populate the database with sample data:
```bash
cd backend
npm run seed
```

## 👥 Demo Credentials

### Customer Account
- **Email**: customer@example.com
- **Password**: password123

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register - User registration
POST /api/auth/login - User login
GET /api/auth/verify-email/:token - Email verification
POST /api/auth/forgot-password - Password reset request
POST /api/auth/reset-password - Password reset
GET /api/auth/me - Get current user
PUT /api/auth/profile - Update user profile
```

### Product Endpoints
```
GET /api/products - Get all products
GET /api/products/:id - Get product by ID
POST /api/products - Create product (Admin)
PUT /api/products/:id - Update product (Admin)
DELETE /api/products/:id - Delete product (Admin)
```

### Category Endpoints
```
GET /api/categories - Get all categories
GET /api/categories/:id - Get category by ID
POST /api/categories - Create category (Admin)
PUT /api/categories/:id - Update category (Admin)
DELETE /api/categories/:id - Delete category (Admin)
```

### Order Endpoints
```
GET /api/orders - Get all orders (Admin)
GET /api/orders/my-orders - Get user orders
GET /api/orders/:id - Get order by ID
POST /api/orders - Create order
DELETE /api/orders/:id - Delete order (Admin)
```

### Review Endpoints
```
GET /api/reviews/product/:productId - Get product reviews
POST /api/reviews - Add review
DELETE /api/reviews/:id - Delete review
PUT /api/reviews/:id/approve - Approve review (Admin)
```

### Admin Endpoints
```
GET /api/admin/stats - Get dashboard statistics
GET /api/admin/orders/recent - Get recent orders
GET /api/admin/products/popular - Get popular products
```

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku account and install Heroku CLI
2. Create a new Heroku app
3. Add MongoDB add-on (MongoDB Atlas)
4. Set environment variables in Heroku dashboard
5. Deploy:
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
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

## 📁 Project Structure

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed description
3. Contact the development team

## 🔄 Version History

- **v1.0.0**: Initial release with basic e-commerce functionality
- User authentication and authorization
- Product and category management
- Shopping cart and order processing
- Admin dashboard
- Responsive design
