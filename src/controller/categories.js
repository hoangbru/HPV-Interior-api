import Category from '../models/category.js';
import { categorySchema } from '../schemas/category.js';

export const getAll = async (req, res) => {
    try {
        const data = await Category.find().populate("products");
        if (data.length == 0) {
            return res.status(203).json({
                message: "Không có danh mục nào",
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
        const data = await Category.findById(id).populate("products");
        if (!data) {
            return res.status(200).json({
                message: "Không có danh mục"
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}

// export const get = async (req, res) => {
//     const categoryId = req.params.id;
//     const { _page = 1, _limit = 12, _sort = "name", _order = "asc", _embed } = req.query;
//     const options = {
//         page: _page,
//         limit: _limit,
//         sort: { [_sort]: _order === "desc" ? -1 : 1 },
//     };
//     const populateOptions = _embed ? [{ path: "categoryId", select: "name" }] : [];
//     try {
//         const category = await Category.findOne({ _id: categoryId });
//         if (!category) {
//             return res.status(404).json({
//                 message: "Category not found",
//             });
//         }
//         const result = await Category.paginate(
//             { categoryId },
//             { ...options, populate: populateOptions }
//         );

//         if (result.docs.length === 0) {
//             return res.status(404).json({
//                 message: "No products found in this category",
//             });
//         }
//         if (_embed) {
//             return res.json({
//                 data: {
//                     category,
//                     products: result.docs,
//                 },
//                 pagination: {
//                     currentPage: result.page,
//                     totalPages: result.totalPages,
//                     totalItems: result.totalDocs,
//                 },
//             });
//         } else {
//             return res.status(200).json({
//                 data: result.docs,
//                 pagination: {
//                     currentPage: result.page,
//                     totalPages: result.totalPages,
//                     totalItems: result.totalDocs,
//                 },
//             });
//         }
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message,
//         });
//     }
// };

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = categorySchema.validate(body,{ abortEarly: false })
        if (error) {
            return res.json({
                message: error.details[0].message,
            })
        }
        const  data  = await Category.create(body)
        if (data.length === 0) {
            return res.status(200).json({
                message: "Thêm danh mục thất bại"
            });
        }
        return res.status(200).json({
            message: "Thêm danh mục thành công",
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
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục",
            });
        }
        if (!category.isDeleteable) {
            return res.status(400).send({ message: 'Không thể xóa danh mục này' });
        }
        return res.status(200).json({
            message: "Xoá thành công",
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: "Xóa danh mục thất bại",
            error: error.message,
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const  data  = await Category.findOneAndUpdate({_id: id}, body, {new: true})
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

