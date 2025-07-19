import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middlewares/auth';
import { passwordResetLimiter } from '../middlewares/rateLimit';
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updateProfile,
  addAddress,
  getAddresses
} from '../controllers/authController';

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('İsim en az 2 karakter olmalıdır'),
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz'),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır'),
  body('phone').optional().isMobilePhone('tr-TR').withMessage('Geçerli bir telefon numarası giriniz')
];

const loginValidation = [
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz'),
  body('password').notEmpty().withMessage('Şifre gereklidir')
];

const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz')
];

const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Token gereklidir'),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır')
];

const updateProfileValidation = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('İsim en az 2 karakter olmalıdır'),
  body('phone').optional().isMobilePhone('tr-TR').withMessage('Geçerli bir telefon numarası giriniz')
];

const addressValidation = [
  body('title').trim().notEmpty().withMessage('Adres başlığı gereklidir'),
  body('firstName').trim().notEmpty().withMessage('Ad gereklidir'),
  body('lastName').trim().notEmpty().withMessage('Soyad gereklidir'),
  body('phone').isMobilePhone('tr-TR').withMessage('Geçerli bir telefon numarası giriniz'),
  body('address').trim().notEmpty().withMessage('Adres gereklidir'),
  body('city').trim().notEmpty().withMessage('Şehir gereklidir'),
  body('state').trim().notEmpty().withMessage('İl gereklidir'),
  body('zipCode').trim().notEmpty().withMessage('Posta kodu gereklidir'),
  body('country').trim().notEmpty().withMessage('Ülke gereklidir')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', passwordResetLimiter, forgotPasswordValidation, forgotPassword);
router.post('/reset-password', passwordResetLimiter, resetPasswordValidation, resetPassword);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.put('/profile', auth, updateProfileValidation, updateProfile);
router.post('/addresses', auth, addressValidation, addAddress);
router.get('/addresses', auth, getAddresses);

export default router; 