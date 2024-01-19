
import AffiliateUser from "@models/userAffiliateProduct";
import { connectToDB } from "@utils/database";
import generateAffiliateLink from "@utils/generateAffiliateLink";
import mongoose from 'mongoose';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const isValidObjectId = mongoose.Types.ObjectId.isValid(params.id);
        if (!isValidObjectId) {
            return new Response("Invalid Object ID", { status: 400 });
        }

        const product = await AffiliateUser.findOne({ userId: params.id })
        if (!product) return new Response("Products Not Found", { status: 404 });

        return new Response(JSON.stringify(product), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const POST = async (request, { params }) => {
    const { userId, commission } = await request.json();

    try {
        await connectToDB();

         // Generate affiliate link
         const productId = params.id;
         const affiliateLink = generateAffiliateLink(userId, productId);

         // Find the existing affiliate product by user ID and product ID
        let affiliateProductLink = await AffiliateUser.findOne({ userId, productId });

        if (!affiliateProductLink) {
            // If the affiliate product link does not exist, create a new one
            affiliateProductLink = new AffiliateUser({
                userId,
                commission,
                productId,
                affiliateLinks: [affiliateLink],
            });
        } else {
            // If the affiliate product link already exists, update the commission and add the new affiliate link
            affiliateProductLink.commission = commission;
            affiliateProductLink.affiliateLinks.push(affiliateLink);
        }

        await affiliateProductLink.save();

        return new Response("Successfully updated the Products", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Product", { status: 500 });
    }
};