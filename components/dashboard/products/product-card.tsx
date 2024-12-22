'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteProduct, updateProduct } from '@/lib/supabase/products';
import { Package, Pencil, Trash2 } from 'lucide-react';
import type { Product } from '@/lib/supabase/types';

interface ProductCardProps {
  product: Product;
  onUpdate: () => void;
}

export function ProductCard({ product, onUpdate }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleToggleActive = async () => {
    setLoading(true);
    try {
      await updateProduct(product.id, { active: !product.active });
      toast({ title: 'Product updated' });
      onUpdate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setLoading(true);
    try {
      await deleteProduct(product.id);
      toast({ title: 'Product deleted' });
      onUpdate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-12 w-12 rounded object-cover"
            />
          ) : (
            <Package className="h-12 w-12" />
          )}
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
        {product.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant={product.active ? 'outline' : 'secondary'}
          size="sm"
          onClick={handleToggleActive}
          disabled={loading}
        >
          {product.active ? 'Active' : 'Inactive'}
        </Button>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDelete}
            disabled={loading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled={loading}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}