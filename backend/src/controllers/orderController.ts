import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { items, shippingAddress, totalPrice } = req.body;
    const user = req.body.user || req.user?._id; // Auth middleware ile entegre edilecek
    if (!items || !shippingAddress || !totalPrice) {
      res.status(400).json({ message: 'Eksik sipariş bilgisi.' });
      return;
    }
    // Stok kontrolü ve azaltma
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        res.status(400).json({ message: `Stok yetersiz: ${item.name}` });
        return;
      }
      product.stock -= item.quantity;
      await product.save();
    }
    const order = new Order({ user, items, shippingAddress, totalPrice });
    await order.save();
    res.status(201).json(order);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;
    const filter: any = {};
    if (userId) filter.user = userId;
    const orders = await Order.find(filter).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(orders);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const getOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email');
    if (!order) {
      res.status(404).json({ message: 'Sipariş bulunamadı.' });
      return;
    }
    res.json(order);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      res.status(404).json({ message: 'Sipariş bulunamadı.' });
      return;
    }
    res.json(order);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
};

export const deleteOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Sipariş bulunamadı.' });
      return;
    }
    res.json({ message: 'Sipariş silindi.' });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
    return;
  }
}; 