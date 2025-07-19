import express from 'express';
import { 
  getCategories, 
  getCategory, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categoryController';
import { auth, adminAuth } from '../middlewares/auth';
import upload from '../middlewares/upload';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategory);

// Admin routes
router.post('/', adminAuth, upload.single('image'), createCategory);
router.put('/:id', adminAuth, upload.single('image'), updateCategory);
router.delete('/:id', adminAuth, deleteCategory);

export default router; 