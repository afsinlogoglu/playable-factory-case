'use client';

import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import ProductCard from '../../components/ProductCard';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Favori Listeniz Boş</h2>
          <p className="text-gray-600 mb-6">Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca bulabilirsiniz</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorilerim</h1>
          <p className="text-gray-600">{wishlist.length} ürün favorilerinizde</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => clearWishlist()}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition"
            >
              <Trash2 className="h-5 w-5" />
              <span>Favorileri Temizle</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="relative">
              <ProductCard product={product} onAddToCart={handleAddToCart} />
              <button
                onClick={() => handleRemoveFromWishlist(product._id)}
                className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition z-10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                wishlist.forEach(product => addToCart(product));
              }}
              className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Tümünü Sepete Ekle</span>
            </button>
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="font-medium">Alışverişe Devam Et</span>
            </Link>
            <button
              onClick={() => clearWishlist()}
              className="flex items-center justify-center space-x-2 p-4 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              <Trash2 className="h-5 w-5" />
              <span className="font-medium">Favorileri Temizle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 