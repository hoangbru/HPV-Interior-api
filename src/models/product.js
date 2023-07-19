import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2';
import slug from 'mongoose-slug-generator';

const plugins = [slug,mongoosePaginate, mongooseDelete];

const productSchema = mongoose.Schema({
    code: Number | String,
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        // required: true,
    },
    quantity: Number,

    importPrice: Number,
    price: {
        type: Number,
    },
    description: String,
    status: {
        type: String,
        default: "Moi nhap"
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    sizeId:[{
        type: mongoose.Types.ObjectId,
        ref: "Size"
    }],
    colorId:[{
        type: mongoose.Types.ObjectId,
        ref: "Color",
    }],
    commentId:[{
        type: mongoose.Types.ObjectId,
        ref: "Comment",
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    slug: { 
        type: String, 
        slug: "name",
        unique: true 
    },
},{timestamps: true, versionKey: false})

plugins.forEach((plugin) => {
    productSchema.plugin(plugin, {
        deletedAt: true,
        overrideMethods: true,
    });
});


export default mongoose.model('Product', productSchema);