import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

// Helper to get products collection
const productsRef = db.collection('products');

// GET /api/products/categories
export async function GET() {
  try {
    const snapshot = await productsRef.get();
    const categories = new Set<string>();
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.category) {
        categories.add(data.category);
      }
    });

    return NextResponse.json(Array.from(categories));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 