import { Request, Response } from 'express';
import Review from '../models/Review';
import Product from '../models/Product';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

export const addReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { product, rating, comment } = req.body;
    const user = req.body.user || req.user?._id; // Auth middleware ile entegre edilecek
    if (!product || !rating) {
      res.status(400).json({ message: 'Ürün ve puan zorunlu.' });
      return;
    }
    const review = new Review({ user, product, rating, comment });
    await review.save();
    // Ürün ortalama puan ve yorum sayısı güncelle
    const reviews = await Review.find({ product, isApproved: true });
    const averageRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) : rating;
    await Product.findByIdAndUpdate(product, {
      averageRating,
      reviewCount: reviews.length,
    });
    res.status(201).json(review);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const getProductReviews = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId, isApproved: true }).populate('user', 'firstName lastName');
    res.json(reviews);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const approveReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!review) {
      res.status(404).json({ message: 'Yorum bulunamadı.' });
      return;
    }
    // Ürün ortalama puan ve yorum sayısı güncelle
    const reviews = await Review.find({ product: review.product, isApproved: true });
    const averageRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) : 0;
    await Product.findByIdAndUpdate(review.product, {
      averageRating,
      reviewCount: reviews.length,
    });
    res.json(review);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const deleteReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      res.status(404).json({ message: 'Yorum bulunamadı.' });
      return;
    }
    // Ürün ortalama puan ve yorum sayısı güncelle
    const reviews = await Review.find({ product: review.product, isApproved: true });
    const averageRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) : 0;
    await Product.findByIdAndUpdate(review.product, {
      averageRating,
      reviewCount: reviews.length,
    });
    res.json({ message: 'Yorum silindi.' });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
}; 