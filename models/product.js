import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    category: {
        type: String,
        required: [true, 'Category is required.'],
    },
    cta: {
        type: String,
        required: [true, 'Call to action is required.'],
    },
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;