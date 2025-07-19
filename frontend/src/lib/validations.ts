import { z } from 'zod';

// User registration schema
export const registerSchema = z.object({
  name: z.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olabilir'),
  email: z.string()
    .email('Geçerli bir e-posta adresi giriniz'),
  password: z.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir'),
  confirmPassword: z.string(),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[0-9+\-\s()]+$/.test(val), 'Geçerli bir telefon numarası giriniz')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword']
});

// User login schema
export const loginSchema = z.object({
  email: z.string()
    .email('Geçerli bir e-posta adresi giriniz'),
  password: z.string()
    .min(1, 'Şifre gereklidir')
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Geçerli bir e-posta adresi giriniz')
});

// Reset password schema
export const resetPasswordSchema = z.object({
  password: z.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword']
});

// Profile update schema
export const profileUpdateSchema = z.object({
  name: z.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olabilir')
    .optional(),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[0-9+\-\s()]+$/.test(val), 'Geçerli bir telefon numarası giriniz')
});

// Address schema
export const addressSchema = z.object({
  type: z.enum(['home', 'work', 'other']),
  title: z.string()
    .min(2, 'Adres başlığı en az 2 karakter olmalıdır')
    .max(50, 'Adres başlığı en fazla 50 karakter olabilir'),
  firstName: z.string()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(30, 'Ad en fazla 30 karakter olabilir'),
  lastName: z.string()
    .min(2, 'Soyad en az 2 karakter olmalıdır')
    .max(30, 'Soyad en fazla 30 karakter olabilir'),
  phone: z.string()
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .regex(/^[0-9+\-\s()]+$/, 'Geçerli bir telefon numarası giriniz'),
  address: z.string()
    .min(10, 'Adres en az 10 karakter olmalıdır')
    .max(200, 'Adres en fazla 200 karakter olabilir'),
  city: z.string()
    .min(2, 'Şehir en az 2 karakter olmalıdır')
    .max(50, 'Şehir en fazla 50 karakter olabilir'),
  state: z.string()
    .min(2, 'İl en az 2 karakter olmalıdır')
    .max(50, 'İl en fazla 50 karakter olabilir'),
  zipCode: z.string()
    .min(5, 'Posta kodu en az 5 karakter olmalıdır')
    .max(10, 'Posta kodu en fazla 10 karakter olabilir'),
  country: z.string()
    .min(2, 'Ülke en az 2 karakter olmalıdır')
    .max(50, 'Ülke en fazla 50 karakter olabilir'),
  isDefault: z.boolean().optional()
});

// Checkout schema
export const checkoutSchema = z.object({
  firstName: z.string()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(30, 'Ad en fazla 30 karakter olabilir'),
  lastName: z.string()
    .min(2, 'Soyad en az 2 karakter olmalıdır')
    .max(30, 'Soyad en fazla 30 karakter olabilir'),
  email: z.string()
    .email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string()
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .regex(/^[0-9+\-\s()]+$/, 'Geçerli bir telefon numarası giriniz'),
  address: z.string()
    .min(10, 'Adres en az 10 karakter olmalıdır')
    .max(200, 'Adres en fazla 200 karakter olabilir'),
  city: z.string()
    .min(2, 'Şehir en az 2 karakter olmalıdır')
    .max(50, 'Şehir en fazla 50 karakter olabilir'),
  zipCode: z.string()
    .min(5, 'Posta kodu en az 5 karakter olmalıdır')
    .max(10, 'Posta kodu en fazla 10 karakter olabilir'),
  country: z.string()
    .min(2, 'Ülke en az 2 karakter olmalıdır')
    .max(50, 'Ülke en fazla 50 karakter olabilir'),
  paymentMethod: z.enum(['credit-card', 'bank-transfer'])
});

// Product review schema
export const reviewSchema = z.object({
  rating: z.number()
    .min(1, 'En az 1 yıldız vermelisiniz')
    .max(5, 'En fazla 5 yıldız verebilirsiniz'),
  comment: z.string()
    .min(10, 'Yorum en az 10 karakter olmalıdır')
    .max(500, 'Yorum en fazla 500 karakter olabilir')
});

// Newsletter signup schema
export const newsletterSchema = z.object({
  email: z.string()
    .email('Geçerli bir e-posta adresi giriniz')
});

// Search schema
export const searchSchema = z.object({
  query: z.string()
    .min(1, 'Arama terimi gereklidir')
    .max(100, 'Arama terimi en fazla 100 karakter olabilir')
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type SearchFormData = z.infer<typeof searchSchema>; 