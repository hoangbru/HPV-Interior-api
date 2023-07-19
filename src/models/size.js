import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongoosePaginate from 'mongoose-paginate-v2';

const plugins = [mongoosePaginate, mongooseDelete];

const sizeSchema = mongoose.Schema({
    name: {
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
    }
},{timestamps: true, versionKey: false})

sizeSchema.pre("findOneAndDelete", async function (next) {
    try {
        // Lấy model Product từ biến đã import
        const Product = mongoose.model("Product");
        //  lấy điều kiện tìm kiếm hiện tại của câu lệnh, xác định category mà đang được xóa trong trường hợp này.
        const filter = this.getFilter();
        //kiểm tra xem câu lệnh truy vấn có chứa trường categoryId được cập nhật không,
        // nếu có lấy giá trị của trường đó để cập nhật cho các sản phẩm có cùng categoryId.
        const sizeId = this.getQuery().$set?.sizeId;
        const update = {
            sizeId: sizeId ?? null,
        };
        await Product.updateMany(
            { sizeId: filter._id }, // Tìm các sản phẩm cùng categoryId
            update // Cập nhật categoryId mới
        );
        next();
    } catch (err) {
        next(err);
    }
});

plugins.forEach((plugin) => {
    sizeSchema.plugin(plugin, {
        deletedAt: true,
        overrideMethods: true,
    });
});


export default mongoose.model('Size', sizeSchema);