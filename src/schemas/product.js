import Joi from "joi";

export const productSchema = Joi.object({
  code: Joi.string(),
  name: Joi.string().required().messages({
    "string.empty": "Không được bỏ trống tên",
    "any.required": "Trường 'tên' là bắt buộc",
  }),
  thumbnail: Joi.string().messages({
    "string.empty": "Không được bỏ trống ảnh",
    // "any.required": "Trường 'ảnh' là bắt buộc",
  }),
  quantity: Joi.number().min(0),
  importPrice: Joi.number().min(0),
  price: Joi.number().required().min(0),
  description: Joi.string(),
  status: Joi.string(),
  categoryId: Joi.string().messages({
    "string.empty": "Không được bỏ trống danh mục",
    "any.required": "Trường 'danh mục' là bắt buộc",
  }),
  sizeId: Joi.array().messages({
    "string.empty": "Không được bỏ trống size"
  }),
  colorId: Joi.array().messages({
    "string.empty": "Không được bỏ trống color",
  }),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
  deletedAt: Joi.date().default(null),
  deleted: Joi.boolean().default(false),
});
