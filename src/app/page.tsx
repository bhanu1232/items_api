export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Products API Server</h1>
      <p>This is a Next.js API server for managing products with Firebase Firestore.</p>

      <h2>Available Endpoints:</h2>
      <ul>
        <li><strong>GET /api/products</strong> - Get all products (with pagination)</li>
        <li><strong>POST /api/products</strong> - Create a new product</li>
        <li><strong>GET /api/products/[id]</strong> - Get product by ID</li>
        <li><strong>PUT /api/products/[id]</strong> - Update product by ID</li>
        <li><strong>DELETE /api/products/[id]</strong> - Delete product by ID</li>
        <li><strong>GET /api/products/search?q=term</strong> - Search products</li>
        <li><strong>GET /api/products/categories</strong> - Get all categories</li>
        <li><strong>GET /api/products/brands</strong> - Get all brands</li>
      </ul>

      <p>Check the README.md file for detailed setup instructions and examples.</p>
    </div>
  );
}
