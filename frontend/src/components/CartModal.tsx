'use client';

import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div
        className="w-full sm:w-[500px] max-w-full bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Sepetim</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 p-1">
            <X className="h-6 w-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛒</span>
            </div>
            <p className="text-gray-500 text-lg mb-2">Sepetiniz boş</p>
            <p className="text-gray-400 text-sm">Alışverişe başlamak için ürünlerimizi keşfedin</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <ul className="space-y-4">
                {cart.map(item => (
                  <li key={item.product._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.product.image || '/placeholder-product.jpg'} 
                      alt={item.product.name} 
                      className="w-16 h-16 object-cover rounded-lg bg-white border"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{item.product.name}</h4>
                      <p className="text-sm text-gray-500 truncate">{item.product.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">₺{(item.product.price * item.quantity).toFixed(2)}</p>
                          <p className="text-xs text-gray-500">₺{item.product.price.toFixed(2)} adet</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-6 mt-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Ara Toplam:</span>
                  <span>₺{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Kargo:</span>
                  <span className="text-green-600">Ücretsiz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>KDV (%18):</span>
                  <span>₺{(getCartTotal() * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Toplam:</span>
                  <span className="text-blue-600">₺{(getCartTotal() * 1.18).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Siparişi Tamamla
                </button>
                <button 
                  onClick={onClose}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 