import Product from "@models/product";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        // Update the query to filter products with commission greater than 0
        const products = await Product.find({ commission: { $gt: 0 } }).populate('creator');

        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch products with commission greater than 0", { status: 500 });
    }
};
