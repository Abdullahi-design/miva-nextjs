import { Schema, model, models } from 'mongoose';

const AffiliateUserSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'UserId is required!'],
    },
    commission: {
        type: Number,
        required: [true, 'Commission is required!'],
    },
    productId: {
        type: String,
        required: [true, 'Product Id is required!'],
    },
    affiliateLinks: [{
        type: String,
    }]
});

const AffiliateUser = models.AffiliateUser || model("AffiliateUser", AffiliateUserSchema);

export default AffiliateUser;