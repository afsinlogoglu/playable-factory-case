import express from 'express';
import { auth, adminAuth } from '../middlewares/auth';

const router = express.Router();

// Admin stats
router.get('/stats', auth, adminAuth, async (req, res) => {
  try {
    // Mock data for now - in real app, calculate from database
    const stats = {
      totalSales: 15420.50,
      totalOrders: 127,
      totalCustomers: 89,
      totalProducts: 45
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Recent orders
router.get('/orders/recent', auth, adminAuth, async (req, res) => {
  try {
    // Mock data for now
    const recentOrders = [
      {
        _id: 'order1',
        customer: { name: 'Ahmet Yılmaz', email: 'ahmet@example.com' },
        total: 299.99,
        status: 'completed'
      },
      {
        _id: 'order2',
        customer: { name: 'Ayşe Demir', email: 'ayse@example.com' },
        total: 149.50,
        status: 'pending'
      }
    ];
    
    res.json(recentOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Popular products
router.get('/products/popular', auth, adminAuth, async (req, res) => {
  try {
    // Mock data for now
    const popularProducts = [
      {
        _id: 'prod1',
        name: 'iPhone 15 Pro',
        price: 49999.99,
        image: 'https://via.placeholder.com/150'
      },
      {
        _id: 'prod2',
        name: 'Samsung Galaxy S24',
        price: 39999.99,
        image: 'https://via.placeholder.com/150'
      }
    ];
    
    res.json(popularProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 