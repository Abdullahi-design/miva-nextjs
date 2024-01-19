import Product from "@models/product";
import { connectToDB } from "@utils/database";

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
        return new Response("Error Updating Product", { status: 500 });
    }
};