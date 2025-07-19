import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, stock, specifications, tags, isFeatured, variants } = req.body;
    const images = req.files ? (req.files as Express.Multer.File[]).map(f => f.filename) : [];
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      res.status(400).json({ message: 'Kategori bulunamadı.' });
      return;
    }
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
      specifications,
      tags,
      isFeatured,
      variants,
    });
    await product.save();
    res.status(201).json(product);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, sort, page = 1, limit = 12 } = req.query;
    const filter: any = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };
    let query = Product.find(filter).populate('category');
    // Sıralama
    if (sort === 'price_asc') query = query.sort({ price: 1 });
    else if (sort === 'price_desc') query = query.sort({ price: -1 });
    else if (sort === 'newest') query = query.sort({ createdAt: -1 });
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    query = query.skip(skip).limit(Number(limit));
    const products = await query;
    const total = await Product.countDocuments(filter);
    res.json({ products, total });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      res.status(404).json({ message: 'Ürün bulunamadı.' });
      return;
    }
    res.json(product);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, stock, specifications, tags, isFeatured, variants } = req.body;
    const images = req.files ? (req.files as Express.Multer.File[]).map(f => f.filename) : undefined;
    const updateData: any = { name, description, price, category, stock, specifications, tags, isFeatured, variants };
    if (images && images.length > 0) updateData.images = images;
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) {
      res.status(404).json({ message: 'Ürün bulunamadı.' });
      return;
    }
    res.json(product);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Ürün bulunamadı.' });
      return;
    }
    res.json({ message: 'Ürün silindi.' });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
}; 