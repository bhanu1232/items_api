import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

const productsRef = db.collection('products');

function corsHeaders(origin?: string | null) {
  const allowedOrigins = [
    'https://shop-smart-and-chic.vercel.app',
    'http://localhost:8081',
    'http://localhost:5173'
  ];
  return {
    'Access-Control-Allow-Origin': origin && allowedOrigins.includes(origin) ? origin : '',
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
    const snapshot = await productsRef.get();
    const categories = new Set();
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.category) categories.add(data.category);
    });
    return NextResponse.json(Array.from(categories), { headers: corsHeaders(origin) });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
    return NextResponse.json({ message: errorMessage }, { status: 500, headers: corsHeaders(origin) });
  }
} 