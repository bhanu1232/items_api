import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { Product } from '@/types/product';

const productsRef = db.collection('products');

function corsHeaders(origin?: string | null) {
  const allowedOrigins = [
    'https://shop-smart-and-chic.vercel.app',
    'http://localhost:8081',
    'https://chic-shop-seller-hub.vercel.app'
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
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const skip = parseInt(searchParams.get('skip') || '0', 10);

  const snapshot = await productsRef.offset(skip).limit(limit).get();
  const products: Product[] = snapshot.docs.map(doc => ({ ...(doc.data() as Omit<Product, 'id'>), id: doc.id }));
  return NextResponse.json({ products }, { headers: corsHeaders(origin) });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const data = await req.json();
    delete data.id;
    const docRef = await productsRef.add(data);
    const newDoc = await docRef.get();
    return NextResponse.json({ id: docRef.id, ...newDoc.data() }, { status: 201, headers: corsHeaders(origin) });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create product';
    return NextResponse.json({ message: errorMessage }, { status: 500, headers: corsHeaders(origin) });
  }
} 