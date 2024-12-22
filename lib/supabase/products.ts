import { supabase } from './client';
import { handleSupabaseError } from './error';
import type { Database } from './types/database';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

export async function listProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
}

export async function createProduct(data: Omit<ProductInsert, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .insert({
        ...data,
        active: true,
      })
      .select()
      .single();

    if (error) throw error;
    return product;
  } catch (error) {
    handleSupabaseError(error);
  }
}

export async function updateProduct(id: string, data: ProductUpdate) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return product;
  } catch (error) {
    handleSupabaseError(error);
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error);
  }
}