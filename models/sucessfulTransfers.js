const { Schema, model } = require ('mongoose');

const SucessfulTransfersSchema = new Schema({
    paystackResult: {
        type: Schema.Types.Mixed, // This allows you to store any type of data
    }  
});

const SucessfulTransfers = model('SucessfulTransfers', SucessfulTransfersSchema);

module.exports = { SucessfulTransfers };
