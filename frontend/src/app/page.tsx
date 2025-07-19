'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Star, ArrowRight, Mail, Check } from 'lucide-react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import CartModal from '../components/CartModal';
import { Product, Category } from '../types';
import { useCart } from '../contexts/CartContext';
import { usePopularProducts, useRecentlyViewed } from '../hooks/useRecommendations';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { popularProducts, loading: popularLoading } = usePopularProducts();
  const { recentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setToast(`${product.name} sepete eklendi!`);
    setTimeout(() => setToast(null), 2000);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // Ürünler bölümüne scroll yap
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      const data = await response.json();
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || 
      (typeof product.category === 'object' && 'name' in product.category && product.category.name === selectedCategory) ||
      (typeof product.category === 'string' && product.category === selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchTerm} onCartOpen={() => setCartOpen(true)} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Modern Alışveriş Deneyimi
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              En kaliteli ürünleri uygun fiyatlarla keşfedin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center">
                Alışverişe Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                Kategorileri Keşfet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popüler Ürünler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En çok tercih edilen ve yüksek puanlı ürünlerimizi keşfedin
            </p>
          </div>
          
          {popularLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-4 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularProducts.map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Son Görüntülenenler</h2>
              <p className="text-gray-600">Daha önce incelediğiniz ürünler</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategoriler</h2>
            <p className="text-gray-600">İhtiyacınız olan her şey kategorilerimizde</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <div 
                key={category._id} 
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Yeni Gelenler</h2>
            <p className="text-gray-600">En yeni ürünlerimizi keşfedin</p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Bültenimize Katılın</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              En yeni ürünler ve özel fırsatlardan haberdar olmak için e-posta listemize katılın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Katıl
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section id="products-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-64 mb-6 lg:mb-0">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory ? `${selectedCategory} Ürünleri` : 'Tüm Ürünler'}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {total} ürün bulundu
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-xl p-4 animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              )}

              {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Ürün bulunamadı</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
