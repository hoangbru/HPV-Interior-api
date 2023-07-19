import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2';

const plugins = [mongoosePaginate, mongooseDelete];

const colorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hex:{
        type: String,
        required: true,
    },
    products: [
        {type: mongoose.Types.ObjectId, ref: "Product"}
    ],
    isDeleteable: {
        type: Boolean,
        default: true
    },
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
},{timestamps: true, versionKey: false})

plugins.forEach((plugin) => {
    colorSchema.plugin(plugin, {
        deletedAt: true,
        overrideMethods: true,
    });
});


export default mongoose.model('Color', colorSchema);