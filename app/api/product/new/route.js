import { connectToDB } from "@utils/database";
import Product from "@models/product";

export const POST = async (request) => {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    const { 
        userId, 
        productName, 
        description,  
        metaData, 
        price, 
        coverImage, 
        thumbnail,
        digitalProduct, 
        category, 
        cta,
        commission
    } = await request.json();

    try {
        await connectToDB();

        // Create the product in the local database
        const newProduct = new Product({ 
            creator: userId,
            productName, 
            description,  
            metaData, 
            price, 
            coverImage, 
            thumbnail,
            digitalProduct, 
            category, 
            cta,
            commission,
            paystackProductId: '',
            paystackProductUrl: '',
        });

        const savedProduct = await newProduct.save();

        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/page',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${secretKey}`,
                'Content-Type': 'application/json'
            }
        };

        const paystackData = {
            name: productName,
            description,
            redirect_url: `http://localhost:3000/thankYou?productId=${savedProduct._id}`,
            amount: price * 100, // Convert to kobo (NGN 100 = 10000 kobo)
        };

        const paystackResponse = await fetch(`https://${options.hostname}${options.path}`, {
            ...options,
            body: JSON.stringify(paystackData),
        });

        const paystackResult = await paystackResponse.json();

        if (paystackResult.status === true) {
            // Update the paystackProductUrl with the Paystack product slug
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: savedProduct._id },
                { 
                    paystackProductId: paystackResult.data.id,
                    paystackProductUrl: `https://paystack.com/pay/${paystackResult.data.slug}`
                },
                { new: true }
            );

            return new Response(JSON.stringify(updatedProduct), { status: 200 });
        } else {
            console.error(paystackResult.message);
            return new Response(JSON.stringify({ error: paystackResult.message }), { status: 500 });
        }

    } catch (error) {
        console.error("Error creating a new product:", error);

        // Check for validation errors
        if (error.name === 'ValidationError') {
            return new Response(`Validation error: ${error.message}`, { status: 400 });
        }

        // Return a generic error response
        return new Response("Failed to create a new product", { status: 500 });
    }
};
