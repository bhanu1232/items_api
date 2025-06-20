import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

const productsRef = db.collection('products');

function corsHeaders(origin?: string | null) {
  const allowedOrigins = [
    'https://shop-smart-and-chic.vercel.app',
    'http://localhost:8081',
    'http://localhost:5173',
    'https://shop-smart-and-chic.vercel.app',
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

function getIdFromRequest(req: NextRequest) {
  return req.nextUrl.pathname.split('/').pop()!;
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const id = getIdFromRequest(req);
  try {
    const doc = await productsRef.doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404, headers: corsHeaders(origin) });
    }
    return NextResponse.json({ ...doc.data(), id: doc.id }, { headers: corsHeaders(origin) });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
    return NextResponse.json({ message: errorMessage }, { status: 500, headers: corsHeaders(origin) });
  }
}

export async function PUT(req: NextRequest) {
  const origin = req.headers.get('origin');
  const id = getIdFromRequest(req);
  try {
    const data = await req.json();
    delete data.id;
    await productsRef.doc(id).update({
      ...data,
      meta: {
        ...data.meta,
        updatedAt: new Date().toISOString(),
      },
    });
    const updatedDoc = await productsRef.doc(id).get();
    return NextResponse.json({ ...updatedDoc.data(), id: updatedDoc.id }, { headers: corsHeaders(origin) });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update product';
    return NextResponse.json({ message: errorMessage }, { status: 500, headers: corsHeaders(origin) });
  }
}

export async function DELETE(req: NextRequest) {
  const origin = req.headers.get('origin');
  const id = getIdFromRequest(req);
  try {
    const doc = await productsRef.doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404, headers: corsHeaders(origin) });
    }
    await productsRef.doc(id).delete();
    return NextResponse.json({ message: 'Product deleted successfully' }, { headers: corsHeaders(origin) });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete product';
    return NextResponse.json({ message: errorMessage }, { status: 500, headers: corsHeaders(origin) });
  }
} 