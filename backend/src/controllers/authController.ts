import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import emailService from '../services/emailService';

// Generate JWT Token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d'
  });
};

// Register User
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor' });
      return;
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone
    });

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    try {
      await emailService.sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with registration even if email fails
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu. E-posta doğrulama linki gönderildi.',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Kayıt işlemi başarısız' });
  }
};

// Login User
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
      return;
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      message: 'Giriş başarılı',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Giriş işlemi başarısız' });
  }
};

// Verify Email
export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      res.status(400).json({ message: 'Geçersiz veya süresi dolmuş doğrulama linki' });
      return;
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({ message: 'E-posta adresi başarıyla doğrulandı' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'E-posta doğrulama işlemi başarısız' });
  }
};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı' });
      return;
    }

    // Generate password reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Send password reset email
    try {
      await emailService.sendPasswordResetEmail(email, resetToken);
      res.json({ message: 'Şifre sıfırlama linki e-posta adresinize gönderildi' });
    } catch (emailError) {
      console.error('Password reset email sending failed:', emailError);
      res.status(500).json({ message: 'E-posta gönderilemedi' });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Şifre sıfırlama işlemi başarısız' });
  }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      res.status(400).json({ message: 'Geçersiz veya süresi dolmuş şifre sıfırlama linki' });
      return;
    }

    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ message: 'Şifre başarıyla güncellendi' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Şifre sıfırlama işlemi başarısız' });
  }
};

// Get Current User
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById((req as any).user._id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Kullanıcı bilgileri alınamadı' });
  }
};

// Update User Profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone } = req.body;
    const userId = (req as any).user._id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      return;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.json({
      message: 'Profil başarıyla güncellendi',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Profil güncelleme işlemi başarısız' });
  }
};

// Add Address
export const addAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    const addressData = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      return;
    }

    // If this is the first address, make it default
    if (user.addresses.length === 0) {
      addressData.isDefault = true;
    }

    // If this address is set as default, unset others
    if (addressData.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push(addressData);
    await user.save();

    res.json({
      message: 'Adres başarıyla eklendi',
      addresses: user.addresses
    });
  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({ message: 'Adres ekleme işlemi başarısız' });
  }
};

// Get User Addresses
export const getAddresses = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      return;
    }

    res.json({ addresses: user.addresses });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({ message: 'Adresler alınamadı' });
  }
}; 