import UserBankAccount from "@models/userBankAccount";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const userBankAccount = await UserBankAccount.findOne({ creator: params.id });

        return new Response(JSON.stringify(userBankAccount), { status: 200 })
    } catch (error) {
        return new Response("Failed to create/update user bank account", { status: 500 })
    }
} 
