import Product from "../models/product.js";
import Category from "../models/category.js";
import { v2 as cloudinary } from "cloudinary";
import { productSchema } from "../schemas/product.js";
import Size from "../models/size.js";
import Color from "../models/color.js";
import Comment from "../models/comment.js";

export const getAll = async (req, res) => {
  const {
    _page = 1,
    _limit = 12,
    _sort = "name",
    _order = "asc",
    _expand,
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: { [_sort]: _order === "desc" ? -1 : 1 },
  };
  const populateOptions = _expand
    ? [{ path: "categoryId", select: "name" }]
    : [];
  try {
    const result = await Product.paginate(
      { categoryId: { $ne: null } },
      { ...options, populate: {path: "categoryId colorId sizeId"} }
    );
    if (result.docs.length === 0) throw new Error("No products found");
    const response = {
      data: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
        prevPage: result.prevPage,
        nextPage: result.nextPage
      },
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findOne({ _id: id }).populate(
      "categoryId sizeId colorId",
      "-__v"
    );
    const comment = await Comment.find({ _id: id })
    if (!data) {
      return res.status(200).json({
        message: "Không có sản phẩm",
      });
    }
    return res.status(200).json(data,comment);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const fileData = req.body.thumbnail;
    console.log(fileData);
    const body = req.body;
    const { error } = productSchema.validate(
      {
        ...body,
        thumbnail: fileData,
      },
      { abortEarly: false }
    );
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData);
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const data = await Product.create({
      ...body,
      thumbnail: fileData,
    });

    await Category.findOneAndUpdate(data.categoryId, {
      $addToSet: {
        products: data._id,
      },
    });

    await Size.findOneAndUpdate(data.sizeId, {
      $addToSet: {
        products: data._id,
      },
    });

    await Color.findOneAndUpdate(data.colorId, {
      $addToSet: {
        products: data._id,
      },
    });

    if (!data) {
      if (fileData) cloudinary.uploader.destroy(fileData);
      return res.status(200).json({
        message: "Thêm sản phẩm thất bại",
      });
    }
    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Thêm sản phẩm không thành công",
      error: error.message
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
      });
  }
    await Product.delete({ _id: id});
    return res.status(200).json({
      message: "Xoá sản phẩm thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const forceDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
      });
  }
    await Product.deleteOne({ _id: id });
    // Xóa sản phẩm cũ khỏi danh sách products của category cũ
    console.log(product._id)
    await Category.findByIdAndUpdate(
      product.categoryId,
      { $pull: { products: product._id } }
  );
    return res.status(200).json({
      message: "Xoá sản phẩm thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const fileData = req.body.thumbnail;
    const body = req.body;
    // const { error } = productSchema.validate(
    //   {
    //     ...body,
    //     thumbnail: fileData,
    //   },
    //   { abortEarly: false }
    // );
    // if (error) {
    //   if (fileData) cloudinary.uploader.destroy(fileData);
    //   return res.status(400).json({
    //     message: error.details[0].message,
    //   });
    // }

    // Tìm sản phẩm theo id và cập nhật dữ liệu mới
    const productId = req.params.id;
    const currentProduct = await Product.findById(productId)
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      if (fileData) cloudinary.uploader.destroy(fileData);
      return res.sendStatus(404);
    }

    // Xóa sản phẩm cũ khỏi danh sách products của category cũ
    const oldCategoryId = currentProduct.categoryId;
    await Category.findByIdAndUpdate(oldCategoryId, {
      $pull: { products: productId },
    });

    // Thêm sản phẩm mới vào danh sách products của category mới
    const newCategoryId = req.body.categoryId;
    if (newCategoryId) {
      // Thêm sản phẩm mới vào danh sách products của category mới
      await Category.findByIdAndUpdate(newCategoryId, {
        $addToSet: { products: productId },
      });
    }

    if (!updatedProduct) {
      if (fileData) cloudinary.uploader.destroy(fileData);
      return res.status(200).json({
        message: "Cập nhật sản phẩm thất bại",
      });
    }
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      updatedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const restore = async (req, res) => {
  try {
    await Product.restore({ _id: req.params.id });
    return res.status(200).json({
      message: "Khôi phục sản phẩm thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getTrash = async (req, res) => {
  try {
    const data = await Product.findDeleted().populate("categoryId", "-__v");
    if (!data) {
      return res.status(200).json({
        message: "Không có sản phẩm nào bị xoá",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getSlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const data = await Product.findOne({ slug }).populate(
      "categoryId sizeId colorId commentId",
      "-__v"
    );;
    if (!data) {
      return res.status(200).json({
        message: "Không có sản phẩm",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getByColor = async (req, res) => {
  try {
      const colorId = req.params.colorId;
      const orders = await Product.find({colorId: colorId});
  return res.status(200).json(orders);
  } catch (error) {
      return res.status(400).json({ message: error.message });
  }
}
export const getByCategory = async (req, res) => {
  try {
      const categoryId = req.params.categoryId;
      const orders = await Product.find({categoryId: categoryId});
  return res.status(200).json(orders);
  } catch (error) {
      return res.status(400).json({ message: error.message });
  }
}