import express from 'express';
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct
} from '../controllers/productController';
import { auth, adminAuth } from '../middlewares/auth';
import upload from '../middlewares/upload';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin routes
router.post('/', adminAuth, upload.array('images', 5), createProduct);
router.put('/:id', adminAuth, upload.array('images', 5), updateProduct);
router.delete('/:id', adminAuth, deleteProduct);

export default router; 