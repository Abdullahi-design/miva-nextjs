// import Product from "@models/product";
import AffiliateUser from "@models/userAffiliateProduct";
import { connectToDB } from "@utils/database";
import generateAffiliateLink from "@utils/generateAffiliateLink";

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