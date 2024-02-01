import { Schema, model, models } from 'mongoose';

const SuccessfulTransactionSchema = new Schema({
    paystackResult: {
        type: Schema.Types.Mixed, // This allows you to store any type of data
    }  
});

const SuccessfulTransaction = models.SuccessfulTransaction || model('SuccessfulTransaction', SuccessfulTransactionSchema);

export default SuccessfulTransaction;
