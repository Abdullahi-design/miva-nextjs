// models/splitTransaction.js

import { Schema, model, models } from 'mongoose';

const SplitTransactionSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    affiliate: {
        type: Schema.Types.ObjectId,
        ref: 'Affiliate',
    },
    paystackResult: {
        type: Schema.Types.Mixed,
    },  
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const SplitTransaction = models.SplitTransaction || model('SplitTransaction', SplitTransactionSchema);

export default SplitTransaction;
