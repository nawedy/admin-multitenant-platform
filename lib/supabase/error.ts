export class SupabaseError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'SupabaseError';
  }
}

export function handleSupabaseError(error: unknown): never {
  console.error('Supabase operation failed:', error);
  throw new SupabaseError(
    'Failed to perform database operation',
    error
  );
}