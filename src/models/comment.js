import mongoose from "mongoose";
import mongooseDelete from 'mongoose-delete';


const commentSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },  
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
    },
    description: {
        type: String,
        required: true
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

commentSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true
})

export default mongoose.model('Comment', commentSchema);