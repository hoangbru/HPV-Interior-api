import mongoose from "mongoose";
import mongooseDelete from 'mongoose-delete';


const orderSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        thumbnail: { type: String},
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
      }],    
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status:{
        type: mongoose.Types.ObjectId,
        ref: "Status",
        default: "648659838fe45955dedbcf5b"
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    notes:{
        type: String
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

orderSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true
})

export default mongoose.model('Order', orderSchema);