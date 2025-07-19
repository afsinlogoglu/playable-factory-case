'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Mail className="h-12 w-12 mx-auto mb-4 text-blue-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Özel Fırsatları Kaçırmayın!
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Yeni ürünler, özel indirimler ve kampanyalardan haberdar olmak için bültenimize abone olun.
          </p>
        </div>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Abone Ol'
                )}
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-3">
              Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-green-500 text-white p-4 rounded-lg flex items-center justify-center space-x-2">
              <Check className="h-5 w-5" />
              <span>Başarıyla abone oldunuz!</span>
            </div>
            <p className="text-sm text-blue-200 mt-3">
              Teşekkürler! Artık özel fırsatlardan haberdar olacaksınız.
            </p>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🎁</span>
            </div>
            <h3 className="font-semibold mb-2">Özel İndirimler</h3>
            <p className="text-blue-200 text-sm">Sadece abonelerimize özel fırsatlar</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🚀</span>
            </div>
            <h3 className="font-semibold mb-2">Yeni Ürünler</h3>
            <p className="text-blue-200 text-sm">En yeni ürünlerden ilk siz haberdar olun</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">💎</span>
            </div>
            <h3 className="font-semibold mb-2">VIP Avantajlar</h3>
            <p className="text-blue-200 text-sm">Öncelikli erişim ve özel hizmetler</p>
          </div>
        </div>
      </div>
    </section>
  );
} 