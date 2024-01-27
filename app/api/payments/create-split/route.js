import SplitTransaction from "@models/splitTransaction";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/split',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json'
        }
    };

    const { 
        name,
        type,
        currency,
        subaccounts,
        bearer_type,
        bearer_subaccount,
        sellerUserId,
        affiliateUserId,
    } = await request.json();

    try {

        // Create subaccount in Paystack
        const paystackData = {
            creator: sellerUserId, 
            affiliate: affiliateUserId, 
            name,
            type,
            currency,
            subaccounts,
            bearer_type,
            bearer_subaccount,
        };

        
        const paystackResponse = await fetch(`https://${options.hostname}${options.path}`, {
            ...options,
            body: JSON.stringify(paystackData),
        });
        
        const paystackResult = await paystackResponse.json();
        console.log(paystackResult, 'paystackResult');

        if (paystackResult.status === true) {
            await connectToDB();

            // Check if user bank account exists
            let splitTransaction = await SplitTransaction.findOne({ creator: sellerUserId });

            if (splitTransaction) {
                // If user bank account exists, update the details
                splitTransaction.paystackResult = paystackResult;

                await splitTransaction.save();
            } else {
                // If user bank account doesn't exist, create a new one
                splitTransaction = new SplitTransaction({ 
                    creator: sellerUserId, 
                    affiliate: affiliateUserId,  
                    paystackResult
                });

                await splitTransaction.save();
            }
            
            return new Response(JSON.stringify(splitTransaction), { status: 200 });
        } else {
            console.error(paystackResult.message);
            return new Response(JSON.stringify({ error: paystackResult.message }), { status: 500 });
        }
    } catch (error) {
        console.error("Error splitting transaction:", error);

        // Check for validation errors
        if (error.name === 'ValidationError') {
            return new Response(`Validation error: ${error.message}`, { status: 400 });
        }

        // Return a generic error response
        return new Response("Error splitting transaction", { status: 500 });
    }
};
