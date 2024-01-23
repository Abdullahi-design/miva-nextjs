import { Schema, model, models } from 'mongoose';

const UserBankAccountSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    bankName: {
        type: String,
        required: [true, 'bank name is required.'],
    }, 
    bankCode: {
        type: String,
        required: [true, 'bank code is required.'],
    }, 
    accountNumber: {
        type: String,
        required: [true, 'Account Number is required.'],
    }, 
    aliseName: {
        type: String,
        required: [true, 'Alise Name name is required.'],
    },  
    percentageCharges: {
        type: Number,
        required: [true, 'precentage is required.'],
    },   
});

const UserBankAccount = models.UserBankAccount || model('UserBankAccount', UserBankAccountSchema);

export default UserBankAccount;
