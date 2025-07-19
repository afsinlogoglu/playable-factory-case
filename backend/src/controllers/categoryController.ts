import { Request, Response } from 'express';
import Category from '../models/Category';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, image, sortOrder } = req.body;
    const existing = await Category.findOne({ name });
    if (existing) {
      res.status(400).json({ message: 'Bu isimde bir kategori zaten var.' });
      return;
    }
    const category = new Category({ name, description, image, sortOrder });
    await category.save();
    res.status(201).json(category);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ sortOrder: 1, name: 1 });
    res.json(categories);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Kategori bulunamadı.' });
      return;
    }
    res.json(category);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, image, isActive, sortOrder } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, image, isActive, sortOrder },
      { new: true }
    );
    if (!category) {
      res.status(404).json({ message: 'Kategori bulunamadı.' });
      return;
    }
    res.json(category);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Kategori bulunamadı.' });
      return;
    }
    res.json({ message: 'Kategori silindi.' });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
}; 