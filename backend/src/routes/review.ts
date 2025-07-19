import express from 'express';
import { 
  addReview, 
  getProductReviews, 
  approveReview, 
  deleteReview
} from '../controllers/reviewController';
import { auth, adminAuth } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.get('/product/:productId', getProductReviews);

// User routes
router.post('/', auth, addReview);
router.delete('/:id', auth, deleteReview);

// Admin routes
router.put('/:id/approve', adminAuth, approveReview);

export default router; 