import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { Product } from '@/types/product';

// Helper to get products collection
const productsRef = db.collection('products');

// GET /api/products/search?q=search_term
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json({ products: [] });
    }

    // Search in title, description, brand, and category
    // Note: Firestore doesn't support full-text search, so we'll do basic string matching
    const snapshot = await productsRef.get();
    const products: Product[] = [];
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const searchFields = [
        data.title?.toLowerCase(),
        data.description?.toLowerCase(),
        data.brand?.toLowerCase(),
        data.category?.toLowerCase()
      ].filter(Boolean);
      
      const searchTerm = query.toLowerCase();
      const matches = searchFields.some(field => 
        field.includes(searchTerm)
      );
      
      if (matches) {
        products.push({ ...data, id: doc.id } as Product);
      }
    });

    return NextResponse.json({ products });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to search products';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 