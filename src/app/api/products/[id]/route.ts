import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

// Helper to get products collection
const productsRef = db.collection('products');

// GET /api/products/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doc = await productsRef.doc(params.id).get();
    if (!doc.exists) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ ...doc.data(), id: doc.id });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    delete data.id; // Remove id from update data
    
    await productsRef.doc(params.id).update({
      ...data,
      meta: {
        ...data.meta,
        updatedAt: new Date().toISOString()
      }
    });
    
    const updatedDoc = await productsRef.doc(params.id).get();
    return NextResponse.json({ ...updatedDoc.data(), id: updatedDoc.id });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update product';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doc = await productsRef.doc(params.id).get();
    if (!doc.exists) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    
    await productsRef.doc(params.id).delete();
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete product';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 