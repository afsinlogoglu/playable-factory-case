'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, Heart, ShoppingCart, ArrowLeft, Share2, Truck, Shield, RotateCcw, MessageCircle, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { Product, Review } from '../../../types';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useRecommendations, useRecentlyViewed } from '../../../hooks/useRecommendations';
import { useWishlist } from '../../../contexts/WishlistContext';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    title: '',
    comment: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        addToRecentlyViewed(data);
        fetchRelatedProducts(data.category);
      }
    } catch (error) {
      console.error('Ürün yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/reviews/product/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Yorumlar yüklenirken hata:', error);
    }
  };

  const fetchRelatedProducts = async (category: string) => {
    try {
      const response = await fetch(`http://localhost:5001/api/products?category=${category}&limit=4`);
      if (response.ok) {
        const data = await response.json();
        setRelatedProducts(data.products.filter((p: Product) => p._id !== productId));
      }
    } catch (error) {
      console.error('İlgili ürünler yüklenirken hata:', error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setToast(`${product.name} sepete eklendi!`);
      setTimeout(() => setToast(null), 2000);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      if (isInWishlist(product._id)) {
        removeFromWishlist(product._id);
        setToast('Favorilerden kaldırıldı');
      } else {
        addToWishlist(product);
        setToast('Favorilere eklendi');
      }
      setTimeout(() => setToast(null), 2000);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      setToast('Yorum yapmak için giriş yapmalısınız');
      setTimeout(() => setToast(null), 2000);
      return;
    }

    if (reviewForm.rating === 0) {
      setToast('Lütfen bir puan verin');
      setTimeout(() => setToast(null), 2000);
      return;
    }

    if (!reviewForm.title.trim() || !reviewForm.comment.trim()) {
      setToast('Lütfen başlık ve yorum alanlarını doldurun');
      setTimeout(() => setToast(null), 2000);
      return;
    }

    setSubmittingReview(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product: productId,
          rating: reviewForm.rating,
          title: reviewForm.title,
          comment: reviewForm.comment
        })
      });

      if (response.ok) {
        setToast('Yorumunuz başarıyla eklendi!');
        setReviewForm({ rating: 0, title: '', comment: '' });
        setShowReviewForm(false);
        fetchReviews(); // Yorumları yenile
        fetchProduct(); // Ürün bilgilerini yenile (rating güncellemesi için)
      } else {
        const error = await response.json();
        setToast(error.message || 'Yorum eklenirken hata oluştu');
      }
    } catch (error) {
      setToast('Yorum eklenirken hata oluştu');
    } finally {
      setSubmittingReview(false);
      setTimeout(() => setToast(null), 2000);
    }
  };

  const handleHelpful = async (reviewId: string) => {
    // Bu fonksiyon şimdilik sadece UI'da gösterilecek
    setToast('Bu özellik yakında eklenecek');
    setTimeout(() => setToast(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-500">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const images = product.image ? [product.image] : ['/placeholder-product.jpg'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-700">Ürünler</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.rating || 0})
                  </span>
                </div>
                <button 
                  onClick={handleToggleWishlist}
                  className={`p-2 rounded-full transition-colors ${
                    isInWishlist(product._id)
                      ? 'bg-red-500 text-white'
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className="h-6 w-6" fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                ₺{product.price.toFixed(2)}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {product.stock > 0 ? `${product.stock} adet stokta` : 'Stokta yok'}
                </span>
                {product.sku && (
                  <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Adet:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  product.stock > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="inline h-5 w-5 mr-2" />
                {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Ücretsiz kargo</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Güvenli ödeme</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">14 gün iade garantisi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2" />
              Müşteri Yorumları ({reviews.length})
            </h2>
            {user && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Yorum Yap
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Yorumunuzu Yazın</h3>
              <div className="space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Puanınız</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className={`p-1 ${
                          star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <Star className="h-6 w-6" fill={star <= reviewForm.rating ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Yorumunuz için kısa bir başlık"
                    maxLength={100}
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Yorum</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Ürün hakkında düşüncelerinizi paylaşın"
                    maxLength={1000}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmitReview}
                    disabled={submittingReview}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {submittingReview ? 'Gönderiliyor...' : 'Yorumu Gönder'}
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.title}</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleHelpful(review._id)}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>Faydalı ({review.helpful || 0})</span>
                    </button>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">İlgili Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/products/${relatedProduct._id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={relatedProduct.image || '/placeholder-product.jpg'}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-blue-600">
                      ₺{relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
} 