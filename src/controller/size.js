import Size from '../models/size.js';
import { sizeSchema } from '../schemas/size.js';

export const getAll = async (req, res) => {
    try {
        const data = await Size.find().populate("products");
        if (data.length == 0) {
            return res.status(203).json({
                message: "Không có size nào",
            });
        }
        return res.status(200).json(data);

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Size.findById(id).populate("products");
        if (!data) {
            return res.status(200).json({
                message: "Không có size"
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = sizeSchema.validate(body,{ abortEarly: false })
        if (error) {
            return res.json({
                message: error.details[0].message,
            })
        }
        const data = await Size.create(body)
        if (data.length === 0) {
            return res.status(200).json({
                message: "Thêm size thất bại"
            });
        }
        return res.status(200).json({
            message: "Thêm size thành công",
            data
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const size = await Size.findByIdAndDelete(id);
        if (!size) {
            return res.status(404).json({
                message: "Không tìm thấy size",
            });
        }
        if (!size.isDeleteable) {
            return res.status(400).send({ message: 'Không thể xóa size này' });
        }
        return res.status(200).json({
            message: "Xoá thành công",
            size
        })
    } catch (error) {
        return res.status(400).json({
            message: "Xóa size thất bại",
            error: error.message,
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const  data  = await Size.findOneAndUpdate({_id: id}, body, {new: true})
        if (!data) {
            return res.status(200).json({
                message: "Cập nhật thất bại"
            })
        }
        return res.status(200).json({
            message: "Cập nhật thành công",
            data,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}