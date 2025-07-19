# E-commerce Backend API

Modern e-commerce platformu için Express.js ve TypeScript ile geliştirilmiş backend API.

## Özellikler

- 🔐 JWT tabanlı authentication
- 👥 Role-based access control (Admin/Customer)
- 📧 Email verification ve password reset
- 🛍️ Product management
- 📂 Category management
- 📝 Review system
- 🛒 Order management
- 📁 File upload (images)
- 🗄️ MongoDB ile veri saklama

## Teknolojiler

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **File Upload**: Multer
- **Email**: Nodemailer
- **Security**: Helmet, CORS

## Kurulum

1. **Dependencies yükle:**
   ```bash
   npm install
   ```

2. **Environment variables ayarla:**
   ```bash
   cp .env.example .env
   ```
   
   `.env` dosyasını düzenleyerek gerekli değerleri ayarlayın:
   - MongoDB connection string
   - JWT secret key
   - Email configuration
   - Client URL

3. **Development server başlat:**
   ```bash
   npm run dev
   ```

4. **Production build:**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/auth/verify-email/:token` - Email doğrulama
- `POST /api/auth/forgot-password` - Şifre sıfırlama isteği
- `POST /api/auth/reset-password/:token` - Şifre sıfırlama
- `GET /api/auth/profile` - Kullanıcı profili (Auth gerekli)
- `PUT /api/auth/profile` - Profil güncelleme (Auth gerekli)
- `PUT /api/auth/change-password` - Şifre değiştirme (Auth gerekli)

### Categories
- `GET /api/categories` - Tüm kategorileri listele
- `GET /api/categories/:id` - Kategori detayı
- `POST /api/categories` - Kategori oluştur (Admin)
- `PUT /api/categories/:id` - Kategori güncelle (Admin)
- `DELETE /api/categories/:id` - Kategori sil (Admin)

### Products
- `GET /api/products` - Tüm ürünleri listele
- `GET /api/products/:id` - Ürün detayı
- `POST /api/products` - Ürün oluştur (Admin)
- `PUT /api/products/:id` - Ürün güncelle (Admin)
- `DELETE /api/products/:id` - Ürün sil (Admin)

### Orders
- `GET /api/orders/my-orders` - Kullanıcının siparişleri (Auth gerekli)
- `POST /api/orders` - Sipariş oluştur (Auth gerekli)
- `GET /api/orders/:id` - Sipariş detayı (Auth gerekli)
- `GET /api/orders` - Tüm siparişler (Admin)
- `DELETE /api/orders/:id` - Sipariş sil (Admin)

### Reviews
- `GET /api/reviews/product/:productId` - Ürün yorumları
- `POST /api/reviews` - Yorum ekle (Auth gerekli)
- `DELETE /api/reviews/:id` - Yorum sil (Auth gerekli)
- `PUT /api/reviews/:id/approve` - Yorum onayla (Admin)

## Database Models

### User
- name, email, password
- role (admin/customer)
- email verification
- password reset tokens
- profile information

### Category
- name, description, image
- slug, isActive
- parent category (hierarchical)

### Product
- name, description, price
- images, category, brand
- stock, SKU, tags
- specifications, dimensions
- average rating, review count

### Order
- user, items, total amount
- status, payment status
- shipping/billing addresses
- tracking information

### Review
- user, product, rating
- title, comment
- verification status

## Middleware

- **auth**: JWT token doğrulama
- **adminAuth**: Admin yetkisi kontrolü
- **upload**: File upload handling
- **validation**: Request validation

## Güvenlik

- JWT token authentication
- Password hashing (bcrypt)
- CORS protection
- Helmet security headers
- Input validation
- File upload restrictions

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-secret-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:3000
``` 