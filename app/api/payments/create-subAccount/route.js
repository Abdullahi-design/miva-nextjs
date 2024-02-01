import UserBankAccount from "@models/userBankAccount";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/subaccount',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        }
    };

    const { 
        bankName,
        bankCode,
        accountNumber,
        aliseName,
        percentageCharges,
        userId,
    } = await request.json();

    try {

        // Create subaccount in Paystack
        const paystackData = {
            creator: userId, 
            bankName,
            business_name: aliseName,
            settlement_bank: bankCode,
            account_number: accountNumber,
            percentage_charge: percentageCharges,
        };

        const paystackResponse = await fetch(`https://${options.hostname}${options.path}`, {
            ...options,
            body: JSON.stringify(paystackData),
        });

        const paystackResult = await paystackResponse.json();

        if (paystackResult.status === true) {
            await connectToDB();

            // Check if user bank account exists
            let userBankAccount = await UserBankAccount.findOne({ creator: userId });

            if (userBankAccount) {
                // If user bank account exists, update the details
                userBankAccount.paystackResult = paystackResult;

                await userBankAccount.save();
            } else {
                // If user bank account doesn't exist, create a new one
                userBankAccount = new UserBankAccount({ 
                    creator: userId, 
                    paystackData,
                    paystackResult
                });

                await userBankAccount.save();
            }
            
            return new Response(JSON.stringify(userBankAccount), { status: 200 });
        } else {
            console.error(paystackResult.message);
            return new Response(JSON.stringify({ error: paystackResult.message }), { status: 500 });
        }
    } catch (error) {
        console.error("Error creating/updating user bank account:", error);

        // Check for validation errors
        if (error.name === 'ValidationError') {
            return new Response(`Validation error: ${error.message}`, { status: 400 });
        }

        // Return a generic error response
        return new Response("Failed to create/update user bank account", { status: 500 });
    }
};
