import ProductCard from "@components/ProductCard";
import ProductInfo from "@components/ProductInfo";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.URL}/api/product`);
    const data = await res.json();
  
    return data.map((product) => ({
      id: product._id.toString(),
    }))
  } catch (error) {
    console.log(error);
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${process.env.URL}/api/product/${id}`);
    const data = await response.json();
  
    // console.log(data, 'data')
    return data
  } catch (error) {
    console.log("get product error:", error);
  }
 
}

export default async function Page({ params }) {
  const product = await getProduct(params.id)
  // console.log(product, 'p');
  return (
    <ProductInfo 
      key={product._id}
      product={product}
    />
  )
}