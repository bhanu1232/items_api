# Next.js Products API Server (Root App Directory)

A clean, modern Next.js API server for managing products with Firebase Firestore as the database. Uses the latest root-level `app` directory structure (no `src`). Ready for Vercel deployment.

## Features

- **Product Management**: CRUD operations for products
- **Search**: Search products by title, description, brand, or category
- **Categories & Brands**: Fetch unique categories and brands
- **Firebase Integration**: Uses Firebase Firestore for data storage
- **TypeScript**: Full TypeScript support
- **CORS**: Handles cross-origin requests for local and production
- **Vercel Ready**: Minimal config for easy deployment

## Project Structure

```
/app
  /api
    /products
      route.ts
      /brands/route.ts
      /categories/route.ts
      /search/route.ts
      /[id]/route.ts
  page.tsx
  layout.tsx
/lib/firebaseAdmin.ts
/types/product.ts
/public
package.json
tsconfig.json
vercel.json
```

## API Endpoints

### Products

- `GET /api/products` - Get all products (with pagination: `?limit=10&skip=0`)
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product by ID
- `DELETE /api/products/[id]` - Delete product by ID

### Search

- `GET /api/products/search?q=search_term` - Search products

### Categories & Brands

- `GET /api/products/categories` - Get all unique categories
- `GET /api/products/brands` - Get all unique brands

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project or use `products-4d6a3`
3. Enable Firestore Database
4. Go to Project Settings > Service Accounts
5. Generate a new private key and download the JSON

### 2. Environment Variables

1. In Vercel: Project > Settings > Environment Variables
2. Add:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
3. Or locally, create a `.env.local` file with:

```
FIREBASE_PROJECT_ID=products-4d6a3
FIREBASE_CLIENT_EMAIL=your_service_account_email@products-4d6a3.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 3. Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The API will be available at `http://localhost:3000/api/`

### 4. Deploy to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

## CORS

- The API allows requests from local dev and your deployed frontend (edit `allowedOrigins` in `app/api/products/route.ts` as needed).

## Product Interface

```typescript
interface Product {
  id: string | number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews?: {
    rating: number;
    comment: string;
    reviewerName: string;
    date: string;
  }[];
  meta?: {
    createdAt: string;
    updatedAt: string;
    title?: string;
    description?: string;
    keywords?: string;
  };
  availabilityStatus?: string;
  dimensions?: string;
  weight?: number;
  sku?: string;
  warrantyInformation?: string;
  returnPolicy?: string;
  shippingInformation?: string;
  minimumOrderQuantity?: number;
}
```

## Example Usage

### Create a Product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "iPhone 15",
    "description": "Latest iPhone model",
    "price": 999,
    "discountPercentage": 0,
    "rating": 4.5,
    "stock": 50,
    "brand": "Apple",
    "category": "Smartphones",
    "thumbnail": "https://example.com/iphone15.jpg",
    "images": ["https://example.com/iphone15-1.jpg"]
  }'
```

### Get Products

```bash
curl http://localhost:3000/api/products?limit=5&skip=0
```

### Search Products

```bash
curl "http://localhost:3000/api/products/search?q=iPhone"
```

## Notes

- The search functionality uses basic string matching since Firestore doesn't support full-text search
- For production use, consider implementing Algolia or Elasticsearch for better search capabilities
- All timestamps are automatically managed in the `meta` field
- The API returns pdsvdsbovlvper HTTP status codes and error messages

## License

MIT
#   i t e m s _ a p i 
 
 
