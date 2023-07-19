import mongoose from 'mongoose';

const statusSchema = mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    }
},{timestamps: true, versionKey: false})

export default mongoose.model('Status', statusSchema);