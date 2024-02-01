import SuccessfulTransaction from "@models/sucessfulTransaction";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { paystackResult } = await request.json();

    try {
        await connectToDB();

        // Check if the reference already exists in the database
        const existingTransaction = await SuccessfulTransaction.findOne({ 'paystackResult.data.reference': paystackResult.data.reference });

        if (existingTransaction) {
            return new Response(`Duplicate Transaction: ${paystackResult.data.reference}`, { status: 401 });
        }

        const newTransaction = new SuccessfulTransaction({ paystackResult: paystackResult });
        await newTransaction.save();

        return new Response("Successfully saved the transaction", { status: 200 });
    } catch (error) {
        console.error("Error saving the transaction:", error);

        if (error.name === 'ValidationError') {
            return new Response(`Validation error: ${error.message}`, { status: 400 });
        }

        return new Response("Failed to save the transaction", { status: 500 });
    }
};
