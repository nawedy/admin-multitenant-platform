'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { listProducts } from '@/lib/supabase/products';
import { ProductCard } from './product-card';
import type { Product } from '@/lib/supabase/types';

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await listProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onUpdate={loadProducts} />
      ))}
    </div>
  );
}