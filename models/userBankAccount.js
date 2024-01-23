import { Schema, model, models } from 'mongoose';

const UserBankAccountSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    paystackResult: {
        type: Schema.Types.Mixed, // This allows you to store any type of data
    }  
});

const UserBankAccount = models.UserBankAccount || model('UserBankAccount', UserBankAccountSchema);

export default UserBankAccount;
