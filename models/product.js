import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    paystackProductId: {
        type: Number,
        // required: [true, 'paystack product Id is required']
    },
    paystackProductUrl: {
        type: String,
        // required: [true, 'paystack product slug is required']
    },
    productName: {
        type: String,
        required: [true, 'Product name is required.'],
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
    },
    metaData: {
        type: String,
        required: [true, 'Meta data is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    coverImage: {
        type: String,
        required: [true, 'Cover image is required.'],
    },
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail is required.'],
    },
    digitalProduct: {
        type: String,
        required: [true, 'Digital Product is required.'],
    },
    category: {
        type: String,
        required: [true, 'Category is required.'],
    },
    cta: {
        type: String,
        required: [true, 'Call to action is required.'],
    },
    commission: {
        type: Number,
    },    
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
