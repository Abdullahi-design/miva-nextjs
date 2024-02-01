import SuccessfulTransaction from "@models/sucessfulTransaction";
import UserBankAccount from "@models/userBankAccount";
import { connectToDB } from "@utils/database";

export const GET = async () => {
    try {
        await connectToDB();

        // Calculate the date 24 hours ago from now
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

        // Fetch transactions within the last 24 hours
        const transactions = await SuccessfulTransaction.find({
            'paystackResult.data.transaction_date': { $gte: twentyFourHoursAgo.toISOString() }
        });

        const promises = transactions.map(async (transaction) => {
            const {
                amount,
                metadata
            } = transaction.paystackResult.data;

            const { productId, affiliateId, sellerId, commission } = metadata

            // Convert amount from kobo to naira
            // const amountInNaira = amount / 100;

            const [affiliateBankAccount, sellerBankAccount] = await Promise.all([
                affiliateId ? getUserBankAccount(affiliateId) : null,
                getUserBankAccount(sellerId)
            ]);
            // console.log(affiliateBankAccount, sellerBankAccount, 'xxxxxxxxxxxxxxxxxx');

            const subaccountCodes = {
                affiliate: affiliateBankAccount ? affiliateBankAccount.paystackResult.data.subaccount_code : null,
                seller: sellerBankAccount.paystackResult.data.subaccount_code
            };

            // Check if affiliateId is present and affiliateBankAccount exists
            if (affiliateId && affiliateBankAccount) {
                // Make a request to Paystack for a split transaction
                const splitTransactionResult = await createSplitTransaction(
                    amount,
                    productId,
                    affiliateId,
                    sellerId,
                    commission,
                    subaccountCodes
                );

                // Log or process splitTransactionResult as needed

                return {
                    transaction,
                    affiliateBankAccount,
                    sellerBankAccount,
                    splitTransactionResult
                };
            } else {
                // Handle the case where affiliateId is absent in metadata or affiliateBankAccount doesn't exist
                return {
                    transaction,
                    affiliateBankAccount,
                    sellerBankAccount,
                    splitTransactionResult: null  // or handle it as per your requirements
                };
            }
        });

        const results = await Promise.all(promises);

        return new Response(JSON.stringify(results), { status: 200 });
    } catch (error) {
        console.error("Error processing transactions:", error);

        return new Response("Failed to process transactions", { status: 500 });
    }
};

const getUserBankAccount = async (userId) => {
    // console.log(userId, 'mango');
    if (!userId) {
        console.log(userId, 'banana');
        throw new Error('Invalid userId');
    }

    return await UserBankAccount.findOne({ creator: userId });
};

const createSplitTransaction = async (
    amount,
    productId,
    affiliateId,
    sellerId,
    commission,
    subaccountCodes
) => {
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

    const totalCommission = 88;
    const affiliateCommission = (commission / 100) * totalCommission;
    const sellerCommission = totalCommission - affiliateCommission;

    const splitTransactionData = {
        name: `${productId} Percentage Split`,
        type: 'percentage',
        currency: 'NGN',
        subaccounts: [
            { subaccount: subaccountCodes.affiliate, share: affiliateCommission },
            { subaccount: subaccountCodes.seller, share: sellerCommission }
        ]
    };

    // console.log(splitTransactionData,commission, 'splitTransactionData');

    const splitTransactionResponse = await fetch(`https://${options.hostname}${options.path}`, {
        ...options,
        body: JSON.stringify(splitTransactionData)
    });

    return await splitTransactionResponse.json();
};
