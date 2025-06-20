import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { Product } from '@/types/product';

const productsRef = db.collection('products');

function corsHeaders(origin?: string | null) {
  const allowedOrigins = [
    'http://localhost:8081',
    'http://localhost:5173',
    'https://your-frontend.vercel.app',
  ];
  const allowed = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    if (!query) return NextResponse.json({ products: [] }, { headers: corsHeaders(origin) });
    const snapshot = await productsRef.get();
    const products: Product[] = [];
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const searchFields = [
        data.title?.toLowerCase(),
        data.description?.toLowerCase(),
        data.brand?.toLowerCase(),
        data.category?.toLowerCase(),
      ].filter(Boolean);
      const searchTerm = query.toLowerCase();
      const matches = searchFields.some(field => field.includes(searchTerm));
      if (matches) {
        products.push({ ...data, id: doc.id } as Product);
      }
    });
    return NextResponse.json({ products }, { headers: corsHeaders(origin) });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to search products';
    return NextResponse.json({ message: errorMessage }, { status: 500, headers: corsHeaders(origin) });
  }
} 