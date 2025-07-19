'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [toast, setToast] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      setToast('Favorilerden kaldırıldı');
    } else {
      addToWishlist(product);
      setToast('Favorilere eklendi');
    }
    
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <Link href={`/products/${product._id}`} className="block">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 h-full">
        {/* Product Image */}
        <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span>Resim Yok</span>
            </div>
          )}
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full shadow transition-colors ${
              isInWishlist(product._id)
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className="h-4 w-4" fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-base md:text-lg">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating!)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-1">
                ({product.rating})
              </span>
            </div>
          )}

          {/* Price and Stock */}
          <div className="flex items-center justify-between mb-3 mt-2">
            <span className="text-xl font-bold text-blue-600">
              ₺{product.price.toFixed(2)}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {product.stock > 0 ? `${product.stock} adet` : 'Stokta yok'}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-semibold text-base transition-colors duration-200 shadow-sm mt-auto
              ${product.stock > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            <ShoppingCart className="h-5 w-5" />
            {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          {toast}
        </div>
      )}
    </Link>
  );
} 