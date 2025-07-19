import { useState, useEffect } from 'react';
import { Product } from '../types';

export function useRecommendations(category?: string, productId?: string) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category || productId) {
      fetchRecommendations();
    }
  }, [category, productId]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:5001/api/products?limit=4';
      
      if (category) {
        url += `&category=${category}`;
      }
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // Filter out current product if productId is provided
        const filteredProducts = productId 
          ? data.products.filter((p: Product) => p._id !== productId)
          : data.products;
        setRecommendations(filteredProducts.slice(0, 4));
      }
    } catch (error) {
      console.error('Recommendations fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { recommendations, loading };
}

export function usePopularProducts() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  const fetchPopularProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/products?sort=rating&limit=6');
      if (response.ok) {
        const data = await response.json();
        setPopularProducts(data.products);
      }
    } catch (error) {
      console.error('Popular products fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { popularProducts, loading };
}

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p._id !== product._id);
      const updated = [product, ...filtered].slice(0, 4);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      return updated;
    });
  };

  return { recentlyViewed, addToRecentlyViewed };
} 