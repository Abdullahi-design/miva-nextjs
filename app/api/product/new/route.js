import { connectToDB } from "@utils/database";
import Product from "@models/product";

export const POST = async (request) => {
    const { 
        userId, 
        productName, 
        description,  
        metaData, 
        price, 
        coverImage, 
        thumbnail, 
        category, 
        cta,
        commission
    } = await request.json();

    try {
        await connectToDB();
        const newProduct = new Product({ 
            creator: userId, 
            productName, 
            description,  
            metaData, 
            price, 
            coverImage, 
            thumbnail, 
            category, 
            cta,
            commission
        });

        await newProduct.save();
        return new Response(JSON.stringify(newProduct), { status: 200 })
    } catch (error) {
        console.error("Error creating a new product:", error);

        // Check for validation errors
        if (error.name === 'ValidationError') {
            return new Response(`Validation error: ${error.message}`, { status: 400 });
        }

        // Return a generic error response
        return new Response("Failed to create a new product", { status: 500 });
    
    }
}