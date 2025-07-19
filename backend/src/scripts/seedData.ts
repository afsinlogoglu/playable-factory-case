import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Category from '../models/Category';
import Product from '../models/Product';
import User from '../models/User';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    // Mevcut verileri temizle
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Kategoriler oluştur
    const categories = await Category.create([
      {
        name: 'Elektronik',
        slug: 'elektronik',
        description: 'Elektronik ürünler'
      },
      {
        name: 'Giyim',
        slug: 'giyim',
        description: 'Giyim ürünleri'
      },
      {
        name: 'Kitap',
        slug: 'kitap',
        description: 'Kitaplar'
      },
      {
        name: 'Ev & Yaşam',
        slug: 'ev-yasam',
        description: 'Ev ve yaşam ürünleri'
      }
    ]);

    console.log('Kategoriler oluşturuldu');

    // Ürünler oluştur
    const products = await Product.create([
      {
        name: 'iPhone 15 Pro',
        sku: 'IPH15PRO128',
        description: 'Apple iPhone 15 Pro 128GB Titanium',
        price: 89999.99,
        category: categories[0]._id,
        stock: 50,
        rating: 4.8
      },
      {
        name: 'Samsung Galaxy S24',
        sku: 'SAMS24BLK256',
        description: 'Samsung Galaxy S24 256GB Phantom Black',
        price: 79999.99,
        category: categories[0]._id,
        stock: 30,
        rating: 4.6
      },
      {
        name: 'MacBook Air M3',
        sku: 'MBAIRM3256',
        description: 'Apple MacBook Air 13-inch M3 Chip 256GB',
        price: 129999.99,
        category: categories[0]._id,
        stock: 20,
        rating: 4.9
      },
      {
        name: 'Nike Air Max',
        sku: 'NIKEAIR270',
        description: 'Nike Air Max 270 Erkek Spor Ayakkabı',
        price: 2499.99,
        category: categories[1]._id,
        stock: 100,
        rating: 4.5
      },
      {
        name: 'Adidas T-Shirt',
        sku: 'ADIDASTS001',
        description: 'Adidas Erkek Spor T-Shirt',
        price: 299.99,
        category: categories[1]._id,
        stock: 200,
        rating: 4.3
      },
      {
        name: 'Harry Potter Set',
        sku: 'HP7SET001',
        description: 'Harry Potter 7 Kitap Seti',
        price: 899.99,
        category: categories[2]._id,
        stock: 25,
        rating: 4.7
      },
      {
        name: 'Lord of the Rings',
        sku: 'LOTR3SET001',
        description: 'Yüzüklerin Efendisi 3 Kitap Seti',
        price: 599.99,
        category: categories[2]._id,
        stock: 15,
        rating: 4.8
      },
      {
        name: 'Philips Hue Starter Kit',
        sku: 'PHILIPSHUE001',
        description: 'Philips Hue White and Color Ambiance Starter Kit',
        price: 2499.99,
        category: categories[3]._id,
        stock: 40,
        rating: 4.4
      },
      {
        name: 'Dyson V15',
        sku: 'DYSONV15DET',
        description: 'Dyson V15 Detect Absolute Extra Cordless Vacuum',
        price: 8999.99,
        category: categories[3]._id,
        stock: 10,
        rating: 4.6
      }
    ]);

    console.log('Ürünler oluşturuldu');

    console.log('Ürünler oluşturuldu');

    // Demo kullanıcıları oluştur
    const hashedPassword = await bcrypt.hash('password123', 12);
    const adminPassword = await bcrypt.hash('admin123', 12);

    const users = await User.create([
      {
        name: 'Demo Customer',
        email: 'customer@example.com',
        password: hashedPassword,
        phone: '+905551234567',
        role: 'user',
        isEmailVerified: true,
        addresses: [
          {
            title: 'Ev',
            firstName: 'Demo',
            lastName: 'Customer',
            phone: '+905551234567',
            address: 'Atatürk Caddesi No:123',
            city: 'İstanbul',
            state: 'İstanbul',
            zipCode: '34000',
            country: 'Türkiye'
          }
        ]
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        phone: '+905559876543',
        role: 'admin',
        isEmailVerified: true
      }
    ]);

    console.log('Demo kullanıcıları oluşturuldu');

    console.log('Seed işlemi tamamlandı!');
    console.log(`${categories.length} kategori oluşturuldu`);
    console.log(`${products.length} ürün oluşturuldu`);
    console.log(`${users.length} kullanıcı oluşturuldu`);

    console.log('\nDemo Kullanıcı Bilgileri:');
    console.log('Customer: customer@example.com / password123');
    console.log('Admin: admin@example.com / admin123');

  } catch (error) {
    console.error('Seed işlemi sırasında hata:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB bağlantısı kapatıldı');
  }
}

seedData(); 