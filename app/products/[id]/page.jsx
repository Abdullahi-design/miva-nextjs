import ProductInfo from "@components/ProductInfo";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.URL}/api/product`);
    if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
      throw new Error(`Failed to fetch products. Invalid response: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
  
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received');
    }

    return data.map((product) => ({
      id: product._id.toString(),
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${process.env.URL}/api/product/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getProduct:', error);
    return null; // Return a default value or handle the error accordingly
  }
}

export default async function Page({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    // Handle the case when the product is not available
    return <div>Product not found</div>;
  }

  return (
    <ProductInfo 
      key={product._id}
      product={product}
    />
  );
}