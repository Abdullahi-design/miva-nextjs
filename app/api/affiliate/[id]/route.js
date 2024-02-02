import Product from "@models/product";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        
        const product = await Product.findById(params.id)
        // if (!product) return new Response("Products Not Found", { status: 404 });
        if (!product) {
            return new Response(JSON.stringify({ error: "Product not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
        }

        return new Response(JSON.stringify(product), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { 
        commission 
    } = await request.json();

    try {
        await connectToDB();

        // Find the existing product by ID
        const existingProduct = await Product.findById(params.id);

        if (!existingProduct) {
            return new Response("Product not found", { status: 404 });
        }

        // Update the product affiliate commission with new data
        existingProduct.commission = commission;

        await existingProduct.save();

        return new Response("Successfully updated the Products", { status: 200 });
    } catch (error) {
        console.error("Error Updating Product:", error);
        return new Response("Error Updating Product", { status: 500 });
    }
};