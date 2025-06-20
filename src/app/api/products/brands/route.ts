import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

// Helper to get products collection
const productsRef = db.collection('products');

// GET /api/products/brands
export async function GET() {
  try {
    const snapshot = await productsRef.get();
    const brands = new Set<string>();
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.brand) {
        brands.add(data.brand);
      }
    });

    return NextResponse.json(Array.from(brands));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch brands';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 