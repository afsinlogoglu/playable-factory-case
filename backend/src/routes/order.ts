import express from 'express';
import { 
  getOrders, 
  getOrder, 
  createOrder, 
  deleteOrder
} from '../controllers/orderController';
import { auth, adminAuth } from '../middlewares/auth';

const router = express.Router();

// User routes
router.get('/my-orders', auth, getOrders);
router.post('/', auth, createOrder);
router.get('/:id', auth, getOrder);

// Admin routes
router.get('/', adminAuth, getOrders);
router.delete('/:id', adminAuth, deleteOrder);

export default router; 